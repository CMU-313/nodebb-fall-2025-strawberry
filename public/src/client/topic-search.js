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

            api.get('/api/v3/topics/search', { q: query, fuzzy: fuzzy }).then(function (res) {
                var topics = (res && res.topics) || (res && res.response && res.response.topics) || res || [];
                hooks.fire('action:topic.search.results', { query: query, fuzzy: fuzzy, results: topics });
                try {
                    var templateName = (ajaxify && ajaxify.data && ajaxify.data.template && ajaxify.data.template.name) ? ajaxify.data.template.name : 'recent';
                    var tplData = {
                        topics: Array.isArray(topics) ? topics : [],
                        showSelect: false,
                        template: {},
                    };
                    tplData.template[templateName] = true;

                    var topicListEl = $('[component="category"]').filter(function (i, e) {
                        return !$(e).parents('[widget-area],[data-widget-area]').length;
                    });

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