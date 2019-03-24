<template>
  <input
    type="email"
    placeholder="Email"
    @input="$emit('input', $event.target.value)"
    :value="value"
    :class="{ 'br-pill': pill, dirty }"
    novalidate
  >
</template>

<script>
export default {
  props: {
    value: {
      type: String
    },
    pill: {
      type: Boolean,
    },
    dirty: {
      type: Boolean,
    }
  },
};
</script>
