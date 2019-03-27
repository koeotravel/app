<template>
  <main>
    {{ account.currentUser }}
  </main>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['account']),
  },
}
</script>
