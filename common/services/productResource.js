(function () {
	"use strict";

	angular
		.module("common.services")
		.factory("productResource", 
			["$resource",
			 productResource]);

	function productResource($resource){
		return $resource("/api/chords/:chordId")
	}

}());