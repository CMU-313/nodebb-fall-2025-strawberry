'use strict';

const assert = require('assert');
const fs = require('fs');
const path = require('path');

describe('Anonymous Posting Template', () => {
	const templateFile = path.join(__dirname, '../src/views/admin/settings/post.tpl');

	it('should have the post settings template file', () => {
		assert(fs.existsSync(templateFile), 'Post settings template should exist');
	});

	it('should contain the anonymous posting toggle in the template', () => {
		const content = fs.readFileSync(templateFile, 'utf8');
		
		// Check for the toggle input element
		assert(content.includes('id="enableAnonymousPosting"'), 
			'Template should contain toggle with correct ID');
		
		// Check for the data-field attribute
		assert(content.includes('data-field="enableAnonymousPosting"'), 
			'Template should contain data-field attribute for saving');
		
		// Check for the form-check classes
		assert(content.includes('form-check form-switch'), 
			'Template should use Bootstrap form switch classes');
	});

	it('should use the correct language key for the label', () => {
		const content = fs.readFileSync(templateFile, 'utf8');
		
		// Check for the language key
		assert(content.includes('[[admin/settings/post:enable-anonymous-posting]]'), 
			'Template should use the correct language key for the label');
	});

	it('should have proper form structure', () => {
		const content = fs.readFileSync(templateFile, 'utf8');
		
		// Check for proper form structure
		assert(content.includes('<input'), 'Template should contain input element');
		assert(content.includes('<label'), 'Template should contain label element');
		assert(content.includes('for="enableAnonymousPosting"'), 
			'Template should have proper label association');
	});

	it('should not have the toggle checked by default', () => {
		const content = fs.readFileSync(templateFile, 'utf8');
		
		// The toggle should not have 'checked' attribute by default
		const toggleLine = content.split('\n').find(line => 
			line.includes('id="enableAnonymousPosting"'));
		
		assert(toggleLine, 'Should find the toggle line');
		assert(!toggleLine.includes('checked'), 
			'Toggle should not be checked by default');
	});

	it('should be placed in the appropriate section', () => {
		const content = fs.readFileSync(templateFile, 'utf8');
		
		// Check that it's in the general settings section
		const lines = content.split('\n');
		const toggleIndex = lines.findIndex(line => 
			line.includes('id="enableAnonymousPosting"'));
		const generalSectionIndex = lines.findIndex(line => 
			line.includes('admin/settings/post:general'));
		
		assert(toggleIndex > -1, 'Should find toggle in template');
		assert(generalSectionIndex > -1, 'Should find general section in template');
		assert(toggleIndex > generalSectionIndex, 
			'Toggle should be placed after the general section header');
	});
});
