angular.module("ensinex").controller("ensinexMainCtrl", ["$scope", "funcaoZAPI", function($scope, funcaoZAPI) {
	console.log("ensinexMainCtrl");

  /*
    entrada de ados se resume em funcao Z onde sera aquela dada pelo usuario para maximizar ou minimizar depois vem as restricoes
    onde o usuario pode escolher quantas restricoes ira ter o simplex para sua solucao exemplo:

    10X1 + 12X2  ---> esse é o Z

    restricoes

    X1 + 4X2 <= 10000   --> 1º restricao
    5X1 + 2X2 <= 30000  --> 2º restricao

    sempre vai ter essa resticao de 
    X1,X2 >= 0   

    todas as entradas sera como escrita informal onde usuario escreve livremente as variaveis e restricoes 

    usando string para armazenalas, a validacao fica por conta de expressoes regulares muito simples onde pode ter:

        º numero sem espaco seguido de letra "X" seguido sem espaco numero seguido pode ter ou nao operador " + ou - " repete 

    passando por essa verificacao iremos retirar os numero antes dos X

    e passar para uma matriz que sera a Tabela do simplex
  */

  //operacao objetivo da funcao se maximizar ou minimizar usa value para saber qual dos index do array escolher
  $scope.objOperacao  = [
    {name:"Maximizar", value:0},
    {name:"Minimizar", value:1}
  ];
  //atribuindo a escolha variavel responsavel pela escolha do operacao objectivo da funcao
  $scope.escolhaObjOperacao = $scope.objOperacao[0];

  //funcao que recebe uma expresao do tipo 5x1 onde tem numero seguido de x seguido do index do x que é outro numero
  //retorna o valor numerico e o x como string
  function expValor(exp) {
    var objValor = {
      valor: 1.0,
      xis: ""
    }

    //pode ter dois casos 
    //1º tiver apenas x sem valor 
    //2º tiver valor seguido de x
    //3º tiver valor seguido de virgula seguido de valor seguido de x

    var _auxDoX = exp.search(/x/i);
    var _auxValor = exp.substring(0, _auxDoX);

    //verifico se é apenas negativo ou se é x sozinho positivo se nao for nada disso convert normal
    if(_auxValor == "-"){
      objValor.valor = -1;
    }else{
      if(_auxDoX == 0){
        objValor.valor = 1;
      }else{
        objValor.valor = parseFloat(_auxValor.replace(",", "."));
      }
    }
    objValor.xis = exp.substring(_auxDoX);

    return objValor;
  }
  //gerarTabela passa para proxima etapa reunindo as informacoes da string e convertendo para tebela 
  $scope.gerarTabela = function(obj, fun, restri) {
    //console.log(obj+" = "+fun)
    //variavel tabela onde contera os objetos que contem o valor e o xis
    $scope.tabela = [];

    console.log(fun.match(/-?[0-9]+x[0-9]+|-?x[0-9]+|-?[0-9]+,[0-9]+x[0-9]+/gi));
    console.log(restri)

    var _auxF = fun.match(/-?[0-9]+x[0-9]+|-?x[0-9]+|-?[0-9]+,[0-9]+x[0-9]+/gi);
    for(var i=0; i < _auxF.length; i++){
      $scope.tabela.push( expValor(_auxF[i]) );
    }
    console.log($scope.tabela);
  };

  //variavel para adicionar restricoes é vetor de string
  $scope.restricoes = [];
  $scope.adicionarRegra = function(ret) {
    ret.push("");
    funcaoZAPI.addVariaveis();
  };
  $scope.removerRegra = function(ret) {
    ret.pop();
    funcaoZAPI.removeVariaveis();
  };

  //teste API
  $scope.testeapi = function() {
    /*
      unica posicao que acaba com numero 5 é posicao 0
      do 1 adiante acaba com os numeros 7 ou 9

      tudo que for difirente disso nao pode ir para frente porque as expressoes estao erradas 
      causando erros no algoritmo
    */
    console.log(funcaoZAPI.getTodoEstado());
  }

  //============================================================================

	numX = 3;
	numF = 3;
  // criando variavel de perguntas
  $scope.x = ["X1", "X2"];
  // criando variavel de questão
  $scope.f = ["F1","F2"];
  // adicionando x 
  $scope.addX = function() {
    $scope.x.push("X" + numX);
	numX++;
 
  };
  // adicionando f
  $scope.addF = function() {
    $scope.f.push("F" + numF);
	  numF++;
  
  };
  // excluindo x
  $scope.delX = function() {
    $scope.x.splice($scope.x.length-1, 1);
	numX--;
  
  };
  // excluindo f
  $scope.delF = function(index) {
    $scope.f.splice($scope.f.length-1, 1);
	numF--;
    
  };
}]);