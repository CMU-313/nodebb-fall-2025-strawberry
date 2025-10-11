'use strict';

const db = require('../postgres');

module.exports = {
	async up() {
		await db.pool.query(`
		ALTER TABLE posts
		ADD COLUMN IF NOT EXISTS endorsements INTEGER DEFAULT 0;
		`);
	},

	async down() {
		await db.pool.query(`
		ALTER TABLE posts
		DROP COLUMN IF EXISTS endorsements;
		`);
	},
};
