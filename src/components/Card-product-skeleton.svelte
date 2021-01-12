<script>
	import { onMount } from "svelte";
	import { quintInOut, quintOut } from "svelte/easing";
	import { scale, draw } from "svelte/transition";
	import SpinLoader from "./Spin-loader.svelte";
</script>

<style>
	/* animations */
	@keyframes load-overlay {
		from {
			transform: translate(-100%);
		}
		to {
			transform: translate(100%);
		}
	}

	/* loading card */
	.load-overlay {
		position: relative;
		overflow: hidden;
	}

	.load-overlay::before {
		content: "";
		display: block;
		position: absolute;
		top: 0;
		height: 100%;
		width: 100%;
		background: linear-gradient(
			to right,
			transparent 0%,
			var(--neutral-opacity-2) 50%,
			var(--neutral-opacity-2) 50%,
			transparent 100%
		);
		/* transform: translate(-150%); */
		animation: load-overlay 2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
	}

	/* card */
	.wrapper {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		background-color: var(--neutral-opacity-1);
		border: 1px solid var(--neutral-opacity-2);
		width: 100%;
		max-width: 350px;
		height: 300px;
		margin: 0;
		position: relative;
		overflow: hidden;
		border-radius: 10px 10px 10px 10px;
		transform: scale(0.95);
	}

	.top,
	.bottom {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
	}

	.top {
		background-color: var(--neutral-opacity-1);
		height: 100%;
	}
	.bottom {
		height: 20%;
	}

	@media (min-width: 768px) {
		.wrapper {
			width: 350px;
			height: 300px;
		}
	}
</style>

<article
	transition:scale={{ duration: 800, easing: quintInOut, start: 0.8 }}
	class="wrapper load-overlay">
	<div class="top">
		<SpinLoader />
	</div>
	<div class="bottom">
		<div>cargando...</div>
	</div>
</article>
