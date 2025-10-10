
'use strict';

module.exports = {
	name: 'Add default search settings',
	timestamp: Date.UTC(2025, 9, 1),
	method: async function () {
		const meta = require('../../meta');
		await meta.settings.setOnEmpty('search', { fuzzySensitivity: 20 });
	},
};
