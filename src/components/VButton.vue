<template>
  <button
    class="br1 f6 ba b--solid bw1 pointer"
    :block="block"
    :large="large"
    :class="[classObject, customClass]"
    :btnType="btnType"
    :disabled="disabled"
    @click="onClick"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    classObject: {
      type: Object,
      required: false,
      default: null
    },
    onClick: {
      type: Function,
      required: false,
      default: () => null
    },
    btnType: {
      type: String,
      default: 'default'
    },
    customClass: {
      type: String,
      default: null
    },
    large: {
      type: Boolean,
      default: false
    },
    block: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
}
</script>
