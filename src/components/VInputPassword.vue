<template>
  <input
    type="password"
    placeholder="Password"
    @input="$emit('input', $event.target.value)"
    @keyup="validatePassword($event.target.value)"
  />
</template>

<script>
import validator from 'validator'

export default {
  data() {
    return {
      timeout: null,
      isActive: true,
      isValid: null
    }
  },

  methods: {
    validatePassword(str) {
      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        if (validator.isEmpty(str)) { this.isActive = true; return }
        this.isActive = false
        this.isValid = validator.isByteLength(str, { min: 8 })
      }, 500)
    }
  }
}
</script>
