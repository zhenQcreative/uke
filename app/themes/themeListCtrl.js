(function () {
	angular
			.module("productManagement")
			.controller("ThemeListCtrl",
						["$scope",
             "$cookies", 
						 "themeResource",
							ThemeListCtrl]);
	
	function ThemeListCtrl($scope,$cookies,themeResource){
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

		//start the page with no previous page buton
		vm.noPrev = true;

		//go to next array of data
		$scope.nextPage = function(){
			//console.log("in nextPage");

			//turn on both button when there is pages before or after this page
      		vm.noNext = false;
      		vm.noPrev = false;

			//as long as current page number is less than length of array of data
    		if (vm.currentPage < vm.themes.length-1) {
    			vm.currentPage++; //increment forward 1	

    			//turn off next button when there is no next,
  				//which is the last page
  				if(vm.currentPage == vm.themes.length-1)
  				{
  					vm.noNext = true;
  					vm.noPrev = false; //keep prev button on.
  				}

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

      //sets your theme
      //console.log("what permTheme 1:",  $cookies);
      $scope.favoriteCookie = $cookies.myFavorite;

      $scope.selectTheme = function(item){
          for(var i=0; i<vm.themes.length; i++)
          {
            if(item == vm.themes[i].themeId){
              $scope.permTheme = vm.themes[i].themeCSS;
            }
          }
          $cookies.myFavorite = $scope.permTheme;
          //console.log("what permTheme 2:", $cookies);

          $scope.favoriteCookie = $cookies.myFavorite;
          console.log("what permTheme 3:", $cookies);
      }

      //preview
      $scope.preview = function(item){
          for(var i=0; i<vm.themes.length; i++)
          {
            if(item == vm.themes[i].themeId){
              $scope.permTheme = vm.themes[i].themeCSS;
            }
          }
      }
	} 

}());