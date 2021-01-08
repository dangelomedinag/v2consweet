<script>
	//? imports system
	// import { fly } from "svelte/transition";
	//? imports components, store and function
	//? props

	export let product,
		transition = unanimated,
		intro,
		outro;

	//? variables
	let current = product.imgs[0];

	//? Logic

	function resizingTumblr(url) {
		let splited = url.split("upload");
		let word = "upload/";
		let config = "w_70,h_70,c_fill";
		let newUrl = splited[0] + word + config + splited[1];
		return newUrl;
	}

	function resizingImg(url) {
		let splited = url.split("upload");
		let word = "upload/";
		let config = "w_700,h_700,c_fill";
		let newUrl = splited[0] + word + config + splited[1];
		return newUrl;
	}

	function setCurrentImg(index) {
		current = product.imgs[index];
	}

	function unanimated(node, config) {
		return {
			css: (t) => {
				return ``;
			},
		};
	}
</script>

<style>
	.courses-container {
		padding: 2em 1.5em;
		width: 100%;
		overflow: hidden;
		max-height: 813px;
		will-change: transform;
	}

	.course {
		/* background-color: #fff; */
		border-radius: 15px;
		/* box-shadow: 0 10px 10px rgba(0, 0, 0, 0.2); */
		display: flex;
		max-width: 100%;
		margin: 0 auto;
		overflow: hidden;
		width: 100%;
		flex-direction: column;
	}
	.course-preview {
		background-color: var(--primary);
		color: #fff;
		padding: 30px;
		/* max-width: 100%; */
		width: 100%;
	}

	.course h6 {
		opacity: 0.6;
		margin: 0;
		letter-spacing: 1px;
		text-transform: uppercase;
	}

	.course .course-preview h6 {
	}

	.course .title {
		letter-spacing: 1px;
		margin: 0.5em 0 1em;
	}
	.course .description {
		margin: 10px 0;
		font-size: 1em;
		color: var(--neutral-6);
	}

	.course-preview a {
		color: #fff;
		display: inline-block;
		font-size: 12px;
		opacity: 0.6;
		margin-top: 30px;
		text-decoration: none;
	}

	.course-info {
		background-color: var(--neutral-1);
		padding: 30px;
		position: relative;
		width: 100%;
	}
	.course .course-info h6 {
		color: var(--neutral-4);
	}

	.progress-container {
		position: absolute;
		top: 30px;
		right: 30px;
		text-align: right;
		width: 150px;
	}

	.progress {
		background-color: #ddd;
		border-radius: 3px;
		height: 5px;
		width: 100%;
	}

	.progress::after {
		border-radius: 3px;
		background-color: var(--primary);
		content: "";
		position: absolute;
		top: 0;
		left: 0;
		height: 5px;
		width: 66%;
	}

	.progress-text {
		font-size: 10px;
		opacity: 0.6;
		letter-spacing: 1px;
	}

	.btn {
		background-color: var(--secondary);
		border: 0;
		border-radius: 50px;
		box-shadow: 0 10px 10px rgba(0, 0, 0, 0.2);
		color: #fff;
		font-size: 16px;
		padding: 12px 25px;
		letter-spacing: 1px;
	}

	.divider {
		/* --color-opacity: 0.2; */
		/* width: 80%; */
		width: 100%;
		height: 1px;
		background-color: var(--primary-opacity-3);
		border: none;
	}
	@media (min-width: 640px) {
	}

	@media (min-width: 768px) {
		.course {
			flex-direction: row;
		}
	}

	@media (min-width: 1024px) {
		.course {
			max-width: 1024px;
		}
		.course-preview {
			width: 40%;
		}
		.course-info {
			width: 60%;
		}
	}

	@media (min-width: 1280px) {
	}

	.list-images-wrapper {
		/* background: red; */
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	/* .img-container{

	} */
	.thumblr {
		cursor: pointer;
		object-fit: cover;
		width: 80px;
		height: 80px;
	}
	.img-full {
		object-fit: cover;
		width: 500px;
		height: 500px;
	}
</style>

<div class="courses-container" in:transition={intro} out:transition={outro}>
	<div class="course">
		<div class="course-preview">
			<h6>{product.tipo}</h6>
			<h2 class="title">{product.nombre}</h2>
			<span class="btn">precio: ${product.precio}</span>
		</div>
		<div class="course-info">
			<h6>Descripcion de producto</h6>
			<p class="description">
				{@html product.descripcion}
			</p>
		</div>
	</div>
</div>
<hr class="divider" />
<div class="list-images-wrapper">
	{#each product.imgs as img}
		<img
			class="thumblr"
			src={resizingTumblr(img)}
			alt="xx"
			on:click={setCurrentImg(product.imgs.indexOf(img))} />
	{/each}
</div>
<div
	style="width: 100%;display: flex;justify-content: center;align-items: center;">
	<img class="img-full" src={resizingImg(current)} alt="xx" />
</div>
