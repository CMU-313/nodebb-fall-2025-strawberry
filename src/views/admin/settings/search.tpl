<div class="acp-page-container">
	<!-- IMPORT admin/partials/settings/header.tpl -->

	<div class="row settings m-0">
		<div id="spy-container" class="col-12 col-md-8 px-0 mb-4" tabindex="0">
			<div id="search-settings" class="mb-4">
				<h5 class="fw-bold tracking-tight settings-header hidden">[[admin/settings/search:search]]</h5>
				<div class="mb-3">
					<label class="form-label">[[admin/settings/search:fuzzy-sensitivity]]</label>
					<input type="number" class="form-control" value="20" data-field="fuzzySensitivity" min="0" max="100">
					<div class="form-text">[[admin/settings/search:fuzzy-sensitivity-help]]</div>
				</div>
			</div>
		</div>

		<!-- IMPORT admin/partials/settings/toc.tpl -->
	</div>
</div>
