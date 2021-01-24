<script>
	export let categories,
		filter = "todos",
		sort = "menor";
</script>

<style>
	.select {
		text-align: center;
		padding: 1em;
	}

	.select__item {
		display: inline-block;
		color: var(--primary);
		background-color: var(--primary-opacity-1);
		border-radius: 5px;
		/* border: 1px solid var(--primary); */
	}
	.select__item:hover {
		background-color: var(--primary-opacity-2);
	}
</style>

<div class="select">
	<select class="select__item select__filter" bind:value={filter}>
		<option class="select__option" value="todos">todos</option>
		{#each categories as { nombre: name, id }}
			<option class="select__option" value={id}>
				{name}
			</option>
		{/each}
	</select>

	<select class="select__item select_sort" bind:value={sort}>
		<option class="select__option" value="menor">menor precio</option>
		<option class="select__option" value="mayor">mayor precio</option>
	</select>
</div>
