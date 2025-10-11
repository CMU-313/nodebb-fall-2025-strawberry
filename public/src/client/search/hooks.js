'use strict';

$(document).ready(function () {
	// Load fuzzy search module when the page loads
	require(['forum/search/fuzzy'], function (fuzzySearch) {
		fuzzySearch.init();
	});
});