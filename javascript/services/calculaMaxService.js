angular.module("ensinex").factory("calculaMaxAPI", ["vetorList", function(vetorList) {
	/*
		api responsavel por calcular Max retorna vetorList
	*/

	// //criando uma novo vetor
	// var listaDeEstados = vetorList.criarVetorList();

	// //variavel de armazenamento para soluções finais
	// var solucaoFinalBasica = [];
	// //nao basica
	// var solucaoFinalNaoBasica = [];

	// //variavel que ira calcular quantas iteracoes foram feitas
	// var iteracao = 1;

	//função que calcula o MAX
	var _calculaMax = function(tabela, qtdeVariaveis, qtdeRestricoes, qtdMaxIteracao, nXisEfs) {
		//criando uma novo vetor
		var listaDeEstados = vetorList.criarVetorList();

		//variavel de armazenamento para soluções finais
		var solucaoFinalBasica = [];
		//nao basica
		var solucaoFinalNaoBasica = [];

		//variavel que ira calcular quantas iteracoes foram feitas
		var iteracao = 1;
		
		var qtdeLinhas = qtdeRestricoes+1;
		var qtdeColunas = qtdeRestricoes+qtdeVariaveis+2;

		function calculaMax() {
			
			var entra; //posição de quem entra
			var menor = 0;
			

			//aqui ele verifica quem é o menor na funcao Z 
			//e adiciona o xis da coluna na variavel entra 
			//e o valor da funcao Z na variavel menor
			for(var i=1; i <= qtdeVariaveis ; i++){
				if (tabela[qtdeRestricoes][i] < menor){
					entra = i;
					menor = tabela[qtdeRestricoes][i];
				}
					
			}

			//adicionar o estado para mostrar quem entra
			listaDeEstados.addEstado(angular.copy(tabela), "Quem entra na Base, Maior Coeficiente na última Linha, Variavel "+nXisEfs[entra], entra, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, iteracao);


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
			
			//adicionando o estado para mostrar quem sai
			listaDeEstados.addEstado(angular.copy(tabela), "Quem Sai da Base, pega o menor resultado da divisão do valor da coluna b pelo valor da coluna da variavel que entra. Menos quando valor da coluna variavel que entra for igual a 0", -1, sai, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, iteracao);

			//substituindo quem entra/sai
			tabela[sai][0] = nXisEfs[entra] //"x"+entra;
			
			
			//adicionando estado da variavel que entra na base mesma posicao que variavel que sai poriso passo ela por parametro
			listaDeEstados.addEstado(angular.copy(tabela), "Variavel entra na Base", -1, -1, sai, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, iteracao);

			//adicionando estado transformação de metriz, passoando variavel de quem entra que é a coluna para ser pintada para representacao 
			listaDeEstados.addEstado(angular.copy(tabela), "Transformação de Matriz, Operações para tornar a coluna "+nXisEfs[entra]+" em um vetor identidade com o elemento "+tabela[sai][entra]+" na "+(sai+1)+"º coluna.", -1, -1, -1, entra, -1, -1, -1, -1, -1, -1, -1, -1, -1, iteracao);
			
			// 1ª iteração - 1ª operação ----------------------------------------------------------------------------------
			
			pivo = tabela[sai][entra];

			//adicionando estado pivo, passo por paramentro a transformacao para pintar a coluna e nova variavel que é o pivo que é igual a linha 
			listaDeEstados.addEstado(angular.copy(tabela), "Pivô: "+pivo, -1, -1, -1, entra, sai, -1, -1, -1, -1, -1, -1, -1, -1, iteracao);
			
			for (var i =1 ; i< qtdeColunas; i++){
				if(tabela[sai][i] != 0){
					tabela[sai][i] = tabela[sai][i] / pivo;
				}
				
			}

			//adicionando estado da divisão da linha pelo pivo passo variavel sai que representa a linha para pintar toda a linha de vermelho
			listaDeEstados.addEstado(angular.copy(tabela), "1ª Operação, Cada elemento da "+(sai+1)+"ª linha / Pivô = "+pivo, -1, -1, -1, -1, -1, sai, -1, -1, -1, -1, -1, -1, -1, iteracao);
			
			//adicionando estado demosttrativo deixar nulo a coluna passando variavel entra que é a coluna
			listaDeEstados.addEstado(angular.copy(tabela), "Deixar nulo os outros elementos da coluna, menos a coluna que ja tem zero", -1, -1, -1, -1, -1, -1, entra, -1, -1, -1, -1, -1, -1, iteracao);
			
			// 1ª iteração - 2ª operação
			
			for ( var i=0; i< qtdeLinhas; i++){
			
				if(i!= sai){
					
					operador = tabela[i][entra] * -1;
					
					if(tabela[i][entra] != 0){
						//adicionando estado 2º operacao passando por parametro o valor de i que é a linha que ira se dividir pela linha do pivo e o entra que é a coluna
						listaDeEstados.addEstado(angular.copy(tabela), "2ª Operação: "+(sai+1)+"º Linha * ("+operador+") + "+(i+1)+"º Linha", -1, -1, -1, -1, -1, -1, -1, i, entra, -1, -1, -1, -1, iteracao);

						for(var j=1; j<qtdeColunas; j++){
							tabela[i][j] = tabela[sai][j]*operador + tabela[i][j];
						}

						//adicionando estado de resultado da 2º operacao 
						listaDeEstados.addEstado(angular.copy(tabela), "RESULTADO da 2ª Operação: "+(sai+1)+"º Linha * ("+operador+") + "+(i+1)+"º Linha", -1, -1, -1, -1, -1, -1, -1, -1, -1, i, -1, -1, -1, iteracao);
					}
				}
			}

			listaDeEstados.addEstado(angular.copy(tabela), "Nova Solução !! as variaveis que não estao na base é igual a zero.", -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, iteracao);
			
			//verifica se tem proxima iteração
			var continua=false;
			for(var i=1; i<=qtdeVariaveis ; i++){
				if(tabela[qtdeLinhas-1][i] < 0){
					continua = true;
					//adicionando estado de que ainda tem valores negativos entao continua com proxima iteracao
					//passando por parametro a ultima linha e a coluna que o valor foi encontrado
					listaDeEstados.addEstado(angular.copy(tabela), "Condição de Parada, se existir valor negativo na função Z então continua !!!", -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, qtdeLinhas-1, i, -1, iteracao);
					break;
				}
					
			};

			//listaDeEstados.addEstado(angular.copy(tabela), "nada 3", -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, iteracao);
			
			if(continua && qtdMaxIteracao > 1){
				
				qtdMaxIteracao--;
				iteracao++;
				calculaMax();
			}
			else{

				//adicionando estado que ja nao tem mais variavel negativa na funao z entao para o algoritmo
				listaDeEstados.addEstado(angular.copy(tabela), "Condição de Parada, Não existe valor negativo na função Z entao esse é o ultimo passo !!", -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, qtdeLinhas-1, iteracao);
				
				//esse estado é a solucao final
				listaDeEstados.addEstado(angular.copy(tabela), "Solução Final !! as variaveis que não estao na base é igual a zero.", -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, iteracao);

				//imprime resultado
				console.log(tabela);
				//updateMatrizTabela(tabela);
				console.log(listaDeEstados);

				console.log("variaveis Basicas")
				for(var i=0; i< qtdeLinhas; i++){
					console.log(tabela[i][0]+" : "+tabela[i][qtdeColunas-1]);
					solucaoFinalBasica.push(tabela[i][0]+" : "+tabela[i][qtdeColunas-1])
				}

				console.log("variaveis Não Basicas")
				for(var i=1, j=0; i< nXisEfs.length-1; i++){
					var achou = 0;
					for( ;j < qtdeLinhas; j++) {
						if(nXisEfs[i] == tabela[j][0]){
							achou = 1;
							//console.log(nXisEfs[i]+" : 0")
						}
					}
					if(achou == 0){
						console.log(nXisEfs[i]+" : 0")
						solucaoFinalNaoBasica.push(nXisEfs[i]+" : 0")
					}
				}

				qtdMaxIteracao = 0;
			}
		}
		calculaMax();

		return {
			listaDeTodosEstados: listaDeEstados,
			solucaoBasica: solucaoFinalBasica,
			solucaoNaoBasica: solucaoFinalNaoBasica
		};
	}; // fim da funcao que calcula max

	return {
		calcular: _calculaMax
	}
}]);