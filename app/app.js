(function () {
	"use strict";
	var app = angular.module("productManagement",
							["common.services",
							 "ui.router",
							 "ui.mask",
							 "ui.bootstrap",
							 "productResourceMock"]);
	//error handling
	app.config(function($provide){
		$provide.decorator("$exceptionHandler",
			["$delegate",
				function ($delegate) {
					return function (exception, cause) {
						exception.message = "Please contact the help deak! \n Message: " + exception.message;

						$delegate(exception, cause);
						alert(exception.message);
					};
				}]);
	});

	app.config(["$stateProvider", "$urlRouterProvider",
				
				function ($stateProvider, $urlRouterProvider) {
					
					//default route provider
					$urlRouterProvider.otherwise("/");

					$stateProvider

						//Home
						.state("home", {
							url: "/",
							templateUrl: "app/welcomeView.html",
							controller: "ChordViewCtrl as vm"
						})
						
						.state("chordView", {
							url: "/chords",
							templateUrl: "app/chords/chordView.html",
							controller: "ChordViewCtrl as vm",
						})

						.state("progView", {
							url: "/progressions",
							templateUrl: "app/progressions/progView.html",
							controller: "ProgressionCtrl as vm",
						})
						
						.state("improv1View", {
							url: "/improv1",
							templateUrl: "app/improv/improv1View.html",
							controller: "Improv1Ctrl as vm",
						})
						
						.state("improv2View", {
							url: "/improv2",
							templateUrl: "app/improv/improv2View.html",
							controller: "Improv2Ctrl as vm",
						})

						.state("tipsView", {
							url: "/tips",
							templateUrl: "app/tips/tipView.html",
							controller: "TipViewCtrl as vm"
						})

						.state("tipsList", {
							url: "/tips/:tipId",
							templateUrl: "app/tips/tipList.html",
							controller: "TipListCtrl as vm",
							
							resolve:{
								tipResource: "tipResource",

								tip: function (tipResource, $stateParams){
									var tipId = $stateParams.tipId;
									console.log($stateParams);
									return tipResource.get(
										{ tipId: tipId }).$promise;
								}
							}
							
						})

						.state("Themes", {
							url: "/themes",
							templateUrl: "app/themes/themeView.html",
							controller: "ThemeListCtrl as vm"
						})

						.state("beatView", {
							url: "/beats",
							templateUrl: "app/beats/beatView.html",
							controller: "BeatViewCtrl as vm"
						})

				}]

	);

}());