'use strict';

const db = require('../database');
const plugins = require('../plugins');
const privileges = require('../privileges');

module.exports = function (Posts) {
	Posts.endorse = async function (pid, uid) {
		return await toggleEndorse('endorse', pid, uid);
	};

	Posts.unendorse = async function (pid, uid) {
		return await toggleEndorse('unendorse', pid, uid);
	};

	async function toggleEndorse(type, pid, uid) {
		if (parseInt(uid, 10) <= 0) {
			throw new Error('[[error:not-logged-in]]');
		}

		const isEndorsing = type === 'endorse';

		// Check if user is staff (admin or moderator)
		const cid = await Posts.getCidByPid(pid);
		const isAdminOrMod = await privileges.categories.isAdminOrMod(cid, uid);

		if (!isAdminOrMod) {
			throw new Error('[[error:no-privileges]]');
		}

		const [postData, hasEndorsed] = await Promise.all([
			Posts.getPostFields(pid, ['pid', 'uid']),
			Posts.hasEndorsed(pid, uid),
		]);

		if (isEndorsing && hasEndorsed) {
			throw new Error('[[error:already-endorsed]]');
		}

		if (!isEndorsing && !hasEndorsed) {
			throw new Error('[[error:already-unendorsed]]');
		}

		if (isEndorsing) {
			await db.setAdd(`pid:${pid}:endorsed`, uid);
			await Posts.setPostField(pid, 'endorsed', 1);
		} else {
			await db.setRemove(`pid:${pid}:endorsed`, uid);
			await Posts.setPostField(pid, 'endorsed', 0);
		}

		plugins.hooks.fire(`action:post.${type}`, {
			pid: pid,
			uid: uid,
			owner: postData.uid,
			current: hasEndorsed ? 'endorsed' : 'unendorsed',
		});

		return {
			post: postData,
			isEndorsed: isEndorsing,
		};
	}

	Posts.hasEndorsed = async function (pid, uid) {
		if (parseInt(uid, 10) <= 0) {
			return Array.isArray(pid) ? pid.map(() => false) : false;
		}

		if (Array.isArray(pid)) {
			const sets = pid.map(pid => `pid:${pid}:endorsed`);
			return await db.isMemberOfSets(sets, uid);
		}
		return await db.isSetMember(`pid:${pid}:endorsed`, uid);
	};
};
