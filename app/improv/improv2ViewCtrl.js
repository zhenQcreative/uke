(function () {
	angular
			.module("productManagement")
			.controller('Improv2Ctrl', 
						['$scope', 
						 'pattern2Resource', 
						 Improv2Ctrl]);

 	function Improv2Ctrl($scope, improv2Resource){

 		console.log("inside function Pattern2Ctrl in improv2ViewCtrl.js")

	    var vm = this;
	   	
	   	//populate vm.progs with all the arrays of data arrays
		//used for finding out vm.progs.length later
		pattern2Resource.query(function(data){
			vm.patterns = data;
		});

		//populate vm.filteredChords with all the arrays of data arrays
		//used for major chord buttons at the bottom
		//mainly for populating the initial screen
		pattern2Resource.query(function(data){
			var chordsArray = []; //temp array
			var num = 0;

			for(var i=0; i<vm.patterns.length; i++){

				if(vm.patterns[i].patternStyle === '1'){
					chordsArray[num] = data[i];
					num++;
					//populate first image by geting array of data (name value pairs)
					//matching chord 'A'
					if(vm.patterns[i].chordGroup === 'A'){
						vm.currentChords = data[i];
					}
				};
			}
			vm.filteredChords = chordsArray;

		});

		//passed in progStyle "name" and current chordGroup "chord"
		//used by the side buttons
		//for populating major chord buttons at the bottom with these limitations
		//images will display with this current selection
		$scope.selectStyle = function(name, chord){
			var chordsArray = []; //temp array
			var num = 0;

			for(var i=0; i<vm.patterns.length; i++){
				//populate chordsArray with selected arrays that
				//match progStyle with the 'name' passed in	
				if(vm.patterns[i].patternStyle === name){
					chordsArray[num] = vm.patterns[i];
					num++;
					//populate first image by geting array of data (name value pairs)
					//matching chordGroup with the 'chord' passed in
					if(vm.patterns[i].chordGroup === chord){
						vm.currentChords = vm.patterns[i];
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