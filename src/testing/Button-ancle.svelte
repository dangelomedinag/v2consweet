<script>
	import { createEventDispatcher } from "svelte";
	const dispatch = createEventDispatcher();
	export let href = false;
	export let main = false;
	export let style = "";
</script>

<style>
	.link-item {
		/* reset */
		display: inline-block;
		position: relative;
		text-decoration: none;
		text-align: center;
		cursor: pointer;
		background-color: transparent;
		outline: none;
		appearance: none;
		text-decoration: none;
		border: none;
		color: skyblue;
		padding: 0;
		margin: 0;
	}

	.main {
		color: var(--primary);
		padding: 1em 3em;
		background-color: rgba(243, 101, 102, 0.05);
		border: none;
		transition: background 0.3s, color 0.3s;
		border-radius: 10px;
		font-weight: 700;
		width: 100%;
		margin-bottom: 0.8em;
	}

	.main:hover {
		background-color: var(--primary);
		color: white;
	}

	.badge {
		border-radius: 2em !important;
		font-size: 0.9em;
		/* padding: 0; */
		padding: 0.5em 0.6em;
		font-weight: 700;
		/* padding: 0.8em; */
		background-color: transparent;
		color: white;
		margin: 0 0.3em 0.8em 0;
		/* width: auto; */
		/* margin-bottom: 0.8em; */
	}

	.badge:hover {
		color: white;
		border-color: var(--primary);
		background-color: rgba(243, 101, 102, 0.2);
	}

	.outline {
		border: 1px solid rgba(255, 255, 255, 0.4);
		background-color: transparent;
	}
	.outline:hover {
		border: 1px solid var(--primary);
		background-color: transparent;
	}
</style>

{#if !href}
	<button on:click class={`link-item ${main ? 'main' : 'badge outline'}`}>
		<slot />
	</button>
{:else}
	<a {href} class={`link-item ${main ? 'main' : 'badge outline'}`}>
		<slot />
	</a>
{/if}
