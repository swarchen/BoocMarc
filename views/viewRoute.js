var app = angular.module('BoocMarc',['ngRoute']);

app.config(function($routeProvider){
	$routeProvider.when('/', {
		templateUrl: '../views/home.html'
	})
	.otherwise({
		redirectTo: '/'
	})

});