(function () {
	"use strict";

	angular
		.module("common.services")
		.factory("improv1Resource", 
			["$resource",
			 improv1Resource]);

	function improv1Resource($resource){
		return $resource("/api/improv1")
	}

}());