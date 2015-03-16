(function () {
	angular
			.module("productManagement")
			.controller("TipViewCtrl",
						["$scope", 
						 "tipResource",
							TipViewCtrl]);
	
	function TipViewCtrl($scope,tipResource){
		var vm = this;

    vm.currentTip = [];
		//populate vm.tip with all the arrays of data arrays
		//used for finding out vm.tips.length later
		tipResource.query(function(data){
			vm.tips = data;
		});

    //initiate the first screen only
    tipResource.query(function(data){
        var tipsArray = []; //temp array
        var num = 0;

        for(var i=0; i<data.length; i++){

            if(data[i].tipCatagory === 'Care'){ //can some day replace this string with what's cookied on user's phone to return to old view?
              tipsArray[num] = data[i];
              num++;
            };

        }
        vm.filteredTips = tipsArray;
        vm.currentTip = vm.filteredTips[0];
    });

    //filter out tips under selected catagory
    $scope.selectCatagory = function(name){

      tipResource.query(function(data){
        var tipsArray = []; //temp array
        var num = 0;

        for(var i=0; i<data.length; i++){

            if(data[i].tipCatagory === name){
              tipsArray[num] = data[i];
              num++;
            };

        }

        vm.filteredTips = tipsArray;
        vm.currentTip = vm.filteredTips[0];
      });

    };

    //this sets the ng-class to active for side and bottom buttons
      $scope.active = function(item){

        switch(item) {
          case vm.currentTip:
              return "active";
              break;
          case vm.currentTip.tipCatagory:
              return "active";
              break;
          default:
              return "!active";
        }
      
      };
         
	} 

}());