// Playwright E2E test for fuzzy search
const { test, expect } = require('@playwright/test');

test.describe('Fuzzy search functionality', () => {
	test('fuzzy toggle enables fuzzy matching', async ({ page }) => {
		await page.goto('http://localhost:4567/search');

		// Wait for search form to be ready
		const searchForm = await page.waitForSelector('[component="search/form"]');
		const searchInput = await searchForm.waitForSelector('input[name="query"]');
		const fuzzyToggle = await page.waitForSelector('#search-fuzzy-toggle');

		// Try searching with a misspelled word without fuzzy search
		await searchInput.fill('Nodbb'); // Misspelling of NodeBB
		await page.keyboard.press('Enter');

		// Wait for results and verify no exact matches
		await page.waitForTimeout(1000); // Allow time for search results
		const initialResults = await page.$$('[component="search/results"] .topic-title');
		const initialTexts = await Promise.all(initialResults.map(r => r.textContent()));
		const initialHasMatch = initialTexts.some(text => text.toLowerCase().includes('nodebb'));
		expect(initialHasMatch).toBeFalsy();

		// Enable fuzzy search and adjust sensitivity
		await fuzzyToggle.click();
		const sensitivitySlider = await page.waitForSelector('#search-fuzzy-sensitivity');
		await sensitivitySlider.fill('30');

		// Search again with fuzzy enabled
		await page.keyboard.press('Enter');

		// Should find "NodeBB" topics now
		await page.waitForTimeout(1000);
		const fuzzyResults = await page.$$('[component="search/results"] .topic-title');
		const fuzzyTexts = await Promise.all(fuzzyResults.map(r => r.textContent()));
		const fuzzyHasMatch = fuzzyTexts.some(text => text.toLowerCase().includes('nodebb'));
		expect(fuzzyHasMatch).toBeTruthy();
	});

	test('fuzzy sensitivity affects match tolerance', async ({ page }) => {
		await page.goto('http://localhost:4567/search');

		// Setup search components
		const searchForm = await page.waitForSelector('[component="search/form"]');
		const searchInput = await searchForm.waitForSelector('input[name="query"]');
		const fuzzyToggle = await page.waitForSelector('#search-fuzzy-toggle');
		
		// Enable fuzzy search
		await fuzzyToggle.click();
		const sensitivitySlider = await page.waitForSelector('#search-fuzzy-sensitivity');

		// Test with low sensitivity (strict matching)
		await sensitivitySlider.fill('10');
		await searchInput.fill('Nodbb');
		await page.keyboard.press('Enter');
		
		await page.waitForTimeout(1000);
		const strictResults = await page.$$('[component="search/results"] .topic-title');
		const strictMatchCount = strictResults.length;

		// Test with high sensitivity (more lenient matching)
		await sensitivitySlider.fill('50');
		await page.keyboard.press('Enter');
		
		await page.waitForTimeout(1000);
		const lenientResults = await page.$$('[component="search/results"] .topic-title');
		const lenientMatchCount = lenientResults.length;

		// Higher sensitivity should find more matches
		expect(lenientMatchCount).toBeGreaterThan(strictMatchCount);
	});
});
