<script>
	//? imports system

	import { createEventDispatcher } from "svelte";
	import { quintInOut } from "svelte/easing";
	import { fly, scale } from "svelte/transition";

	//? imports components, store and function

	//? props

	export let product = [];
	export let skeleton = false;
	export let in_fly = {
		delay: 0,
		duration: 1800,
		easing: quintInOut,
		y: 400,
		opacity: 0,
	};
	export let out_fly = {
		duration: 600,
		easing: quintInOut,
		y: 0,
		opacity: 0,
	};

	//? variables

	const dispatch = createEventDispatcher();
	let current = 0;
	$: imgsCount = product.imgs?.length - 1;

	//? Logic

	const IntersectionCard = (node) => {
		// let node = document.querySelectorAll(".card-observer");
		// console.log(cards);
		const callback = (entries) => {
			// entries[0].target.style.display = "inline-flex";
			// console.log(entries);
			// if (entries[0].isIntersecting) {
			// 	entries[0].target.style.display = "inline-flex";
			// 	console.log(entries[0].target);
			// }
			if (!entries[0].isIntersecting) {
				// entries[0].target.style.display = "none";
				console.log(entries);
			}
			// entries.target.style.opacity = "1";
		};
		const observer = new IntersectionObserver(callback);
		observer.observe(node);
	};

	function resizingImg(url) {
		let splited = url.split("upload");
		let word = "upload/";
		let config = "w_350,h_240,c_fill";
		let newUrl = splited[0] + word + config + splited[1];
		return newUrl;
	}

	function ProductClickEvent(product) {
		dispatch("clickCard", { product });
		console.log("click on card product");
	}

	function nextImg() {
		current == imgsCount ? (current = 0) : current++;
	}

	function prevImg() {
		current == 0 ? (current = imgsCount) : current--;
	}
</script>

