'use strict';

define('forum/category', [
	'forum/infinitescroll',
	'share',
	'navigator',
	'topicList',
	'sort',
	'categorySelector',
	'hooks',
	'alerts',
	'api',
	'clipboard',
	'forum/topic-search',
], function (
	infinitescroll, share, navigator, topicList, sort,
	categorySelector, hooks, alerts, api, clipboard, TopicSearch
) {
	const Category = {};

	$(window).on('action:ajaxify.start', function (ev, data) {
		if (!String(data.url).startsWith('category/')) {
			navigator.disable();
		}
	});

	function setupFuzzySearch(cid) {
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
				loadTopicsAfter(0);
				return;
			}

			socket.emit('topics.search', {
				query: query,
				cid: cid,
				fuzzySearch: fuzzyEnabled,
				fuzzySensitivity: sensitivity,
			}, function (err, data) {
				if (err) {
					return app.alertError(err.message);
				}
				
				topicList.onTopicsLoaded('category', data.topics);
			});
		}
	}

	Category.init = function () {
		const cid = ajaxify.data.cid;

		app.enterRoom('category_' + cid);

		topicList.init('category', loadTopicsAfter);
		setupFuzzySearch(cid);

		sort.handleSort('categoryTopicSort', 'category/' + ajaxify.data.slug);

		if (!config.usePagination) {
			navigator.init('[component="category/topic"]', ajaxify.data.topic_count, Category.toTop, Category.toBottom);
		} else {
			navigator.disable();
		}

		handleScrollToTopicIndex();

		handleIgnoreWatch(cid);

		handleLoadMoreSubcategories();

		handleDescription();

		categorySelector.init($('[component="category-selector"]'), {
			privilege: 'find',
			parentCid: ajaxify.data.cid,
			onSelect: function (category) {
				ajaxify.go('/category/' + category.cid);
			},
		});

		new clipboard('[data-clipboard-text]');

		hooks.fire('action:topics.loaded', { topics: ajaxify.data.topics });
		hooks.fire('action:category.loaded', { cid: ajaxify.data.cid });
	};

	function handleScrollToTopicIndex() {
		let topicIndex = ajaxify.data.topicIndex;
		if (topicIndex && utils.isNumber(topicIndex)) {
			topicIndex = Math.max(0, parseInt(topicIndex, 10));
			if (topicIndex && window.location.search.indexOf('page=') === -1) {
				navigator.scrollToElement($('[component="category/topic"][data-index="' + topicIndex + '"]'), true, 0);
			}
		}
	}

	function handleIgnoreWatch(cid) {
		$('[component="category/watching"], [component="category/tracking"], [component="category/ignoring"], [component="category/notwatching"]').on('click', function () {
			const $this = $(this);
			const state = $this.attr('data-state');

			api.put(`/categories/${encodeURIComponent(cid)}/watch`, { state }, (err) => {
				if (err) {
					return alerts.error(err);
				}

				$('[component="category/watching/menu"]').toggleClass('hidden', state !== 'watching');
				$('[component="category/watching/check"]').toggleClass('fa-check', state === 'watching');

				$('[component="category/tracking/menu"]').toggleClass('hidden', state !== 'tracking');
				$('[component="category/tracking/check"]').toggleClass('fa-check', state === 'tracking');

				$('[component="category/notwatching/menu"]').toggleClass('hidden', state !== 'notwatching');
				$('[component="category/notwatching/check"]').toggleClass('fa-check', state === 'notwatching');

				$('[component="category/ignoring/menu"]').toggleClass('hidden', state !== 'ignoring');
				$('[component="category/ignoring/check"]').toggleClass('fa-check', state === 'ignoring');

				alerts.success('[[category:' + state + '.message]]');
			});
		});
	}

	function handleLoadMoreSubcategories() {
		$('[component="category/load-more-subcategories"]').on('click', async function () {
			const btn = $(this);
			const { categories: data } = await api.get(`/categories/${ajaxify.data.cid}/children?start=${ajaxify.data.nextSubCategoryStart}`);
			btn.toggleClass('hidden', !data.length || data.length < ajaxify.data.subCategoriesPerPage);
			if (!data.length) {
				return;
			}
			app.parseAndTranslate('category', 'children', { children: data }, function (html) {
				html.find('.timeago').timeago();
				$('[component="category/subcategory/container"]').append(html);
				ajaxify.data.nextSubCategoryStart += ajaxify.data.subCategoriesPerPage;
				ajaxify.data.subCategoriesLeft -= data.length;
				btn.toggleClass('hidden', ajaxify.data.subCategoriesLeft <= 0)
					.translateText('[[category:x-more-categories, ' + ajaxify.data.subCategoriesLeft + ']]');
			});

			return false;
		});
	}

	function handleDescription() {
		const fadeEl = document.querySelector('.description.clamp-fade-4');
		if (!fadeEl) {
			return;
		}

		fadeEl.addEventListener('click', () => {
			const state = fadeEl.classList.contains('line-clamp-4');
			fadeEl.classList.toggle('line-clamp-4', !state);
		});
	}

	Category.toTop = function () {
		navigator.scrollTop(0);
	};

	Category.toBottom = async () => {
		const { count } = await api.get(`/categories/${encodeURIComponent(ajaxify.data.category.cid)}/count`);
		navigator.scrollBottom(count - 1);
	};

	function loadTopicsAfter(after, direction, callback) {
		callback = callback || function () {};

		hooks.fire('action:topics.loading');
		const params = utils.params();
		infinitescroll.loadMore(`/categories/${encodeURIComponent(ajaxify.data.cid)}/topics`, {
			after: after,
			direction: direction,
			query: params,
			categoryTopicSort: params.sort || config.categoryTopicSort,
		}, function (data, done) {
			hooks.fire('action:topics.loaded', { topics: data.topics });
			callback(data, done);
		});
	}

	return Category;
});
