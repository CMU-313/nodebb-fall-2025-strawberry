<div class="topic-list-header d-flex flex-wrap gap-2 align-items-center mb-2">
	<div class="d-flex gap-2 align-items-center flex-grow-1">
		<!-- IMPORT partials/topic-search-bar.tpl -->
	</div>
	<div class="d-flex gap-2 align-items-center">
		<div component="category/topic/tools" class="btn-group">
			<!-- IMPORT partials/category-tools.tpl -->
		</div>
		<div class="dropdown">
			<button type="button" class="btn btn-outline-secondary" data-bs-toggle="dropdown">
				{{{ if selectedFilter }}}
				<span class="fw-semibold">{selectedFilter.name}</span>
				{{{ else }}}
				[[topic:filter]]
				{{{ end }}}
				<i class="fa fa-fw fa-caret-down"></i>
			</button>
			<ul class="dropdown-menu dropdown-menu-end">
				{{{each filters}}}
				<li>
					<a class="dropdown-item" href="{config.relative_path}/{filters.url}" data-url="{filters.url}">
						{filters.name}
					</a>
				</li>
				{{{end}}}
			</ul>
		</div>
	</div>
</div>