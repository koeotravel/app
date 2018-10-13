<template>
  <form class="ph4-l ph3-m tl" @submit.prevent>
    <!-- TRIP NAME -->
    <h3
      @mouseover="showEditHover.name = true"
      @mouseleave="showEditHover.name = false"
      v-show="currentTrip.name && showInput.name === false"
      @click="openInlineEdit('tripName')"
      class="f3 ma0 normal v-mid flex item pb2 truncate"
    >
      {{ currentTrip.name }}
      <edit-icon v-if="showEditHover.name" class='brand ml2 pointer link dim"'></edit-icon>
    </h3>
    <input
      v-if="!currentTrip.name || showInput.name"
      v-model="currentTrip.name"
      class="input-reset input-inline bn bg-transparent f3 db pb2 w-100"
      placeholder="🗺 Add the trip name here..."
    />
    <!-- TRIP DATES -->
    <h4
      @mouseover="showEditHover.dates = true"
      @mouseleave="showEditHover.dates = false"
      v-show="currentTrip.start && currentTrip.end && showInput.dates === false"
      @click="openInlineEdit('tripDates')"
      class="f5 ma0 bold dib"
    >
      {{ currentTrip.start | humanTripDate }} &ndash; {{ currentTrip.end | humanTripDate }}
      <edit-icon v-if="showEditHover.dates" class="v-top h1 w1 brand pointer link dim">
      </edit-icon>
    </h4>
    <span v-if="!currentTrip.start || !currentTrip.end || showInput.dates">
      <input
        ref="tripStart"
        type="text"
        placeholder="📅   Start date..."
        onfocus="(this.type='date')"
        onblur="if(this.value===''){this.type='text'}"
        class="input-reset bn bg-transparent"
        v-model="currentTrip.start"
        @keyup.enter="closeInlineEdit"
        :min="today"
        max="2100-01-01"
      >
      <input
        ref="tripEnd"
        type="text"
        placeholder="End date..."
        onfocus="(this.type='date')"
        onblur="if(this.value===''){this.type='text'}"
        class="input-reset bn bg-transparent"
        v-model="currentTrip.end"
        @keyup.enter="closeInlineEdit"
        :min="currentTrip.start"
        :max="currentMaxEndDate"
      >
    </span>
    <!-- TRIP DESCRIPTION -->
    <p
      @mouseover="showEditHover.description = true"
      @mouseleave="showEditHover.description = false"
      v-show="currentTrip.description && showInput.description === false"
      @click="openInlineEdit('tripDescription')"
      class="f5 lh-copy"
    >
      {{ currentTrip.description }}
      <edit-icon v-if="showEditHover.description" class='v-bottom brand h1 w1 pointer link dim"'>
      </edit-icon>
    </p>
    <textarea
      v-if="!currentTrip.description || showInput.description"
      class="input-reset input-inline bn bg-transparent f5 lh-copy w-100 mt3"
      rows="3"
      v-model.trim="currentTrip.description"
      placeholder="📝   Add some notes about this trip here..."></textarea>
  </form>
</template>

<script>
import { mapGetters } from 'vuex'
import moment from 'moment'
import { EditIcon } from 'vue-feather-icons'

export default {
  components: {
    EditIcon
  },
  data() {
    return {
      showEditHover: {
        name: false,
        dates: false,
        description: false
      },
      showInput: {
        name: false,
        dates: false,
        description: false,
      }
    }
  },
  methods: {
    openInlineEdit(tripInput) {
      if (tripInput === 'tripName') {
        this.showInput.name = true
      }
      if (tripInput === 'tripDates') {
        this.showInput.dates = true
      }
      if (tripInput === 'tripDescription') {
        this.showInput.description = true
      }
    }
  },
  computed: {
    minTime() {
      if (this.date === this.end_date) {
        return this.newPlan.start
      }
      return null
    },
    ...mapGetters(['showChat', 'currentTrip', 'days', 'plans', 'planCities', 'newPlan', 'today', 'currentMaxEndDate', 'venues', 'venue', 'venuePhotos'])
  },
  filters: {
    humanTripDate(date) {
      if (date === 'Pre-Trip') {
        return 'Pre-Trip'
      }
      return moment(date).format('MMMM Do YYYY')
    },
    humanTime(time) {
      if (moment(time, 'HH:mm').format('h:mm A') !== 'Invalid date') {
        return moment(time, 'HH:mm').format('h:mm A')
      }
      return '-'
    }
  }
}
</script>

<style lang="css">
</style>
