<template>
  <div>
    <header class="w-100 bb bw1 b--shadow-brand tl flex items-center mb3 pb2">
      <h3 class="f4 normal tl ma0">
        Add Plan to Itinerary
      </h3>
      <span class="flex-auto" />
      <span class="flex ml2 btn-group">
        <button
          value="details.type"
          class="f6-l w4-l tc ba b--solid b--brand bw1 pointer pv2 ph3-ns ph2 br--left br2 brand bg-white flex items-center justify-center"
          for="transportation"
          @click="defineEventType('transportation')"
        >
          <NavigationIcon class="w1-l h1-l mr1-l" />
          <span class="dn flex-l">
            Transportation
          </span>
        </button>
        <button
          class="f6-l w4-l tc bt bb b--brand bw1 pointer pv2 ph3-ns ph2 brand bg-white flex items-center justify-center"
          for="lodging"
          @click="defineEventType('lodging')"
        >
          <HomeIcon class="w1-l h1-l mr1-l" />
          <span class="dn flex-l">
            Lodging
          </span>
        </button>
        <button
          class="f6-l w4-l tc ba b--solid b--brand bw1 pointer pv2 ph3-ns ph2 br--right br2 brand bg-white flex items-center justify-center"
          for="event"
          @click="defineEventType('outing')"
        >
          <SunIcon class="w1-l h1-l mr1-l" />
          <span class="dn flex-l">
            Event
          </span>
        </button>
      </span>
    </header>
    <div>
      <div v-if="this.eventType === 'transportation'">
        <Transportation :trip-id="$route.params.id" />
      </div>
      <div v-if="this.eventType === 'lodging'">
        <Lodging :trip-id="$route.params.id" />
      </div>
      <div v-if="this.eventType === 'outing'">
        <Outing :trip-id="$route.params.id" />
      </div>
    </div>
  </div>
</template>

<script>
import {
  NavigationIcon, HomeIcon, SunIcon, EditIcon, Trash2Icon,
} from 'vue-feather-icons';
import Lodging from './Lodging';
import Transportation from './Transportation';
import Outing from './Outing';

export default {
  components: {
    NavigationIcon,
    HomeIcon,
    SunIcon,
    EditIcon,
    Trash2Icon,
    Lodging,
    Transportation,
    Outing,
  },

  props: {
    details: {
      type: Object,
      default: () => {},
    },
    layover: {
      type: Object,
      default: () => {},
    },
    leftTitleTop: {
      type: String,
      default: '',
    },
    leftSubtitleTop: {
      type: String,
      default: '',
    },
    leftTitleBottom: {
      type: String,
      default: '',
    },
    leftSubtitleBottom: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      eventType: 'transportation',
    };
  },
  computed: {

  },

  methods: {
    defineEventType(eventType) {
      this.eventType = eventType;
      return this.eventType;
    },
  },
};
</script>
