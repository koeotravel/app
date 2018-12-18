<template>
  <form
    class="ph4-l ph3-m tl"
    @submit.prevent
  >
    <!-- TRIP NAME -->
    <h3
      v-show="currentTrip.name && showInput.name === false"
      class="f3 ma0 normal v-mid flex item pb2 truncate"
      @mouseover="showEditHover.name = true"
      @mouseleave="showEditHover.name = false"
      @click="openInlineEdit('tripName')"
    >
      {{ currentTrip.name }}
      <EditIcon
        v-if="showEditHover.name"
        class="brand ml2 pointer link dim&quot;"
      />
    </h3>
    <input
      v-if="!currentTrip.name || showInput.name"
      v-model="currentTrip.name"
      class="input-reset input-inline bn bg-transparent f3 db pb2 w-100"
      placeholder="🗺 Add the trip name here..."
    >
    <!-- TRIP DATES -->
    <h4
      v-show="currentTrip.start && currentTrip.end && showInput.dates === false"
      class="f5 ma0 bold dib"
      @mouseover="showEditHover.dates = true"
      @mouseleave="showEditHover.dates = false"
      @click="openInlineEdit('tripDates')"
    >
      {{ currentTrip.start | humanTripDate }} &ndash; {{ currentTrip.end | humanTripDate }}
      <EditIcon
        v-if="showEditHover.dates"
        class="v-top h1 w1 brand pointer link dim"
      />
    </h4>
    <span v-if="!currentTrip.start || !currentTrip.end || showInput.dates">
      <input
        ref="tripStart"
        v-model="currentTrip.start"
        type="text"
        placeholder="📅   Start date..."
        onfocus="(this.type='date')"
        onblur="if(this.value===''){this.type='text'}"
        class="input-reset bn bg-transparent"
        :min="today"
        max="2100-01-01"
        @keyup.enter="closeInlineEdit"
      >
      <input
        ref="tripEnd"
        v-model="currentTrip.end"
        type="text"
        placeholder="End date..."
        onfocus="(this.type='date')"
        onblur="if(this.value===''){this.type='text'}"
        class="input-reset bn bg-transparent"
        :min="currentTrip.start"
        :max="currentMaxEndDate"
        @keyup.enter="closeInlineEdit"
      >
    </span>
    <!-- TRIP DESCRIPTION -->
    <p
      v-show="currentTrip.description && showInput.description === false"
      class="f5 lh-copy"
      @mouseover="showEditHover.description = true"
      @mouseleave="showEditHover.description = false"
      @click="openInlineEdit('tripDescription')"
    >
      {{ currentTrip.description }}
      <EditIcon
        v-if="showEditHover.description"
        class="v-bottom brand h1 w1 pointer link dim&quot;"
      />
    </p>
    <textarea
      v-if="!currentTrip.description || showInput.description"
      v-model.trim="currentTrip.description"
      class="input-reset input-inline bn bg-transparent f5 lh-copy w-100 mt3"
      rows="3"
      placeholder="📝   Add some notes about this trip here..."
    />
  </form>
</template>

<script>
import { mapGetters } from 'vuex';
import moment from 'moment';
import { EditIcon } from 'vue-feather-icons';

export default {
  components: {
    EditIcon,
  },
  data() {
    return {
      showEditHover: {
        name: false,
        dates: false,
        description: false,
      },
      showInput: {
        name: false,
        dates: false,
        description: false,
      },
    };
  },
  methods: {
    openInlineEdit(tripInput) {
      if (tripInput === 'tripName') {
        this.showInput.name = true;
      }
      if (tripInput === 'tripDates') {
        this.showInput.dates = true;
      }
      if (tripInput === 'tripDescription') {
        this.showInput.description = true;
      }
    },
  },
  computed: {
    minTime() {
      if (this.date === this.end_date) {
        return this.newPlan.start;
      }
      return null;
    },
    ...mapGetters(['showChat', 'currentTrip', 'days', 'plans', 'planCities', 'newPlan', 'today', 'currentMaxEndDate', 'venues', 'venue', 'venuePhotos']),
  },
  filters: {
    humanTripDate(date) {
      if (date === 'Pre-Trip') {
        return 'Pre-Trip';
      }
      return moment(date).format('MMMM Do YYYY');
    },
    humanTime(time) {
      if (moment(time, 'HH:mm').format('h:mm A') !== 'Invalid date') {
        return moment(time, 'HH:mm').format('h:mm A');
      }
      return '-';
    },
  },
};
</script>

<style lang="css">
</style>