<style>
	/* animations */
	@keyframes load {
		from {
			transform: translate(-100%);
		}
		to {
			transform: translate(200%);
		}
	}

	/* .hideCard {
		display: none;
	} */

	/* loading card */
	.loading h1 {
		background-color: var(--neutral) !important;
		color: var(--neutral) !important;
		margin-top: 3px;
	}
	.loading .buy i {
		color: #c0c0c0 !important;
	}
	.wrapper.loading {
		background-color: var(--neutral) !important;
	}

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
		width: 150px;
		background: linear-gradient(
			to right,
			transparent 0%,
			var(--neutral-1) 50%,
			transparent 100%
		);
		transform: translate(-100%);
		animation: load 1s cubic-bezier(0.4, 0, 0.2, 1) infinite;
	}

	/* card */
	.wrapper {
		display: inline-flex;
		width: 100%;
		max-width: 350px;
		height: 300px;
		/* background: #f4f4f4; */
		margin: 0;
		/* margin-right: 1em; */
		position: relative;
		overflow: hidden;
		border-radius: 10px 10px 10px 10px;
		transform: scale(0.95);
		transition: transform 0.5s;
	}
	.wrapper:hover {
		transform: scale(1);
	}
	.wrapper .container-card {
		width: 100%;
		height: 100%;
		cursor: pointer;
	}
	.wrapper .container-card .top {
		height: 80%;
		width: 100%;
		display: flex;
		justify-content: space-between;
		position: relative;
	}

	.image-card {
		object-fit: cover;
		width: 100%;
		height: 100%;
	}

	.wrapper .container-card .top button {
		position: absolute;
		top: 0;
		opacity: 0;
		height: 100%;
		background-color: var(--primary-opacity-2);
		outline: 0;
		/* display: inline-flex;
		justify-content: center;
		align-items: center;
		margin: auto 0;
		color: white;
		padding: 0 0.5em;
		font-size: 1em;
		cursor: pointer;
		transition: opacity 0.4s ease-in-out, background 0.2s ease-in; */
	}

	.b-left {
		right: 0;
	}
	.b-right {
		left: 0;
	}

	.wrapper .container-card .top button:hover {
		background-color: var(--primary-opacity-6);
	}

	.wrapper .container-card .top:hover button {
		opacity: 1;
	}
	.wrapper .container-card .top:hover button svg {
		width: 20px;
		height: auto;
	}
	.wrapper .container-card .top:hover button svg path {
		fill: white;
	}

	.wrapper .container-card .bottom {
		background: white;
		width: 100%;
		height: 20%;
		display: flex;
		transition: transform 0.5s;
	}
	.wrapper .container-card .bottom h1 {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		margin: 0;
		color: var(--neutral-6);
		font-size: 1em;
		margin: 0;
		padding: 0;
		position: relative;
	}
	.wrapper .container-card .bottom p {
		color: var(--neutral-6);
		margin: 0;
		padding: 0;
		height: 100%;
		width: 100%;
	}
	.wrapper .container-card .bottom .details {
		padding: 0 1em;
		margin: auto 0;
		width: 75%;
	}
	.wrapper .container-card .bottom .buy {
		text-align: center;
		width: 25%;
		margin: auto 0;
		/* background: #f1f1f1; */
		transition: background 0.5s;
		border-left: solid thin rgba(0, 0, 0, 0.1);
		cursor: pointer;
	}
	.wrapper .container-card .bottom .buy svg {
		/* font-size: 30px; */
		/* color: var(--neutral-6); */
		width: 35px;
		height: auto;
		/* transition: transform 0.5s; */
	}
	.wrapper .container-card .bottom .buy path {
		/* font-size: 30px; */
		fill: var(--neutral-6);
		/* transition: transform 0.5s; */
	}
	.wrapper .container-card:hover .buy path {
		fill: var(--primary);
	}

	.wrapper .inside {
		z-index: 9;
		background: var(--primary);
		width: 140px;
		height: 140px;
		position: absolute;
		top: -70px;
		right: -70px;
		border-radius: 0px 0px 200px 200px;
		transition: all 0.5s, border-radius 2s, top 1s;
		overflow: hidden;
	}
	.wrapper .inside .icon {
		position: absolute;
		right: 85px;
		top: 85px;
		color: white;
		opacity: 1;
	}
	.wrapper .inside .icon svg {
		width: 25px;
		height: auto;
	}
	.wrapper .inside:hover {
		width: 100%;
		right: 0;
		top: 0;
		border-radius: 0;
		height: 80%;
	}
	.wrapper .inside:hover .icon {
		opacity: 0;
		right: 15px;
		top: 15px;
	}
	/* .wrapper .inside:hover svg {
		width: 50px;
		height: auto;
	} */

	.wrapper .inside:hover .contents {
		opacity: 1;
		transform: scale(1);
		transform: translateY(0);
	}
	.wrapper .inside .contents {
		padding: 5%;
		opacity: 0;
		transform: scale(0.5);
		transform: translateY(-200%);
		transition: opacity 0.2s, transform 0.8s;
	}
	.wrapper .inside .contents table {
		text-align: left;
		width: 100%;
	}
	.wrapper .inside .contents h1,
	.wrapper .inside .contents p,
	.wrapper .inside .contents table {
		color: white;
	}
	.wrapper .inside .contents p {
		font-size: 13px;
	}

	@media (min-width: 640px) {
	}

	@media (min-width: 768px) {
		.wrapper {
			width: 350px;
			height: 300px;
		}
	}

	@media (min-width: 1024px) {
	}

	@media (min-width: 1280px) {
	}
</style>

