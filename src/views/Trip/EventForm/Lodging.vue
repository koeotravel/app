<template>
  <div>
    <form @submit.prevent="handleCreateEvent(tripId, eventLodging.startDate, eventLodging)" >
      <label>Check-in Date</label>
        <select v-model="eventLodging.startDate" >
          <option disabled value="">Please select one</option>
          <option v-for="day in days.data" v-bind:key="day.id"> {{day}}</option>
        </select>
      <label>Check-out Date</label>
        <select v-model="eventLodging.endDate" >
          <option disabled value="">Please select one</option>
          <option v-for="(day, i) in days.data" v-bind:key="day.id"> Day {{ i + 1 }} - {{ day.date }}</option>
        </select>
      <label>Check-in Time</label>
        <input v-model="eventLodging.startTime" type="text"/>
      <label>Check-out Time</label>
        <input v-model="eventLodging.endTime" type="text"/>s
      <label>Accommodation Name</label>
        <input v-model="eventLodging.name" placeholder="Airbnb" type="text">
      <label>Address</label>
        <input v-model="eventLodging.location" placeholder="123 Main St, Chicago, IL 60613" type="text"/>
      <label>Total Price</label>
        <input v-model="eventLodging.price" placeholder="$$" type="text"/>
      <label>Notes</label>
        <input v-model="eventLodging.description" placeholder="Fun tings" type="text"/>
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
      eventLodging: {
        type: '',
        subtype: '',
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
    unsplash.photos.getRandomPhoto({ query: 'hotel' })
      .then(toJson)
      .then((response) => {
        this.eventLodging.image.imageUrl = response.urls.regular
        this.eventLodging.image.username = response.user.name
        this.eventLodging.image.imageAuthorUrl = `https://unsplash.com/@${response.user.username}?utm_source=your_app_name&utm_medium=referral`
      })
  },
  methods: {
    ...mapActions(['createPlan']),
    handleCreateEvent(tripId, day, eventLodging) {
      if(!day) {return}
      const event = {
        tripId,
        dayId: JSON.parse(day).id,
        eventObject: eventLodging
      }
      this.createPlan(event)
    }
  },
  computed: {
    ...mapState(['days']),
  }
}
</script>

