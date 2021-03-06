angular.module("ensinex").config(function($stateProvider, $urlRouterProvider) {
	
	$urlRouterProvider.otherwise("Ensinex");

	$stateProvider
	.state("#", {
		controller: "ensinexMainCtrl",
		url: "/Ensinex",
		templateUrl: "views/inicio.html"
	})
	.state("passoapasso", {
		controller: "passoApassoCtrl",
		url: "/PassoApasso",
		templateUrl: "views/passoApasso.html",
		redirectTo: (trans) => {
			return trans.injector().get("acessoLiberadoAPI").getLiberado() == false ? ({state: "#"}) : ({});
		},
		params: {
            operacao: null,
            funcaoZ: null,
            restricoes: null,
            qtdIteracao: null
        }
	})
	.state("calculamax", {
		controller: "calculamaxCtrl",
		url: "/calculamax",
		templateUrl: "views/calculaMax.html",
		redirectTo: (trans) => {
			return trans.injector().get("acessoLiberadoAPI").getLiberado() == false ? ({state: "#"}) : ({});
		},
		params: {
            resultadoMax: null,
            xisEfs: null
        }
		
	})
	.state("solucaoDireta", {
		controller: "solucaoDiretaCtrl",
		url: "/solucaoDireta",
		templateUrl: "views/solucaoDireta.html",
		redirectTo: (trans) => {
			return trans.injector().get("acessoLiberadoAPI").getLiberado() == false ? ({state: "#"}) : ({});
		},
		params: {
			resultado: null
		}
	});
});