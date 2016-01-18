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

	app.controller('BookCtrl',['$scope','books','$routeParams','$http', function($scope,books,$routeParams,$http){
		var id = $routeParams.id;
		$http.get('/api/v1/book/' + id).success(function(res){
			$scope.book = res;
		});
		$scope.getDescussions = function(id,page){
			return $http.get('/api/v1/discussions/' + id + '/page/' + page).success(function(data){
				//console.log(data);
				$scope.discussions = data;
		})};
	}]);



	app.config(function($routeProvider,$locationProvider){
	$routeProvider.when('/', {
			templateUrl: '/partials/home.html',
			controller:'HomeCtrl'
		}).when('/book/:id', {
			templateUrl: '/partials/book.html',
			controller:'BookCtrl'
		})
		.otherwise({
			redirectTo: '/'
		});
		$locationProvider.html5Mode(true);
	});


})();
