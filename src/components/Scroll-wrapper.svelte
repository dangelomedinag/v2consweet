<script>
  import { onMount } from "svelte";
  import { quintInOut } from "svelte/easing";
  import { scale } from "svelte/transition";
  import AnimationWrapper from "./Animation-wrapper.svelte";
  import CardProduct from "./Card-product.svelte";

  export let products;
  $: empty = products.length <= 0;
  let scroll_container;
  let scrollable;

  onMount(() => {
    scroll_container = document.querySelector(".wrapper-container");
  });

  function scrolling() {
    /* width card to step scroll ajustment*/
    let cardWrapper = document.querySelector("article.wrapper");
    let style =
      cardWrapper.currentStyle || window.getComputedStyle(cardWrapper);
    let cardWidth =
      cardWrapper.offsetWidth + +style.marginRight.replace("px", "");

    const elementWith =
      scroll_container.scrollWidth - scroll_container.clientWidth;

    if (scroll_container.scrollLeft >= elementWith) {
      scroll_container.scroll({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
      return;
    }

    scroll_container.scroll({
      top: 0,
      left: scroll_container.scrollLeft + cardWidth,
      behavior: "smooth",
    });
  }
</script>

<style>
  .wrapper {
    position: relative;
    margin: 1em 0;
    max-height: 353px;
    overflow: hidden;

    /* cursor: grab; */
  }
  .wrapper::after {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
    width: 80%;
    background: linear-gradient(90deg, #2a221d00 30%, #2a221d 100%);
    pointer-events: none;
  }
  .wrapper-container {
    overflow-y: hidden;
    overflow-x: scroll;
    white-space: nowrap;
    min-width: 100%;
    padding: 1em 3em 1em 0;
    scroll-behavior: smooth;
  }
  .wrapper-container::-webkit-scrollbar {
    width: 100%;
    height: 5px;
    background-color: white;
    margin-top: 1em;
  }
  .wrapper-container::-webkit-scrollbar {
    height: 5px;
  }
  /* Track */
  .wrapper-container::-webkit-scrollbar-track {
    background: #2a221d;
  }
  /* Handle */
  .wrapper-container::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: #f36262;
  }
  /* Handle on hover */
  .wrapper-container::-webkit-scrollbar-thumb:hover {
    background: #e98585;
  }

  .btn-next {
    outline: none;
    position: absolute;
    z-index: 100;
    right: 0;
    top: 50%;
    width: 3em;
    height: 3em;
    /* padding: 1em; */
    background-color: white;
    color: #000;
    transform: translate(0%, -50%);
    margin: 0;
    border-radius: 100px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .btn-next:hover {
    background-color: rgb(223, 223, 223);
  }
  .btn-next .icon {
    fill: #f36262;
    width: 50%;
    height: auto;
  }

  @media (min-width: 640px) {
  }

  @media (min-width: 768px) {
    /* .wrapper::after {
      width: 70%;
    } */
  }

  @media (min-width: 1024px) {
    .wrapper::after {
      width: 30%;
    }
  }

  @media (min-width: 1280px) {
  }
</style>

<div class="wrapper">
  <div class="wrapper-container">
    {#each products.filter((i) => i.salient) as item (item.id)}
      <CardProduct product={item} on:clickCard />
    {:else}
      <CardProduct skeleton={true} />
    {/each}

    {#if !empty}
      <button
        transition:scale={{ duration: 1000, easing: quintInOut, opacity: 0 }}
        class="btn-next"
        on:click={scrolling}>
        <svg class="icon" viewBox="0 0 20 20">
          <path
            fill="current"
            d="M1.729,9.212h14.656l-4.184-4.184c-0.307-0.306-0.307-0.801,0-1.107c0.305-0.306,0.801-0.306,1.106,0
          l5.481,5.482c0.018,0.014,0.037,0.019,0.053,0.034c0.181,0.181,0.242,0.425,0.209,0.66c-0.004,0.038-0.012,0.071-0.021,0.109
          c-0.028,0.098-0.075,0.188-0.143,0.271c-0.021,0.026-0.021,0.061-0.045,0.085c-0.015,0.016-0.034,0.02-0.051,0.033l-5.483,5.483
          c-0.306,0.307-0.802,0.307-1.106,0c-0.307-0.305-0.307-0.801,0-1.105l4.184-4.185H1.729c-0.436,0-0.788-0.353-0.788-0.788
          S1.293,9.212,1.729,9.212z" />
        </svg>
      </button>
    {/if}
  </div>
</div>
