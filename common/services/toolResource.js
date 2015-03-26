(function () {
	"use strict";

	angular
		.module("common.services")
		.factory("toolResource", 
			["$resource",
			 toolResource]);

	function toolResource($resource){
		return $resource("/api/tools/:toolId")
	}

}());