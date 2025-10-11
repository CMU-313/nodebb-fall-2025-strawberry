'use strict';

const assert = require('assert');
const user = require('../src/user');
const categories = require('../src/categories');
const topics = require('../src/topics');
const posts = require('../src/posts');

describe('isAnonymous behaviour (server-side)', function () {
	it('should store isAnonymous and mask the public user in summaries', async function () {
		// Create a test user
		const uid = await user.create({ username: `anonTester_${Date.now()}` });

		// Create a category
		const { cid } = await categories.create({ name: `anon-cat-${Date.now()}` });

		// Create a topic as the user
		const { topicData } = await topics.post({ uid, cid, title: 'Anon test topic', content: 'Some valid content to create a topic.' });
		const tid = topicData && topicData.tid;
		assert.ok(tid);

		// Reply with isAnonymous flag
		const reply = await topics.reply({ uid, tid, content: 'Anonymous reply', isAnonymous: 1 });
		const pid = reply && reply.pid;
		assert.ok(pid);

		// Verify stored post has isAnonymous set
		const stored = await posts.getPostData(pid);
		const storedIsAnon = stored.isAnonymous === 1 || stored.isAnonymous === true;
		assert.strictEqual(storedIsAnon, true);

		// Verify summary masks the public user
		const summaries = await posts.getPostSummaryByPids([pid], 0, {});
		assert.ok(Array.isArray(summaries) && summaries.length === 1);
		const summary = summaries[0];
		assert.strictEqual(summary.isAnonymous, true);
		assert.strictEqual(summary.user && (summary.user.username === 'Anonymous' || summary.user.displayname === 'Anonymous'), true);
	});
});