{#if skeleton}
	<article
		transition:scale={{ duration: 800, easing: quintInOut, start: 0.8 }}
		class="wrapper loading">
		<main class="container-card">
			<div class="top loading-animated" />
			<div class="bottom">
				<div class="details">
					<h1 class="loading-animated">------------------------------------</h1>
				</div>
				<div class="buy">
					<svg class="svg-reset" viewBox="0 0 20 20">
						<path
							fill="current"
							d="M19.305,9.61c-0.235-0.235-0.615-0.235-0.85,0l-1.339,1.339c0.045-0.311,0.073-0.626,0.073-0.949
						c0-3.812-3.09-6.901-6.901-6.901c-2.213,0-4.177,1.045-5.44,2.664l0.897,0.719c1.053-1.356,2.693-2.232,4.543-2.232
						c3.176,0,5.751,2.574,5.751,5.751c0,0.342-0.037,0.675-0.095,1l-1.746-1.39c-0.234-0.235-0.614-0.235-0.849,0
						c-0.235,0.235-0.235,0.615,0,0.85l2.823,2.25c0.122,0.121,0.282,0.177,0.441,0.172c0.159,0.005,0.32-0.051,0.44-0.172l2.25-2.25
						C19.539,10.225,19.539,9.845,19.305,9.61z M10.288,15.752c-3.177,0-5.751-2.575-5.751-5.752c0-0.276,0.025-0.547,0.062-0.813
						l1.203,1.203c0.235,0.234,0.615,0.234,0.85,0c0.234-0.235,0.234-0.615,0-0.85l-2.25-2.25C4.281,7.169,4.121,7.114,3.961,7.118
						C3.802,7.114,3.642,7.169,3.52,7.291l-2.824,2.25c-0.234,0.235-0.234,0.615,0,0.85c0.235,0.234,0.615,0.234,0.85,0l1.957-1.559
						C3.435,9.212,3.386,9.6,3.386,10c0,3.812,3.09,6.901,6.902,6.901c2.083,0,3.946-0.927,5.212-2.387l-0.898-0.719
						C13.547,14.992,12.008,15.752,10.288,15.752z" />
					</svg>
				</div>
			</div>
		</main>
	</article>
{:else}
	<article
		use:IntersectionCard
		class="wrapper card-observer"
		in:fly={in_fly}
		out:fly={out_fly}>
		<main class="container-card">
			<div class="top">
				<img
					on:click={ProductClickEvent(product)}
					class="image-card"
					src={resizingImg(product.imgs[current])}
					alt="dsdad" />
				<button on:click={prevImg} class="b-right"><svg
						class="svg-reset"
						viewBox="0 0 20 20">
						<path
							fill="current"
							d="M8.388,10.049l4.76-4.873c0.303-0.31,0.297-0.804-0.012-1.105c-0.309-0.304-0.803-0.293-1.105,0.012L6.726,9.516c-0.303,0.31-0.296,0.805,0.012,1.105l5.433,5.307c0.152,0.148,0.35,0.223,0.547,0.223c0.203,0,0.406-0.08,0.559-0.236c0.303-0.309,0.295-0.803-0.012-1.104L8.388,10.049z" />
					</svg></button>
				<button on:click={nextImg} class="b-left"><svg
						class="svg-reset"
						viewBox="0 0 20 20">
						<path
							fill="current"
							d="M11.611,10.049l-4.76-4.873c-0.303-0.31-0.297-0.804,0.012-1.105c0.309-0.304,0.803-0.293,1.105,0.012l5.306,5.433c0.304,0.31,0.296,0.805-0.012,1.105L7.83,15.928c-0.152,0.148-0.35,0.223-0.547,0.223c-0.203,0-0.406-0.08-0.559-0.236c-0.303-0.309-0.295-0.803,0.012-1.104L11.611,10.049z" />
					</svg></button>
			</div>
			<div class="bottom" on:click={ProductClickEvent(product)}>
				<div class="details">
					<h1>{product.nombre}</h1>
					<p>${product.precio}</p>
				</div>
				<div class="buy">
					<svg class="svg-reset" viewBox="0 0 20 20">
						<path
							fill="current"
							d="M17.72,5.011H8.026c-0.271,0-0.49,0.219-0.49,0.489c0,0.271,0.219,0.489,0.49,0.489h8.962l-1.979,4.773H6.763L4.935,5.343C4.926,5.316,4.897,5.309,4.884,5.286c-0.011-0.024,0-0.051-0.017-0.074C4.833,5.166,4.025,4.081,2.33,3.908C2.068,3.883,1.822,4.075,1.795,4.344C1.767,4.612,1.962,4.853,2.231,4.88c1.143,0.118,1.703,0.738,1.808,0.866l1.91,5.661c0.066,0.199,0.252,0.333,0.463,0.333h8.924c0.116,0,0.22-0.053,0.308-0.128c0.027-0.023,0.042-0.048,0.063-0.076c0.026-0.034,0.063-0.058,0.08-0.099l2.384-5.75c0.062-0.151,0.046-0.323-0.045-0.458C18.036,5.092,17.883,5.011,17.72,5.011z" />
						<path
							fill="current"
							d="M8.251,12.386c-1.023,0-1.856,0.834-1.856,1.856s0.833,1.853,1.856,1.853c1.021,0,1.853-0.83,1.853-1.853S9.273,12.386,8.251,12.386z M8.251,15.116c-0.484,0-0.877-0.393-0.877-0.874c0-0.484,0.394-0.878,0.877-0.878c0.482,0,0.875,0.394,0.875,0.878C9.126,14.724,8.733,15.116,8.251,15.116z" />
						<path
							fill="current"
							d="M13.972,12.386c-1.022,0-1.855,0.834-1.855,1.856s0.833,1.853,1.855,1.853s1.854-0.83,1.854-1.853S14.994,12.386,13.972,12.386z M13.972,15.116c-0.484,0-0.878-0.393-0.878-0.874c0-0.484,0.394-0.878,0.878-0.878c0.482,0,0.875,0.394,0.875,0.878C14.847,14.724,14.454,15.116,13.972,15.116z" />
					</svg>
				</div>
			</div>
		</main>
		<!-- <div class="inside">
			<div class="icon">
				<svg class="svg-reset" viewBox="0 0 20 20">
					<path
						fill="current"
						d="M10,1.445c-4.726,0-8.555,3.829-8.555,8.555c0,4.725,3.829,8.555,8.555,8.555c4.725,0,8.555-3.83,8.555-8.555C18.555,5.274,14.725,1.445,10,1.445 M10,17.654c-4.221,0-7.654-3.434-7.654-7.654c0-4.221,3.433-7.654,7.654-7.654c4.222,0,7.654,3.433,7.654,7.654C17.654,14.221,14.222,17.654,10,17.654 M14.39,10c0,0.248-0.203,0.45-0.45,0.45H6.06c-0.248,0-0.45-0.203-0.45-0.45s0.203-0.45,0.45-0.45h7.879C14.187,9.55,14.39,9.752,14.39,10 M14.39,12.702c0,0.247-0.203,0.449-0.45,0.449H6.06c-0.248,0-0.45-0.202-0.45-0.449c0-0.248,0.203-0.451,0.45-0.451h7.879C14.187,12.251,14.39,12.454,14.39,12.702 M14.39,7.298c0,0.248-0.203,0.45-0.45,0.45H6.06c-0.248,0-0.45-0.203-0.45-0.45s0.203-0.45,0.45-0.45h7.879C14.187,6.848,14.39,7.051,14.39,7.298" />
				</svg>
			</div>
			<div class="contents">
				<table>
					<tr>
						<th>Width</th>
						<th>Height</th>
					</tr>
					<tr>
						<td>3000mm</td>
						<td>4000mm</td>
					</tr>
					<tr>
						<th>Something</th>
						<th>Something</th>
					</tr>
					<tr>
						<td>200mm</td>
						<td>200mm</td>
					</tr>
					<tr>
						<th>Something</th>
						<th>Something</th>
					</tr>
					<tr>
						<td>200mm</td>
						<td>200mm</td>
					</tr>
					<tr>
						<th>Something</th>
						<th>Something</th>
					</tr>
					<tr>
						<td>200mm</td>
						<td>200mm</td>
					</tr>
				</table>
			</div>
		</div> -->
	</article>
{/if}
