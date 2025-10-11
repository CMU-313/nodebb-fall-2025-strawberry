'use strict';

const assert = require('assert');
const fs = require('fs');
const path = require('path');

describe('Anonymous Posting Internationalization', () => {
	const languageDir = path.join(__dirname, '../public/language');
	const supportedLanguages = ['en-US', 'en-GB', 'de'];

	it('should have language files for all supported languages', () => {
		supportedLanguages.forEach(lang => {
			const langFile = path.join(languageDir, lang, 'admin', 'settings', 'post.json');
			assert(fs.existsSync(langFile), `Language file should exist for ${lang}`);
		});
	});

	it('should have enable-anonymous-posting key in all language files', () => {
		supportedLanguages.forEach(lang => {
			const langFile = path.join(languageDir, lang, 'admin', 'settings', 'post.json');
			const content = fs.readFileSync(langFile, 'utf8');
			const langData = JSON.parse(content);
			
			assert(langData['enable-anonymous-posting'], 
				`Language file ${lang} should contain 'enable-anonymous-posting' key`);
		});
	});

	it('should have non-empty translations for enable-anonymous-posting', () => {
		supportedLanguages.forEach(lang => {
			const langFile = path.join(languageDir, lang, 'admin', 'settings', 'post.json');
			const content = fs.readFileSync(langFile, 'utf8');
			const langData = JSON.parse(content);
			
			const translation = langData['enable-anonymous-posting'];
			assert(translation && translation.trim().length > 0, 
				`Language file ${lang} should have non-empty translation for 'enable-anonymous-posting'`);
		});
	});

	it('should have valid JSON in all language files', () => {
		supportedLanguages.forEach(lang => {
			const langFile = path.join(languageDir, lang, 'admin', 'settings', 'post.json');
			const content = fs.readFileSync(langFile, 'utf8');
			
			assert.doesNotThrow(() => {
				JSON.parse(content);
			}, `Language file ${lang} should contain valid JSON`);
		});
	});

	it('should have consistent key structure across language files', () => {
		const referenceFile = path.join(languageDir, 'en-US', 'admin', 'settings', 'post.json');
		const referenceContent = fs.readFileSync(referenceFile, 'utf8');
		const referenceData = JSON.parse(referenceContent);
		const referenceKeys = Object.keys(referenceData).sort();

		supportedLanguages.forEach(lang => {
			const langFile = path.join(languageDir, lang, 'admin', 'settings', 'post.json');
			const content = fs.readFileSync(langFile, 'utf8');
			const langData = JSON.parse(content);
			const langKeys = Object.keys(langData).sort();

			// Check that all keys from reference exist in this language file
			referenceKeys.forEach(key => {
				assert(langData.hasOwnProperty(key), 
					`Language file ${lang} should contain key '${key}' from reference file`);
			});
		});
	});

	it('should have appropriate translations for different languages', () => {
		const translations = {
			'en-US': 'Enable Anonymous Posting',
			'en-GB': 'Enable Anonymous Posting',
			'de': 'Anonyme Beiträge aktivieren'
		};

		Object.entries(translations).forEach(([lang, expectedTranslation]) => {
			const langFile = path.join(languageDir, lang, 'admin', 'settings', 'post.json');
			const content = fs.readFileSync(langFile, 'utf8');
			const langData = JSON.parse(content);
			
			assert.strictEqual(langData['enable-anonymous-posting'], expectedTranslation,
				`Language file ${lang} should have correct translation`);
		});
	});
});
