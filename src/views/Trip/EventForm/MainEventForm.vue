<template>
  <div>
    <header class="w-100 bb bw1 b--shadow-brand tl flex items-center mb3 pb2">
      <h3 class="f4 normal tl ma0">Add Plan to Itinerary</h3>
      <span class="flex-auto"></span>
      <span class="flex ml2 btn-group">
        <button value="details.type" v-on:click="defineEventType('transportation')" class="f6-l w4-l tc ba b--solid b--brand bw1 pointer pv2 ph3-ns ph2 br--left br2 brand bg-white flex items-center justify-center" for="transportation">
          <navigation-icon class="w1-l h1-l mr1-l"></navigation-icon>
          <span class="dn flex-l">Transportation</span>
        </button>
        <button v-on:click="defineEventType('lodging')" class="f6-l w4-l tc bt bb b--brand bw1 pointer pv2 ph3-ns ph2 brand bg-white flex items-center justify-center" for="lodging">
          <home-icon class="w1-l h1-l mr1-l"></home-icon>
          <span class="dn flex-l">Lodging</span>
        </button>
        <button v-on:click="defineEventType('outing')" class="f6-l w4-l tc ba b--solid b--brand bw1 pointer pv2 ph3-ns ph2 br--right br2 brand bg-white flex items-center justify-center" for="event">
          <sun-icon class="w1-l h1-l mr1-l"></sun-icon>
          <span class="dn flex-l">Event</span>
        </button>
      </span>
    </header>
    <div>
      <div v-if="this.eventType === 'transportation'">
        <transportation :tripId="$route.params.id"></transportation>
      </div>
      <div v-if="this.eventType === 'lodging'">
        <lodging :tripId="$route.params.id"></lodging>
      </div>
      <div v-if="this.eventType === 'outing'">
        <outing :tripId="$route.params.id"></outing>
      </div>
    </div>
  </div>
</template>

<script>
import { NavigationIcon, HomeIcon, SunIcon, EditIcon, Trash2Icon } from 'vue-feather-icons'
import Lodging from './Lodging'
import Transportation from './Transportation'
import Outing from './Outing'

export default {
  components: {
    NavigationIcon,
    HomeIcon,
    SunIcon,
    EditIcon,
    Trash2Icon,
    Lodging,
    Transportation,
    Outing
  },
  data() {
    return {
      eventType: 'transportation',
    }
  },
  computed: {

  },

  methods: {
    defineEventType(eventType) {
      this.eventType = eventType
      return this.eventType
    },
  },

  props: {
    details: {
      type: Object,
      default: () => {}
    },
    layover: {
      type: Object,
      default: () => {}
    },
    leftTitleTop: {
      type: String,
      default: ''
    },
    leftSubtitleTop: {
      type: String,
      default: ''
    },
    leftTitleBottom: {
      type: String,
      default: ''
    },
    leftSubtitleBottom: {
      type: String,
      default: ''
    },
  }
}
</script>
