(function () {
	"use strict";

	angular
		.module("common.services")
		.factory("improv2Resource", 
			["$resource",
			 improv2Resource]);

	function improv2Resource($resource){
		return $resource("/api/improv2")
	}

}());