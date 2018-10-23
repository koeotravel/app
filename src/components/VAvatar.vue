<template>
  <img
    class="avatar"
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
  }
}
</script>
