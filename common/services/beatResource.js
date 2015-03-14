(function () {
	"use strict";

	angular
		.module("common.services")
		.factory("beatResource", 
			["$resource",
			 beatResource]);

	function beatResource($resource){
		return $resource("/api/beats/:beatId")
	}

}());