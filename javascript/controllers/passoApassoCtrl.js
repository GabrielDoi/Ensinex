angular.module("ensinex").controller("passoApassoCtrl", ["$scope", "acessoLiberadoAPI", "$stateParams", "$state", "calculaMaxAPI", function($scope, acessoLiberadoAPI, $stateParams, $state, calculaMaxAPI) {
	console.log("passoApassoCtrl");
	
	//bloqueio o acesso caso usuario volte a pagina ira ter que colocar os valores denovo
	acessoLiberadoAPI.blockLiberado();

	//================== variaveis ===============================================================

	//varivel do typo de operacao 0 para Maximizar e 1 para Minimizar
	$scope.ObjOperacao = angular.copy($stateParams.operacao);

	//funcao z ja dismembrada tamanho desse array = total de variaveis de decisão
	$scope.funcaoZ = angular.copy($stateParams.funcaoZ);

	//todas restricoes
	$scope.restricoes = angular.copy($stateParams.restricoes);

	//variavel que vai armazenar TABELA em forma de matriz não vou usar ela no scope
	//variavel estatica desse documento
	var _tabela = [];
	//controle de se a expressao tiver variaveis faltando
	var _controleFaltandoVar = true;

	//variavel armazena os valores dos xis e fs para montar a tabela
	var _xisEfs = [];

	var qtdIter = angular.copy($stateParams.qtdIteracao)

	//================== fim das variaveis ===============================================================

	//========================== funcoes estaticas  =========================================================

	function criaXisEfs(fun, qtdRes) {

		//adiciono no primeiro elemento a BASE
		_xisEfs.push("BASE");

		//for vai percorrer todos elementos do meu array de funcao mais os fs que são qtdRestricoes
		for(var i = 0; i < fun.length + qtdRes; i++) {

			//se o i for maior que numero de elementos na funcao ele grava os Fs
			if(i < fun.length){
				//aqui o i ainda nao é maior entao grava o nome do xis da funcao
				_xisEfs.push(fun[i].xis);
			}else{
				//aqui o i ja é maior entao quer dizer que ja acabou toda minha funcao grava os Fs
				//Fs são sempre o i menos a total da funcao para comesar com 1,2,3...
				_xisEfs.push("F"+ ((1+i) - fun.length));
			}
		}

		//adiciona o bzinho no final 
		_xisEfs.push("b");
	}// fim de criaXisEfs

	//================== fim funcoes estaticas ===============================================================

	//========================== funcoes do scope  =========================================================

	//funcao para verificar se valor é positivo se for ele retorna sinal de + para ser escrito na DOM 
	//para o sinal de menos não prescisa porque os numero ja vem com o - na frente
	$scope.testeSinal = function(valor, index) {
		//so verifica faz se não for o primeiro valor do array
		if(Math.sign(valor) == 1 && index != 0){
			return "+"
		}else{
			return ""
		}
	};

	$scope.tabelaDosCalculos = function(obj, func, restri) {
		//OBJ vou usar depois para verificar se é maximizar ou minimozar 
		//ate agora vamos fazer so o max

		//primeiro for é para adicionar todas as restricoes com base na linha
		//entao o i = a linha
		for(var i = 0 ; i < restri.length ; i++) {
			//adicionamos um novo elemento no array que é outro array fechando a estrutura da matriz 
			//quer dizer que estamos adicionado uma nova linha na matriz
			_tabela.push([]);

			//adiciona o nome da funcao no primeiro elemento da matriz tabela
			_tabela[i].push("F"+(i+1));

			//segundo for é para as colunas 
			//são formadas seguindo total de variveis de decissão + total de restricoes para forma os F
			//como total de variaveis de decisão é o tamanho do array func entao
			for(var j = 0 ; j < func.length + restri.length ; j++) {

				//verifica se ja acabou as colunas dos valores de x
				//como todos os x são todas variaveis de decisao e todas variaveis são tamanho do array func entao
				if(j < func.length){
					//vou percorrer todos valores das restricao da linha que estou adicionando no case é meu i
					//para verificar qual posicao é no array de restricoes o valor do elementos da funcao
					for(var k = 0 ; k < restri[i].length -1 ; k++){
						
						//verifico se x da funcao é igual x da restricao
						if(func[j].xis == restri[i][k].xis){

							//se for adiciono ele na minha tabela porque ele é daquela posicao
							_tabela[i].push(restri[i][k].valor);

							_controleFaltandoVar = false;
						}
					}

					if(_controleFaltandoVar){
						_tabela[i].push(0);
					}
					_controleFaltandoVar = true;
				}else{

					//para adicionar os F referente as linhas que estou verificando 
					//verifico se i é igual ao valores de j retirando os valores da funcao 
					//para adicionar os valores depois que acabar os valores da funcao
					if(i == j - func.length){
						//verifico o operador se o operador for > valor das variaveis de folga tem que ser -1 
						//se nao for o valor das variaveis são positivas 1
						if(restri[i][restri[i].length -1].operador == ">") {
							_tabela[i].push(-1);
						}else{
							_tabela[i].push(1);
						}
					}else{
						_tabela[i].push(0);
					}
				}
			}//fim do for

				//quando acabar todas os valores da funcao e os valores dos F adiciono os valores de B
				//sempre esses valores estao na ultima posicao das restricoes entao
				_tabela[i].push(restri[i][restri[i].length-1].valorB);

		}//fim da linhas do primeiro for

		//nessa parte vou adicionar minha funcao Z na ultima linha da tabela matriz 
		//adiciono a ultima linha para ser os valores da minha funcao Z
		_tabela.push([]);

		//adiciona o Z da funcao no primeiro elemento da matriz tabela
		_tabela[_tabela.length-1].push("Z");

		//esse for é para toda a linha incluindo o ultimo valor que é o B
		//por isso vai toda restricao + todas variaveis + 1 que é o B
		for(var i = 0; i < restri.length + func.length + 1; i++){

			//verifico se ja acacou todas variaveis da minha funcao
			//caso ja tenha acabado todos os valores da minha funcao adiciono os 0 nas outras casas da matriz tabela
			if(i < func.length){
				//_tabela.length-1 retorna ultima posicao da minha matriz tabela 
				_tabela[_tabela.length-1].push(-func[i].valor);
			}else{
				_tabela[_tabela.length-1].push(0);
			}
		}//fim do ultimo for

		console.log(_tabela)

		//cria os xis e os fs
		criaXisEfs(func, restri.length);

		//verifica qual Objetivo maximizar ou minimizar
		if(obj == 0){
			//se 0 é porque é MAXIMIZAR
			//libera acesso para poder ir para proxima pagiga
      		acessoLiberadoAPI.setLiberado();

      		//calcular Funcao MAX aqui parametros tabela, qtdVariaveis, qtdRestricoes, qtdIteracao, xisEfs
      		var _resultado = calculaMaxAPI.calcular(_tabela, func.length, restri.length, qtdIter, _xisEfs);

			//isso faz acionar carregamento da proxima pagina que é calculamax
			//{tabela: _tabela, qtdVariaveis: func.length, qtdRestricoes: restri.length, xisEfs: _xisEfs, qtdIteracao: qtdIter}
			$state.go("calculamax", {resultadoMax: _resultado, xisEfs: _xisEfs});
		}else{
			if(obj == 1){
				//se 1 é porque é MINIMIZAR

			}else{
				//se for outra coisa é porque deu erro em algum lugar entao nao faz nada e apresenta msg
				console.log("Objetivo max ou min fora dos parametros");
			}
		}
	};//fim tabela dos calculos

	$scope.solucaoDireta = function() {
		
	};// fim solucao direta

	//================== fim funcoes do scope ===============================================================

	console.log($scope.ObjOperacao);
	console.log($scope.funcaoZ);
	console.log($scope.restricoes);
}]);