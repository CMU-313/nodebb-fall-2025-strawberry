'use strict';

define('forum/search/fuzzy', ['search'], (search) => {
	const fuzzySearch = {};

	fuzzySearch.init = function () {
		// Inject fuzzy search toggle into the search form
		const searchForm = $('[component="search/form"]');
		const fuzzyToggle = `
			<div class="form-check mb-3">
				<input type="checkbox" class="form-check-input" id="search-fuzzy-toggle">
				<label class="form-check-label" for="search-fuzzy-toggle">Enable Fuzzy Search</label>
			</div>
			<div class="form-range mb-3 fuzzy-sensitivity-container" style="display: none;">
				<label for="search-fuzzy-sensitivity" class="form-label">Fuzzy Sensitivity: <span class="fuzzy-value">20</span>%</label>
				<input type="range" class="form-range" id="search-fuzzy-sensitivity" value="20" min="0" max="100">
			</div>
		`;
		searchForm.find('[component="search/fields"]').append(fuzzyToggle);

		// Handle toggle change
		$('#search-fuzzy-toggle').on('change', function () {
			$('.fuzzy-sensitivity-container').toggle(this.checked);
			search.current.fuzzySearch = this.checked;
			search.current.fuzzySensitivity = parseInt($('#search-fuzzy-sensitivity').val(), 10);
		});

		// Handle sensitivity slider
		$('#search-fuzzy-sensitivity').on('input', function () {
			$('.fuzzy-value').text(this.value);
			search.current.fuzzySensitivity = parseInt(this.value, 10);
		});
	};

	return fuzzySearch;
});