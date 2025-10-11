'use strict';

define('admin/settings/search', ['admin/settings'], function (Settings) {
	const Module = {};

	Module.init = async function () {
		// Register this page with admin settings so values are saved/loaded automatically
		if (Settings && typeof Settings.register === 'function') {
			Settings.register('search');
		}
	};

	return Module;
});
