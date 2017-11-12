angular.module("ensinex").factory("vetorList", function() {

	/*
		cria uma estrutura de dados que contem um array que vai armazenar todos os esados da funcao
		e uma variavel numerica que armazena o estadu atual que eu estou 

		com umas funcoes proprias de controle como retornar o proximo estado 
			retornar o estado anterior
	*/

	//cria-se um nova estrutura 
	var _criarVetorList = function() {
		return {
			//armazena a matriz dos estados
			todosEstados: [],
			
			//armazena o index do estado atual no array
			estadoAtual: 0,

			//funcao que retorna o proximo estado se não for o ultimo
			proximoEstado: function() {
				//verifica se o array esta vazio
				if(this.todosEstados.length == 0){
					console.log("erro não tem estado possivel erro no controle!");
				}else{
					//verifica se nao é o ultimo
					if(this.estadoAtual == this.todosEstados.length -1){
						alert("Já está no ultimo Passo!!");
						console.log("Já está no ultimo Passo!!");
						//retorna a matriz do proximo estado
						return this.todosEstados[this.estadoAtual];
					}else{
						//passa para o proximo estado
						this.estadoAtual++;

						//retorna a matriz do proximo estado
						return this.todosEstados[this.estadoAtual];
					}//fim do else	
				}//fim do else
				
			},//fim da funcao proximoEstado

			//retorna o estado anterior se o mesmo nao for o primeiro
			estadoAnterior: function() {
				//verifica se ele é o primeiro
				if(this.estadoAtual == 0){
					alert("Já está no primeiro Passo!!");
					console.log("Já está no primeiro Passo!!");
					//retorna a matriz do proximo estado
					return this.todosEstados[this.estadoAtual];
				}else{
					//retorna o estado 
					this.estadoAtual--;

					//retorna a matriz do estado anterior
					return this.todosEstados[this.estadoAtual];
				}//fim do else
			},//fim da funcao estadoAnterior

			//funcao que adidiona um novo valor ao todosEstados
			addEstado: function(est, msg, ent, sai, entBase, transMatr, pv, op, dexNulo, opD, opDC, rOPD, cPL, cPC, cStop, itera) {
				this.todosEstados.push({estado: est, mensagem: msg, entra: ent, sai: sai, entraBase: entBase, transMatriz: transMatr, pivo: pv, opUm: op, deixarNulo: dexNulo, opDois: opD, opDoisColuna: opDC, resulOpDois: rOPD, condicaoParadaL: cPL, condicaoParadaC: cPC, condicaoStop: cStop, iteracao: itera});
			}//fim da funcao addEstado
		}
	};

	return {
		criarVetorList: _criarVetorList
	}
});