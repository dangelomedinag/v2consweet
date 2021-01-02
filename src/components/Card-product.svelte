<script>
  import { createEventDispatcher } from "svelte";

  // import { flip } from "svelte/animate";
  import { quintInOut } from "svelte/easing";
  import AnimationWrapper from "./Animation-wrapper.svelte";
  // import { fly, scale } from "svelte/transition";
  // export let in_fly = {
  //   delay: 500,
  //   duration: 1000,
  //   easing: quintInOut,
  //   x: 250,
  // };
  export let out_fly = { duration: 500, easing: quintInOut, x: 250 };
  export let product = [];
  export let skeleton = false;
  export let animations = true;
  const dispatch = createEventDispatcher();

  let current = 0;
  $: imgsCount = product.imgs?.length - 1;

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
  }

  .wrapper .container-card .top button {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    height: 20%;
    margin: auto 0;
    opacity: 0;
    background-color: var(--primary-opacity-6);
    color: white;
    padding: 0 0.5em;
    font-size: 1em;
    outline: 0;
    cursor: pointer;
  }

  .wrapper .container-card .top button:active {
    background-color: #ec8888;
  }

  .wrapper .container-card .top:hover button {
    opacity: 1;
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
  .wrapper .container-card .bottom .buy i {
    font-size: 30px;
    color: var(--neutral-6);
    transition: transform 0.5s;
  }
  .wrapper .container-card:hover .buy i {
    color: var(--primary);
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

  /* cards ajust grid list item */
  .grid {
    width: 70%;
    max-width: 390px;
    margin-right: 0;
    margin-bottom: 1.5em;
  }

  @media (min-width: 640px) {
  }

  @media (min-width: 768px) {
    .wrapper {
      width: 350px;
      height: 300px;
    }

    .grid {
      width: 48%;
      max-width: 350px;
    }
  }

  @media (min-width: 1024px) {
  }

  @media (min-width: 1280px) {
    .wrapper.grid {
      width: 30%;
    }
  }
</style>

{#if skeleton}
  <article class="wrapper loading">
    <main class="container-card">
      <div class="top loading-animated" />
      <div class="bottom">
        <div class="details">
          <h1 class="loading-animated">------------------------------------</h1>
        </div>
        <div class="buy"><i class="material-icons">cached</i></div>
      </div>
    </main>
  </article>
{:else}
  <article class="wrapper">
    <main class="container-card">
      {#key current}
        <div
          on:click={ProductClickEvent(product)}
          class="top"
          style="background: url('{product.imgs[current]}') no-repeat center center; background-size: cover;">
          <button on:click={prevImg}><i
              class="material-icons"
              style="transform: rotate(180deg)">play_arrow</i></button>
          <button on:click={nextImg}><i
              class="material-icons">play_arrow</i></button>
        </div>
      {/key}
      <div class="bottom" on:click={ProductClickEvent(product)}>
        <div class="details">
          <h1>{product.nombre}</h1>
          <p>${product.precio}</p>
        </div>
        <div class="buy"><i class="material-icons">shopping_cart</i></div>
      </div>
    </main>
    <div class="inside">
      <div class="icon"><i class="material-icons">info_outline</i></div>
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
  </article>
{/if}
