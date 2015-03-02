(function(){
  "use strict";

  angular
    .module("productManagement")

    .service("chordService", 
              ["$http",
               "$q",
              chordService]);

    console.log("outside function chordService in chordService.js");

    function chordService($http, $q){

      console.log("inside function chordService in chordService.js");

      var deferred = $q.defer();
      $http.get('common/data/mockItems.json').then(function(data){
        deferred.resolve(data);
      });

      this.getChords = function(){
        return deferred.promise;
      }
    }

}());