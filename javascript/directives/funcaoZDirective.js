angular.module("ensinex").directive("funcaoZ", ["funcaoZAPI", function(funcaoZAPI){
	return {
		require: "ngModel",
		link: function(scope, element, attrs, ctrl) {

			var _formatZ = function(_funcExp) {
				// var _funcExp = exp.charAt(exp.length-1)

				var _estado0 = /^[0-9]$/;

				var _estado1 = /^,$/;
				//var _estado1_2 = /^[0-9]{1,}x$|^[0-9]{1,}X$/;

				//var _estado2 = /^[0-9]{1,},[0-9]{1,20}$/;
				//var _estado2_2 = /^[0-9]{1,},[0-9]{1,20}x$|^[0-9]{1,},[0-9]{1,20}X$/;

				var _estado3 = /^x$/;
				//var _estado3_2 = /^x[0-9]{1,}$|^X[0-9]{1,}$/;
				//var _estado3_3 = /^x[0-9]{1,}\+$|^X[0-9]{1,}\+$|x[0-9]{1,}-$|^X[0-9]{1,}-$/;

				//var _estado4 = /^[0-9]{1,}x[0-9]{1,}$|^[0-9]{1,}X[0-9]{1,}$/;
				//var _estado4_2 = /^[0-9]{1,},[0-9]{1,20}x[0-9]{1,}$|^[0-9]{1,},[0-9]{1,20}X[0-9]{1,}$/;

				var _estado5 = /^\+$|^-$/;
				//var _estado5_2 = /^[0-9]{1,},[0-9]{1,20}x[0-9]{1,}\+$|^[0-9]{1,},[0-9]{1,20}X[0-9]{1,}\+$|^[0-9]{1,},[0-9]{1,20}x[0-9]{1,}-$|^[0-9]{1,},[0-9]{1,20}X[0-9]{1,}-$/;

				//primeiro chamo a funcao para verificar qual estado eu estou
				switch(funcaoZAPI.getEstado(scope.$eval(attrs.funcIndex))) {

					case 0: {
						//console.log("case - "+0)
						//console.log(_funcExp);

						//verificar se não é numero
						if(!_estado0.test(_funcExp)){
							//porque não é numero verificar se não é x ou X
							if(_estado3.test(_funcExp)){
								//porque é  garantindo x entao vai para estado 4
								funcaoZAPI.setEstado(4, scope.$eval(attrs.funcIndex));
								funcaoZAPI.addArmazenaEstados(4, scope.$eval(attrs.funcIndex));

								funcaoZAPI.setExpressao(ctrl.$viewValue + _funcExp , scope.$eval(attrs.funcIndex));
								ctrl.$setViewValue(funcaoZAPI.getExpressao(scope.$eval(attrs.funcIndex)))
								ctrl.$render();
							}else{
								//nao é x entao verifica se é negativo -
								if(_funcExp == "-"){
									//porque é  garantindo - entao vai para estado 6
									funcaoZAPI.setEstado(6, scope.$eval(attrs.funcIndex));
									funcaoZAPI.addArmazenaEstados(6, scope.$eval(attrs.funcIndex));

									funcaoZAPI.setExpressao(ctrl.$viewValue + _funcExp , scope.$eval(attrs.funcIndex));
									ctrl.$setViewValue(funcaoZAPI.getExpressao(scope.$eval(attrs.funcIndex)))
									ctrl.$render();
								}
							}
						}else{
							//porque é numero entao vai para estado 1 para esperar uma ,
							funcaoZAPI.setEstado(1, scope.$eval(attrs.funcIndex));
							funcaoZAPI.addArmazenaEstados(1, scope.$eval(attrs.funcIndex));

							funcaoZAPI.setExpressao(ctrl.$viewValue + _funcExp , scope.$eval(attrs.funcIndex));
							ctrl.$setViewValue(funcaoZAPI.getExpressao(scope.$eval(attrs.funcIndex)))
							ctrl.$render();
						}
						break;
					}
					case 1: {
						//console.log("case - "+1)

						//verifica se não é numero
						if(!_estado0.test(_funcExp)){
							//não é entao verifica se não é uma ,
							if(!_estado1.test(_funcExp)){
								//não é entao verifica se não é um x ou X garatindo antes um numero
								if(_estado3.test(_funcExp)){
									//quer dizer que é garantindo x entao vai para estado 4
									funcaoZAPI.setEstado(4, scope.$eval(attrs.funcIndex));
									funcaoZAPI.addArmazenaEstados(4, scope.$eval(attrs.funcIndex));

									funcaoZAPI.setExpressao(ctrl.$viewValue + _funcExp , scope.$eval(attrs.funcIndex));
									ctrl.$setViewValue(funcaoZAPI.getExpressao(scope.$eval(attrs.funcIndex)))
									ctrl.$render();
								}
							}else{
								//quer dizer que é garantindo uma virgula entao vai para estado 2
								funcaoZAPI.setEstado(2, scope.$eval(attrs.funcIndex));
								funcaoZAPI.addArmazenaEstados(2, scope.$eval(attrs.funcIndex));

								funcaoZAPI.setExpressao(ctrl.$viewValue + _funcExp , scope.$eval(attrs.funcIndex));
								ctrl.$setViewValue(funcaoZAPI.getExpressao(scope.$eval(attrs.funcIndex)))
								ctrl.$render();
							}
						}else{
							//é porque é entao não faz nada continua no estado e nao exclui o caracter digitado
							funcaoZAPI.addArmazenaEstados(1, scope.$eval(attrs.funcIndex));

							funcaoZAPI.setExpressao(ctrl.$viewValue + _funcExp , scope.$eval(attrs.funcIndex));
							ctrl.$setViewValue(funcaoZAPI.getExpressao(scope.$eval(attrs.funcIndex)))
							ctrl.$render();
						}
						break;
					}
					case 2: {
						//console.log("case - "+2)

						//verifica se não é numero garatindo antes uma virgula
						if(_estado0.test(_funcExp)){
							//quer dizer que é garantindo numero depois da virgula entao vai para estado 3
							funcaoZAPI.setEstado(3, scope.$eval(attrs.funcIndex));
							funcaoZAPI.addArmazenaEstados(3, scope.$eval(attrs.funcIndex));

							funcaoZAPI.setExpressao(ctrl.$viewValue + _funcExp , scope.$eval(attrs.funcIndex));
							ctrl.$setViewValue(funcaoZAPI.getExpressao(scope.$eval(attrs.funcIndex)))
							ctrl.$render();
						}
						break;
					}
					case 3: {
						//console.log("case - "+3)

						//verifico se não é numero
						if(!_estado0.test(_funcExp)){
							//não é numero entao verifico se não é x ou X
							if(_estado3.test(_funcExp)){
								//quer dizer que é garantindo x entao vai para estado 4
								funcaoZAPI.setEstado(4, scope.$eval(attrs.funcIndex));
								funcaoZAPI.addArmazenaEstados(4, scope.$eval(attrs.funcIndex));

								funcaoZAPI.setExpressao(ctrl.$viewValue + _funcExp , scope.$eval(attrs.funcIndex));
								ctrl.$setViewValue(funcaoZAPI.getExpressao(scope.$eval(attrs.funcIndex)))
								ctrl.$render();
							}
						}else{
							//é porque é entao não faz nada continua no estado e nao exclui o caracter digitado
							funcaoZAPI.addArmazenaEstados(3, scope.$eval(attrs.funcIndex));

							funcaoZAPI.setExpressao(ctrl.$viewValue + _funcExp , scope.$eval(attrs.funcIndex));
							ctrl.$setViewValue(funcaoZAPI.getExpressao(scope.$eval(attrs.funcIndex)))
							ctrl.$render();
						}
						break;
					}
					case 4: {
						//console.log("case - "+4)

						//verifica se não é numero
						if(_estado0.test(_funcExp)){
							//quer dizer que é garantindo numero depois da virgula entao vai para estado 3
							funcaoZAPI.setEstado(5, scope.$eval(attrs.funcIndex));
							funcaoZAPI.addArmazenaEstados(5, scope.$eval(attrs.funcIndex));

							funcaoZAPI.setExpressao(ctrl.$viewValue + _funcExp , scope.$eval(attrs.funcIndex));
							ctrl.$setViewValue(funcaoZAPI.getExpressao(scope.$eval(attrs.funcIndex)))
							ctrl.$render();
						}
						break;
					}
					case 5: {
						//console.log("case - "+5)

						//garantindo um numero no minimo no estado 4 
						//verifica se não é numero
						if(!_estado0.test(_funcExp)){
							//quer dizer que nao é numero verifica se é sinal de + ou -
							if(_estado5.test(_funcExp)){
								//quer dizer que é + ou - entao vai para estado 6
								funcaoZAPI.setEstado(6, scope.$eval(attrs.funcIndex));
								funcaoZAPI.addArmazenaEstados(6, scope.$eval(attrs.funcIndex));

								funcaoZAPI.setExpressao(ctrl.$viewValue + _funcExp , scope.$eval(attrs.funcIndex));
								ctrl.$setViewValue(funcaoZAPI.getExpressao(scope.$eval(attrs.funcIndex)))
								ctrl.$render();
							}
						}else{
							//é porque é entao não faz nada continua no estado e nao exclui o caracter digitado
							funcaoZAPI.addArmazenaEstados(5, scope.$eval(attrs.funcIndex));

							funcaoZAPI.setExpressao(ctrl.$viewValue + _funcExp , scope.$eval(attrs.funcIndex));
							ctrl.$setViewValue(funcaoZAPI.getExpressao(scope.$eval(attrs.funcIndex)))
							ctrl.$render();
						}
						break;
					}
					case 6: {
						// aqui tem que garantir um x ou numero
						//verifico se nao é numero
						if( !_estado0.test(_funcExp) ) {
							//não é numero entao verifico se é x
							if( _estado3.test(_funcExp) ){
								//porque é  garantindo x entao vai para estado 4
								funcaoZAPI.setEstado(4, scope.$eval(attrs.funcIndex));
								funcaoZAPI.addArmazenaEstados(4, scope.$eval(attrs.funcIndex));

								funcaoZAPI.setExpressao(ctrl.$viewValue + _funcExp , scope.$eval(attrs.funcIndex));
								ctrl.$setViewValue(funcaoZAPI.getExpressao(scope.$eval(attrs.funcIndex)))
								ctrl.$render();
							}
						}else{
							//porque é numero entao vai para estado 1 para esperar uma ,
							funcaoZAPI.setEstado(1, scope.$eval(attrs.funcIndex));
							funcaoZAPI.addArmazenaEstados(1, scope.$eval(attrs.funcIndex));

							funcaoZAPI.setExpressao(ctrl.$viewValue + _funcExp , scope.$eval(attrs.funcIndex));
							ctrl.$setViewValue(funcaoZAPI.getExpressao(scope.$eval(attrs.funcIndex)))
							ctrl.$render();
						}
					}
				}


				// return exp;
				
			};
			//-----------------------------------------------------------------------------------------------
			/*

			teclas que podem ser digitadas 
			0 = 48
			...
			9 = 57
			------------------
			x = 88 tanto minusculo quanto maiusculo

			+ = 187
			, = 188
			- = 189
			
			apagar = 8
			delete = 46
			*/
			//variavel para informar se estou segurando alguma tecla pressionada 
			//0 quer dizer que esta dasativada travando a digitacao 
			//1 quer dizer que esta ativada podendo digitar 
			var keyPressionada = 1;

			//keydown executa sempre primeiro o resto nao importa
			element.on('keydown', function(event) {
				// console.log(event.keyCode)

				// if( keyPressionada == 1 && ( (event.key == "0" || event.key == "1" || event.key == "2" || event.key == "3" || event.key == "4" || event.key == "5" || event.key == "6" || event.key == "7" || event.key == "8" || event.key == "9" || event.key == "+" || event.key == "-" || event.key == "," || event.keyCode == 88 )) ) {
				// 	//-----------------------------------
				// 	//aqui dentro ele renderiza no input|
				// 	//-----------------------------------
				// 	console.log('keydown');
				// 	console.log(event.keyCode)
				// 	keyPressionada = 0;
				// 	//-------------------começa aqui-----------------------------------------------
					
				// 	//-------------------fim ------------------------------------------------------
				// }else{
					//---------------------------------------
					//aqui dentro ele nao renderiza no input|
					//---------------------------------------
					event.preventDefault();
					
					//verifico se nao é o botao de apagar ate o delete
					if(keyPressionada == 1 && (event.keyCode == 8 || event.keyCode == 46) ) {
						//quando aperto backspace ou delete apaga sempre o ultimo caracter nao importa a posicao do cursor
						ctrl.$setViewValue(funcaoZAPI.getExpressao(scope.$eval(attrs.funcIndex)).substring(0,funcaoZAPI.getExpressao(scope.$eval(attrs.funcIndex)).length-1));
						funcaoZAPI.setExpressao(ctrl.$viewValue, scope.$eval(attrs.funcIndex));
						ctrl.$render();
						if(funcaoZAPI.getArmazenaEstados(scope.$eval(attrs.funcIndex)).length > 1) {
							funcaoZAPI.removeArmazenaEstados(scope.$eval(attrs.funcIndex));
						}
						funcaoZAPI.setEstado(funcaoZAPI.getArmazenaEstados(scope.$eval(attrs.funcIndex))[funcaoZAPI.getArmazenaEstados(scope.$eval(attrs.funcIndex)).length-1], scope.$eval(attrs.funcIndex))

						keyPressionada = 0;
					}//fim do if do keycode 8

					//verifica os digitos validos numeros e x + ou - ou ,
					if( keyPressionada == 1 && ( (event.key == "0" || event.key == "1" || event.key == "2" || event.key == "3" || event.key == "4" || event.key == "5" || event.key == "6" || event.key == "7" || event.key == "8" || event.key == "9" || event.key == "+" || event.key == "-" || event.key == "," || event.keyCode == 88 )) ) {
						// console.log('keydown');
						// console.log(event.keyCode)
						keyPressionada = 0;
						//-------------------começa aqui-----------------------------------------------
						// funcaoZAPI.setExpressao(ctrl.$viewValue + event.key , scope.$eval(attrs.funcIndex));
						// ctrl.$setViewValue(funcaoZAPI.getExpressao(scope.$eval(attrs.funcIndex)))
						// ctrl.$render();

						//chamo a funcao passando so o caracter digitado
						_formatZ(event.key);
						//-------------------fim ------------------------------------------------------
					}// fim do if



				// }//fim do else

			});

			element.on('keyup', function(event) {
				
				//verificando qual foi a tecla que eu soltei para poder liberar podendo digitar novamente se for diferente dessas não libera
				if( (event.key == "0" || event.key == "1" || event.key == "2" || event.key == "3" || event.key == "4" || event.key == "5" || event.key == "6" || event.key == "7" || event.key == "8" || event.key == "9" || event.key == "+" || event.key == "-" || event.key == "," || event.keyCode == 88 || event.keyCode == 8 || event.keyCode == 46 ) ) {
					//ativa ela garantindo poder digitar alguma coisa denovo
					//dessa forma quando seguro a tecla o keyup so é ativado quando eu solto a tecla
					keyPressionada = 1;

					
				}
				
				//aqui bloqueio qualquer tipo de evento ja que vou executalos no keydown
				event.preventDefault();
			});

			element.on('keypress', function(event) {

				//verifico se posso digitar garantindo que nao irei digitar as teclas que podem ser digitada tipo os numeros x e outros
				// quando apertada duas vezes ele escreve 2 vezes mais como
				//na primeira ele nao deixa a segunda nao bloqueia porque minha keyPressionada esta em 0
				if(keyPressionada == 1) {
					//aqui bloqueio todo evento principalmente aqueles que usam teclas especiais como ^ ~ ´ ` 
					event.preventDefault();
				}
			});


			// element.bind("keyup", function(e) {
			// 	//bloquenado o shift que é codigo 16 e as setas que sao os codigos 37 ate o 40
			// 	if(e.keyCode != 16 && e.keyCode != 37 && e.keyCode != 38 && e.keyCode != 39 && e.keyCode != 40){
			// 		//console.log(e)
			// 		if(e.keyCode == 46){
			// 			//estou armazenando a expressao na minha API quando aperto delete nao acontece nada
			// 			ctrl.$setViewValue(funcaoZAPI.getExpressao(scope.$eval(attrs.funcIndex)));
			// 			ctrl.$render();
			// 		}else{
			// 			if(e.keyCode == 8){
			// 				//quando aperto backspace apaga sempre o ultimo caracter nao importa a posicao do cursor
			// 				ctrl.$setViewValue(funcaoZAPI.getExpressao(scope.$eval(attrs.funcIndex)).substring(0,funcaoZAPI.getExpressao(scope.$eval(attrs.funcIndex)).length-1));
			// 				funcaoZAPI.setExpressao(ctrl.$viewValue, scope.$eval(attrs.funcIndex));
			// 				ctrl.$render();
			// 				if(funcaoZAPI.getArmazenaEstados(scope.$eval(attrs.funcIndex)).length > 1) {
			// 					funcaoZAPI.removeArmazenaEstados(scope.$eval(attrs.funcIndex));
			// 				}
			// 				funcaoZAPI.setEstado(funcaoZAPI.getArmazenaEstados(scope.$eval(attrs.funcIndex))[funcaoZAPI.getArmazenaEstados(scope.$eval(attrs.funcIndex)).length-1], scope.$eval(attrs.funcIndex))
			// 			}else{
			// 				if(e.keyCode == 32) {
			// 					ctrl.$setViewValue(funcaoZAPI.getExpressao(scope.$eval(attrs.funcIndex)));
			// 					ctrl.$render();
			// 				}else{
			// 					ctrl.$setViewValue(_formatZ(ctrl.$viewValue));
			// 					funcaoZAPI.setExpressao(ctrl.$viewValue, scope.$eval(attrs.funcIndex));
			// 					ctrl.$render();
			// 					////console.log(funcaoZAPI.getEstado(scope.$eval(attrs.funcIndex)));

			// 					//console.log(funcaoZAPI.getArmazenaEstados(scope.$eval(attrs.funcIndex))[funcaoZAPI.getArmazenaEstados(scope.$eval(attrs.funcIndex)).length-1]);
			// 					//console.log(funcaoZAPI.getArmazenaEstados(scope.$eval(attrs.funcIndex)));

			// 					//console.log(scope.$eval(attrs.funcIndex))

			// 					//console.log(funcaoZAPI.getTodoEstado())
			// 				}
			// 			}
			// 		}
					
			// 	}
			// }); 
			//-------------------------------------------------------------------------
		}
	};
}]);