(function(){
  "use strict";

  angular
    .module("common.services")

    .factory('itemsFactory', 
             ['$http', 
               itemsFactory]);
    
    console.log("outside function itemsFactory in chordService.js");

    function itemsFactory($http){

      console.log("inside function itemsFactory in chordService.js");

        var itemsFactory = {
          itemDetails: function() {
            return $http(
            {
              url: "common/data/mockItems.json",
              method: "GET",
            })
            .then(function (response) {
              return response.data;
              });
            }
          };
          return itemsFactory;
      }

}());