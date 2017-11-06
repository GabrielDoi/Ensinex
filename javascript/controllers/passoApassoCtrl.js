angular.module("ensinex").controller("passoApassoCtrl", ["$scope", "acessoLiberadoAPI", "$stateParams", function($scope, acessoLiberadoAPI, $stateParams) {
	console.log("passoApassoCtrl");
	
	//bloqueio o acesso caso usuario volte a pagina ira ter que colocar os valores denovo
	acessoLiberadoAPI.blockLiberado();

	//================== variaveis ===============================================================

	//varivel do typo de operacao 0 para Maximizar e 1 para Minimizar
	$scope.ObjOperacao = $stateParams.operacao;

	//funcao z ja dismembrada tamanho desse array = total de variaveis de decisão
	$scope.funcaoZ = $stateParams.funcaoZ;

	//todas restricoes
	$scope.restricoes = $stateParams.restricoes;

	//================== fim das variaveis ===============================================================

	//========================== funcoes estaticas  =========================================================



	//================== fim funcoes estaticas ===============================================================

	//========================== funcoes do scope  =========================================================

	$scope.testeSinal = function(valor, index) {
		if(Math.sign(valor) == 1 && index != 0){
			return "+"
		}else{
			return ""
		}
	}

	//================== fim funcoes do scope ===============================================================

	console.log($scope.ObjOperacao);
	console.log($scope.funcaoZ);
	console.log($scope.restricoes);
}]);