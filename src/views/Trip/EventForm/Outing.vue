<template>
  <div>
    <form @submit.prevent="handleCreateEvent(tripId, eventOuting.startDate, eventOuting)" >
      <select v-model="eventOuting.startDate" >
        <option disabled value="">Please select one</option>
        <option v-for="day in days.data" v-bind:key="day.id"> {{day}} </option>
      </select>
      <label>Event</label>
        <input v-model="eventOuting.name" placeholder="Club" type="text">
      <label>Address</label>
        <input v-model="eventOuting.location" placeholder="123 Main Street" type="text"/>
      <label>Total Price</label>
        <input v-model="eventOuting.price" placeholder="$$" type="text"/>
      <label>Event Start Time</label>
        <input v-model="eventOuting.startTime" type="text"/>
      <label>Notes</label>
        <input v-model="eventOuting.description" placeholder="Fun tings" type="text"/>
      <button type="submit">Add to Itinerary</button>
    </form>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

import Unsplash, { toJson } from 'unsplash-js'

const unsplash = new Unsplash({
  applicationId: '301382d5663e6043af8bb281b504459890c41a97a921be0e1d3c1f60d9d8d940',
  secret: 'bf18a083c2fcac2843da10f311839a078580ad6de58bfbe8385fa71b3f449f31',
  callbackUrl: 'urn:ietf:wg:oauth:2.0:oob',
})

export default {
  props: ['tripId'],
  data() {
    return {
      eventOuting: {
        type: '',
        subtype: '',
        createdAt: Date.now(),
        name: '',
        startTime: '',
        endTime: '',
        startDate: '',
        endDate: '',
        location: '',
        price: '',
        description: '',
        image: {
          imageUrl: '',
          username: '',
          imageIndex: '',
        },
        members: []
      }
    }
  },
  created() {
    unsplash.photos.getRandomPhoto({ query: 'party' })
      .then(toJson)
      .then((response) => {
        this.eventOuting.image.imageUrl = response.urls.regular
        this.eventOuting.image.username = response.user.name
        this.eventOuting.image.imageAuthorUrl = `https://unsplash.com/@${response.user.username}?utm_source=your_app_name&utm_medium=referral`
      })
  },
  methods: {
    ...mapActions(['createPlan']),
    handleCreateEvent(tripId, day, eventOuting) {
        if(!day){ return }
        const event = {
        tripId,
        dayId: JSON.parse(day).id,
        eventObject: eventOuting
      }
      this.createPlan(event)
    }
  },
  computed: {
    ...mapState(['days']),
  }
}
</script>
