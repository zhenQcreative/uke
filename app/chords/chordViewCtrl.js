(function () {
	angular
			.module("productManagement")
			.controller('ChordViewCtrl', 
						['$scope', 
						 'productResource', 
						 ChordViewCtrl]);

 	function ChordViewCtrl($scope, productResource){

 		//console.log("inside function ChordViewCtrl in chordViewCtrl.js");

	    var vm = this;

	    //populate vm.chords with all the arrays of data arrays
		//used for finding out vm.chords.length later
		productResource.query(function(data){
			vm.chords = data;
		});

		/**-------------------------------------------------------------//
	    //This effect first time page loads								//
		//---it initialize a specific list of vm. filteredChords	    //
		//---(in this case 'A')											//
		//---it fills the side buttons									//
		//-------------------------------------------------------------**/
		productResource.query(function(data){
			var chordsArray = []; //temp array
			var num = 0;

			for(var i=0; i<vm.chords.length; i++){
				//checking chordGroup is same as 'A'
				//fill a temp array
				if(vm.chords[i].chordGroup === "A"){
					chordsArray[num] = vm.chords[i];
					num++;
				};
			}
			//to populate side buttons with arrays of chords with the same chordGroup
			//array of arrays
			//populate vm.filteredChords with arrays stored in chordsArray
			vm.filteredChords = chordsArray;

			//set the vm.currentChord with the first data from vm.filteredChords
			//array of data (name value pairs)
			//this allow first chord's image to show
			vm.currentChord = vm.filteredChords[0];

		});
		//-------------------------------------------------------------**/


		/**-------------------------------------------------------------//
	    //This effect page loads for each major chord selected			//
	    //---get specific array of arrays								//
		//---it initialize a selected list of vm.filteredChords		    //
		//---(in this case whatever matches 'name')						//
		//---it fills the side buttons									//
		//-------------------------------------------------------------**/
  		$scope.goToChords = function(name){
  			//get the exact array of data
				var chordsArray = []; //temp array
				var num = 0;

				for(var i=0; i<vm.chords.length; i++){
					//checking chordGroup is same as 'name'
					//fill a temp array
					if(vm.chords[i].chordGroup === name){
						chordsArray[num] = vm.chords[i];
						num++;
						//checking chordName is same as 'name'
						//this gets a chord (the major chord) that match the one selected
						if(vm.chords[i].chordName === name){
							//set the vm.currentChord with the first data from selected data
							//gets a array of data (name value pairs)
							//this allow first chord's image to show
							vm.currentChord = vm.chords[i];
							//turn off any flat or sharp
							vm.onFlatSharp = false; //allow main image to show (ng-if="!vm.onFlatSharp") because "!false = true"
							vm.showFlat = false;
	    					vm.showSharp = false;
						};
					};
				}
				//to populate side buttons with arrays of chords with the same chordGroup
				//array of arrays
				//populate vm.filteredChords with arrays stored in chordsArray
				vm.filteredChords = chordsArray;
  		}
  		/**-------------------------------------------------------------//
	    //This effect page loads for each side button selected			//
	    //---get data from array passed in								//
		//---it initialize vm.currentChord with array of data		    //
		//---(in this case whatever matches 'name')						//
		//---it fills the side buttons									//
		//-------------------------------------------------------------**/
		$scope.selectChord = function(item){
			//get array of data (name value pairs) passed in
			vm.currentChord = item;
			//turn off any flat or sharp
			vm.onFlatSharp = false; //allow main image to show (ng-if="!vm.onFlatSharp") because "!false = true"
			vm.showFlat = false;
	    	vm.showSharp = false;	
  		};

  		/**-------------------------------------------------------------//
	    //Sharps and Flats 												//
	    //-------------------------------------------------------------**/
	    $scope.flat = function(){
	    	//turn off the major chord image, because flat/sharp IS pressed
	    	//(ng-if="!vm.onFlatSharp") because "!true= false"
	    	//when ng-if = false, the main image will NOT show
	    	vm.onFlatSharp = true; //this true because either sharp or flat is true
	    	//turn on flat chord image, keep sharp image off
	    	vm.showFlat = true;
	    	vm.showSharp = false;
	    	
	    };
	    $scope.sharp = function(){
	    	//turn off the major chord image, because flat/sharp IS pressed
	    	//(ng-if="!vm.onFlatSharp") because "!true= false"
	    	//when ng-if = false, the main image will NOT show
	    	vm.onFlatSharp = true; //this true because either sharp or flat is true
	    	//turn on sharp chord image, keep flat image off
	    	vm.showSharp = true;
	    	vm.showFlat = false;
	    	
	    };

	}
}());