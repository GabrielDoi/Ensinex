angular.module("ensinex").factory("gravarFuncaoAPI", [function() {
	/*
		api responsavel por armazenar todo a funcao de entrada para
		futuramente na tela de passo a passo ou resultado final poder 
		voltar a tela de apresentacao para escolher se quer passo a passo ou resultado direto
	*/
	//armazena se é maximizar ou minimizar recebe um tipo number
	var _tipoOperacao;

	//armazena a funcao z recebe um tipo array
	var _funcaoZ;

	//armazena todas as restricoes recebe um tipo array
	var _restricoes;

	//armazena quantidade maxima de iteracao recebe um tipo number
	var _qtdIteracao;

	var _setDados = function(t, f, r, i) {
		//zero todos os estados antes de 
		_tipoOperacao = 0;
		_funcaoZ = [];
		_restricoes = [];
		_qtdIteracao = 0;

		//atribuo o valor a todos
		_tipoOperacao = t;
		_funcaoZ = angular.copy(f); // porque passa por referencia
		_restricoes = angular.copy(r); // por passa por referencia
		_qtdIteracao = i;

		return true;
	};

	var _getDados = function() {
		return {
			tipo: _tipoOperacao, 
			funcao: _funcaoZ, 
			restricoes: _restricoes, 
			iteracao: _qtdIteracao 
		}
	};

	return {
		getDados: _getDados,
		setDados: _setDados
	}

}]);