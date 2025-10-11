'use strict';

const db = require('../database');
const user = require('../user');
const plugins = require('../plugins');

module.exports = function (Posts) {
	Posts.endorse = async function (pid, uid) {
		const canEndorse = await canUserEndorse(uid);
		if (!canEndorse) {
			throw new Error('[[error:no-privileges]]');
		}

		const [postData, hasEndorsed] = await Promise.all([
			Posts.getPostFields(pid, ['pid', 'uid', 'tid']),
			Posts.hasEndorsed(pid, uid),
		]);

		if (hasEndorsed) {
			throw new Error('[[error:already-endorsed]]');
		}

		await Promise.all([
			db.setAdd(`pid:${pid}:endorsers`, uid),
			db.incrObjectField(`post:${pid}`, 'endorsements'),
		]);

		plugins.hooks.fire('action:post.endorse', {
			pid: pid,
			uid: uid,
			owner: postData.uid,
		});

		return {
			post: postData,
			isEndorsed: true,
		};
	};

	Posts.unendorse = async function (pid, uid) {
		const canEndorse = await canUserEndorse(uid);
		if (!canEndorse) {
			throw new Error('[[error:no-privileges]]');
		}

		const [postData, hasEndorsed] = await Promise.all([
			Posts.getPostFields(pid, ['pid', 'uid', 'tid']),
			Posts.hasEndorsed(pid, uid),
		]);

		if (!hasEndorsed) {
			throw new Error('[[error:not-endorsed]]');
		}

		await Promise.all([
			db.setRemove(`pid:${pid}:endorsers`, uid),
			db.decrObjectField(`post:${pid}`, 'endorsements'),
		]);

		plugins.hooks.fire('action:post.unendorse', {
			pid: pid,
			uid: uid,
			owner: postData.uid,
		});

		return {
			post: postData,
			isEndorsed: false,
		};
	};

	Posts.hasEndorsed = async function (pid, uid) {
		if (parseInt(uid, 10) <= 0) {
			return Array.isArray(pid) ? pid.map(() => false) : false;
		}

		if (Array.isArray(pid)) {
			const sets = pid.map(pid => `pid:${pid}:endorsers`);
			return await db.isMemberOfSets(sets, uid);
		}
		return await db.isSetMember(`pid:${pid}:endorsers`, uid);
	};

	Posts.getEndorsers = async function (pid) {
		const endorserUids = await db.getSetMembers(`pid:${pid}:endorsers`);
		if (!endorserUids.length) {
			return [];
		}
		return await user.getUsersFields(endorserUids, ['uid', 'username', 'userslug', 'picture']);
	};
};

async function canUserEndorse(uid) {
	if (parseInt(uid, 10) <= 0) {
		return false;
	}

	const [isAdmin, isGlobalMod, isMod] = await Promise.all([
		user.isAdministrator(uid),
		user.isGlobalModerator(uid),
		user.isModerator(uid),
	]);

	return isAdmin || isGlobalMod || isMod;
}