(function () {
	angular
			.module("productManagement")
			.controller("ThemeListCtrl",
						["$scope", 
						 "themeResource",
							ThemeListCtrl]);
	
	function ThemeListCtrl($scope,themeResource){
		var vm = this;
		
		//populate vm.theme with all the arrays of data arrays
		//used for finding out vm.themes.length later
		themeResource.query(function(data){
			vm.themes = data;
			//console.log(vm.themes);
		});
		

		//initialize first page
		//set current page number (array number) 
		vm.currentPage = 0;
		//set first vm.currentTheme array data
		themeResource.query(function(data){
			vm.currentTheme = data[vm.currentPage];
			//console.log("data", data[vm.currentPage]);
			//console.log("vm.currentTheme", vm.currentTheme);
		});

		//go to next array of data
		$scope.nextPage = function(){
			//console.log("in nextPage");

			//as long as current page number is less than length of array of data
    		if (vm.currentPage < vm.themes.length-1) {
    			vm.currentPage++; //increment forward 1	
      			//console.log("count",vm.currentPage);
      			themeResource.query(function(data){
      				//console.log("data next", data[vm.currentPage]);
					return vm.currentTheme = data[vm.currentPage];
				});
    		}
    		
  		};

		//go to previous array of data
  		$scope.prevPage = function() {
    		//console.log("in prevPage");

    		//as long as current page number not less than 0
    		if (vm.currentPage > 0) {
    			vm.currentPage--; //increment backward 1
      			//console.log("count",vm.currentPage);
      			themeResource.query(function(data){
      				//console.log("data prev", data[vm.currentPage]);
					return vm.currentTheme = data[vm.currentPage];
				});
    		}
  		};

  		//go to specific array of data
  		$scope.goToPage = function(numb){
  			//console.log("numb", numb);
  			if (numb != 0){
  				vm.currentPage = numb-1; //subract one because first array is 0
  			}else{
  				vm.currentPage = 0;
  			}
  			//get the exact array of data
  			themeResource.query(function(data){
  				//console.log("data prev", data[vm.currentPage]);
				return vm.currentTheme = data[vm.currentPage];
			});
  		} 
	} 

}());