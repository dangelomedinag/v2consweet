<script>
	//? imports system
	import { onMount } from "svelte";
	import { quintIn, quintOut } from "svelte/easing";
	import { fly } from "svelte/transition";

	//? imports components, store and function
	import Section from "./components/Section.svelte";
	import ScrollWrapper from "./components/Scroll-wrapper.svelte";
	import SectionLinks from "./components/Section-links.svelte";
	import SubSection from "./components/Sub-section.svelte";
	import CardProduct from "./components/Card-product.svelte";
	import ItemProduct from "./components/Item-product.svelte";
	import AnimationWrapper from "./components/Animation-wrapper.svelte";
	import Breadcrumb from "./components/Breadcrumb.svelte";
	import ContactMethods from "./components/Contact-methods.svelte";
	import SectionButton from "./components/Section-button.svelte";

	//? props

	//? variables
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
		animations: {
			tracked: [
				[
					ItemProduct.name,
					{
						transition: fly,
						intro: {
							delay: 600,
							duration: 600,
							easing: quintOut,
							x: 400,
							opacity: 0,
						},
						outro: { duration: 600, easing: quintIn, x: -400, opacity: 0 },
					},
				],
			],
		},
	};

	let ItemProductAnim = {
		in: { delay: 600, duration: 600, easing: quintOut, x: 400, opacity: 0 },
		out: { duration: 600, easing: quintIn, x: -400, opacity: 0 },
	};
	let levels = ["home"];
	let raw_products = [];
	let raw_categories = [];
	let products = [];
	let categories = [];
	let product = {};
	$: empty = products.length <= 0 && categories.length <= 0;

	//? Logic

	app.ready(() => console.log(app.animations.tracked[0][1]));
	console.log($$props);

	onMount(async () => {
		const promise = await fetch(
			"https://sapper-heroku-test.herokuapp.com/api/productos.json"
		);
		const promiseCategories = await fetch(
			"https://sapper-heroku-test.herokuapp.com/api/categorias.json"
		);
		products = await promise.json();
		categories = await promiseCategories.json();
		raw_products = products;
		raw_categories = categories;
		product = products[0];
	});

	function nextProduct() {
		ItemProductAnim.in.x = -400;
		ItemProductAnim.out.x = 400;
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
		ItemProductAnim.in.x = 400;
		ItemProductAnim.out.x = -400;
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
	@keyframes buttons-action-left {
		0% {
			/* transform: translate(-50%); */
		}
		50% {
			transform: translate(-100%);
		}
		100% {
			/* transform: translate(-50%); */
		}
	}
	@keyframes buttons-action-right {
		0% {
			/* transform: translate(50%); */
		}
		50% {
			transform: translate(100%);
		}
		100% {
			/* transform: translate(50%); */
		}
	}

	/* primary: #f36566 */
	/* secondary: #2a221d */

	.main {
		background-color: var(--secondary);
		border-top-left-radius: 1.5em;
		border-top-right-radius: 1.5em;
		overflow: hidden;
		position: relative;
	}
	p {
		color: var(--neutral);
	}
	header {
		/* padding: 1em; */
		display: flex;
		justify-content: center;
		align-items: center;
		height: 60px;
	}
	img {
		width: auto;
		height: 3em;
		display: block;
		margin: 0 auto;
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

	.wrapper-buttons-action {
		position: fixed;
		top: 30px;
		left: 50%;
		transform: translate(-50%, -50%);
		display: flex;
		width: 100%;
		max-width: 600px;
		height: 100%;
		pointer-events: none;
		z-index: 999999;
		justify-content: space-between;
		align-items: center;
	}

	.button-action {
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: transparent;
		/* border: 1px solid var(--primary); */
		/* padding: 1em; */
		width: 45px;
		height: 45px;
		pointer-events: initial;
		border-radius: 50px;
		color: white;
		margin: 0;
		padding: 0;
		background-color: var(--primary);
		cursor: pointer;
	}

	.button-action svg {
		/* padding: 0.5em; */
		width: 30px;
		height: 30px;
	}

	.button-action:hover,
	.button-action:active,
	.button-action:focus {
		outline-width: 0px;
		outline-color: transparent;
	}
	.prev {
		will-change: transform;
		transform: translate(0%);
	}
	.next {
		will-change: transform;
		transform: translate(0%);
	}
	.prev:active,
	.prev:hover,
	.next:active,
	.next:hover {
		box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.034),
			0 6.7px 5.3px rgba(0, 0, 0, 0.048), 0 12.5px 10px rgba(0, 0, 0, 0.06),
			0 22.3px 17.9px rgba(0, 0, 0, 0.072), 0 41.8px 33.4px rgba(0, 0, 0, 0.086),
			0 100px 80px rgba(0, 0, 0, 0.12);
	}
	.prev:active,
	.prev:hover {
		animation: buttons-action-left 0.5s normal ease-in-out;
	}
	.next:active,
	.next:hover {
		animation: buttons-action-right 0.5s normal ease-in-out;
	}
	.prev:disabled,
	.next:disabled {
		animation: none;
		background-color: var(--neutral-2);
	}

	@media (min-width: 640px) {
	}

	@media (min-width: 768px) {
	}

	@media (min-width: 1024px) {
	}

	@media (min-width: 1280px) {
	}
</style>

<div class="container">
	<header>
		<img src="consweet-logo-web.svg" alt="icon-logo" on:click={level1} />
	</header>
</div>

<div class="container-full main">
	<div class="container">
		{#if levels.length == 3}
			<div class="wrapper-buttons-action">
				<button
					class="button-action prev"
					on:click={prevProduct}
					disabled={products.length == 1 || (products.indexOf(product) == 0 && products.length == 2)}><svg
						class="svg-reset"
						viewBox="0 0 20 20">
						<path
							fill="current"
							d="M8.388,10.049l4.76-4.873c0.303-0.31,0.297-0.804-0.012-1.105c-0.309-0.304-0.803-0.293-1.105,0.012L6.726,9.516c-0.303,0.31-0.296,0.805,0.012,1.105l5.433,5.307c0.152,0.148,0.35,0.223,0.547,0.223c0.203,0,0.406-0.08,0.559-0.236c0.303-0.309,0.295-0.803-0.012-1.104L8.388,10.049z" />
					</svg></button>
				<button
					class="button-action next"
					on:click={nextProduct}
					disabled={products.length == 1 || (products.indexOf(product) == 1 && products.length == 2)}><svg
						class="svg-reset"
						viewBox="0 0 20 20">
						<path
							fill="current"
							d="M11.611,10.049l-4.76-4.873c-0.303-0.31-0.297-0.804,0.012-1.105c0.309-0.304,0.803-0.293,1.105,0.012l5.306,5.433c0.304,0.31,0.296,0.805-0.012,1.105L7.83,15.928c-0.152,0.148-0.35,0.223-0.547,0.223c-0.203,0-0.406-0.08-0.559-0.236c-0.303-0.309-0.295-0.803,0.012-1.104L11.611,10.049z" />
					</svg></button>
			</div>
		{/if}
		{#if levels.length <= 1}
			<AnimationWrapper delay={400}>
				<Section id="section-products">
					<p />
					<ScrollWrapper {products} on:clickCard={level3} />
					{#if !empty}
						{#each categories as { nombre: name, id } (id)}
							<SectionButton on:click={tagsHandler(id, name)}>
								{name}
							</SectionButton>
						{/each}
						<div>
							<SectionButton main on:click={level2}>
								Mostrar todos
							</SectionButton>
						</div>
					{/if}
				</Section>
			</AnimationWrapper>

			<AnimationWrapper>
				<Section id="section-contact">
					<p>
						¡Conversemos un poco!🤗. A través de la siguientes vias, podremos
						ponernos en contacto.
					</p>
					{#if !empty}
						<ContactMethods />
					{/if}
					<SectionButton main>Déjanos un comemtario</SectionButton>
					<SectionButton main>Por mayor</SectionButton>
				</Section>
			</AnimationWrapper>

			<Section id="section-about">
				<div />
			</Section>
		{:else}
			<Breadcrumb {levels} on:level1={level1} on:level2={level2} />
			{#if levels.length == 2}
				<SubSection>
					<div class="grid-products">
						{#each products as item (item.id)}
							<CardProduct
								out_fly={{ delay: 0, duration: 0, opacity: 1, y: 0, x: 0 }}
								in_fly={{ delay: 0, duration: 0, opacity: 1, y: 0, x: 0 }}
								product={item}
								on:clickCard={level3} />
						{/each}
					</div>
				</SubSection>
			{:else if levels.length == 3}
				<SubSection>
					{#key product}
						<ItemProduct
							{product}
							transition={app.animations.tracked[0][1].transition}
							intro={app.animations.tracked[0][1].intro}
							outro={app.animations.tracked[0][1].outro} />
					{/key}
				</SubSection>
			{/if}
		{/if}
	</div>
</div>
