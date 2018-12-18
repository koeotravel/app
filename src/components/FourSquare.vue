<template>
  <!-- START EVENT FOURSQUARE SEARCH -->
  <div>
    <section class="flex flex-column flex-row-ns w-100">
      <span
        class="br3 mb3 flex-auto ba b--shadow-brand b--solid w-100 flex flex-row"
        :class="{'mr3-ns': this.newPlan.searchCity}"
      >
        <input
          v-model="newPlan.searchCity"
          type="search"
          class="bn pa3 bg-transparent input-reset w-100"
          placeholder="🌃  Search venues within a city..."
          list="cities"
          @change="displayMatches(newPlan.searchCity); displayVenues(newPlan.searchCity, newPlan.searchVenue)"
          @keyup="displayMatches(newPlan.searchCity); displayVenues(newPlan.searchCity, newPlan.searchVenue)"
        >
        <datalist id="cities">
          <option
            v-for="(city, index) in planCity"
            :key="index"
            :value="city"
          />
        </datalist>
        <button
          v-if="newPlan.searchCity"
          class="button-reset bg-transparent bn flex items-center justify-center ph3 pointer"
          @click="handleClearEventInput('city')"
        >
          <XIcon class="h1 w1" />
        </button>
      </span>
      <span
        v-show="newPlan.searchCity"
        class="br3 mb3 flex-auto ba b--shadow-brand b--solid w-100 flex flex-row"
      >
        <input
          v-model="newPlan.searchVenue"
          type="search"
          class="bn pa3 bg-transparent input-reset w-100"
          placeholder="🌇  Search for a venue..."
          @change="displayVenues(newPlan.searchCity, newPlan.searchVenue)"
          @keyup="displayVenues(newPlan.searchCity, newPlan.searchVenue)"
        >
        <button
          v-if="newPlan.searchVenue"
          class="button-reset bg-transparent bn flex items-center justify-center ph3 pointer"
          @click="handleClearEventInput('venue'); displayVenues(newPlan.searchCity, newPlan.searchVenue)"
        >
          <XIcon class="h1 w1" />
        </button>
      </span>
    </section>
    <div
      v-if="newPlan.searchCity"
      class="flex flex-auto w-100 items-center pb3 pt0"
    >
      <span class="w4-ns w-100 tl pr3-ns">
        <h5 class="pl3 f6 f5-ns ma0 nowrap black-50">
          Search Results:
        </h5>
      </span>
      <span class="flex-auto flex flex-row pl3">
        <div class="nowrap overflow-x-auto">
          <button
            v-for="planVenue in venues"
            v-if="checkVenue(planVenue)"
            :key="planVenue.venue.id"
            type="button"
            class="dib mr2 br2 ba b--solid bw1 pointer pa2 b--brand tl v-mid"
            @click="handlePlanVenue(planVenue.venue)"
          >
            <span class="flex items-center">
              <div
                v-if="planVenue.venue.photos.count !== 0"
                class="w2 h2 cover"
                :style="{'background':'url('+planVenue.venue.photos.groups[0].items[0].prefix+planVenue.venue.photos.groups[0].items[0].height+'x'+planVenue.venue.photos.groups[0].items[0].width+planVenue.venue.photos.groups[0].items[0].suffix+') center'}"
              />
              <span class="ml2">
                <h5 class="f6 normal brand ma0">
                  {{ planVenue.venue.name }}
                </h5>
                <h6 class="f7 bold black-50 ma0">
                  {{ planVenue.venue.location.address }}
                </h6>
              </span>
            </span>
          </button>
        </div>
      </span>
    </div>
  </div>
<!-- END EVENT FOURSQUARE SEARCH -->
</template>

<script>
import { mapGetters } from 'vuex';
import { XIcon } from 'vue-feather-icons';


export default {
  components: {
    XIcon,
  },
  data() {
    return {
      planCity: {},
      disableInput: {
        transportationLocation: false,
        transportationStartTime: false,
        transportationEndTime: false,
        eventLocation: false,
      },
    };
  },
  methods: {
    displayVenues(location, query) {
      this.$store.dispatch('fetchVenues', { location, query });
    },
    displayMatches(query) {
      function findMatches(wordToMatch, cities) {
        return cities.filter((place) => {
          const regex = new RegExp(wordToMatch, 'gi');
          return place.city.match(regex) || place.state.match(regex);
        });
      }
      const matchArray = findMatches(query, this.planCities);
      const cityState = matchArray.map((place) => {
        const cityName = place.city;
        const stateName = place.state;
        return `${cityName}, ${stateName}`;
      });
      this.planCity = cityState.slice(0, 10);
      if (this.newPlan.searchCity === '') {
        this.newPlan.searchVenue = '';
      }
    },
    checkVenue(planVenue) {
      const eventPlans = this.plans.filter(plan => plan.type === 'event');
      const venuePlans = eventPlans.filter(plan => plan.venue.location.address === planVenue.venue.location.address);
      if (planVenue.venue.location.address === this.venue.location.address
        || venuePlans.length > 0) {
        return false;
      }
      return true;
    },
    handlePlanVenue(venue) {
      this.venuePhotosIndex = 0;
      this.$store.dispatch('fetchVenueById', venue.id);
      this.$store.dispatch('fetchVenuePhotos', venue.id);
      this.disableInput.eventLocation = true;
      this.newPlan.eventName = venue.name;
      this.newPlan.eventLocation = `${venue.location.address} ${venue.location.city}, ${venue.location.state} ${venue.location.postalCode}`;
      if (venue.photos.count !== 0) {
        this.newPlan.img = `${venue.photos.groups[0].items[0].prefix}${venue.photos.groups[0].items[0].width}x${venue.photos.groups[0].items[0].height}${venue.photos.groups[0].items[0].suffix}`;
      }
      if (venue.url) {
        this.newPlan.url = venue.url;
      }
      this.newPlan.eventVenue = venue;
    },
    handleClearEventInput(input) {
      if (input === 'city') {
        this.newPlan.searchCity = '';
        this.newPlan.searchVenue = '';
      }
      if (input === 'venue') {
        this.newPlan.searchVenue = '';
      }
    },
  },
  computed: {
    ...mapGetters(['plans', 'planCities', 'newPlan', 'venues', 'venue', 'venuePhotos']),
  },
};
</script>
