<template>
  <section>
    <article
      v-for="(day, i) in days"
      :key="day.id"
    >
      Day {{ i + 1 }} {{ day.date }}
      <div
        v-for="event in day.event"
        :key="event.id"
      >
        <img
          :src="event.image.imageUrl"
          class="trip-itinerary-img inline-itin"
        >
        <div class="inline-itin event-details">
          <label>description</label>
          <ul class="event-items">
            <li>{{ event.subtype }}</li>
            <li>{{ event.description || "description is we are flying and shit" }}</li>
            <li>{{ event.location || "location" }}</li>
            <li>{{ "tdennis" || event.members }}</li>
            <li>Start time {{ event.arrival.startTime || "12:00PM" }}</li>
            <li>End Date {{ event.departure.startDate }}</li>
          </ul>
        </div>
        <button>Remove this event</button>
      </div>
      <button
        class="inline-itin"
        @click="removeDay({ tripId, dayId: day.id })"
      >
        Remove Day
      </button>
    </article>
    <button @click="createDay(tripId)">
      Add Day
    </button>
  </section>
</template>

<script>
import { VButton } from '@/components';
import { mapActions, mapState } from 'vuex';

export default {
  components: { VButton },
  props: ['days', 'tripId'],
  methods: {
    ...mapActions(['createDay', 'removeDay']),
    ...mapState(['events']),
  },
};
</script>
