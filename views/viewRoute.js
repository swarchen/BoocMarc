var app = angular.module('BoocMarc',['ngRoute']);

app.config(function($routeProvider){
	$routeProvider.when('/', {
		controller:'contentCtrl',
		templateUrl: 'index.html'
	})
	.otherwise({
		redirectTo: '/'
	})

});