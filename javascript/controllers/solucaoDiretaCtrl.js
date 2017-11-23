angular.module("ensinex").controller("solucaoDiretaCtrl", ["$scope", "acessoLiberadoAPI", "$stateParams", function($scope, acessoLiberadoAPI, $stateParams) {
	console.log("solucaoDiretaCtrl");

	//bloqueio o acesso caso usuario volte a pagina ira ter que colocar os valores denovo
	acessoLiberadoAPI.blockLiberad//variavel para mostrar solucao final 

	$scope.todasSolucaoFinal = angular.copy($stateParams.resultado);

}]);