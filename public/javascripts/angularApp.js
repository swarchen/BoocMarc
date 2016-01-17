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
	    });
		$scope.featured = books.featured;
		$scope.discussed = books.discussed;

	}])

	app.config(function($routeProvider){
	$routeProvider.when('/', {
			templateUrl: 'partials/home.html',
			controller:'HomeCtrl'
		}).when('/book/:id', {
			templateUrl: 'partials/book.html',
			controller:'BookCtrl'
		})
		.otherwise({
			redirectTo: '/'
		});
		//$locationProvider.html5Mode(true);
	});


	//test data
	var comments = [
		{
			book:"蝙蝠(奈斯博作品集10)",
			author:"andy",
			comment:"good",
			likes:{
				count:0
			},
			dislikes:{
				count:0
			}
		},
		{
			book:"蝙蝠(奈斯博作品集10)",
			author:"andy",
			comment:"good",
			likes:{
				count:0
			},
			dislikes:{
				count:0
			}
		},
		{
			book:"蝙蝠(奈斯博作品集10)",
			author:"andy",
			comment:"good",
			likes:{
				count:0
			},
			dislikes:{
				count:0
			}
		}
	]

	var discussions = [
		{
			book:"蝙蝠(奈斯博作品集10)",
			author:"Jhaocheng wu",
			title:"我覺得第一段的故事有點難懂耶",
			explanation:"不知道為什麼主角會因為這樣死掉，很不合理大家不覺得嗎？",
			comments:{
				count:6
			},
			likes:{
				count:2
			},
			dislikes:{
				count:0
			},
			page:{
				at:15
			}
		},{
			book:"蝙蝠(奈斯博作品集10)",
			author:"Alex",
			title:"想和大家聊聊第二章的內容",
			explanation:"大家是不是跟我一樣看到ＸＸ就想到ＸＸＸ，我覺得作者經營得好好歐",
			comments:{
				count:6
			},
			likes:{
				count:8
			},
			dislikes:{
				count:0
			},
			page:{
				at:32
			}
		},{
			book:"蝙蝠(奈斯博作品集10)",
			author:"Mendy",
			title:"看完四分之一大概有點了解作者想表達什麼",
			explanation:"感覺這本書看四份之一大概就可以了，之後寫的幾乎都是重複再講前面提過的觀念，好像沒什麼意義",
			comments:{
				count:32
			},
			likes:{
				count:53
			},
			dislikes:{
				count:0
			},
			page:{
				at:58
			}
		}
	]
	var book = {
			name : "蝙蝠(奈斯博作品集10)",
			author :  "尤．奈斯博",
			discussions : {
				count:3
			},
			category : "歐美懸疑/推理小說",
			publisher : "漫遊者文化",
			pages:360,
			imgUrl: "http://im1.book.com.tw/image/getImage?i=http://www.books.com.tw/img/001/069/85/0010698529.jpg&v=565830d2&w=348&h=348"
	}
	var books = [
		{
			name : "蝙蝠(奈斯博作品集10)",
			author :  "尤．奈斯博",
			discussions : {
				count:3
			},
			category : "歐美懸疑/推理小說",
			publisher : "漫遊者文化",
			imgUrl: "http://im1.book.com.tw/image/getImage?i=http://www.books.com.tw/img/001/069/85/0010698529.jpg&v=565830d2&w=348&h=348"
		},{
			name : "哥教的不是歷史，是人性：呂捷親授，如何做一隻成功的魯蛇",
			author :  "呂捷",
			discussions : {
				count:12
			},
			category : "人生規劃/自我改變",
			publisher : "圓神",
			imgUrl: "http://im2.book.com.tw/image/getImage?i=http://www.books.com.tw/img/001/069/31/0010693183_bc_01.jpg&v=561cddc2&w=655&h=609"
		},{
			name : "被討厭的勇氣：自我啟發之父「阿德勒」的教導",
			author :  "岸見一郎, 古賀史健",
			discussions : {
				count:4
			},
			category : "經典學派/大師思想",
			publisher : "究竟",
			imgUrl: "http://im2.book.com.tw/image/getImage?i=http://www.books.com.tw/img/001/065/31/0010653153_bc_01.jpg&v=543bb7fa&w=655&h=609"
		},{
			name : "蝙蝠(奈斯博作品集10)",
			author :  "尤．奈斯博",
			discussions : {
				count:3
			},
			category : "歐美懸疑/推理小說",
			publisher : "漫遊者文化",
			imgUrl: "http://im1.book.com.tw/image/getImage?i=http://www.books.com.tw/img/001/069/85/0010698529.jpg&v=565830d2&w=348&h=348"
		},{
			name : "哥教的不是歷史，是人性：呂捷親授，如何做一隻成功的魯蛇",
			author :  "呂捷",
			discussions : {
				count:12
			},
			category : "人生規劃/自我改變",
			publisher : "圓神",
			imgUrl: "http://im2.book.com.tw/image/getImage?i=http://www.books.com.tw/img/001/069/31/0010693183_bc_01.jpg&v=561cddc2&w=655&h=609"
		},{
			name : "被討厭的勇氣：自我啟發之父「阿德勒」的教導",
			author :  "岸見一郎, 古賀史健",
			discussions : {
				count:4
			},
			category : "經典學派/大師思想",
			publisher : "究竟",
			imgUrl: "http://im2.book.com.tw/image/getImage?i=http://www.books.com.tw/img/001/065/31/0010653153_bc_01.jpg&v=543bb7fa&w=655&h=609"
		},{
			name : "蝙蝠(奈斯博作品集10)",
			author :  "尤．奈斯博",
			discussions : {
				count:3
			},
			category : "歐美懸疑/推理小說",
			publisher : "漫遊者文化",
			imgUrl: "http://im1.book.com.tw/image/getImage?i=http://www.books.com.tw/img/001/069/85/0010698529.jpg&v=565830d2&w=348&h=348"
		},{
			name : "哥教的不是歷史，是人性：呂捷親授，如何做一隻成功的魯蛇",
			author :  "呂捷",
			discussions : {
				count:12
			},
			category : "人生規劃/自我改變",
			publisher : "圓神",
			imgUrl: "http://im2.book.com.tw/image/getImage?i=http://www.books.com.tw/img/001/069/31/0010693183_bc_01.jpg&v=561cddc2&w=655&h=609"
		},{
			name : "被討厭的勇氣：自我啟發之父「阿德勒」的教導",
			author :  "岸見一郎, 古賀史健",
			discussions : {
				count:4
			},
			category : "經典學派/大師思想",
			publisher : "究竟",
			imgUrl: "http://im2.book.com.tw/image/getImage?i=http://www.books.com.tw/img/001/065/31/0010653153_bc_01.jpg&v=543bb7fa&w=655&h=609"
		},{
			name : "蝙蝠(奈斯博作品集10)",
			author :  "尤．奈斯博",
			discussions : {
				count:3
			},
			category : "歐美懸疑/推理小說",
			publisher : "漫遊者文化",
			imgUrl: "http://im1.book.com.tw/image/getImage?i=http://www.books.com.tw/img/001/069/85/0010698529.jpg&v=565830d2&w=348&h=348"
		},{
			name : "哥教的不是歷史，是人性：呂捷親授，如何做一隻成功的魯蛇",
			author :  "呂捷",
			discussions : {
				count:12
			},
			category : "人生規劃/自我改變",
			publisher : "圓神",
			imgUrl: "http://im2.book.com.tw/image/getImage?i=http://www.books.com.tw/img/001/069/31/0010693183_bc_01.jpg&v=561cddc2&w=655&h=609"
		},{
			name : "被討厭的勇氣：自我啟發之父「阿德勒」的教導",
			author :  "岸見一郎, 古賀史健",
			discussions : {
				count:4
			},
			category : "經典學派/大師思想",
			publisher : "究竟",
			imgUrl: "http://im2.book.com.tw/image/getImage?i=http://www.books.com.tw/img/001/065/31/0010653153_bc_01.jpg&v=543bb7fa&w=655&h=609"
		},{
			name : "蝙蝠(奈斯博作品集10)",
			author :  "尤．奈斯博",
			discussions : {
				count:3
			},
			category : "歐美懸疑/推理小說",
			publisher : "漫遊者文化",
			imgUrl: "http://im1.book.com.tw/image/getImage?i=http://www.books.com.tw/img/001/069/85/0010698529.jpg&v=565830d2&w=348&h=348"
		},{
			name : "哥教的不是歷史，是人性：呂捷親授，如何做一隻成功的魯蛇",
			author :  "呂捷",
			discussions : {
				count:12
			},
			category : "人生規劃/自我改變",
			publisher : "圓神",
			imgUrl: "http://im2.book.com.tw/image/getImage?i=http://www.books.com.tw/img/001/069/31/0010693183_bc_01.jpg&v=561cddc2&w=655&h=609"
		},{
			name : "被討厭的勇氣：自我啟發之父「阿德勒」的教導",
			author :  "岸見一郎, 古賀史健",
			discussions : {
				count:4
			},
			category : "經典學派/大師思想",
			publisher : "究竟",
			imgUrl: "http://im2.book.com.tw/image/getImage?i=http://www.books.com.tw/img/001/065/31/0010653153_bc_01.jpg&v=543bb7fa&w=655&h=609"
		}
	];
})();
