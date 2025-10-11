/* topic-search client helper: toggles fuzzy mode and triggers a search with a fuzzy parameter */
'use strict';

define('forum/topic-search', ['components', 'api', 'hooks', 'storage'], function (components, api, hooks, storage) {
	var TopicSearch = {};
	var storageKey = 'topic:search:fuzzy';

	TopicSearch.init = function () {
		var selected = storage.getItem(storageKey) === '1';
		var toggleSelector = '[component="topic/toggle"]';

		$(document).on('click', toggleSelector, function () {
			var el = $(this);
			var isSelected = el.attr('data-selected') === '1' || el.attr('data-selected') === 'true';
			var newSelected = !isSelected;
			el.attr('data-selected', newSelected ? '1' : '0');
			storage.setItem(storageKey, newSelected ? '1' : '0');
			el.toggleClass('active', newSelected);
		});

		// Trigger a topic search — append fuzzy flag to available search form or call API
		$(document).on('click', '[component="topic/search"]', function () {
			var input = $('[component="topic/input"]');
			var query = input.val();
			if (!query) { return; }

			var fuzzy = storage.getItem(storageKey) === '1';
			hooks.fire('action:topic.searching', { query: query, fuzzy: fuzzy });

			var form = $('[component="navbar"] [component="search/form"], [component="sidebar/right"] [component="search/form"]').first();
			if (form.length) {
				form.find('input[name="fuzzy"]').remove();
				form.append($('<input type="hidden" name="fuzzy">').val(fuzzy ? '1' : '0'));
				form.find('[component="search/submit"]').trigger('click');
				return;
			}

			// call the new topics search API if available
			api.get('/api/v3/topics/search', { q: query, fuzzy: fuzzy }).then(function (res) {
				// normalize topics shape: support response.topics envelope and legacy shapes
				var topics = (res && res.topics) || (res && res.response && res.response.topics) || res || [];
				// fire a searching hook
				hooks.fire('action:topic.search.results', { query: query, fuzzy: fuzzy, results: topics });
				try {
					// Render results into topic list similar to TopicList.onTopicsLoaded
					var templateName = (ajaxify && ajaxify.data && ajaxify.data.template && ajaxify.data.template.name) ? ajaxify.data.template.name : 'recent';
					var tplData = {
						topics: Array.isArray(topics) ? topics : [],
						showSelect: false,
						template: {},
					};
					tplData.template[templateName] = true;

					// find topic list element (replicating TopicList.findTopicListElement)
					var topicListEl = $('[component="category"]').filter(function (i, e) {
						return !$(e).parents('[widget-area],[data-widget-area]').length;
					});

					// parse and render
					if (window.app && typeof window.app.parseAndTranslate === 'function') {
						window.app.parseAndTranslate(templateName, 'topics', tplData, function (html) {
							topicListEl.empty();
							topicListEl.append(html);
							html.find('.timeago').timeago();
							hooks.fire('action:topics.loaded', { topics: tplData.topics, template: templateName });
						});
					}
				} catch (e) {
					// rendering failed, ignore — hook already fired
				}
			}).catch(function () {
				// fallback: old topics endpoint
				api.get('/topics', { query: query, fuzzy: fuzzy }).then(function (res) {
					var topics = (res && res.topics) || (res && res.response && res.response.topics) || res || [];
					hooks.fire('action:topic.search.results', { query: query, fuzzy: fuzzy, results: topics });
				}).catch(function (e) {
					console.error('Topic search failed', e);
				});
			});
		});

		$(document).on('click', '[component="topic/search/clear"]', function () {
			$('[component="topic/input"]').val('');
		});

		$(toggleSelector).each(function () {
			var el = $(this);
			el.attr('data-selected', selected ? '1' : '0');
			el.toggleClass('active', selected);
		});
	};

	return TopicSearch;
});
