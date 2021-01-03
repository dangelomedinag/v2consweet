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
	import ContactMethods from "./components/Contact-methods.svelte";

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
	let raw_products = [];
	let raw_categories = [];
	let products = [];
	let categories = [];
	let product = {};
	$: empty = products.length <= 0 && categories.length <= 0;

	onMount(async () => {
		const promise = await fetch(
			"https://sapper-heroku-test.herokuapp.com/api/productos.json"
		);
		const promiseCategories = await fetch(
			"https://sapper-heroku-test.herokuapp.com/api/categorias.json"
		);
		products = await promise.json();
		categories = await promiseCategories.json();
		raw_categories = categories;
		raw_products = products;
	});

	function nextProduct() {
		let current = products.indexOf(product);
		console.log(current);

		if (current == products.length - 1) {
			product = products[1];
			level3();
		} else {
			product = products[current + 1];
			level3();
		}
	}

	function prevProduct() {
		let current = products.indexOf(product);
		console.log(current);

		if (current == 0) {
			product = products[products.length - 1];
			level3();
		} else {
			product = products[current - 1];
			level3();
		}
	}

	function level1() {
		products = raw_products;
		levels = ["home"];
	}
	function level2(e, title = "Productos") {
		levels = ["home", levels[2] ? levels[1] : title];
		window.scrollTo({
			top: 0,
			left: 0,
			behavior: "smooth",
		});
	}
	function level3(e) {
		if (e) product = e.detail.product;
		levels = ["home", levels[1] ? levels[1] : "Productos", product.nombre];
		window.scrollTo({
			top: 0,
			left: 0,
			behavior: "smooth",
		});
	}

	function tagsHandler(id, name) {
		products = products.filter((p) => p.categoria_id === id);
		level2(null, `Productos (${name})`);
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
		<img src="consweet-logo-web.svg" alt="icon-logo" on:click={level1} />
	</header>
</div>

<div class="container-full main">
	<div class="container">
		{#if levels.length <= 1}
			<AnimationWrapper delay={400}>
				<Section id="section-products">
					<p />
					<ScrollWrapper {products} on:clickCard={level3} />
					{#if !empty}
						{#each categories as { nombre: name, id } (id)}
							<SectionLinks on:click={tagsHandler(id, name)}>
								{name}
							</SectionLinks>
						{/each}
						<div>
							<SectionLinks main on:click={level2}>Mostrar todos</SectionLinks>
						</div>
					{/if}
				</Section>
			</AnimationWrapper>

			<AnimationWrapper delay={200}>
				<Section id="section-contact">
					<p>
						¡Conversemos un poco!🤗. A través de la siguientes vias, podremos
						ponernos en contacto.
					</p>
					<ContactMethods />
					<SectionLinks main>Déjanos un comemtario</SectionLinks>
					<SectionLinks main>Por mayor</SectionLinks>
				</Section>
			</AnimationWrapper>

			<AnimationWrapper>
				<Section id="section-about">
					<div />
				</Section>
			</AnimationWrapper>
		{:else}
			<Breadcrumb {levels} on:level1={level1} on:level2={level2} />
			{#if levels.length == 2}
				<SubSection>
					<div class="grid-products">
						{#each products as item (item.id)}
							<CardProduct
								out_fly={{ delay: 0, duration: 600, easing: quintInOut, y: 200, opacity: 0 }}
								product={item}
								on:clickCard={level3} />
						{/each}
					</div>
				</SubSection>
			{:else if levels.length == 3}
				<SubSection>
					<ItemProduct {product} />
					<button
						on:click={prevProduct}
						disabled={products.length == 1 || (products.indexOf(product) == 0 && products.length == 2)}>-</button>
					<button
						on:click={nextProduct}
						disabled={products.length == 1 || (products.indexOf(product) == 1 && products.length == 2)}>+</button>
				</SubSection>
			{/if}
		{/if}
	</div>
</div>
