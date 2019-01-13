<template>
  <button
    class="btn"
    :disabled="disabled"
    @click="onClick"
  >
    <slot />
  </button>
</template>

<script>
export default {
  props: {
    onClick: {
      type: Function,
      required: false,
      default: () => null,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
