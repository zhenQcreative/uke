(function () {
	angular
			.module("productManagement")
			.controller("TipListCtrl",
						["$scope",
             "tip", 
						 "tipResource",
							TipListCtrl]);
	
	function TipListCtrl($scope,tip,tipResource){
		var vm = this;

    vm.currentTip = tip;

		//populate vm.tip with all the arrays of data arrays
		//used for finding out vm.tips.length later
		tipResource.query(function(data){
			vm.tips = data;
		});
		

		//initialize first page
		//set current page number
    vm.currentPage = 0;
		
		//set first vm.currentTip array data
		tipResource.query(function(data){
      var tempArray = [];
      var num = 0;

      for(var i=0; i<data.length; i++){
        if(data[i].tipCatagory === tip.tipCatagory){
          tempArray[num] = data[i];
          if(data[i].tipName === tip.tipName){
            vm.currentPage = num; //the page of one you clicked on
          }
          num++;
        }
      }

			vm.collectedTips = tempArray; //keeps all the tips from the same catagory in this array to parse through
      vm.currentTip = vm.collectedTips[vm.currentPage]; //display the current tip you selected in catagory

      //turn off both button when there is no page before or after this page
      //only one tip in this array
      if(vm.collectedTips.length === 1){
        console.log("vm.collectedTips.length", vm.collectedTips.length)
        vm.noPrev = true;
        vm.noNext = true;
      }
      //when there is more than one item in this array
      //turn off Prev button when there is no page before this page
      else if(vm.collectedTips.length > 1 && vm.currentPage === 0){
        vm.noPrev = true;
        vm.noNext = false;
      }
      //when there is more than one item in this array
      //turn off Next button when there is no page after this page
      else if(vm.collectedTips.length > 1 && vm.currentPage === vm.collectedTips.length-1){
        vm.noPrev = false;
        vm.noNext = true;
      }

		});

		//go to next array of data
		$scope.nextPage = function(){

      //turn on both button when there is pages before or after this page
      vm.noPrev = false;
      vm.noNext = false;

			//as long as current page number is less than length of array of data
  		if (vm.currentPage < vm.collectedTips.length-1) {

  			vm.currentPage++; //increment forward 1	

				//turn off next button when there is no next,
				//which is the last page
				if(vm.currentPage == vm.collectedTips.length-1)
				{
					vm.noNext = true;
          vm.noPrev = false; //keep prev button on.
				}

  			//return current tip value
				return vm.currentTip = vm.collectedTips[vm.currentPage];
  		}
    		
  	};

		//go to previous array of data
  	$scope.prevPage = function() {

  		//turn on both button when there is pages before or after this page
  		vm.noNext = false;
      vm.noPrev = false;

  		//as long as current page number not less than 0
  		if (vm.currentPage > 0) {
  			vm.currentPage--; //increment backward 1

  				//turn off prev button when current page number is 0,
  				//which is the first page.
  				if(vm.currentPage == 0){
  					vm.noPrev = true;
  				}

  				//return current tip value
					return vm.currentTip = vm.collectedTips[vm.currentPage];
			  
  		}
  	};

		//go to specific array of data
		$scope.goToPage = function(numb){
			//console.log("numb", numb);
			if (numb != 0){
				vm.currentPage = numb-1; //subract one because first array element is 0
			}else{
				vm.currentPage = 0;
			}
			//get the exact array of data
			tipResource.query(function(data){
			  return vm.currentTip = data[vm.currentPage];
		  });
		} 
	} 

}());