<div class="topic-search-bar">
	<div class="input-group">
		<input type="text" class="form-control" id="topic-search-input" placeholder="[[global:search]]" data-bs-toggle="dropdown">
		<div class="input-group-text search-button">
			<i class="fa fa-search"></i>
		</div>
		<div class="dropdown-menu p-2" style="width: 350px;">
			<div class="mb-2">
				<div class="form-check">
					<input type="checkbox" class="form-check-input" id="fuzzy-search-toggle">
					<label class="form-check-label" for="fuzzy-search-toggle">Enable Fuzzy Search</label>
				</div>
				<div class="fuzzy-sensitivity-wrapper" style="display: none;">
					<input type="range" class="form-range" id="fuzzy-sensitivity" min="0" max="100" value="20">
					<small class="text-muted">Sensitivity: <span class="sensitivity-value">20</span>%</small>
				</div>
			</div>
			<div class="results"></div>
		</div>
	</div>
</div>