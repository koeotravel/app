<template>
  <input
    type="email"
    placeholder="Email"
    :value="email"
    @input="updateEmail($event.target.value)"
  />
</template>

<script>
export default {
  props: ['email'],

  methods: {
    updateEmail(email) {
      this.$emit('input', email)
    },
  }
}
</script>
