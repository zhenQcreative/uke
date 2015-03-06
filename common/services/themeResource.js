(function () {
	"use strict";

	angular
		.module("common.services")
		.factory("themeResource", 
			["$resource",
			 themeResource]);

	function themeResource($resource){
		return $resource("/api/themes/:themeId")
	}

}());