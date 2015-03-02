(function () {
	"use strict";

	angular
		.module("common.services")
		.factory("progressionResource", 
			["$resource",
			 progressionResource]);

	function progressionResource($resource){
		return $resource("/api/progressions")
	}

}());