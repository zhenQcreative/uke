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

	    vm.currentChord = [];

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

		//this sets the ng-class to active for side and bottom buttons
    	$scope.active = function(item){

    		switch(item) {
			    case vm.currentChord:
			        return "active";
			        break;
			    case vm.currentChord.chordGroup:
			        return "active";
			        break;
			    default:
			        return "!active";
			}
			
    	};
    	//this sets the ng-class to active for sharp and flats only
    	vm.sharpFlatActive = function(item){

    		switch(item) {

			    case 'f':
			        vm.flat = "active";
	    			vm.sharp = "!active";
			        break;
			    case 's':
			        vm.flat = "!active";
	    			vm.sharp = "active";
			        break;
			    default:
			        vm.flat = "!active";
	    			vm.sharp = "!active";
			}
			
    	}

		/**-------------------------------------------------------------//
	    //This effect page loads for each major chord selected			//
	    //---get specific array of arrays								//
		//---it initialize a selected list of vm.filteredChords		    //
		//---(in this case whatever matches 'name')						//
		//---it fills the side buttons									//
		//-------------------------------------------------------------**/
  		$scope.goToChords = function(name, item){
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
						if(vm.chords[i].chordName === item){
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

				//turn off active for sharp or flat
				vm.sharpFlatActive();
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

	    	//turn off active for sharp or flat
			vm.sharpFlatActive();

  		};

  		/**-------------------------------------------------------------//
	    //Sharps and Flats 												//
	    //-------------------------------------------------------------**/
	    $scope.flat = function(name){
	    	//turn off the major chord image, because flat/sharp IS pressed
	    	//(ng-if="!vm.onFlatSharp") because "!true= false"
	    	//when ng-if = false, the main image will NOT show
	    	vm.onFlatSharp = true; //this true because either sharp or flat is true
	    	//turn on flat chord image, keep sharp image off
	    	vm.showFlat = true;
	    	vm.showSharp = false;

	    	//turn on active for sharp or flat
	    	vm.sharpFlatActive(name);
	    	
	    };
	    $scope.sharp = function(name){
	    	//turn off the major chord image, because flat/sharp IS pressed
	    	//(ng-if="!vm.onFlatSharp") because "!true= false"
	    	//when ng-if = false, the main image will NOT show
	    	vm.onFlatSharp = true; //this true because either sharp or flat is true
	    	//turn on sharp chord image, keep flat image off
	    	vm.showSharp = true;
	    	vm.showFlat = false;

	    	//turn on active for sharp or flat
	    	vm.sharpFlatActive(name);

	    };

	}
}());