(function () {
	angular
			.module("productManagement")
			.controller('ToolViewCtrl', 
						['$scope',
						 '$sce',
						 'toolResource', 
						 ToolViewCtrl]);

 	function ToolViewCtrl($scope, $sce, toolResource){

 		//console.log("inside function ChordViewCtrl in chordViewCtrl.js");

	    var vm = this;


	    //player test
 		vm.config = {
            sources: [
          		{src: $sce.trustAsResourceUrl("http://static.videogular.com/assets/audios/videogular.mp3"), type: "audio/mpeg"},
          		{src: $sce.trustAsResourceUrl("http://static.videogular.com/assets/audios/videogular.ogg"), type: "audio/ogg"}
      		],
        	theme: {
      			url: "http://www.videogular.com/styles/themes/default/latest/videogular.css"
        	}
		};
	   
		//get Tuner data
		toolResource.query(function(data){
			var tempArray = [];
			var num = 0;

			for(var i = 0; i < data.length; i++){
				if(data[i].toolName === "Tuner"){
					tempArray[num] = data[i];
					num++;
				}
			}
			vm.tuners = tempArray;		
		});
		//current tuner selected
		$scope.selectTuner = function (name){
			vm.currentTuner = name;
			vm.currentTunerTitle = ": " + name.toolTitle;
			//console.log("vm.currentTuner", vm.currentTuner);
			vm.tunerPlayer = true;
			switch(vm.currentTuner.toolTitle) {
			    case 'G':
			        vm.config = {
			            sources: [
			          		{src: $sce.trustAsResourceUrl("http://m.zhenQcreative.com/Uke/audio/beats/RnB_230.mp3"), type: "audio/mpeg"}
			      		],
			        	theme: {
			      			url: "http://www.videogular.com/styles/themes/default/latest/videogular.css"
			        	}
					};
			        $scope.active('clear');
			        break;   
			    case 'C':
			        vm.config = {
			            sources: [
			          		{src: $sce.trustAsResourceUrl("http://static.videogular.com/assets/audios/videogular.mp3"), type: "audio/mpeg"}
			      		],
			        	theme: {
			      			url: "http://www.videogular.com/styles/themes/default/latest/videogular.css"
			        	}
					};
			        $scope.active('clear');
			        break;
			    case 'E':
			    	vm.config = {
			            sources: [
			          		{src: $sce.trustAsResourceUrl("http://m.zhenQcreative.com/Uke/audio/beats/RnB_230.mp3"), type: "audio/mpeg"}
			      		],
			        	theme: {
			      			url: "http://www.videogular.com/styles/themes/default/latest/videogular.css"
			        	}
					};
			    	$scope.active('clear');
			        break;
			    case 'A':
			    	vm.config = {
			            sources: [
			          		{src: $sce.trustAsResourceUrl("http://static.videogular.com/assets/audios/videogular.mp3"), type: "audio/mpeg"}
			      		],
			        	theme: {
			      			url: "http://www.videogular.com/styles/themes/default/latest/videogular.css"
			        	}
					};
			    	$scope.active('clear');
			        break;
			    case 'clear':
			    	vm.config.stop();
			    	vm.tunerPlayer = false;
			        break;
			    default:
			    	vm.config.stop();
			        return "!active";
			}
		};

		//get Metronome data
		toolResource.query(function(data){
			var tempArray = [];
			var num = 0;

			for(var i = 0; i < data.length; i++){
				if(data[i].toolName === "Metronome"){
					tempArray[num] = data[i];
					num++;
				}
			}
			vm.metronomes = tempArray;
			//console.log("vm.metronomes", vm.metronomes);
			vm.currentMetro = vm.metronomes[0];
			vm.currentMetroTitle = ": " + vm.metronomes[0].toolTitle;
			vm.currentSpeedTitle = " ";

			$scope.active('clear');

		});
		//current metronomes type selected
		$scope.selectMetro = function (name){
			vm.currentMetro = name;
			vm.currentMetroTitle = ": " + name.toolTitle;
			vm.currentSpeedTitle = " ";
			$scope.active('clear');
			vm.tunerPlayer = false;
			//console.log("vm.player1", vm.currentMetro.toolAudioUrl1);
		};
		
		//current metronomes speed selected
		$scope.selectSpeed = function (name){
			vm.currentSpeed = name;
			vm.currentSpeedTitle = ": " + name;
			switch(name) {
			    case '0.5 x':
			    	vm.config = {
			            sources: [
			          		{src: $sce.trustAsResourceUrl(vm.currentMetro.toolAudioUrl1), type: "audio/mpeg"}
			      		],
			        	theme: {
			      			url: "http://www.videogular.com/styles/themes/default/latest/videogular.css"
			        	}
					};
			        break;
			    case '1.0 x':
			    	vm.config = {
			            sources: [
			          		{src: $sce.trustAsResourceUrl(vm.currentMetro.toolAudioUrl2), type: "audio/mpeg"}
			      		],
			        	theme: {
			      			url: "http://www.videogular.com/styles/themes/default/latest/videogular.css"
			        	}
					};
			        break;
			    default:
			    	vm.config.stop();
			        return "!active";
			}
			$scope.active(name);
		};

		//set active
		$scope.active = function(item){
			switch(item) {
			    case vm.currentTuner:
			        return "active";
			        break;   
			    case vm.currentMetro:
			        return "active";
			        break;
			    case '0.5 x':
			    	vm.tunerPlayer = false;
			    	vm.metroPlayer = true;
			        vm.activeSpeed1 = 'active';
			        vm.activeSpeed2 = '!active';
			        break;
			    case '1.0 x':
			    	vm.tunerPlayer = false;
			    	vm.metroPlayer= true;
			        vm.activeSpeed1 = '!active';
			        vm.activeSpeed2 = 'active';
			        break;
			    case 'clear':
			    	vm.metroPlayer = false;
			    	vm.activeSpeed1 = '!active';
			        vm.activeSpeed2 = '!active';
			        break;
			    default:
			        return "!active";
			}
			//console.log("vm.currentMetro", vm.currentMetro.toolId);
			//console.log("vm.currentMetro", vm.currentMetro.toolAudioUrl1);
			//console.log("vm.currentMetro", vm.currentMetro.toolAudioUrl2);
    	};

	}
}());