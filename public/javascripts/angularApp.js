(function(){
	var app = angular.module('boocmarc',['ngRoute']);
	
	app.controller('TrendBookCtrl', ['$scope', function($scope){
		this.books = books; 
	}]);
	app.controller('DiscussBookCtrl', ['$scope', function($scope){
		this.books = books; 
	}]);
	app.controller('BookCtrl', ['$scope','$routeParams', function($scope,$routeParams){
		this.book = book;
		this.discussions = discussions;
		$scope.beforeThan = function(prop, val){
		    return function(item){
		      return item[prop] < val;
		    }
		}
	}]);

	app.config(function($routeProvider){
	$routeProvider.when('/', {
		templateUrl: 'partials/home.html'
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
	var discussions = [
		{
			book:"蝙蝠(奈斯博作品集10)",
			author:"Jhaocheng wu",
			title:"我覺得第一段的故事有點難懂耶",
			comments:{
				count:6
			},
			likes:{
				count:2
			},
			dislike:{
				count:0
			},
			page:{
				at:15
			}
		},{
			book:"蝙蝠(奈斯博作品集10)",
			author:"Alex",
			title:"想和大家聊聊第二章的內容",
			comments:{
				count:6
			},
			likes:{
				count:8
			},
			dislike:{
				count:0
			},
			page:{
				at:32
			}
		},{
			book:"蝙蝠(奈斯博作品集10)",
			author:"Mendy",
			title:"看完四分之一大概有點了解作者想表達什麼",
			comments:{
				count:32
			},
			likes:{
				count:53
			},
			dislike:{
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
