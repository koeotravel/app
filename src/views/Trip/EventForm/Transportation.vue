<template>
  <div>
    <form @submit.prevent="handleCreateEvent(tripId, eventTransport.arrival.startDate, eventTransport)">
      <label>Arrival Start</label>
        <select v-model="eventTransport.arrival.startDate" >
          <option disabled value="">Please select one</option>
          <option v-for="day in days.data" v-bind:key="day.id"> {{ day }}</option>
        </select>
      <label>Arrival End</label>
        <select v-model="eventTransport.arrival.endDate" >
          <option disabled value="">Please select one</option>
          <option v-for="(day, i) in days.data" v-bind:key="day.id"> Day {{ i + 1 }} - {{ day.date }}</option>
        </select>
      <label>Depart Start</label>
      <select v-model="eventTransport.departure.startDate" >
        <option disabled value="">Please select one</option>
        <option v-for="(day, i) in days.data" v-bind:key="day.id"> Day {{ i + 1 }} - {{ day.date }}</option>
      </select>
      <label>Depart End</label>
      <select v-model="eventTransport.departure.endDate" >
        <option disabled value="">Please select one</option>
        <option v-for="(day, i) in days.data" v-bind:key="day.id"> Day {{ i + 1 }} - {{ day.date }}</option>
      </select>
      <label>Accommodation Name</label>
        <input v-model="eventTransport.name" placeholder="Southwest" type="text">
      <label>Total Price</label>
        <input v-model="eventTransport.price" placeholder="$$" type="text"/>
      <label>Notes</label>
        <input v-model="eventTransport.description" placeholder="Flying flying flying yeaaaa" type="text"/>
      <label>Transportation type</label>
        <input v-model="eventTransport.travelType" placeholder="Flight">
      <label>Departing Airport</label>
        <input v-model="eventTransport.departure.location" placeholder="DTW"/>
      <label>Arriving Airport</label>
        <input v-model="eventTransport.arrival.location" placeholder="AZR"/>
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
      eventTransport: {
        type: 'transport',
        subtype: 'flight',
        createdAt: Date.now(),
        name: '',
        arrival: {
          location: '',
          startTime: '',
          endTime: '',
          startDate: '',
          endDate: '',
        },
        departure: {
          location: '',
          startTime: '',
          endTime: '',
          startDate: '',
          endDate: '',
        },
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
    unsplash.photos.getRandomPhoto({ query: 'plane' })
      .then(toJson)
      .then((response) => {
        this.eventTransport.image.imageUrl = response.urls.regular
        this.eventTransport.image.username = response.user.name
        this.eventTransport.image.imageAuthorUrl = `https://unsplash.com/@${response.user.username}?utm_source=your_app_name&utm_medium=referral`
      })
  },
  methods: {
    ...mapActions(['createPlan']),
    handleCreateEvent(tripId, day, eventTransport) {
      const event = {
        tripId,
        dayId: JSON.parse(day).id,
        eventObject: eventTransport
      };
      this.createPlan(event)
    }
  },
  computed: {
    ...mapState(['days']),
  }
}
</script>
