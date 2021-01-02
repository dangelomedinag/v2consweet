<script>
  import { quintInOut } from "svelte/easing";
  import { fly } from "svelte/transition";
  export let delay = 600;
  export let duration = 600;
  export let x = 0;
  export let y = 200;
  export let opacity = 0;
  export let out_delay = 0;
  export let out_duration = 600;
  export let out_x = 0;
  export let out_y = 200;
  export let out_opacity = 0;

  export let intro = {
    delay,
    duration,
    x,
    y,
    easing: quintInOut,
    opacity,
  };
  export let outro = {
    delay: out_delay,
    duration: out_duration,
    x: out_x,
    y: out_y,
    easing: quintInOut,
    opacity: out_opacity,
  };
</script>

<div
  in:fly={intro}
  out:fly={outro}
  on:introstart={() => console.log('intro started')}
  on:outrostart={() => console.log('outro started')}
  on:introend={() => console.log('intro ended')}
  on:outroend={() => console.log('outro ended')}>
  <slot />
</div>
