<script>
  import { quintInOut } from "svelte/easing";
  import { fly } from "svelte/transition";
  import { createEventDispatcher } from "svelte";
  import AnimationWrapper from "./Animation-wrapper.svelte";
  const dispatch = createEventDispatcher();
  export let levels = [];
</script>

<style>
  svg {
    /* max-width: 100%; */
    min-width: 25px;
    height: auto;
    display: inline-block;
  }
  path {
    fill: var(--primary);
  }
  .separator {
    margin: 0 1em;
  }
  .wrapper-breadcrumb {
    padding: 0 2em;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-weight: 700;
    height: 70px;
  }
  .breadcrumb {
    cursor: pointer;
    /* width: 120px; */
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding: 0.3em 0.5em;
    border-radius: 5px;
  }
  .breadcrumb:hover,
  .breadcrumb.active {
    background-color: var(--primary-opacity-1);
    color: var(--primary);
  }

  .home {
    cursor: pointer;
  }

  @media (min-width: 640px) {
    .wrapper-breadcrumb {
      padding: 0;
    }
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

<!-- <AnimationWrapper duration={800}> -->
<div class="wrapper-breadcrumb">
  <!-- {#if levels.length <= 1}
      <span class="breadcrumb home"><i class="material-icons">home</i></span>
    {:else if levels.length == 2}
      <span class="breadcrumb home"><i class="material-icons">home</i></span>
      <span class="separator">&gt;</span>
      <span class="breadcrumb">lista de productos</span>
    {:else if levels.length == 3}
      <span class="breadcrumb home"><i class="material-icons">home</i></span>
      <span class="separator">&gt;</span>
      <span class="breadcrumb">lista de productos</span>
      <span class="separator">&gt;</span>
      <span class="breadcrumb active">products.name</span>
    {/if} -->

  {#each levels as item, index}
    {#if index <= 0}
      <svg
        in:fly={{ delay: 25, duration: 1000, easing: quintInOut, y: -200 }}
        out:fly={{ duration: 300, easing: quintInOut, y: -50 }}
        class="home"
        on:click={() => dispatch('level1')}
        viewBox="0 0 20 20">
        <path
          fill="current"
          d="M15.971,7.708l-4.763-4.712c-0.644-0.644-1.769-0.642-2.41-0.002L3.99,7.755C3.98,7.764,3.972,7.773,3.962,7.783C3.511,8.179,3.253,8.74,3.253,9.338v6.07c0,1.146,0.932,2.078,2.078,2.078h9.338c1.146,0,2.078-0.932,2.078-2.078v-6.07c0-0.529-0.205-1.037-0.57-1.421C16.129,7.83,16.058,7.758,15.971,7.708z M15.68,15.408c0,0.559-0.453,1.012-1.011,1.012h-4.318c0.04-0.076,0.096-0.143,0.096-0.232v-3.311c0-0.295-0.239-0.533-0.533-0.533c-0.295,0-0.534,0.238-0.534,0.533v3.311c0,0.09,0.057,0.156,0.096,0.232H5.331c-0.557,0-1.01-0.453-1.01-1.012v-6.07c0-0.305,0.141-0.591,0.386-0.787c0.039-0.03,0.073-0.066,0.1-0.104L9.55,3.75c0.242-0.239,0.665-0.24,0.906,0.002l4.786,4.735c0.024,0.033,0.053,0.063,0.084,0.09c0.228,0.196,0.354,0.466,0.354,0.76V15.408z" />
      </svg>
    {/if}

    {#if index == 1}
      <svg
        in:fly={{ delay: 50, duration: 1000, easing: quintInOut, y: -200 }}
        out:fly={{ duration: 300, easing: quintInOut, y: -50 }}
        class="separator"
        viewBox="0 0 20 20">
        <path
          fill="current"
          d="M11.611,10.049l-4.76-4.873c-0.303-0.31-0.297-0.804,0.012-1.105c0.309-0.304,0.803-0.293,1.105,0.012l5.306,5.433c0.304,0.31,0.296,0.805-0.012,1.105L7.83,15.928c-0.152,0.148-0.35,0.223-0.547,0.223c-0.203,0-0.406-0.08-0.559-0.236c-0.303-0.309-0.295-0.803,0.012-1.104L11.611,10.049z" />
      </svg>
      <!-- <svg class="svg-reset" viewBox="0 0 20 20">
              <path
                fill="current"
                d="M12.522,10.4l-3.559,3.562c-0.172,0.173-0.451,0.176-0.625,0c-0.173-0.173-0.173-0.451,0-0.624l3.248-3.25L8.161,6.662c-0.173-0.173-0.173-0.452,0-0.624c0.172-0.175,0.451-0.175,0.624,0l3.738,3.736C12.695,9.947,12.695,10.228,12.522,10.4 M18.406,10c0,4.644-3.764,8.406-8.406,8.406c-4.644,0-8.406-3.763-8.406-8.406S5.356,1.594,10,1.594C14.643,1.594,18.406,5.356,18.406,10M17.521,10c0-4.148-3.374-7.521-7.521-7.521c-4.148,0-7.521,3.374-7.521,7.521c0,4.147,3.374,7.521,7.521,7.521C14.147,17.521,17.521,14.147,17.521,10" />
            </svg> -->
      <span
        in:fly={{ delay: 75, duration: 1000, easing: quintInOut, y: -200 }}
        out:fly={{ duration: 300, easing: quintInOut, y: -50 }}
        class="breadcrumb"
        on:click={() => dispatch('level2')}>{levels[index]}</span>
    {/if}

    {#if index == 2}
      <svg
        in:fly={{ delay: 100, duration: 1000, easing: quintInOut, y: -200 }}
        out:fly={{ duration: 300, easing: quintInOut, y: -50 }}
        class="separator"
        viewBox="0 0 20 20">
        <path
          fill="current"
          d="M11.611,10.049l-4.76-4.873c-0.303-0.31-0.297-0.804,0.012-1.105c0.309-0.304,0.803-0.293,1.105,0.012l5.306,5.433c0.304,0.31,0.296,0.805-0.012,1.105L7.83,15.928c-0.152,0.148-0.35,0.223-0.547,0.223c-0.203,0-0.406-0.08-0.559-0.236c-0.303-0.309-0.295-0.803,0.012-1.104L11.611,10.049z" />
      </svg>
      {#key levels}
        <span
          in:fly={{ delay: 125, duration: 1000, easing: quintInOut, y: -200 }}
          out:fly={{ duration: 300, easing: quintInOut, y: -50 }}
          class="breadcrumb active">{levels[index]}</span>
      {/key}
    {/if}
  {/each}
</div>
<!-- </AnimationWrapper> -->
