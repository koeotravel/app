<template>
  <img
    class="h2 w2 br-100"
    :src="src"
    :alt="alt"
  />
</template>

<script>
export default {
  props: {
    src: {
      type: String,
    },
    alt: {
      type: String,
    },
  },
};
</script>
