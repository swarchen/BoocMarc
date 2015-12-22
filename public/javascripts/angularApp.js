(function(){
	var app = angular.module('boocmarc',['ngRoute']);
	
	app.controller('ContentCtrl', ['$scope', function($scope){
		this.books = books; 
		
	}]);
	//test data
	var books = [
		{
			name : "蝙蝠(奈斯博作品集10)",
			author :  "尤．奈斯博",
			comments : {
				count:3
			},
			category : "歐美懸疑/推理小說",
			publisher : "漫遊者文化",
			imgUrl: "http://im1.book.com.tw/image/getImage?i=http://www.books.com.tw/img/001/069/85/0010698529.jpg&v=565830d2&w=348&h=348"
		},{
			name : "哥教的不是歷史，是人性：呂捷親授，如何做一隻成功的魯蛇",
			author :  "呂捷",
			comments : {
				count:12
			},
			category : "人生規劃/自我改變",
			publisher : "圓神",
			imgUrl: "http://im2.book.com.tw/image/getImage?i=http://www.books.com.tw/img/001/069/31/0010693183_bc_01.jpg&v=561cddc2&w=655&h=609"
		},{
			name : "被討厭的勇氣：自我啟發之父「阿德勒」的教導",
			author :  "岸見一郎, 古賀史健",
			comments : {
				count:4
			},
			category : "經典學派/大師思想",
			publisher : "究竟",
			imgUrl: "http://im2.book.com.tw/image/getImage?i=http://www.books.com.tw/img/001/065/31/0010653153_bc_01.jpg&v=543bb7fa&w=655&h=609"
		}
	];
})();
