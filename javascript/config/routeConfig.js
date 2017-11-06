angular.module("ensinex").config(function($stateProvider, $urlRouterProvider) {
	
	$urlRouterProvider.otherwise("Ensinex");

	$stateProvider
	.state("#", {
		controller: "ensinexMainCtrl",
		url: "/Ensinex",
		templateUrl: "views/inicio.html"
	});

});