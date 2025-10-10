/* eslint-env mocha */
'use strict';

require('./helpers/mute-logging');

const assert = require('assert');

describe('Topics.getTopicsByTitleKeywords', function () {
	let Topics;
	let db;
	let privileges;
	let originalGetSortedSetRevRange;
	let originalFilterTids;
	let originalGetTopicsFields;
	let originalGetTopicsByTids;

	beforeEach(function () {
		// require fresh copy
		delete require.cache[require.resolve('../src/topics')];
		Topics = require('../src/topics');
		db = require('../src/database');
		privileges = require('../src/privileges');

		// Save original functions
		originalGetSortedSetRevRange = db.getSortedSetRevRange;
		originalFilterTids = privileges.topics.filterTids;
		originalGetTopicsFields = Topics.getTopicsFields;
		originalGetTopicsByTids = Topics.getTopicsByTids;

		// lightweight stub to avoid heavy downstream loading
		Topics.getTopicsByTids = async function (tids) {
			return tids.map(tid => ({ tid }));
		};
	});

	afterEach(function () {
		// Restore original functions to prevent test pollution
		if (originalGetSortedSetRevRange) {
			db.getSortedSetRevRange = originalGetSortedSetRevRange;
		}
		if (originalFilterTids && privileges.topics) {
			privileges.topics.filterTids = originalFilterTids;
		}
		if (originalGetTopicsFields) {
			Topics.getTopicsFields = originalGetTopicsFields;
		}
		if (originalGetTopicsByTids) {
			Topics.getTopicsByTids = originalGetTopicsByTids;
		}
	});

	it('returns matching topics with strict matching', async function () {
		// stub db and privileges
		const tids = [1, 2, 3];
		db.getSortedSetRevRange = async () => tids;
		privileges.topics.filterTids = async () => tids;
		Topics.getTopicsFields = async () => [
			{ tid: 1, title: 'Hello World' },
			{ tid: 2, title: 'Fuzzy Search' },
			{ tid: 3, title: 'Another hello' },
		];

		const res = await Topics.getTopicsByTitleKeywords(1, 'hello', 0, 10, false);
		assert(Array.isArray(res));
		// should include tids 1 and 3
		const returnedTids = res.map(t => t.tid);
		assert(returnedTids.includes(1));
		assert(returnedTids.includes(3));
	});

	it('returns matching topics with fuzzy matching', async function () {
		const tids = [1, 2];
		db.getSortedSetRevRange = async () => tids;
		privileges.topics.filterTids = async () => tids;
		Topics.getTopicsFields = async () => [
			{ tid: 1, title: 'NodeBB Forum' },
			{ tid: 2, title: 'JavaScript Tutorial' },
		];

		// misspelled query 'NodeBB' -> 'NodBB' (missing 'e') should fuzzy match
		const resStrict = await Topics.getTopicsByTitleKeywords(1, 'NodBB', 0, 10, false);
		assert(Array.isArray(resStrict));
		// strict shouldn't match
		assert.strictEqual(resStrict.length, 0);

		const resFuzzy = await Topics.getTopicsByTitleKeywords(1, 'NodBB', 0, 10, true);
		assert(Array.isArray(resFuzzy));
		assert(resFuzzy.length >= 1);
	});
});
