(function () {
	angular
			.module("productManagement")
			.controller('ProgressionCtrl', 
						['$scope', 
						 'progressionResource', 
						 ProgressionCtrl]);

 	function ProgressionCtrl($scope, progressionResource){

 		//console.log("inside function ProgressionCtrl in progViewCtrl.js")

	    var vm = this;
	   	
	   	//populate vm.progs with all the arrays of data arrays
		//used for finding out vm.progs.length later
		progressionResource.query(function(data){
			vm.progs = data;
		});

		//populate vm.filteredChords with all the arrays of data arrays
		//used for major chord buttons at the bottom
		//mainly for populating the initial screen
		progressionResource.query(function(data){
			var chordsArray = []; //temp array
			var num = 0;

			for(var i=0; i<vm.progs.length; i++){

				if(vm.progs[i].progStyle === 'Aloha'){
					chordsArray[num] = data[i];
					num++;
					//populate first image by geting array of data (name value pairs)
					//matching chord 'A'
					if(vm.progs[i].chordGroup === 'A'){
						vm.currentChords = data[i];
					}
				};
			}
			vm.filteredChords = chordsArray;

		});

		//this sets the ng-class to active for side and bottom buttons
		vm.currentChords = [];
    	$scope.active = function(item){
    		
    		switch(item) {
			    case vm.currentChords:
			        return "active";
			        break;
			    case vm.currentChords.progStyle:
			    	//console.log("active:", item);
			    	//console.log("active:", vm.currentChords.progStyle);
			        return "active";
			        break;
			    default:
			        return "!active";
			}
			
    	};

		//passed in progStyle "name" and current chordGroup "chord"
		//used by the side buttons
		//for populating major chord buttons at the bottom with these limitations
		//images will display with this current selection
		$scope.selectStyle = function(name, chord){
			var chordsArray = []; //temp array
			var num = 0;

			for(var i=0; i<vm.progs.length; i++){
				//populate chordsArray with selected arrays that
				//match progStyle with the 'name' passed in	
				if(vm.progs[i].progStyle === name){
					chordsArray[num] = vm.progs[i];
					num++;
					//populate first image by geting array of data (name value pairs)
					//matching chordGroup with the 'chord' passed in
					if(vm.progs[i].chordGroup === chord){
						vm.currentChords = vm.progs[i];
					}
				}
			}
			vm.filteredChords = chordsArray;
		};

		//passed in array of data (name value pair) from the selected major chord
		//used by the buttom buttons
		//images will display with this current selection
		$scope.selectChord = function(item){
			//set with array of data passed in
			vm.currentChords = item;
  		};

	}

}());