<script>
  import { flip } from "svelte/animate";
  import { fly, scale } from "svelte/transition";
  import { quintInOut } from "svelte/easing";
  import AnimationWrapper from "./Animation-wrapper.svelte";
  let h;
  // export let animations = true;
  $: console.log(h);

  // let filter;
  // let curr_filter;
  // let curr_sort;

  // $: if (filter !== "undefined") {
  //   curr_filter = filter;
  // }
</script>

<style>
  .wrapper {
    position: relative;
    width: 100%;
    max-height: 100%;
    min-height: calc(100vh - calc(80px + 4.5em));
    z-index: 10000;
    background-color: #3d342d;
    border-top-left-radius: 1.5em;
    border-top-right-radius: 1.5em;
    box-shadow: 0 -2px 1px rgba(0, 0, 0, 0.09), 0 -4px 2px rgba(0, 0, 0, 0.09),
      0 -8px 4px rgba(0, 0, 0, 0.09), 0 -16px 8px rgba(0, 0, 0, 0.09),
      0 -32px 16px rgba(0, 0, 0, 0.09);
    overflow: hidden;
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

<svelte:window bind:innerHeight={h} />

<AnimationWrapper>
  <div class="wrapper">
    <slot />
  </div>
</AnimationWrapper>
