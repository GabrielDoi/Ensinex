angular.module("ensinex").controller("calculamaxCtrl", ["$scope", "funcaoZAPI", "acessoLiberadoAPI", "$state", "$stateParams", function($scope, funcaoZAPI, acessoLiberadoAPI, $state, $stateParams) {
	console.log("calculamaxCtrl");
	
	//bloqueio o acesso caso usuario volte a pagina ira ter que colocar os valores denovo
	acessoLiberadoAPI.blockLiberado();
   
  	//montagem do quadro 
	// var tabela = [ ["f1",1,0,1,0,0,4],
	// 			  	  ["f2",0,1,0,1,0,6 ],
	// 			  	  ["f3",3,2,0,0,1,18 ],
	// 			  	  ["z",-3,-5,0,0,0,0 ]
	// 				];
	var tabela = $stateParams.tabela;
			//console.log($stateParams.tabela)
	//var qtdeVariaveis = 2;
	var qtdeVariaveis = $stateParams.qtdVariaveis;
			//console.log($stateParams.qtdVariaveis)
	//var qtdeRestricoes = 3;
	var qtdeRestricoes = $stateParams.qtdRestricoes;
			//console.log($stateParams.qtdRestricoes)


	var qtdeLinhas = qtdeRestricoes+1;
	var qtdeColunas = qtdeRestricoes+qtdeVariaveis+2;


	//=========== variaveis do scope ========================================================

	//$scope.nXisEfs = ["BASE", "x1", "x2", "x3", "F1", "F2", "F3", "F4", "B"];
	$scope.nXisEfs = $stateParams.xisEfs;

	//=========== fim da variaveis do scope ==================================================
			
			
	$scope.calculaMax = function (){
	
		var entra; //posição de quem entra
		var menor = 0;
		
		for(var i=1; i <= qtdeVariaveis ; i++){
			if (tabela[qtdeRestricoes][i] < menor){
				entra = i;
				menor = tabela[qtdeRestricoes][i];
			}
				
		}

		var sai; //posição de quem sai
		var primeiro = true; // verificar se é a primeira verificaçao
		
		for (var i=0 ; i<qtdeRestricoes;i++){
			if(tabela[i][entra]  != 0){
				var aux = tabela[i][qtdeColunas-1] / tabela[i][entra];
				if(primeiro){
					menor = aux;
					sai = i;
					primeiro = false;
				}
				else{
					if(aux < menor){
						menor = aux;
						sai = i;
					}
				}
			}
		}
		
	

		//substituindo quem entra/sai
		tabela[sai][0] = "x"+entra;
		
		
		
		
		
		// 1ª iteração - 1ª operação
		
		pivo = tabela[sai][entra];
		
		for (var i =1 ; i< qtdeColunas; i++){
			if(tabela[sai][i] != 0){
				tabela[sai][i] = tabela[sai][i] / pivo;
			}
			
		}
		
		// 1ª iteração - 2ª operação
		
		for ( var i=0; i< qtdeLinhas; i++){
		
			if(i!= sai){
			
				operador = tabela[i][entra] * -1;
				
				for(var j=1; j<qtdeColunas; j++){
					tabela[i][j] = tabela[sai][j]*operador + tabela[i][j];
				}
				
				
			
			}
			
		
		
		}
		
		//verifica se tem proxima iteração
		var continua=false;
		for(var i=1; i<=qtdeVariaveis ; i++){
			if(tabela[qtdeLinhas-1][i] < 0){
				continua = true;
				break;
			}
				
		}
		if(continua){
			$scope.calculaMax();
		}
		else{
			//imprime resultado
			console.log(tabela);
			for(var i=0; i< qtdeLinhas; i++){
				console.log(tabela[i][0]+" : "+tabela[i][qtdeColunas-1]);
			}
		}
	
	}
}]);