(function () {
	angular
			.module("productManagement")
			.controller("TipListCtrl",
						["$scope", 
						 "tipResource",
							TipListCtrl]);
	
	function TipListCtrl($scope,tipResource){
		var vm = this;
		
		//populate vm.tip with all the arrays of data arrays
		//used for finding out vm.tips.length later
		tipResource.query(function(data){
			vm.tips = data;
			//console.log(vm.tips);
		});
		

		//initialize first page
		//set current page number (array number) 
		vm.currentPage = 0;
		//set first vm.currentTip array data
		tipResource.query(function(data){
			vm.currentTip = data[vm.currentPage];
			//console.log("data", data[vm.currentPage]);
			//console.log("vm.currentTip", vm.currentTip);
		});

		//start the page with no previous page buton
		vm.noPrev = true;

		//go to next array of data
		$scope.nextPage = function(){
			//console.log("in nextPage");

			//turn on both button when there is pages before or after this page
			vm.noPrev = false;
			vm.noNext = false;

			//as long as current page number is less than length of array of data
    		if (vm.currentPage < vm.tips.length-1) {

    			vm.currentPage++; //increment forward 1	

      			//console.log("count",vm.currentPage);

      		tipResource.query(function(data){

    				//turn off next button when there is no next,
    				//which is the last page
    				if(vm.currentPage == vm.tips.length-1)
    				{
    					vm.noNext = true;
    					vm.noPrev = false; //keep prev button on.
    				}

      			//console.log("data next", data[vm.currentPage]);

      			//return current tip value
  					return vm.currentTip = data[vm.currentPage];
    			});
    		}
    		
  		};

		//go to previous array of data
  		$scope.prevPage = function() {

    		//console.log("in prevPage");

    		//turn on both button when there is pages before or after this page
      		vm.noNext = false;
      		vm.noPrev = false;

    		//as long as current page number not less than 0
    		if (vm.currentPage > 0) {
    			vm.currentPage--; //increment backward 1
      			//console.log("count",vm.currentPage);
      		tipResource.query(function(data){

    				//turn off prev button when current page number is 0,
    				//which is the first page.
    				if(vm.currentPage == 0){
    					vm.noPrev = true;
    				}

    				//console.log("data prev", data[vm.currentPage]);

    				//return current tip value
  					return vm.currentTip = data[vm.currentPage];
				  });
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
  				//console.log("data prev", data[vm.currentPage]);
				return vm.currentTip = data[vm.currentPage];
			});
  		} 
	} 

}());