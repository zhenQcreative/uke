(function () {
	angular
			.module("productManagement")
			.controller('ToolViewCtrl', 
						['$scope',
						 'toolResource', 
						 ToolViewCtrl]);

 	function ToolViewCtrl($scope, toolResource){

 		//console.log("inside function ChordViewCtrl in chordViewCtrl.js");

	    var vm = this;
	   
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
			        vm.tunerURL = 'audio/beats/RnB_230.mp3';
			        $scope.active('clear');
			        break;   
			    case 'C':
			        vm.tunerURL = 'audio/beats/RnB_230.mp3';
			        $scope.active('clear');
			        break;
			    case 'E':
			    	vm.tunerURL = 'audio/beats/RnB_230.mp3';
			    	$scope.active('clear');
			        break;
			    case 'A':
			    	vm.tunerURL = 'audio/beats/RnB_230.mp3';
			    	$scope.active('clear');
			        break;
			    case 'clear':
			    	vm.tunerPlayer = false;
			        break;
			    default:
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
		vm.play1 = "";
		vm.play2 = "";
		$scope.selectSpeed = function (name){
			vm.currentSpeed = name;
			vm.currentSpeedTitle = ": " + name;
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
			    	vm.play1 = vm.currentMetro.toolAudioUrl1;
			    	vm.player1 = true;
			        vm.activeSpeed1 = 'active';
			        vm.play2 = vm.currentMetro.toolAudioUrl2;
			        vm.player2 = false;
			        vm.activeSpeed2 = '!active';
			        break;
			    case '1.0 x':
			    	vm.tunerPlayer = false;
			    	vm.player1 = false;
			        vm.activeSpeed1 = '!active';
			        vm.player2 = true;
			        vm.activeSpeed2 = 'active';
			        break;
			    case 'clear':
			    	vm.player1 = false;
			    	vm.activeSpeed1 = '!active';
			    	vm.player2 = false;
			        vm.activeSpeed2 = '!active';
			        break;
			    default:
			        return "!active";
			}
			//console.log("vm.play1", vm.play1);
			//console.log("vm.play2", vm.play2);
    	};

	}
}());