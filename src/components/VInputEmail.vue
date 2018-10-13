<template>
  <input
    type="email"
    placeholder="Email"
    @input="$emit('input', $event.target.value)"
    @keyup="validateEmail($event.target.value)"
  />
</template>

<script>
import validator from 'validator'

export default {
  props: {
    model: {
      type: String,
      required: false,
    }
  },

  data() {
    return {
      timeout: null,
      isActive: true,
      isValid: null
    }
  },

  methods: {
    validateEmail(str) {
      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        if (validator.isEmpty(str)) { this.isActive = true; return }
        this.isActive = false
        this.isValid = validator.isEmail(str)
      }, 500)
    }
  }
}
</script>
