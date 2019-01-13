<template>
  <input
    type="email"
    placeholder="Email"
    :value="value"
    @input="$emit('input', $event.target.value)"
  >
</template>

<script>
export default {
  props: {
    value: {
      type: String
    }
  }
};
</script>
