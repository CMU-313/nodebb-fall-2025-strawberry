<div class="search flex-fill">
	<div id="advanced-search" class="d-flex flex-column flex-md-row">
		<!-- sidebar -->
		<div class="flex-shrink-0 pe-2 border-end-md text-sm mb-3" style="flex-basis: 240px!important;">
			<form action="{config.relative_path}/search" method="get" class="nav sticky-md-top d-flex flex-row flex-md-column flex-wrap gap-3 pe-md-3" style="top: 1rem; z-index: 1;">
				<h2 class="fw-semibold tracking-tight mb-0">[[global:search]]</h2>

				<input id="search-input" name="term" type="text" class="form-control fw-semibold py-2 ps-2 pe-3" id="search-input" placeholder="[[search:type-to-search]]">

				<select id="search-in" name="in" class="form-select text-sm py-2 ps-2 pe-3">
					<option value="titlesposts">[[search:in-titles-posts]]</option>
					<option value="titles">[[search:in-titles]]</option>
					<option value="posts">[[search:in-posts]]</option>
					<option value="bookmarks">[[search:in-bookmarks]]</option>
					<option value="categories">[[search:in-categories]]</option>
					{{{if privileges.search:users}}}
					<option value="users">[[search:in-users]]</option>
					{{{end}}}
					{{{if privileges.search:tags}}}
					<option value="tags">[[search:in-tags]]</option>
					{{{end}}}
				</select>

				<select id="match-words-filter" name="matchWords" class="post-search-item form-select text-sm py-2 ps-2 pe-3">
					<option value="all">[[search:match-all-words]]</option>
					<option value="any">[[search:match-any-word]]</option>
				</select>

				<select id="show-results-as" name="showAs" class="post-search-item form-select text-sm py-2 ps-2 pe-3">
					<option value="posts" selected>[[search:show-results-as-posts]]</option>
					<option value="topics">[[search:show-results-as-topics]]</option>
				</select>

				<div class="form-check mb-3">
					<input type="checkbox" class="form-check-input" id="search-fuzzy-toggle" name="fuzzySearch">
					<label class="form-check-label" for="search-fuzzy-toggle">[[search:enable-fuzzy-search]]</label>
				</div>

				<div class="fuzzy-sensitivity-container" style="display: none;">
					<label for="search-fuzzy-sensitivity" class="form-label text-sm">[[search:fuzzy-sensitivity]]: <span class="fuzzy-value">20</span>%</label>
					<input type="range" class="form-range" id="search-fuzzy-sensitivity" name="fuzzySensitivity" value="20" min="0" max="100">
				</div>

				<button type="submit" class="btn btn-primary fw-semibold form-control py-2 px-3">[[global:search]]</button>
			</form>
		</div>

		<!-- filters and search results -->
		<div class="flex-grow-1 ps-md-2 ps-lg-5" style="min-width:0;">
			<div class="d-flex flex-column gap-3">
				<!-- IMPORT partials/search-filters.tpl -->
				<!-- IMPORT partials/search-results.tpl -->
			</div>
		</div>
	</div>
</div>
