<script>
	let pipe;

	function scrolling() {
		const elementWith = pipe.scrollWidth - pipe.clientWidth;

		if (pipe.scrollLeft >= elementWith) {
			pipe.scroll({
				top: 0,
				left: 0,
				behavior: "smooth",
			});

			return;
		}

		pipe.scroll({
			top: 0,
			left: pipe.scrollLeft + 266,
			behavior: "smooth",
		});

		// pipe.scrollLeft += 266;
	}

	function eventScroll(event) {
		const elementWith = pipe.scrollWidth - pipe.clientWidth;

		// console.log(event.target);
	}

	async function getProducts() {
		const promise = await fetch(
			"https://sapper-heroku-test.herokuapp.com/api/productos.json"
		);
		let product = await promise.json();
		setTimeout(() => {
			return product;
		}, 3000);
		// return product;
	}
	// const promise = fetch(
	// 	"https://sapper-heroku-test.herokuapp.com/api/productos.json"
	// ).then((res) => res);
	// let resolve = promise.json();
</script>

<style>
	.wrapper {
		display: inline-flex;
		width: 250px;
		height: 300px;
		background: white;
		margin: 0;
		position: relative;
		overflow: hidden;
		border-radius: 10px 10px 10px 10px;
		box-shadow: 0;
		transform: scale(0.95);
		transition: box-shadow 0.5s, transform 0.5s;
	}
	.wrapper:hover {
		transform: scale(1);
		box-shadow: 5px 20px 30px rgba(0, 0, 0, 0.2);
	}
	.wrapper .container {
		width: 100%;
		height: 100%;
	}
	.wrapper .container .top {
		height: 80%;
		width: 100%;
		background: url(https://s-media-cache-ak0.pinimg.com/736x/49/80/6f/49806f3f1c7483093855ebca1b8ae2c4.jpg)
			no-repeat center center;
		-webkit-background-size: 100%;
		-moz-background-size: 100%;
		-o-background-size: 100%;
		background-size: 100%;
	}
	.wrapper .container .bottom {
		width: 200%;
		height: 20%;
		transition: transform 0.5s;
	}
	.wrapper .container .bottom.clicked {
		transform: translateX(-50%);
	}
	.wrapper .container .bottom h1 {
		font-size: 1.3em;
		margin: 0;
		padding: 0;
	}
	.wrapper .container .bottom p {
		margin: 0;
		padding: 0;
	}
	.wrapper .container .bottom .left {
		height: 100%;
		width: 50%;
		background: #f4f4f4;
		position: relative;
		float: left;
	}
	.wrapper .container .bottom .left .details {
		padding: 0 20px;
		float: left;
		width: 70%;
		height: 100%;
	}
	.wrapper .container .bottom .left .buy {
		float: right;
		width: calc(30% - 2px);
		height: 100%;
		background: #f1f1f1;
		transition: background 0.5s;
		border-left: solid thin rgba(0, 0, 0, 0.1);
	}
	.wrapper .container .bottom .left .buy i {
		font-size: 30px;
		/* padding: 30px; */
		color: #254053;
		transition: transform 0.5s;
	}
	.wrapper .container .bottom .left .buy:hover {
		background: #a6cdde;
	}
	.wrapper .container .bottom .left .buy:hover i {
		transform: translateY(5px);
		color: #00394b;
	}
	.wrapper .container .bottom .right {
		width: 250px;
		background: #a6cdde;
		color: white;
		float: right;
		height: 300px;
		overflow: hidden;
	}
	.wrapper .container .bottom .right .details {
		/* padding: 20px; */
		float: right;
		width: 70%;
	}
	.wrapper .container .bottom .right .done {
		width: calc(30% - 2px);
		float: left;
		transition: transform 0.5s;
		border-right: solid thin rgba(255, 255, 255, 0.3);
		height: 50%;
	}
	.wrapper .container .bottom .right .done i {
		font-size: 30px;
		/* padding: 30px; */
		color: white;
	}
	.wrapper .container .bottom .right .remove {
		width: calc(30% - 1px);
		clear: both;
		border-right: solid thin rgba(255, 255, 255, 0.3);
		height: 50%;
		background: #bc3b59;
		transition: transform 0.5s, background 0.5s;
	}
	.wrapper .container .bottom .right .remove:hover {
		background: #9b2847;
	}
	.wrapper .container .bottom .right .remove:hover i {
		transform: translateY(5px);
	}
	.wrapper .container .bottom .right .remove i {
		transition: transform 0.5s;
		font-size: 30px;
		padding: 30px;
		color: white;
	}
	.wrapper .container .bottom .right:hover .remove,
	.wrapper .container .bottom .right:hover .done {
		transform: translateY(-100%);
	}
	.wrapper .inside {
		z-index: 9;
		background: #92879b;
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

	/* primary: #f36566 */
	/* secondary: #2a221d */
	.main {
		background-color: #2a221d;
		border-top-left-radius: 1.5em;
		border-top-right-radius: 1.5em;
	}
	.split {
		/* width: 80%; */
		height: 1px;
		background-color: rgba(243, 101, 101, 0.2);
		border: none;
	}
	section.list {
		padding: 1em 2em;
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
		color: #d8d8d8;
	}
	a.enlaces {
		/* reset */
		/* display: block; */
		display: inline-flex;
		justify-content: center;
		align-items: center;
		color: #d8d8d8;
		border: 1px solid #d8d8d8;
		padding: 1em;
	}
	a.enlaces:hover {
		background-color: #f36262;
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
	img {
		width: 3em;
		height: auto;
		display: block;
		margin: 0 auto;
	}
	header {
		padding: 1em;
		display: flex;
	}
	/* button {
		background-color: #d8d8d8;
		border: 1px solid #f36262;
		color: #f36262;
	} */
	div.parent {
		position: relative;
		margin: 1em 0;
		cursor: grab;
	}
	div.parent::after {
		content: "";
		position: absolute;
		top: 0;
		right: 0;
		height: 100%;
		width: 90%;
		background: linear-gradient(90deg, #2a221d00 30%, #2a221d 100%);
		pointer-events: none;
	}
	section.pipe {
		overflow-y: hidden;
		overflow-x: scroll;
		white-space: nowrap;
		min-width: 100%;
		padding: 1em 5em 1em 0;
	}
	section.pipe::-webkit-scrollbar {
		width: 100%;
		height: 5px;
		background-color: white;
		margin-top: 1em;
	}
	section.pipe::-webkit-scrollbar {
		height: 5px;
	}
	/* Track */
	section.pipe::-webkit-scrollbar-track {
		background: #2a221d;
	}
	/* Handle */
	section.pipe::-webkit-scrollbar-thumb {
		border-radius: 10px;
		background: #f36262;
	}
	/* Handle on hover */
	section.pipe::-webkit-scrollbar-thumb:hover {
		background: #e98585;
	}
	/* section.pipe {
		height: 100%;
		background-color: aquamarine;
		border: 1px solid #f36262;
		margin: 0 0 0 2em;
	} */
	article {
		display: inline-flex;
		flex-direction: column;
		justify-content: space-between;
		flex-wrap: nowrap;
		border-radius: 10px;
		height: 100%;
		/* border: 2px solid #f36262; */
		border: 2px solid white;
		background-color: #d8d8d8;
		width: 250px;
		height: 300px;
		margin-right: 1em;
		/* padding: 1em; */
		box-shadow: 0;
		transition: box-shadow 0.5s, transform 0.5s;
		transform: scale(0.96);
		/* color: #2a221d; */
		color: #ffffff;
		font-weight: 700;
		overflow: hidden;
	}
	article:hover {
		box-shadow: 5px 20px 30px rgba(0, 0, 0, 0.2);
		transform: scale(1);
	}

	article > header,
	article > footer {
		width: 100%;
		max-width: 100%;
		/* background-color: rgba(0, 0, 0, 0.6); */
		/* background-color: #ffffff; */
		background-color: #2a221d;
		margin: 0;
		padding: 0 1em;
	}

	article > main {
		width: 100%;
		max-width: 100%;
		/* background-color: rgba(255, 255, 255, 0.4); */
		margin: 0;
		padding: 0;
		height: 100%;
	}

	article h4 {
		margin: 0;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	article > footer {
		display: inline-flex;
		justify-content: space-between;
		align-items: center;
	}

	article span {
		font-size: 1.2em;
		font-weight: 700;
	}

	article button {
		margin: 0;
	}
	button.next {
		outline: none;
		position: absolute;
		z-index: 100;
		right: 0;
		top: 50%;
		width: 4em;
		height: 4em;
		/* padding: 1em; */
		background-color: white;
		color: #000;
		transform: translate(0%, -50%);
		margin: 0;
		border-radius: 100px;
		cursor: pointer;
	}
	button.next:hover {
		background-color: rgb(223, 223, 223);
	}
	button.next > svg {
		fill: #f36262;
	}
	button.next.reverse > svg {
		transform: rotate(180deg);
	}
</style>

<div class="container">
	<header>
		<button>aaa</button>
		<img src="consweet-logo-web.svg" alt="icon-logo" />
		<button>bbb</button>
	</header>
</div>

<div class="container-full main">
	<div class="container">
		{#each ['Productos', 'Contacto', 'Acerca de...'] as i, index}
			<section class="list">
				<svg class="icon" viewBox="0 0 20 20">
					<path
						fill="current"
						d="M7.228,11.464H1.996c-0.723,0-1.308,0.587-1.308,1.309v5.232c0,0.722,0.585,1.308,1.308,1.308h5.232
					c0.723,0,1.308-0.586,1.308-1.308v-5.232C8.536,12.051,7.95,11.464,7.228,11.464z M7.228,17.351c0,0.361-0.293,0.654-0.654,0.654
					H2.649c-0.361,0-0.654-0.293-0.654-0.654v-3.924c0-0.361,0.292-0.654,0.654-0.654h3.924c0.361,0,0.654,0.293,0.654,0.654V17.351z
						M17.692,11.464H12.46c-0.723,0-1.308,0.587-1.308,1.309v5.232c0,0.722,0.585,1.308,1.308,1.308h5.232
					c0.722,0,1.308-0.586,1.308-1.308v-5.232C19,12.051,18.414,11.464,17.692,11.464z M17.692,17.351c0,0.361-0.293,0.654-0.654,0.654
					h-3.924c-0.361,0-0.654-0.293-0.654-0.654v-3.924c0-0.361,0.293-0.654,0.654-0.654h3.924c0.361,0,0.654,0.293,0.654,0.654V17.351z
						M7.228,1H1.996C1.273,1,0.688,1.585,0.688,2.308V7.54c0,0.723,0.585,1.308,1.308,1.308h5.232c0.723,0,1.308-0.585,1.308-1.308
					V2.308C8.536,1.585,7.95,1,7.228,1z M7.228,6.886c0,0.361-0.293,0.654-0.654,0.654H2.649c-0.361,0-0.654-0.292-0.654-0.654V2.962
					c0-0.361,0.292-0.654,0.654-0.654h3.924c0.361,0,0.654,0.292,0.654,0.654V6.886z M17.692,1H12.46c-0.723,0-1.308,0.585-1.308,1.308
					V7.54c0,0.723,0.585,1.308,1.308,1.308h5.232C18.414,8.848,19,8.263,19,7.54V2.308C19,1.585,18.414,1,17.692,1z M17.692,6.886
					c0,0.361-0.293,0.654-0.654,0.654h-3.924c-0.361,0-0.654-0.292-0.654-0.654V2.962c0-0.361,0.293-0.654,0.654-0.654h3.924
					c0.361,0,0.654,0.292,0.654,0.654V6.886z" />
				</svg>
				<h1>{i}</h1>
				<p>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>
				{#if index == 0}
					<div class="parent">
						<section bind:this={pipe} class="pipe">
							{#await getProducts()}
								<!-- <article>
									<header>
										<h4>Titulo</h4>
									</header>
									<main />
									<footer><span>1800</span> <button>ver</button></footer>
								</article> -->
								<div class="wrapper">
									<div class="container">
										<div class="top" />
										<div class="bottom">
											<div class="left">
												<div class="details">
													<h1>Chair</h1>
													<p>£250</p>
												</div>
												<div class="buy">
													<i class="material-icons">add_shopping_cart</i>
												</div>
											</div>
											<div class="right">
												<div class="done">
													<i class="material-icons">done</i>
												</div>
												<div class="details">
													<h1>Chair</h1>
													<p>Added to your cart</p>
												</div>
												<div class="remove">
													<i class="material-icons">clear</i>
												</div>
											</div>
										</div>
									</div>
									<div class="inside">
										<div class="icon">
											<i class="material-icons">info_outline</i>
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
									</div>
								</div>
								<div class="wrapper">
									<div class="container">
										<div class="top" />
										<div class="bottom">
											<div class="left">
												<div class="details">
													<h1>Chair</h1>
													<p>£250</p>
												</div>
												<div class="buy">
													<i class="material-icons">add_shopping_cart</i>
												</div>
											</div>
											<div class="right">
												<div class="done">
													<i class="material-icons">done</i>
												</div>
												<div class="details">
													<h1>Chair</h1>
													<p>Added to your cart</p>
												</div>
												<div class="remove">
													<i class="material-icons">clear</i>
												</div>
											</div>
										</div>
									</div>
									<div class="inside">
										<div class="icon">
											<i class="material-icons">info_outline</i>
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
									</div>
								</div>
							{:then product}
								{#each product as item}
									<article
										style="background: url('{item.imgs[0]}') no-repeat center center; background-size: cover;">
										<header>
											<h4>{item.nombre}</h4>
										</header>
										<main />
										<footer>
											<span>{item.precio}</span>
											<button>ver</button>
										</footer>
									</article>
								{/each}
							{/await}

							<button class="next" on:click={scrolling}>
								<svg class="svg-icon" viewBox="0 0 20 20">
									<path
										fill="current"
										d="M1.729,9.212h14.656l-4.184-4.184c-0.307-0.306-0.307-0.801,0-1.107c0.305-0.306,0.801-0.306,1.106,0
								l5.481,5.482c0.018,0.014,0.037,0.019,0.053,0.034c0.181,0.181,0.242,0.425,0.209,0.66c-0.004,0.038-0.012,0.071-0.021,0.109
								c-0.028,0.098-0.075,0.188-0.143,0.271c-0.021,0.026-0.021,0.061-0.045,0.085c-0.015,0.016-0.034,0.02-0.051,0.033l-5.483,5.483
								c-0.306,0.307-0.802,0.307-1.106,0c-0.307-0.305-0.307-0.801,0-1.105l4.184-4.185H1.729c-0.436,0-0.788-0.353-0.788-0.788
								S1.293,9.212,1.729,9.212z" />
								</svg>
							</button>
						</section>
					</div>
				{/if}
				<a class="enlaces" href="/">
					<span style="padding-right: 1em;">más!</span>
					<svg class="svg-icon" viewBox="0 0 20 20">
						<path
							fill="current"
							d="M1.729,9.212h14.656l-4.184-4.184c-0.307-0.306-0.307-0.801,0-1.107c0.305-0.306,0.801-0.306,1.106,0
						l5.481,5.482c0.018,0.014,0.037,0.019,0.053,0.034c0.181,0.181,0.242,0.425,0.209,0.66c-0.004,0.038-0.012,0.071-0.021,0.109
						c-0.028,0.098-0.075,0.188-0.143,0.271c-0.021,0.026-0.021,0.061-0.045,0.085c-0.015,0.016-0.034,0.02-0.051,0.033l-5.483,5.483
						c-0.306,0.307-0.802,0.307-1.106,0c-0.307-0.305-0.307-0.801,0-1.105l4.184-4.185H1.729c-0.436,0-0.788-0.353-0.788-0.788
						S1.293,9.212,1.729,9.212z" />
					</svg>
				</a>
				<a class="enlaces" href="/">
					<span style="padding-right: 1em;">{i}</span>
					<svg class="svg-icon" viewBox="0 0 20 20">
						<path
							fill="current"
							d="M1.729,9.212h14.656l-4.184-4.184c-0.307-0.306-0.307-0.801,0-1.107c0.305-0.306,0.801-0.306,1.106,0
						l5.481,5.482c0.018,0.014,0.037,0.019,0.053,0.034c0.181,0.181,0.242,0.425,0.209,0.66c-0.004,0.038-0.012,0.071-0.021,0.109
						c-0.028,0.098-0.075,0.188-0.143,0.271c-0.021,0.026-0.021,0.061-0.045,0.085c-0.015,0.016-0.034,0.02-0.051,0.033l-5.483,5.483
						c-0.306,0.307-0.802,0.307-1.106,0c-0.307-0.305-0.307-0.801,0-1.105l4.184-4.185H1.729c-0.436,0-0.788-0.353-0.788-0.788
						S1.293,9.212,1.729,9.212z" />
					</svg>
				</a>
			</section>

			{#if index < new Array(3).length - 1}
				<hr class="split" />
			{/if}
		{/each}
	</div>
</div>
