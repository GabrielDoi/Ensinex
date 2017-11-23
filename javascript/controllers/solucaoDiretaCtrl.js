angular.module("ensinex").controller("solucaoDiretaCtrl", ["$scope", "acessoLiberadoAPI", "$stateParams", "gravarFuncaoAPI", "$state", function($scope, acessoLiberadoAPI, $stateParams, gravarFuncaoAPI, $state) {
	console.log("solucaoDiretaCtrl");

	//bloqueio o acesso caso usuario volte a pagina ira ter que colocar os valores denovo
	acessoLiberadoAPI.blockLiberad//variavel para mostrar solucao final 

	$scope.todasSolucaoFinal = angular.copy($stateParams.resultado);

	$scope.voltar = function() {
		var _parametros = gravarFuncaoAPI.getDados();
		
		$state.go("passoapasso",{operacao: _parametros.tipo, funcaoZ: _parametros.funcao, restricoes: _parametros.restricoes, qtdIteracao: _parametros.iteracao});
	};

}]);