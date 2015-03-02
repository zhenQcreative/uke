(function () {
	"use strict";

	angular
		.module("common.services")
		.factory("chordResource", 
			["$resource",
			 chordResource]);

	function chordResource($resource){
		return $resource("/api/chords/:chordId")
	}

}());