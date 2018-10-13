<template>
  <section>
    <article v-for="(day, i) in days" v-bind:key="day.id">
      Day {{ i + 1 }} - {{ day.date }}
      <div v-for="event in day.event" v-bind:key="event.id">
       EVENT ===={{event}}======
      </div>
      <button @click="removeDay({ tripId, dayId: day.id })">Remove</button>
    </article>
    <button @click="createDay(tripId)">Add Day</button>
  </section>
</template>

<script>
import { VButton } from '@/components'
import { mapActions, mapState } from 'vuex'

export default {
  components: { VButton },
  props: ['days', 'tripId'],
  methods: {
    ...mapActions(['createDay', 'removeDay']),
    ...mapState(['events'])
  },
}
</script>

