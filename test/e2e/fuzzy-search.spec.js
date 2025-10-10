// Playwright E2E test scaffold for fuzzy search flow
// Note: This test requires Playwright and a running NodeBB instance accessible at http://localhost:4567
// Install Playwright: npm i -D @playwright/test
// Run with: npx playwright test test/e2e/fuzzy-search.spec.js

const { test, expect } = require('@playwright/test');

test.describe('Fuzzy topic search', () => {
	test('fuzzy toggle enables fuzzy matching', async ({ page }) => {
		// Adjust URL as needed for your instance
		await page.goto('http://localhost:4567/recent');

		// Ensure search input exists
		const searchInput = await page.waitForSelector('[component="topic/input"]', { timeout: 5000 });
		// Type a misspelled query
		await searchInput.fill('Nodb');

		// Enable fuzzy toggle if not enabled
		const toggle = await page.$('[component="topic/toggle"]');
		if (toggle) {
			const isSelected = await toggle.getAttribute('data-selected');
			if (!isSelected || isSelected === '0' || isSelected === 'false') {
				await toggle.click();
			}
		}

		// Trigger search button
		const searchBtn = await page.$('[component="topic/search"]');
		await searchBtn.click();

		// Wait for results to load and expect a topic that matches fuzzily
		// This is application-specific; adjust selector for topic title and expected text
		const topicSelector = '[component="category/topic"] .topic-title';
		await page.waitForSelector(topicSelector, { timeout: 5000 });
		const titles = await page.$$eval(topicSelector, els => els.map(e => e.textContent.trim()));

		// Expect at least one title contains 'Node' (from 'Nodebb' example)
		expect(titles.some(t => /Node/i.test(t))).toBeTruthy();

		// Now disable fuzzy and expect that misspelled query yields no results (or fewer)
		if (toggle) {
			await toggle.click();
		}
		await searchBtn.click();
		// small wait
		await page.waitForTimeout(800);
		const titlesAfter = await page.$$eval(topicSelector, els => els.map(e => e.textContent.trim()));
		// Strict search should not match the misspelled term
		expect(titlesAfter.some(t => /Node/i.test(t))).toBeFalsy();
	});
});
