#!/usr/bin/env node
'use strict';

const PostsModule = require('../src/posts');

(async function () {
	try {
		const Posts = PostsModule({});
		const payload = { uid: 1, tid: 1, content: 'Script anonymous test', isAnonymous: 1 };
		const created = await Posts.create(payload);
		console.log('created', created);
		const post = await Posts.getPostData(created.pid);
		console.log('retrieved isAnonymous:', post.isAnonymous);
	} catch (err) {
		console.error(err);
		process.exit(1);
	}
})();
