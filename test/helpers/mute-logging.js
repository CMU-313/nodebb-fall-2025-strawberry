'use strict';
// Disable winston transports during tests to avoid polluting test output
try {
	const winston = require('winston');
	if (winston && winston.loggers) {
		// Replace transports with a single silent console transport so logs are suppressed
		try {
			if (winston.configure) {
				winston.configure({ transports: [new winston.transports.Console({ silent: true })] });
			} else if (winston.add) {
				winston.add(new winston.transports.Console({ silent: true }));
			}
		} catch (e) {
			// best-effort fallback: ignore
		}
	}
} catch (e) {
	// ignore
}
