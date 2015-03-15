(function () {
	angular
			.module("productManagement")
			.controller('BeatViewCtrl', 
						['$scope', 
						 'beatResource', 
						 BeatViewCtrl]);

 	function BeatViewCtrl($scope, beatResource){

 		//console.log("inside function ChordViewCtrl in chordViewCtrl.js");

	    var vm = this;



	    vm.currentBeat = [];

	    //populate vm.chords with all the arrays of data arrays
		//used for finding out vm.chords.length later
		beatResource.query(function(data){
			vm.beats = data;
		});

		/**-------------------------------------------------------------//
	    //This effect first time page loads								//
		//---it initialize a specific list of vm. filteredChords	    //
		//---(in this case 'A')											//
		//---it fills the side buttons									//
		//-------------------------------------------------------------**/
		beatResource.query(function(data){
			var beatsArray = []; //temp array
			var num = 0;

			for(var i=0; i<vm.beats.length; i++){
				//checking chordGroup is same as 'A'
				//fill a temp array
				if(vm.beats[i].beatGroup === "Folk"){
					beatsArray[num] = vm.beats[i];
					num++;
				};
			}
			//to populate side buttons with arrays of chords with the same chordGroup
			//array of arrays
			//populate vm.filteredChords with arrays stored in chordsArray
			vm.filteredBeats = beatsArray;

			//set the vm.currentChord with the first data from vm.filteredChords
			//array of data (name value pairs)
			//this allow first chord's image to show
			vm.currentBeat = vm.filteredBeats[0];

		});
		//-------------------------------------------------------------**/
		var playlist1={
			src: 'http://upload.wikimedia.org/wikipedia/en/d/d0/Rick_Astley_-_Never_Gonna_Give_You_Up.ogg', type: 'audio/ogg', media: '.css.media.query' 
		};
		/**handle audio **/
		// access properties
  		/*console.log($scope.audio1.network);
  		console.log($scope.audio1.ended); */ 

  		$scope.mySpecialPlayButton = function () {
    		$scope.customText = 'I started angular-media-player with a custom defined action!';
    		$scope.audio1.playPause();
		};

		//this sets the ng-class to active for side and bottom buttons
    	$scope.active = function(item){

    		switch(item) {
			    case vm.currentBeat:
			        return "active";
			        break;
			    case vm.currentBeat.beatGroup:
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
  		$scope.goToBeat = function(name, item){
  			//get the exact array of data
				var beatsArray = []; //temp array
				var num = 0;

				for(var i=0; i<vm.beats.length; i++){
					//checking chordGroup is same as 'name'
					//fill a temp array
					if(vm.beats[i].beatGroup === name){
						beatsArray[num] = vm.beats[i];
						num++;
						//checking chordName is same as 'name'
						//this gets a chord (the major chord) that match the one selected
						if(vm.beats[i].beatName === item){
							//set the vm.currentChord with the first data from selected data
							//gets a array of data (name value pairs)
							//this allow first chord's image to show
							vm.currentBeat = vm.beats[i];
							//turn off any flat or sharp
							//vm.onFlatSharp = false; //allow main image to show (ng-if="!vm.onFlatSharp") because "!false = true"
							//vm.showFlat = false;
	    					//vm.showSharp = false;
						};
					};
				}
				//to populate side buttons with arrays of chords with the same chordGroup
				//array of arrays
				//populate vm.filteredChords with arrays stored in chordsArray
				vm.filteredBeats = beatsArray;

				//turn off active for sharp or flat
				//vm.sharpFlatActive();
  		}
  		/**-------------------------------------------------------------//
	    //This effect page loads for each side button selected			//
	    //---get data from array passed in								//
		//---it initialize vm.currentChord with array of data		    //
		//---(in this case whatever matches 'name')						//
		//---it fills the side buttons									//
		//-------------------------------------------------------------**/
		$scope.selectBeat = function(item){
			//get array of data (name value pairs) passed in
			vm.currentBeat = item;
			//turn off any flat or sharp
			//vm.onFlatSharp = false; //allow main image to show (ng-if="!vm.onFlatSharp") because "!false = true"
			//vm.showFlat = false;
	    	//vm.showSharp = false;

	    	//turn off active for sharp or flat
			//vm.sharpFlatActive();

  		};

  		/**-------------------------------------------------------------//
	    //Sharps and Flats 												//
	    //-------------------------------------------------------------**/
	    /*$scope.flat = function(name){
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

	    }; */

	}
}());