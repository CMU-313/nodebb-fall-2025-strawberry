'use strict';

const assert = require('assert');
const Posts = require('../src/posts');

describe('isAnonymous field', function () {
	it('should store and retrieve isAnonymous for a post', async function () {
		// Use uid=1 and tid=1 which the test harness typically provides
		const payload = {
			uid: 1,
			tid: 1,
			content: 'Test anonymous post',
			isAnonymous: 1,
		};

		const created = await Posts.create(payload);
		assert.ok(created.pid, 'post created');

		const post = await Posts.getPostData(created.pid);
		assert.ok(post, 'retrieved post');
		const isAnon = post.isAnonymous === 1 || post.isAnonymous === true;
		assert.strictEqual(isAnon, true, 'isAnonymous persisted');
	});
});
