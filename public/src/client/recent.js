'use strict';

define('forum/recent', ['topicList', 'storage'], function (topicList, storage) {
	const Recent = {};

	Recent.init = function () {
		app.enterRoom('recent_topics');

		topicList.init('recent');
		setupFuzzySearch();
	};

	function setupFuzzySearch() {
		const searchInput = $('#topic-search-input');
		const fuzzyToggle = $('#fuzzy-search-toggle');
		const sensitivitySlider = $('#fuzzy-sensitivity');
		const sensitivityValue = $('.sensitivity-value');
		const fuzzyWrapper = $('.fuzzy-sensitivity-wrapper');

		// Load saved preferences
		const savedPreferences = storage.getItem('fuzzy-search-preferences') || {
			enabled: false,
			sensitivity: 20,
		};

		fuzzyToggle.prop('checked', savedPreferences.enabled);
		sensitivitySlider.val(savedPreferences.sensitivity);
		sensitivityValue.text(savedPreferences.sensitivity);
		fuzzyWrapper.toggle(savedPreferences.enabled);

		// Handle toggle change
		fuzzyToggle.on('change', function () {
			fuzzyWrapper.toggle(this.checked);
			savePreferences();
			if (searchInput.val()) {
				doSearch();
			}
		});

		// Handle sensitivity change
		sensitivitySlider.on('input', function () {
			sensitivityValue.text(this.value);
			savePreferences();
			if (searchInput.val()) {
				doSearch();
			}
		});

		// Handle search input
		let searchTimeout;
		searchInput.on('input', function () {
			clearTimeout(searchTimeout);
			searchTimeout = setTimeout(doSearch, 250);
		});

		function savePreferences() {
			storage.setItem('fuzzy-search-preferences', {
				enabled: fuzzyToggle.prop('checked'),
				sensitivity: parseInt(sensitivitySlider.val(), 10),
			});
		}

		function doSearch() {
			const query = searchInput.val().trim();
			const fuzzyEnabled = fuzzyToggle.prop('checked');
			const sensitivity = parseInt(sensitivitySlider.val(), 10);

			if (!query) {
				topicList.loadTopics();
				return;
			}

			socket.emit('topics.search', {
				query: query,
				fuzzySearch: fuzzyEnabled,
				fuzzySensitivity: sensitivity,
			}, function (err, data) {
				if (err) {
					return app.alertError(err.message);
				}
				
				topicList.onTopicsLoaded('recent', data.topics);
			});
		}
	}

	return Recent;
});
