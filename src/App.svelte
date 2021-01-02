<script>
	import { onMount } from "svelte";
	import Section from "./components/Section.svelte";
	import ScrollWrapper from "./components/Scroll-wrapper.svelte";
	import SectionLinks from "./components/Section-links.svelte";
	import SubSection from "./components/Sub-section.svelte";
	import { flip } from "svelte/animate";
	import { fly, scale, fade, slide } from "svelte/transition";
	import { quintInOut } from "svelte/easing";
	import CardProduct from "./components/Card-product.svelte";
	import ItemProduct from "./components/Item-product.svelte";
	import AnimationWrapper from "./components/Animation-wrapper.svelte";
	import Breadcrumb from "./components/Breadcrumb.svelte";

	const app = {
		ready: (callback) => {
			// In case the document is already rendered
			if (document.readyState != "loading") callback();
			else document.addEventListener("DOMContentLoaded", callback);
		},
		menu: {},
		levels: { register: [] },
		search: {},
		keys: {},
		overlay: {},
		animations: { tracked: [] },
	};

	let levels = ["home"];
	let y = [];
	let products = [];
	let product = {};
	let categories = [];
	$: empty = products.length <= 0 && categories.length <= 0;

	app.ready(async () => {
		const promise = await fetch(
			"https://sapper-heroku-test.herokuapp.com/api/productos.json"
		);
		const promiseCategories = await fetch(
			"https://sapper-heroku-test.herokuapp.com/api/categorias.json"
		);
		products = await promise.json();
		categories = await promiseCategories.json();
	});

	// onMount(async () => {
	// 	const promise = await fetch(
	// 		"https://sapper-heroku-test.herokuapp.com/api/productos.json"
	// 	);
	// 	const promiseCategories = await fetch(
	// 		"https://sapper-heroku-test.herokuapp.com/api/categorias.json"
	// 	);
	// 	products = await promise.json();
	// 	categories = await promiseCategories.json();
	// });

	let subMode = false;
	let listMode = false;
	let itemMode = false;
	let sectionScrollY = {
		home: 0,
		list: 0,
	};

	function showList() {
		if (!itemMode) sectionScrollY.home = y;
		// console.log("sectionScrollY: ", sectionScrollY, "y: ", y);
		subMode = true;
		if (itemMode) itemMode = !itemMode;
		listMode = !listMode;

		window.scrollTo({
			top: sectionScrollY.list,
			left: 0,
			behavior: "smooth",
		});
	}
	function showItem(productItem) {
		sectionScrollY.list = y;
		if (listMode) listMode = !listMode;
		window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
		product = productItem;
		itemMode = true;

		if (subMode) {
			return;
		} else {
			subMode = true;
		}
	}

	function clickCardHandler(e) {
		console.log(e.detail.product);

		console.log("sectionScrollY: ", sectionScrollY, "y: ", y);
		showItem(e.detail.product);
	}

	function retunMode() {
		if (listMode) listMode = false;
		if (itemMode) itemMode = false;
		if (subMode) subMode = false;

		setTimeout(() => {
			window.scrollTo({
				top: sectionScrollY.home,
				left: 0,
				behavior: "smooth",
			});

			sectionScrollY.home = 0;
			sectionScrollY.list = 0;
		}, 1000);
	}

	function nextProduct() {
		let current = products.indexOf(product);
		console.log(current);

		if (current == products.length - 1) product = products[1];
		else product = products[current + 1];
	}

	function prevProduct() {
		let current = products.indexOf(product);
		console.log(current);

		if (current == 1) product = products[products.length - 1];
		else product = products[current - 1];
	}
</script>

