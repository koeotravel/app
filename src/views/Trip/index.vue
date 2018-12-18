<template>
  <div>
    <main class="mw8 w-100 center tc pt4 ph3-l ph2">
      <VHeader />
      <!-- ADD TO ITINERARY -->
      <section class="mt5 pv2 ph4-l ph3-m w-100">
        <!-- START EVENT FOURSQUARE SEARCH -->
        <MainEventForm />
        <div
          v-show="newPlan.type === 'event'"
          class="flex flex-column bb b--shadow-brand mb3"
        >
          <!--<fourSquare></fourSquare>-->
        </div>
        <!-- END EVENT FOURSQUARE SEARCH -->
      </section>
      <TripItinerary
        :days="days.data"
        :trip-id="$route.params.id"
      />
    </main>
    <div
      v-if="showChat"
      class="scrim z-999 fixed top-0 right-0 bottom-0 left-0 block overflow-scroll"
    >
      <VChat />
    </div>
    <VModalPlan />
  </div>
</template>

<script type="text/javascript">
import { mapGetters, mapState } from 'vuex';
import moment from 'moment';
import { HomeIcon, NavigationIcon, SunIcon } from 'vue-feather-icons';
import VButton from '@/components/VButton';
import Input from '@/components/Input';
import Chat from '@/components/Chat';
import Event from './Plan/Event';
import Lodging from './Plan/Lodging';
import Transportation from './Plan/Transportation';
import ModalUpdatePlan from './ModalUpdatePlan';
import Header from './Header';
import TripItinerary from './TripItinerary';
import MainEventForm from './EventForm/MainEventForm';

export default {
  components: {
    TripItinerary,
    Event,
    Lodging,
    Transportation,
    HomeIcon,
    NavigationIcon,
    SunIcon,
    'v-header': Header,
    'v-modal-plan': ModalUpdatePlan,
    'v-chat': Chat,
    VButton,
    'v-input': Input,
    MainEventForm,
  },
  filters: {
    humanTripDate(date) {
      return moment(date).format('MMMM Do YYYY');
    },
    humanTime(time) {
      if (moment(time, 'HH:mm').format('h:mm A') !== 'Invalid date') {
        return moment(time, 'HH:mm').format('h:mm A');
      }
      return '-';
    },
    humanUnixTime(time) {
      return moment(moment.unix(time)).utc().format('h:mm A');
    },
  },
  data() {
    return {
      party: [
        {
          name: 'Rodney Dennis',
          imgUrl: 'https://placehold.it/100',
        },
        {
          name: 'Taylor Dennis',
          imgUrl: 'https://placehold.it/100',
        },
      ],

      showInput: {
        name: false,
        dates: false,
        description: false,
      },
      disableInput: {
        transportationLocation: false,
        transportationStartTime: false,
        transportationEndTime: false,
        eventLocation: false,
      },
      invitee: '',
      venuePhotosIndex: 0,
      textArea: false,
      planCity: {},
      planAirline: {},
      planArriveAirport: {},
      planDepartAirport: {},
      planFlightSearch: {
        depart: '',
        arrive: '',
        airline: '',
      },
      autoComplete: {
        depart: '🛫  Departure Airport...',
        arrive: '🛬  Arrival Airport...',
        airline: '✈️  Filter results by airline...',
      },
    };
  },
  created() {
    const tripId = this.$route.params.id;
    this.$store.dispatch('fetchTrip', tripId);
    this.$store.dispatch('fetchDays', tripId);
  },
  computed: {
    minTime() {
      if (this.date === this.end_date) {
        return this.newPlan.start;
      }
      return null;
    },
    ...mapState(['days']),
    ...mapGetters(['showChat', 'currentTrip', 'plans', 'planCities', 'planAirlines', 'planAirports', 'newPlan', 'today', 'currentMaxEndDate', 'venues', 'venue', 'venuePhotos']),
  },
  directives: {
    focus: {
      inserted(el) {
        el.focus();
      },
    },
    'click-outside': {
      bind: (el, binding) => {
        // Define Handler and cache it on the element
        const handler = (e) => {
          if (!el.contains(e.target) && el !== e.target) {
            binding.value(e);
          }
        };
        const element = el;
        element.vueClickOutside = handler;
        // add Event Listeners
        document.addEventListener('click', handler);
      },

      unbind: (el) => {
        // Remove Event Listeners
        const element = el;
        document.removeEventListener('click', element.vueClickOutside);
        element.vueClickOutside = null;
      },
    },
  },

  mounted() {
    this.$parent.$on('foo', (x) => {
      this.showChat = x;
    });
  },

  destroyed() {
    this.$store.commit('clearVenue');
    this.$store.commit('clearAddEvent');
    this.$store.commit('clearAddLodging');
    this.$store.commit('clearAddTransportation');
    this.$store.commit('clearAddPlan');
    this.$store.state.trip.venues = {};
    this.$store.state.trip.currentTrip = {};
  },
  methods: {
    handleSendInvitation() {
      this.$store.dispatch('sendInvitation', {
        trip: this.$route.params.id,
        members: this.$store.state.trip.currentTrip.party,
        email: this.invitee,
      });
    },
  },
};
</script>
