<template>
  <div class="mh3">
    <main class="center tc pt4 ph2">
      <!-- HEADER LOGIC -->
      <header class="flex items-center bb b--shadow-brand mb4 pv3 w-80-m center">
        <h1 class="f2 ma0 normal">
          <span v-if="archiveView === false">My Trips</span>
          <span v-if="archiveView === true">Archived Trips</span>
        </h1>
        <span class="flex-auto"></span>
        <a class="ml2 f5 brand pointer link dim underline">
          <span v-if="numArchivedTrips > 0 && archiveView === false" @click="viewArchived">View Archived Trips</span>
          <span v-if="archiveView === true" @click="viewArchived">View All Trips</span>
        </a>
      </header>
      <!-- EMPTY STATE -->
      <!-- archived trips -->
      <h1 class="f3 normal" v-if="archiveView === true && numArchivedTrips == 0">💩  You do not have any archived trips.</h1>
      <!-- active trips -->
      <section v-show="!activeTrips.length">
        <h1 class="f3 normal">
          🙊  You have not added any trips yet.
        </h1>
        <h2 class="f5 bold black-60" v-if="archiveView === false && numActiveTrips == 0">
          Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
        </h2>
      </section>
      <v-button large block customClass="mb4 w-80-m" :onClick="handleTripModal">
        Add Trip
      </v-button>
      <!-- TRIP DESCRIPTION CARD -->
      <div class="w-100 w-80-m flex-ns mb3 center" v-for="(trip, index) in trips" v-if="trip.archived === archiveView" :key="trip.id">
        <section class="w-100 card-brand overflow-hidden">
          <div class="w-30-l h-100-l fl-l" alt=trip.name >
            <div :style="{'background':`url(${trip.img}) center`}" class="pa2 w-100 h-100-l h4 cover flex items-end justify-start"></div>
          </div>
          <div class="tl w-70-l fr-l">
            <div class="pa3">
              <div class="w-100 flex items-center">
                <h3 v-if="!trip.name" class="f4 ma0 normal w-100 measure-narrow db truncate">Untitled Trip {{ trip.created_at | humanMonth }}</h3>
                <h3 v-if="trip.name" class="f4 ma0 normal w-100 measure-narrow db truncate">{{ trip.name }}</h3>
                <span class="flex-auto"></span>
                <v-avatar-stack class="flex row ml2" :users="trip.party"></v-avatar-stack>
              </div>
              <h4 v-if="trip.start && trip.end" class="f5 ma0 bold">{{ trip.start | humanDate }} &ndash; {{ trip.end | humanDate }}</h4>
              <h4 v-else class="f5 ma0 bold">🙈 There are no dates for this trip yet.</h4>
              <p class="f5 brand-copy lh-copy multiline-truncate">{{ trip.description }}</p>
              <span class="flex">
                <!-- TRIP LEFT BUTTON -->
                <router-link :to="{ name: 'trip', params: { id: trip.id } }" class="w-100 mr2 flex-auto" v-if="archiveView === false">
                  <v-button btnType="secondary" block>
                    Edit Trip
                  </v-button>
                </router-link>
                <!-- ARCHIVED LEFT BUTTON -->
                <button class="w-100 mr2 flex-auto br2 f6 ba b--solid bw1 pointer pv2 ph3 customSecondaryBtn" v-if="archiveView === true" @click="handleArchiveTrip(index, trip.archived)" type="button">
                  Un-archive Trip
                </button>
                <!-- TRIP RIGHT BUTTON -->
                <button type="button" class="br2 f6 ba b--solid bw1 pointer pv2 ph3 customTertiaryBtn nowrap" @click="handleArchiveTrip(index, trip.archived)" v-if="archiveView === false">
                  Archive Trip
                </button>
                <!-- ARCHIVED RIGHT BUTTON -->
                <button type="button" class="br2 f6 ba b--solid bw1 pointer pv2 ph3 customTertiaryBtn nowrap" @click="handleDeleteTrip(index)" v-if="archiveView === true">
                  Delete Trip
                </button>
              </span>
            </div>
          </div>
        </section>
      </div>
      <!-- END TRIP DESCRIPTION CARD -->
    </main>
    <addtrip v-show="this.showTripModal"></addtrip>
  </div>
</template>

<style>
/* TODO: FIX HACK because :onClick="deleteTrip(trip.id)" did not work with v-button */
/* most likely because of Button component onClick prop default: () => null */
.customSecondaryBtn {
  color: #5BD3CA;
  border-color: #5BD3CA;
}

.customTertiaryBtn {
  color: #666666;
  border-color: #666666;
}

.multiline-truncate {
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
</style>

<script>
import { mapGetters, mapMutations, mapState } from 'vuex'
import moment from 'moment'
import { VAvatarStack } from '@/components'
import AddTrip from '@/components/AddTrip'
import VButton from '@/components/VButton'

export default {
  components: {
    addtrip: AddTrip,
    VButton,
    VAvatarStack
  },

  data() {
    return {
      showTripModal: this.$store.state.dashboard.showTripModal,
      archiveView: this.$store.state.dashboard.archiveView,
    }
  },

  created() {
    const { uid } = this.$store.state.user
    if (uid) {
      this.$store.dispatch('fetchTrips', { uid })
    }
  },

  filters: {
    humanDate(date) {
      return moment(date).format('MMMM Do YYYY')
    },
    humanMonth(date) {
      return moment(date).format('MM/DD/YYYY')
    }
  },

  methods: {
    ...mapMutations(['openModal', 'closeModal']),
    viewArchived() {
      this.archiveView = !this.archiveView
    },
    handleTripModal() {
      this.$store.commit('clearAddTrip')
      this.$store.commit('openModal', 'add-trip')
    },
    handleArchiveTrip(tripIndex, archiveVal) {
      const attributes = {
        index: tripIndex,
        trip: {
          archived: !archiveVal
        }
      }
      this.$store.dispatch('updateTrip', attributes)
    },
    handleDeleteTrip(tripIndex) {
      this.$store.dispatch('deleteTrip', tripIndex)
    },
  },

  computed: {
    ...mapState({
      trips: state => state.dashboard.trips
    }),
    ...mapGetters(['numActiveTrips', 'numArchivedTrips', 'newTrip', 'activeTrips', 'archivedTrips'])
  }
}
</script>
