angular.module("ensinex").controller("ensinexMainCtrl", ["$scope", "funcaoZAPI", "acessoLiberadoAPI", "$state", "gravarFuncaoAPI", "$window", function($scope, funcaoZAPI, acessoLiberadoAPI, $state, gravarFuncaoAPI, $window) {
	console.log("ensinexMainCtrl");

  /*
    entrada de ados se resume em funcao Z onde sera aquela dada pelo usuario para maximizar ou minimizar depois vem as restricoes
    onde o usuario pode escolher quantas restricoes ira ter o simplex para sua solucao exemplo:

    10X1 + 12X2  ---> esse é o Z

    restricoes

    X1 + 4X2 < 10000   --> 1º restricao
    5X1 + 2X2 < 30000  --> 2º restricao

    sempre vai ter essa resticao de 
    X1,X2 >= 0   

    todas as entradas sera como escrita informal onde usuario escreve livremente as variaveis e restricoes 

    usando string para armazena-las, a validacao fica por conta de expressoes regulares muito simples onde pode ter:

        º numero sem espaco seguido de letra "X" seguido sem espaco numero seguido pode ter ou nao operador " + ou - " repete 

    passando por essa verificacao iremos retirar os numero antes dos X

    e passar para uma matriz que sera a Tabela do simplex
  */

  //==================================variaveis==========================================================

  $scope.funcaoZ = "";
  
  //operacao objetivo da funcao se maximizar ou minimizar usa value para saber qual dos index do array escolher
  $scope.objOperacao  = [
    {name:"Maximizar", value:0},
    {name:"Minimizar", value:1}
  ];
  //atribuindo a escolha variavel responsavel pela escolha do operacao objectivo da funcao
  $scope.escolhaObjOperacao = $scope.objOperacao[0];

  //variavel tabela onde contera os objetos que contem o valor e o xis
  //tamanho desse array quer dizer quantas variaveis de decisao tem a funcao
  $scope.tabela = [];

  //variavel para adicionar restricoes é vetor de string
  $scope.restricoes = [];

  //variavel para armazenar as restricoes em forma de objeto com valor e xis e o b
  $scope.tabelaRestricoes = [];

  //--------------------- estaticas -----------------------------------------------------------

  //variavel de controle para erros
  var erro = 0;

  //============================= fim das variaveis ====================================================

  //==================== funcoes estaticas ======================================================
  //funcao que recebe uma expresao do tipo 5x1 onde tem numero seguido de x seguido do index do x que é outro numero
  //retorna o valor numerico e o x como string
  function expValor(op, exp) {

    //variavel para armazer valor antes do x e o x e seu index
    var objValor = {
      valor: 1.0,
      xis: ""
    }

    //pode ter tres casos 
    //1º tiver apenas x sem valor 
    //2º tiver valor seguido de x
    //3º tiver valor seguido de virgula seguido de valor seguido de x

    var _auxDoX = exp.search(/x/i);
    var _auxValor = exp.substring(0, _auxDoX);

    //verifico se é apenas negativo ou se é x sozinho positivo se nao for nada disso convert normal
    if(_auxValor == "-"){
      //quando o x é -x1
      objValor.valor = -1;
    }else{
      if(_auxDoX == 0){
        //quando o x é x
        objValor.valor = 1;
      }else{
        //converto valor string 1,2 em 1.2 para converter para float para fazer os calculos
        objValor.valor = parseFloat(_auxValor.replace(",", "."));
      }
    }
    //adiciono os xis no objeto
    objValor.xis = exp.substring(_auxDoX);

    //se for true porque é restricoes
    //se for false é porque é a funcao z entao nao faz isso
    if(op) {

      //vou percorrer todo funcao verificando se tem valor igual o meus xis
      for(var i=0; i< $scope.tabela.length; i++){
        if(objValor.xis == $scope.tabela[i].xis){
          return objValor;
        }
      }
      //isso é para indicar que nao encontrei nem um valor igual meu xis então quer dizer que tem um erro
      return -1;
    }//fim do if

    return objValor;
  };// fim expValor

  //funcao que verifica se todas as expressoes estao corretas retorna -1 se estiver tudo certo ou numero da funcao que esta errada
  //retorna -2 se nao tiver nem uma restricao 
  function expCorrect(iteracao) {
    var _auxFunc = funcaoZAPI.getTodoEstado(); // array de todas as expresoes em ordem numerica 
    //posicao 0 é da funcao z entao é a unica que estado final é 5 apenas 5
    if(_auxFunc[0] == 5){
      if(_auxFunc.length > 1){
        for(var i=1; i < _auxFunc.length; i++){
          if(_auxFunc[i] != 7 && _auxFunc[i] != 9){
            return i;
          }
        }
        if( iteracao <= 0 || iteracao == undefined ) {
          //aqui verifica se tem digito na iteracao
          return -3
        }else{
          //aqui retorna tudo certo
          return -1;
        }
      }else{
        return -2;
      }
    }else{
      return 0;
    }
  };//fim expCorrect

  function LadoDireitoNegativo(restri) {
    for(var h = 0; h < restri.length; h++) {
      //verifico se o valor de B é negativo
      if( Math.sign(restri[h][restri[h].length-1].valorB) == -1 ) {
        for(var i = 0; i < restri[h].length-1; i++) {
          restri[h][i].valor *= -1;
        }
        restri[h][restri[h].length-1].valorB *= -1;
      }
    };

  }//fim LadoDireitoNegativo

  function funcaoMinimizar(fun) {
    for(var i = 0; i < fun.length; i++){
      fun[i].valor *= -1;
    }
  }//fim da funcaoMinimizar

  //=============================== fim das funcoes estaticas =============================================

  //======== funcoes do scope =======================================================================

  //gerarTabela passa para proxima etapa reunindo as informacoes da string e convertendo para tebela 
  $scope.gerarTabela = function(obj, fun, restri, qdtMaxIter) {
    //retorna variavel estado padrão sem erros
    erro = 0;
    
    //aqui estou zerando as variaveis
    $scope.tabela = [];
    $scope.tabelaRestricoes = [];

    //aqui verifico se esta tudo certo
    //se nao causa msg de erro no else
    var _correct = expCorrect(qdtMaxIter);
    //verifica se todas as expressoes estao corretas tudo estiver correto tem que ser -1
    if(_correct == -1){

      //reparte a string da funcao em um array dos elemento exemplo 12x2 isso é um elemento
      var _auxF = fun.match(/-?[0-9]+x[0-9]+|-?x[0-9]+|-?[0-9]+,[0-9]+x[0-9]+/gi);
      console.log(_auxF)
      //esse for é para o array dos elemento de cima
      for(var i=0; i < _auxF.length; i++){
        //adiciona na variavel um objeto contendo valor e o xis de cada elemento
        $scope.tabela.push( expValor(false, _auxF[i]) );
      }
      console.log($scope.tabela);

      if(obj == 1){
        funcaoMinimizar($scope.tabela)
      }

//=================== ate aqui é parte da funcao Z daki para baixo é das restricoes====================================
      
      //aqui sao variaveis auxiliares uma para restricao outra para gravar o B das restricoes
      var _auxR;
      var _auxB;

      //variavel de retorno da funcao expValor caso retorne -1 tratar como erro
      var retornoExpValor;

      //nesse for percorro as casas do meu array de restricoes em outras palavras
      //vou em cada restricao existente 1,2,3... restricoes e optenho sua expressao
      outerloop: for(var i=0; i < restri.length; i++){
        //inizializa variavel vazia
        _auxB = {
          operador: "",
          valorB : 1.0
        };

        //insiro uma nova array de objtos de restricao que guardara valor e xis ultima casa é operador e valorB
        $scope.tabelaRestricoes.push([]);

        //reparto todo string em um array dos elemento exemplo 12x2 isso é um elemento ultimo elemento é sempre 
        //>12 ou <34 ou =65  ou tudos numeros com virgulas
        _auxR = restri[i].match(/-?[0-9]+x[0-9]+|-?x[0-9]+|-?[0-9]+,[0-9]+x[0-9]+|\>=?-?[0-9]+,[0-9]+|\<=?-?[0-9]+,[0-9]+|=-?[0-9]+,[0-9]+|\>=?-?[0-9]+|\<=?-?[0-9]+|=-?[0-9]+/gi)
        console.log(_auxR)
        //esse for é para cada restricao
        for(var j=0; j < _auxR.length -1; j++){

          retornoExpValor = expValor(true, _auxR[j]);

          if(retornoExpValor == -1) {
            $window.document.getElementById('focusR'+i).focus();

            alert("Existe nome de Variavel X nas restrições "+(i+1)+" que são diferentes da Função !!!");
            console.log("Existe nome de Variavel X nas restrições "+(i+1)+" que são diferentes da Função !!!");
            erro = 1;

            break outerloop; // sai do primeiro for la em cima isso chama javascript label   muito legalll !! :D
          }else{
            //adiciono restricao como objeto com valor e xis
            $scope.tabelaRestricoes[i].push( retornoExpValor );
          }
        }

        if(erro != 1) {
          //ultimo valor é sempre os operadores > < = seguidos de numeros
          _auxB.operador = _auxR[_auxR.length-1][0];

          //aqui trasformo o valor que vem de string em float para calculos
          _auxB.valorB = _auxR[_auxR.length-1][1] == "=" ? parseFloat(_auxR[_auxR.length-1].substring(2).replace(",", ".")) : parseFloat(_auxR[_auxR.length-1].substring(1).replace(",", "."));

          //adiciono na ultima posicao das restricoes
          $scope.tabelaRestricoes[i].push(_auxB);
        }
      }
      console.log($scope.tabelaRestricoes)


      if(erro != 1) {
        //multiplica por -1 se o valor de b for negativo 
        LadoDireitoNegativo($scope.tabelaRestricoes);

        //se estiver tudo certo e acessar essas parte unica forma de não passar para proxima pagina é causando erro então
        //uma vez estando tudo certo então zera todo os estado para se voltar essa pagina sistema calcular novamente os valores
        funcaoZAPI.removeTodoEstado();

        //libera acesso para poder ir para proxima pagiga
        acessoLiberadoAPI.setLiberado();

        //grava toda a funcao suas restricoes e variaveisauxiliares
        gravarFuncaoAPI.setDados($scope.escolhaObjOperacao.value, $scope.tabela, $scope.tabelaRestricoes, qdtMaxIter);
        console.log(gravarFuncaoAPI.getDados());
        //isso faz acionar carregamento da proxima pagina que é passoapasso
        $state.go("passoapasso",{operacao: $scope.escolhaObjOperacao.value, funcaoZ: $scope.tabela, restricoes: $scope.tabelaRestricoes, qtdIteracao: qdtMaxIter});
      }
//=========================================================================
    }else{
      //caso nao esteja coreto as expresoes 
      if(_correct == 0){
        $window.document.getElementById('focusZ').focus();
        alert("A funcao Z esta Errada !!")
        console.log("A funcao Z esta Errada !!");
        acessoLiberadoAPI.blockLiberado();
      }else{
        if(_correct == -2){
          alert("Não Existe Restrições !!")
          console.log("Não Existe Restrições !!");
          acessoLiberadoAPI.blockLiberado();
        }else{
          if(_correct == -3 ){
            $window.document.getElementById('focusI').focus();
            alert("Quantidade Maxima de iteração esta errada!");
            console.log("Quantidade Maxima de iteração esta errada!");
            acessoLiberadoAPI.blockLiberado();
          }else {
            $window.document.getElementById('focusR'+(_correct-1)).focus();
            alert("A Restrição "+_correct+" Esta Errada !!")
            console.log("A Restrição "+_correct+" Esta Errada !!");
            acessoLiberadoAPI.blockLiberado();
          }
        }
      }
    }
  };// fim gerarTabela

  
  //adiciona e remove as regras
  $scope.adicionarRegra = function(ret) {
    //adiciona uma regra vazia
    ret.push("");
    funcaoZAPI.addVariaveis();
  };//fim adicionarRegra
  $scope.removerRegra = function(ret) {
    //remove a regra
    ret.pop();
    funcaoZAPI.removeVariaveis();
  };//fim removerRegra

  //======================fim das funcoes do escope ============================================

  //========= coisa do joao ================================================

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
  //==============================================================================================
}]);