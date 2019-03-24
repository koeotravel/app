<template>
  <input
    type="password"
    placeholder="Password"
    :value="value"
    @input="$emit('input', $event.target.value)"
    :class="{dirty}"
  >
</template>

<script>
export default {
  props: {
    value: {
      type: String,
    },
    dirty: {
      type: Boolean,
    }
  }
};
</script>
