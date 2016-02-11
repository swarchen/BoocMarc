(function(){
	var app = angular.module('boocmarc',['ngRoute']);
	
	app.factory('books',['$http', function($http){
		var o = {
			featured:[],
			discussed:[]
		};

		o.getFeatured = function(){
			return $http.get('/api/v1/featured-books').success(function(data){
				angular.copy(data, o.featured);
			})
		}

		o.getDiscussed = function(){
			return $http.get('/api/v1/discussed-books').success(function(data){
				angular.copy(data, o.discussed);
			})
		}


	return o;
	}]);

	app.factory('discussions',['$http', 'auth', function($http, auth){
		var o = {
			discussions:[]
		};

		o.getByPage = function(id,page){
			return $http.get('/api/v1/discussions/' + id + '/page/' + page).success(function(data){
				//console.log(data);
				angular.copy(data, o.discussions);
			})
		}

		o.create = function(discussion){
			//console.log('imokkk');
			return $http.post('/discussion', discussion).success(function(data){
				o.discussions.push(data);
			})
		}

		return o;
	}]);


	app.factory('auth',['$http','$window', function($http, $window){
		var auth = {};

		auth.saveToken = function(token){
			$window.localStorage['boocmarc-token'] = token;
		}

		auth.getToken = function(){
			return $window.localStorage['boocmarc-token'];
		}

		auth.isLoggedIn = function(){
			var token = auth.getToken();

			if (token) {
				var payload = JSON.parse($window.atob(token.split('.')[1]));

				return payload.exp > Date.now() / 1000;
			}else{
				return false;
			}
		}

		auth.currentUser = function(){
			if (auth.isLoggedIn()) {
				var token = auth.getToken();
				var payload = JSON.parse($window.atob(token.split('.')[1]));
				return payload.username;
			};
		}

		auth.currentUserId = function(){
			if (auth.isLoggedIn()) {
				var token = auth.getToken();
				var payload = JSON.parse($window.atob(token.split('.')[1]));
				return payload._id;
			};
		}

		auth.register = function(user){
			return $http.post('/register', user).success(function(data){
				//console.log(data);
				auth.saveToken(data.token);
			})
		}

		auth.logIn = function(user){
			return $http.post('/login', user).success(function(data){
				auth.saveToken(data.token);
			})
		}

		auth.logOut = function(){
			$window.localStorage.removeItem('boocmarc-token');
		}

		return auth;
	}]);

	app.controller('HomeCtrl',['$scope','$q','books', function($scope,$q,books){
		var featured_req = books.getFeatured(),
        	discussed_req = books.getDiscussed();
	    $q.all([featured_req, discussed_req]).then(function(data) { 
	        //here you'll get results for both the calls
	        //console.log(data);
	        return data;
	    });
		$scope.featured = books.featured;
		$scope.discussed = books.discussed;

	}]);

	app.controller('BookCtrl',['$scope','books','$routeParams','$http','discussions','auth', function($scope,books,$routeParams,$http,discussions,auth){
		var id = $routeParams.id;
		$scope.discussions = discussions.discussions;
		$http.get('/api/v1/book/' + id).success(function(res){
			$scope.book = res;
		});
		$scope.getDescussions = function(id,page){
			discussions.getByPage(id,page);
			$scope.show = 0;
		};
		$scope.addDiscussion = function(){
			if (!$scope.discussion.title || $scope.discussion.title === '' || !$scope.discussion.content || $scope.discussion.content === '') {return;}
			discussions.create({
				bookId:id.toString(),
				title:$scope.discussion.title,
				content:$scope.discussion.content,
				page:$scope.page,
				postedBy:auth.currentUserId()
			});
			//console.log('imok');
			$scope.discussion.title = "";
			$scope.discussion.content = "";
			$scope.clicked=0;
		}
		
	}]);

	app.controller('AuthCtrl', ['$scope', '$location', 'auth', function($scope, $location, auth){
		$scope.user = {};

		$scope.register = function(){
			auth.register($scope.user).error(function(error){
				$scope.error = error;
			}).then(function(){
				$location.path('/');
			})
		}

		$scope.logIn = function(){
			auth.logIn($scope.user).error(function(error){
				$scope.error = error;
			}).then(function(){
				$location.path('/');
			})
		}
	}])

	app.controller('NavCtrl', ['$scope', 'auth', function($scope, auth){
		$scope.isLoggedIn = auth.isLoggedIn;
		$scope.currentUser = auth.currentUser;
		$scope.logOut = auth.logOut;
	}])

	app.controller('NewBookCtrl', ['$scope','$http',function($scope,$http){
		
		$scope.scrapebook = function(book){
			console.log(book);
			return $http.post('/scrapebook', book).error(function(error){
				//console.log(error);
			}).success(function(data){
				$scope.book = data.openGraph;
			})
		}
	}])


	app.config(function($routeProvider,$locationProvider){
	$routeProvider.when('/', {
			templateUrl: '/partials/home.html',
			controller:'HomeCtrl'
		}).when('/book/:id', {
			templateUrl: '/partials/book.html',
			controller:'BookCtrl'
		}).when('/login', {
			templateUrl: 'partials/login.html',
			controller: 'AuthCtrl'
		}).when('/register', {
			templateUrl: 'partials/register.html',
			controller: 'AuthCtrl'
		}).when('/newbook',{
			templateUrl: 'partials/newbook.html',
			controller:'NewBookCtrl'
		})
		.otherwise({
			redirectTo: '/'
		});
		$locationProvider.html5Mode(true);
	});


})();