<style>
	/* primary: #f36566 */
	/* secondary: #2a221d */

	.main {
		background-color: var(--secondary);
		border-top-left-radius: 1.5em;
		border-top-right-radius: 1.5em;
		overflow: hidden;
		position: relative;
	}
	.split {
		/* --color-opacity: 0.2; */
		/* width: 80%; */
		height: 1px;
		background-color: var(--primary-opacity-3);
		border: none;
	}

	h1 {
		/* reset */
		margin: 0;
		padding: 0;
		display: block;
		/* custom */
		font-size: 3em;
	}
	p {
		color: var(--neutral);
	}

	svg {
		width: 1em;
		height: 1em;
		fill: #d8d8d8;
	}
	.icon {
		fill: #f36566;
		width: 3em;
		height: auto;
		padding: 2em 0;
	}
	header {
		/* padding: 1em; */
		display: flex;
		justify-content: center;
		align-items: center;
		height: 80px;
	}
	img {
		width: auto;
		height: 3em;
		display: block;
		margin: 0 auto;
	}
	.separator {
		margin: 0 1em;
	}
	.wrapper-breadcrumb {
		padding: 1.5em 2em;
		display: flex;
		justify-content: flex-start;
		align-items: center;
	}
	.breadcrumb {
		font-weight: 700;
		cursor: pointer;
		width: 120px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.breadcrumb:hover,
	.breadcrumb.active {
		color: var(--primary);
	}

	.breadcrumb.home {
		width: auto;
		overflow: initial;
		text-overflow: initial;
	}

	.grid-products {
		padding: 1em;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: row;
		flex-wrap: wrap;
		overflow: hidden;
	}

	@media (min-width: 640px) {
		.breadcrumb {
			width: auto;
		}
	}

	@media (min-width: 768px) {
	}

	@media (min-width: 1024px) {
	}

	@media (min-width: 1280px) {
	}
</style>

<svelte:window bind:scrollY={y} />

<div class="container">
	<header>
		<img
			src="consweet-logo-web.svg"
			alt="icon-logo"
			on:click={() => (products = [...products.slice(1)])} />
	</header>
</div>

<div class="container-full main">
	<div class="container">
		{#if subMode}
			<AnimationWrapper duration={1200}>
				<div class="wrapper-breadcrumb">
					<span class="breadcrumb home"><i
							on:click={retunMode}
							class="material-icons">home</i></span>
					<span class="separator">&gt;</span>
					{#if itemMode}
						<span class="breadcrumb" on:click={showList}>lista de productos</span>
						<span class="separator">&gt;</span>
						<span class="breadcrumb active">{product?.nombre}</span>
					{:else}<span class="breadcrumb">lista de productos</span>{/if}
				</div>
			</AnimationWrapper>
			<Breadcrumb />
			<SubSection>
				{#if listMode}
					<!-- grid list products -->
					<div class="grid-products">
						{#each products as item (item.id)}
							<CardProduct product={item} on:clickCard={clickCardHandler} />
						{/each}
					</div>
					<!-- grid list products end -->
				{:else if itemMode}
					<!-- single product item -->

					<ItemProduct {product} />

					<button on:click={nextProduct}>++</button>
					<button on:click={prevProduct}>--</button>

					<!-- single product item end -->
				{/if}
			</SubSection>
		{:else}
			<Section>
				<AnimationWrapper x={200} out_x={200} y={0} out_y={0}>
					<ScrollWrapper {products} on:clickCard={clickCardHandler} />
				</AnimationWrapper>

				<!-- Sections links -->
				<div class="links">
					{#if !empty}
						{#each categories as categorie}
							<SectionLinks>{categorie.nombre}</SectionLinks>
						{/each}
						<div>
							<SectionLinks main={true} on:click={showList}>
								Mostrar todos
							</SectionLinks>
						</div>
					{/if}
				</div>
			</Section>
			<hr class="split" />

			<Section>
				<!-- <svg class="icon" viewBox="0 0 20 20">
					<path
						fill="current"
						d="M17.051,3.302H2.949c-0.866,0-1.567,0.702-1.567,1.567v10.184c0,0.865,0.701,1.568,1.567,1.568h14.102c0.865,0,1.566-0.703,1.566-1.568V4.869C18.617,4.003,17.916,3.302,17.051,3.302z M17.834,15.053c0,0.434-0.35,0.783-0.783,0.783H2.949c-0.433,0-0.784-0.35-0.784-0.783V4.869c0-0.433,0.351-0.784,0.784-0.784h14.102c0.434,0,0.783,0.351,0.783,0.784V15.053zM15.877,5.362L10,9.179L4.123,5.362C3.941,5.245,3.699,5.296,3.581,5.477C3.463,5.659,3.515,5.901,3.696,6.019L9.61,9.86C9.732,9.939,9.879,9.935,10,9.874c0.121,0.062,0.268,0.065,0.39-0.014l5.915-3.841c0.18-0.118,0.232-0.36,0.115-0.542C16.301,5.296,16.059,5.245,15.877,5.362z" />
				</svg> -->

				<!-- content -->
				<p>dasdsadad</p>
				<button>dsadsa</button>
			</Section>
		{/if}
	</div>
</div>
