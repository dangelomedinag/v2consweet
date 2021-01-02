<script>
  import AnimationWrapper from "./Animation-wrapper.svelte";
</script>

<style>
  .separator {
    margin: 0 1em;
  }
  .wrapper-breadcrumb {
    padding: 1.5em 2em;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  .breadcrumb {
    font-weight: 700;
    cursor: pointer;
    width: 120px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .breadcrumb:hover,
  .breadcrumb.active {
    color: var(--primary);
  }

  .breadcrumb.home {
    width: auto;
    overflow: initial;
    text-overflow: initial;
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

  @media (min-width: 640px) {
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

<AnimationWrapper duration={1200}>
  <div class="wrapper-breadcrumb">
    <span class="breadcrumb home"><i class="material-icons">home</i></span>
    <span class="separator">&gt;</span>
    <span class="breadcrumb">lista de productos</span>
    <span class="separator">&gt;</span>
    <span class="breadcrumb active">products.name</span>
    <span class="breadcrumb">lista de productos</span>
  </div>
</AnimationWrapper>
