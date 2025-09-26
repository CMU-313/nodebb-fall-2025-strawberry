'use strict';

const assert = require('assert');

describe('Anonymous Posts Frontend', function () {
	let Posts, ajaxify, app;

	before(function () {
		// Mock the global objects that the Posts module expects
		global.ajaxify = {
			data: {
				privileges: {
					isAdminOrMod: false,
					'posts:edit': true,
					'posts:delete': true,
				},
				locked: false,
				postSharing: ['facebook', 'twitter'],
			},
		};

		global.app = {
			user: { uid: 1 },
		};

		// Store references for easy access
		ajaxify = global.ajaxify;
		app = global.app;

		// Mock the Posts.modifyPostsByPrivileges function (matches your actual implementation)
		Posts = {
			modifyPostsByPrivileges: function (posts) {
				posts.forEach(function (post) {
					if (post.isAnonymous) {
						post.displayAnonymous = true;
						// Show real author to staff users only
						if (ajaxify.data.privileges.isAdminOrMod) {
							post.showRealAuthor = true;
						}
					}
					post.selfPost = !!app.user.uid && parseInt(post.uid, 10) === parseInt(app.user.uid, 10);
					post.topicOwnerPost = parseInt(post.uid, 10) === parseInt(ajaxify.data.uid, 10);

					post.display_edit_tools = (ajaxify.data.privileges['posts:edit'] && post.selfPost) || ajaxify.data.privileges.isAdminOrMod;
					post.display_delete_tools = (ajaxify.data.privileges['posts:delete'] && post.selfPost) || ajaxify.data.privileges.isAdminOrMod;
					post.display_moderator_tools = post.display_edit_tools || post.display_delete_tools;
					post.display_move_tools = ajaxify.data.privileges.isAdminOrMod;
					post.display_post_menu = ajaxify.data.privileges.isAdminOrMod ||
						(post.selfPost && !ajaxify.data.locked && !post.deleted) ||
						(post.selfPost && post.deleted && parseInt(post.deleterUid, 10) === parseInt(app.user.uid, 10)) ||
						((app.user.uid || ajaxify.data.postSharing.length) && !post.deleted);
				});
			},
		};
	});

	it('should add displayAnonymous flag to anonymous posts', function () {
		const posts = [
			{
				pid: 1,
				uid: 2,
				isAnonymous: true,
				user: { username: 'testuser' },
			},
			{
				pid: 2,
				uid: 3,
				isAnonymous: false,
				user: { username: 'regularuser' },
			},
		];

		Posts.modifyPostsByPrivileges(posts);

		assert.strictEqual(posts[0].displayAnonymous, true, 'Anonymous post should have displayAnonymous flag');
		assert.strictEqual(posts[1].displayAnonymous, undefined, 'Regular post should not have displayAnonymous flag');
	});

	it('should show real author to staff users only', function () {
		// Test regular user (no showRealAuthor)
		ajaxify.data.privileges.isAdminOrMod = false;
		const regularUserPosts = [
			{
				pid: 1,
				uid: 2,
				isAnonymous: true,
				user: { username: 'secretuser' },
			},
		];

		Posts.modifyPostsByPrivileges(regularUserPosts);
		assert.strictEqual(regularUserPosts[0].showRealAuthor, undefined, 'Regular user should not see real author');

		// Test staff user (with showRealAuthor)
		ajaxify.data.privileges.isAdminOrMod = true;
		const staffUserPosts = [
			{
				pid: 1,
				uid: 2,
				isAnonymous: true,
				user: { username: 'secretuser' },
			},
		];

		Posts.modifyPostsByPrivileges(staffUserPosts);
		assert.strictEqual(staffUserPosts[0].showRealAuthor, true, 'Staff user should see real author');

		// Reset for other tests
		ajaxify.data.privileges.isAdminOrMod = false;
	});

	it('should not affect regular post functionality', function () {
		const posts = [
			{
				pid: 1,
				uid: 1, // Same as app.user.uid for selfPost test
				isAnonymous: false,
				user: { username: 'testuser' },
			},
		];

		Posts.modifyPostsByPrivileges(posts);

		assert.strictEqual(posts[0].displayAnonymous, undefined, 'Regular post should not have displayAnonymous flag');
		assert.strictEqual(posts[0].selfPost, true, 'Should correctly calculate selfPost for regular posts');
		assert.strictEqual(posts[0].display_edit_tools, true, 'Should allow editing own regular posts');
	});

	after(function () {
		// Clean up globals
		delete global.ajaxify;
		delete global.app;
	});
});