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
	import CardProductSkeleton from "./components/Card-product-skeleton.svelte";
	import NavbarMain from "./components/Navbar-main.svelte";

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
	let products;
	let categories;
	let product;

	$: empty =
		products == undefined && categories == undefined && product == undefined;
	$: console.log(empty);

	//? Logic

	// app.ready(() => console.log(app.animations.tracked[0][1]));
	// console.log($$props);

	onMount(async () => {
		const promise = await fetch(
			"https://svelte-config.vercel.app/api/products"
		);
		const promiseCategories = await fetch(
			"https://svelte-config.vercel.app/api/categories"
		);
		// setTimeout(async () => {
		raw_products = await promise.json();
		raw_categories = await promiseCategories.json();
		products = raw_products;
		categories = raw_categories;
		product = products[0];
		// }, 3000);
	});

	function nextProduct() {
		app.animations.tracked[0][1].intro.x = -400;
		app.animations.tracked[0][1].outro.x = 400;
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
		app.animations.tracked[0][1].intro.x = 400;
		app.animations.tracked[0][1].outro.x = -400;
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
		window.addEventListener("keydown", handleKeydown);
	}

	function tagsHandler(id, name) {
		products = products.filter((p) => p.categoria_id === id);
		level2(null, `Productos (${name})`);
	}

	function handleKeydown(e) {
		// console.log(e);
		if (levels.length > 2 && (e.key === "Backspace" || e.which == 8)) {
			level1();
			window.removeEventListener("keydown", handleKeydown);
		}
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
		/* border-top-left-radius: 1.5em;
		border-top-right-radius: 1.5em; */
		overflow: hidden;
		position: relative;
		min-height: calc(100vh - var(--header-main-height));
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
		/* padding: 1em; */
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: row;
		flex-wrap: wrap;
		overflow: hidden;
	}
	.spacer {
		min-width: 15px;
		max-width: 15px;
		width: 15px;
		display: inline-block;
		max-height: 100%;
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

<!-- <NavbarMain on:click={level1} /> -->
<div class="container-full main">
	<div class="container">
		<header>
			<img src="consweet-logo-web.svg" alt="icon-logo" on:click={level1} />
		</header>
	</div>
	<div class="container">
		{#if levels.length == 3}
			<div class="wrapper-buttons-action">
				<!-- <button
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
							d="M11.611,10.049l-4.76-4.873c-0.303-0.31-0.297-0.804,0.012-1.105c0.309-0.304,0.803-0.293,1.105,0.012l5.306,5.433c0.304,0.31,0.296,0.805-0.012,1.105L7.83,15.928c-0.152,0.148-0.35,0.223-0.547,0.223c-0.203,0-0.406-0.08-0.559-0.236c-0.303-0.309-0.295-0.803,0.012-1.104L11.611,10.049z"
						/>
					</svg></button
				> -->
			</div>
		{/if}
		{#if levels.length <= 1}
			<AnimationWrapper delay={400}>
				<Section id="section-products">
					{#if !empty}
						<ScrollWrapper {products} on:clickCard={level3} />
						{#each categories as { nombre: name, id } (id)}
							<SectionButton on:click={tagsHandler(id, name)}>
								{name}
							</SectionButton>
						{/each}
						<div>
							<SectionButton main bouncy on:click={level2}>
								Mostrar todos
							</SectionButton>
						</div>
					{:else}
						<CardProductSkeleton />
					{/if}
				</Section>
			</AnimationWrapper>

			<Section id="section-contact">
				<p>
					¡Conversemos un poco!🤗. A través de la siguientes vias, podremos
					ponernos en contacto.
				</p>
				<ContactMethods />
				<SectionButton main>Déjanos un comemtario</SectionButton>
				<SectionButton main>Por mayor</SectionButton>
			</Section>

			<Section id="section-about">
				<div>
					<p>
						Lorem ipsum dolor sit, amet consectetur adipisicing elit. Id, quo?
						Ad blanditiis iusto culpa sed veniam doloremque maxime qui enim
						dolore amet ratione, deleniti unde dignissimos sapiente voluptates
						sunt? Ut?
					</p>
					<p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt
						iure et, odit ab adipisci exercitationem ipsum culpa quos, optio
						fugiat perspiciatis fugit voluptates nostrum. Enim dicta iusto
						laudantium recusandae repudiandae! Alias, itaque, esse vel
						doloremque repellendus consequuntur in ea minus corporis deleniti
						explicabo a ex excepturi suscipit soluta voluptatum, earum possimus
						impedit aperiam sit modi numquam. Nihil tempora alias eum.
						Exercitationem, optio. Molestias quae debitis accusantium nostrum
						atque maiores eum, est, praesentium optio, aliquam eius explicabo?
						Possimus, est natus necessitatibus voluptatem doloremque velit
						reprehenderit sint nam at sunt aut. A? Praesentium, animi? Inventore
						cum esse architecto maiores nostrum natus ipsam consequatur
						accusantium, deserunt vitae necessitatibus non nesciunt blanditiis,
						deleniti nulla, voluptatem aliquam et dolore ratione. Voluptates,
						sint? Autem, et fugit? Inventore aperiam ut quis obcaecati
						necessitatibus accusamus fuga? Qui earum ad temporibus nobis
						officiis non vitae corporis consequuntur saepe quod. Omnis accusamus
						est incidunt suscipit aspernatur distinctio repudiandae impedit
						error. Quasi eum, vitae eos eveniet illo consectetur animi impedit
						sapiente porro nulla quisquam repudiandae itaque excepturi cum
						aliquid doloremque, vel dignissimos ducimus quaerat. Deserunt velit
						delectus cupiditate non corrupti fuga? Omnis reprehenderit odit
						tenetur earum magni distinctio voluptatibus tempora atque soluta.
						Officia laboriosam cumque reiciendis tempora. Nam sint tempora
						nesciunt commodi cumque sunt quidem deserunt explicabo repudiandae!
						Omnis, animi! Dolor! Adipisci delectus dignissimos error magni, ea
						velit modi eum asperiores at totam. Ipsam nostrum suscipit, odit
						omnis, temporibus facere voluptates sed sit sapiente nobis esse
						ratione laboriosam corrupti? Sapiente, mollitia! Reprehenderit
						exercitationem sunt facilis reiciendis eligendi nobis voluptate
						commodi! Ratione repellat repellendus et nulla. Tempora enim modi
						suscipit dolor voluptate aspernatur debitis dolore, cumque ut odit
						quia aperiam voluptatum nam. Porro magnam eius quasi, qui neque,
						dicta quos dolore ut facere error ex! Quod vero dolorum possimus
						architecto cupiditate fugit enim. Quidem, sint quo? Mollitia
						possimus dignissimos asperiores earum id. Vero ipsa earum modi ex
						fugit similique quisquam deserunt aperiam. Molestiae excepturi
						similique voluptatem tenetur, nihil eius perspiciatis omnis illum
						consequatur nulla, earum in dolores molestias cumque reprehenderit
						explicabo tempora. Commodi, reiciendis voluptate tempora eligendi
						corporis rem soluta modi provident culpa qui, nihil excepturi, amet
						quia voluptatibus ducimus veniam dolor sapiente possimus!
						Voluptatum, porro aperiam consectetur eius eligendi explicabo
						aspernatur? Fuga, aperiam omnis cupiditate itaque qui rem tempora ex
						voluptatibus aut voluptatum officia possimus pariatur eligendi atque
						aliquam impedit. Eos eum quisquam praesentium quam saepe aliquam
						molestiae cumque animi dolor. Quos beatae expedita dolores pariatur
						odit illo sit soluta, nesciunt, rem numquam minima totam ullam unde
						optio debitis ipsum iste impedit ducimus dignissimos! Nostrum
						aperiam esse perferendis ab, rem voluptas? Eveniet repellat
						molestias quas minima amet fugiat voluptatum non, obcaecati rem eum,
						molestiae ut vero, veritatis blanditiis inventore natus quaerat
						corporis. Asperiores sint veritatis ad tenetur eligendi quibusdam
						harum consectetur. Nobis animi nisi fugiat laborum doloribus
						repellat amet placeat libero accusamus deserunt sunt incidunt
						dignissimos facere, aperiam quisquam vel? Voluptatem perferendis
						eligendi saepe totam atque fugit sint ipsa ipsum tempore. Aspernatur
						praesentium officiis inventore. Expedita mollitia dolorem officiis
						at, repellendus, ducimus natus voluptates atque cumque omnis
						deleniti sit nihil ut corrupti autem aperiam a enim quaerat porro
						ratione eaque nam! Molestiae accusamus cum saepe quae optio totam
						ipsum tempora distinctio ducimus quod. Sint, in vitae aliquam cumque
						optio inventore ex minus officia unde sapiente obcaecati aliquid ea
						a velit tenetur. Fuga sapiente exercitationem vitae at? Id rerum
						perspiciatis incidunt vero, quibusdam esse assumenda, velit sunt
						voluptate quas totam cupiditate adipisci sint sit. Placeat ex
						distinctio ipsa necessitatibus atque modi neque! Modi optio nesciunt
						quas eligendi error esse in debitis asperiores dolor. Ratione
						possimus nam commodi velit hic accusamus sint! Placeat iusto facere
						quas odit praesentium quibusdam commodi esse adipisci eveniet? Sed
						exercitationem, reiciendis atque hic ratione cupiditate officiis
						consequatur cum laudantium magnam assumenda rerum nulla quisquam
						odit ipsum laborum. Quo, ut reprehenderit aspernatur repudiandae
						recusandae illo earum doloribus nam temporibus? Animi id,
						accusantium, tempore laborum, iure quibusdam quas veniam nobis enim
						architecto doloribus! Doloribus corporis quas soluta possimus,
						nostrum rerum dolorem, repudiandae iure eligendi repellendus sequi
						itaque laudantium labore voluptatibus. Amet, sint laudantium illo
						mollitia explicabo quibusdam accusantium ad porro quam molestias
						sunt! Deserunt aperiam labore ratione provident alias officiis eos,
						iure quasi quam praesentium laboriosam eligendi error neque
						adipisci. Ipsa rerum eum sequi maiores voluptatum sit iure,
						consequuntur cum quasi dolores quisquam possimus libero tempore
						corporis dicta repudiandae quibusdam ea aut quaerat! Tempora
						explicabo deserunt odio. Vitae, quod laborum! Explicabo enim dolorem
						odio, numquam exercitationem nobis, corrupti officia labore nulla
						placeat voluptatibus debitis perferendis facere consequatur ea natus
						ad, rerum consectetur reiciendis asperiores amet. Dolor ducimus
						minima perspiciatis optio? Rem obcaecati in hic veritatis fugit,
						enim voluptatum eius consequuntur et molestiae recusandae ipsam
						omnis? Accusantium, corrupti dolorum fugiat quis dignissimos ratione
						est omnis maiores sint eum consectetur error fugit. Sequi cum quam
						rem voluptates reprehenderit! Fugiat, molestias. Voluptatem
						quibusdam maxime sit similique repellat, delectus provident atque
						dolorum ad alias a impedit quod quaerat facilis, culpa incidunt
						iusto, illum earum? Autem accusantium placeat dolorem inventore
						veritatis, quod ipsa tempora mollitia, ipsum, reiciendis illo iusto
						quibusdam nobis quo incidunt quos nam. Distinctio maxime a fugiat
						rem repellat nesciunt dolorum maiores numquam. Facere, est. Autem
						pariatur, quod quae rerum repellat eveniet qui quos voluptates
						voluptate labore velit dolorem libero aliquid maiores iusto impedit
						sunt praesentium. Dolorem, quos aperiam? Excepturi nulla commodi
						dolorum! Placeat voluptas atque nihil. Quae, sit! Natus, voluptate
						sit. Labore, ab magni? Sed rem tempore cum quia repudiandae minus
						ratione et earum asperiores quos. Cumque nulla eaque maxime porro
						impedit! Ullam expedita sequi iure laboriosam a. Quidem
						reprehenderit labore quasi recusandae explicabo molestiae fuga eius,
						aliquid repellat exercitationem eligendi tempore repellendus aut
						odio nesciunt asperiores assumenda mollitia impedit accusamus vitae!
						Delectus modi veniam maxime veritatis accusantium rem perferendis?
						Eaque fugit optio at rerum autem quidem incidunt quibusdam molestiae
						assumenda quia, et rem repellat itaque veritatis tempora sed quod
						deserunt repellendus. Nostrum harum illum corrupti incidunt
						veritatis doloribus quasi magnam rem quas? Cum qui ullam similique
						voluptate beatae impedit vitae facere! Sint enim provident est
						deserunt quidem tenetur libero laborum voluptas. Repellendus, unde
						iusto officiis dolorem quasi assumenda, quidem quis natus, aut
						nesciunt non voluptates dolorum dolores numquam minima qui obcaecati
						animi. Rerum exercitationem atque, repudiandae laudantium facere
						natus nobis dolorum! Totam aut dolorem ad beatae sit voluptates,
						dicta aperiam explicabo alias, id, voluptatem amet. Similique ex
						totam at, beatae reiciendis, quisquam ratione iusto vitae amet
						voluptatibus hic, quis possimus pariatur. Iure possimus tempore
						delectus corrupti, repudiandae consequuntur, fuga nulla,
						perspiciatis blanditiis repellendus soluta eveniet accusantium at?
						Neque fugit dolores obcaecati quod, deserunt ea et voluptate
						inventore non! Aspernatur, neque molestias. Neque porro,
						necessitatibus corrupti, asperiores soluta quasi sit iure voluptate
						sequi officiis nisi! Quam, aperiam qui? Est nesciunt sed delectus,
						consectetur voluptate architecto tempora, voluptatem porro sit
						ducimus eius ab? Sequi saepe molestias officiis magnam quidem iusto
						qui sed commodi illum voluptatem itaque quasi, tempore rem ea dolore
						error ipsam nihil accusantium illo? Ut aut cum non iusto excepturi
						esse. Ex enim error unde provident voluptatum amet quisquam nesciunt
						consequuntur tempore, perferendis pariatur, hic animi minus
						necessitatibus quam, molestias non? Dicta inventore omnis voluptates
						praesentium voluptate itaque sapiente provident sunt! Quos nobis
						enim iste odio, numquam fugiat nesciunt adipisci ad perferendis,
						assumenda doloribus consectetur sint repudiandae eum, molestiae
						nihil facilis perspiciatis suscipit voluptates exercitationem
						quaerat? Enim quibusdam necessitatibus natus quidem? Fugit itaque,
						facilis quae a assumenda necessitatibus id officiis praesentium
						voluptatibus animi iure repellendus aliquam eligendi voluptates
						cupiditate doloremque officia adipisci. Sapiente saepe reiciendis
						reprehenderit eum ex sunt exercitationem fuga. At atque, blanditiis
						veritatis, nam delectus eos voluptas nemo aut voluptate odit officia
						impedit? Id, eligendi quos quae non explicabo, voluptatem et
						mollitia nam nemo perferendis molestiae eveniet nisi necessitatibus.
						Fugit illo consequatur, possimus voluptate esse maiores alias, quos
						ad velit est ducimus? Quod incidunt quas dignissimos nobis quidem.
						Expedita cupiditate eligendi architecto quos quod exercitationem ad
						distinctio iure at. Mollitia repellendus doloribus quisquam nostrum
						officia. Corporis quod consectetur, error labore inventore
						temporibus libero voluptatibus sint expedita maiores aliquid ut
						iusto, magnam pariatur placeat quas hic soluta blanditiis aliquam.
						Totam. Fugiat, quasi. Non libero adipisci, alias porro a quisquam
						corrupti doloribus atque quae expedita saepe inventore eum neque est
						quia ipsum sint et? Pariatur repellendus praesentium doloribus
						eligendi asperiores numquam! Quisquam at, consequuntur suscipit odit
						pariatur quam optio earum aut inventore! Temporibus, corporis veniam
						deleniti expedita cupiditate aliquam ratione placeat nulla voluptas
						repellendus cum. Quod ullam sed pariatur consectetur perspiciatis?
						Sequi dolores temporibus corporis ut esse? Possimus nam fugit quae
						numquam harum nobis optio magnam itaque atque culpa repellat
						molestiae dolor recusandae, quos vel tempore maxime vero. Libero,
						distinctio doloribus. Dolorem corporis minus doloremque architecto
						reiciendis voluptas ut accusantium, tempora est culpa eveniet
						maiores magnam incidunt esse aperiam vel, sapiente rem quo
						voluptatem nemo reprehenderit expedita. Explicabo doloremque minima
						placeat! Sequi, ducimus, eum exercitationem nostrum cumque
						reiciendis maxime molestiae, tempore in quos blanditiis dolore iste
						vel harum eligendi aperiam unde voluptatum quisquam mollitia
						molestias debitis! Maxime magni earum necessitatibus fugiat! Rem sed
						veritatis cumque consectetur minus quae ducimus dolores. Quaerat
						animi excepturi mollitia minima labore itaque impedit cum cupiditate
						omnis deleniti, temporibus sapiente delectus sunt quidem vel
						voluptatem illum non!
					</p>
				</div>
			</Section>
		{:else}
			<Breadcrumb {levels} on:level1={level1} on:level2={level2} />
			{#if levels.length == 2}
				<SubSection>
					<div class="grid-products">
						{#if !empty}
							{#each products as item (item.id)}
								<div style="padding: 1em;">
									<CardProduct
										out_fly={{ delay: 0, duration: 0, opacity: 1, y: 0, x: 0 }}
										in_fly={{ delay: 0, duration: 0, opacity: 1, y: 0, x: 0 }}
										product={item}
										on:clickCard={level3}
									/>
								</div>
							{/each}
						{/if}
					</div>
				</SubSection>
			{:else if levels.length == 3}
				<SubSection>
					{#key product}
						<ItemProduct
							{product}
							transition={app.animations.tracked[0][1].transition}
							intro={app.animations.tracked[0][1].intro}
							outro={app.animations.tracked[0][1].outro}
						>
							<ContactMethods />
						</ItemProduct>
					{/key}
				</SubSection>
			{/if}
		{/if}
	</div>
</div>
