<script>
	import { onMount } from "svelte";

	import { quintInOut, quintOut } from "svelte/easing";
	import { scale, draw } from "svelte/transition";
</script>

<style>
	/* animations */
	@keyframes load {
		from {
			transform: translate(-100%);
		}
		to {
			transform: translate(100%);
		}
	}

	/* loading card */
	.loading-animated {
		position: relative;
		overflow: hidden;
	}

	.loading-animated::before {
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
		animation: load 2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
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
		/* background-color: var(--neutral-opacity-1); */
		height: 20%;
	}

	@media (min-width: 768px) {
		.wrapper {
			width: 350px;
			height: 300px;
		}
	}
	.lds-ellipsis {
		display: inline-block;
		position: relative;
		width: 80px;
		height: 80px;
	}
	.lds-ellipsis div {
		position: absolute;
		top: 33px;
		width: 9px;
		height: 9px;
		border-radius: 50%;
		background: var(--primary);
		animation-timing-function: cubic-bezier(0, 1, 1, 0);
	}
	.lds-ellipsis div:nth-child(1) {
		left: 8px;
		animation: lds-ellipsis1 0.6s infinite;
	}
	.lds-ellipsis div:nth-child(2) {
		left: 8px;
		animation: lds-ellipsis2 0.6s infinite;
	}
	.lds-ellipsis div:nth-child(3) {
		left: 32px;
		animation: lds-ellipsis2 0.6s infinite;
	}
	.lds-ellipsis div:nth-child(4) {
		left: 56px;
		animation: lds-ellipsis3 0.6s infinite;
	}
	@keyframes lds-ellipsis1 {
		0% {
			transform: scale(0);
		}
		100% {
			transform: scale(1);
		}
	}
	@keyframes lds-ellipsis3 {
		0% {
			transform: scale(1);
		}
		100% {
			transform: scale(0);
		}
	}
	@keyframes lds-ellipsis2 {
		0% {
			transform: translate(0, 0);
		}
		100% {
			transform: translate(24px, 0);
		}
	}
</style>

<article
	transition:scale={{ duration: 800, easing: quintInOut, start: 0.8 }}
	class="wrapper loading-animated">
	<div class="top">
		<div class="lds-ellipsis">
			<div />
			<div />
			<div />
			<div />
		</div>
	</div>
	<div class="bottom">
		<div>cargando...</div>
	</div>
</article>
