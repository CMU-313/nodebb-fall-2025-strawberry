'use strict';

define('forum/recent', ['topicList', 'forum/topic-search'], function (topicList, TopicSearch) {
	const Recent = {};

	Recent.init = function () {
		app.enterRoom('recent_topics');

		topicList.init('recent');

		if (TopicSearch && typeof TopicSearch.init === 'function') {
			TopicSearch.init();
		}
	};

	return Recent;
});
