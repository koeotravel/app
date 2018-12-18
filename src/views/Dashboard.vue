<template>
  <main>
    <!-- List of trips -->
    <ul
      v-for="(trip, index) in trips"
      :key="trip.id"
    >
      <li>
        <div>
          <h3 v-if="trip.name">
            {{ trip.name }}
          </h3>
          <VAvatarStack :users="trip.party" />
        </div>

        <div>
          <RouterLink :to="{ name: 'trip', params: { id: trip.id } }">
            <VButton>Edit Trip</VButton>
          </RouterLink>

          <VButton :on-click="handleArchiveTrip(index, trip.archived)">
            Archive
          </VButton>
        </div>
      </li>
    </ul>
  </main>
</template>

<script>
import { mapGetters, mapMutations, mapState } from 'vuex';
import { VAvatarStack } from '@/components';
import AddTrip from '@/components/AddTrip';
import VButton from '@/components/VButton';

export default {
  components: {
    addtrip: AddTrip,
    VButton,
    VAvatarStack,
  },

  data() {
    return {
      showTripModal: this.$store.state.dashboard.showTripModal,
    };
  },

  created() {
    const { uid } = this.$store.state.user.data;
    if (uid) {
      this.$store.dispatch('fetchTrips', { uid });
    }
  },

  methods: {
    ...mapMutations(['openModal', 'closeModal']),
    viewArchived() {
      this.archiveView = !this.archiveView;
    },
    handleTripModal() {
      this.$store.commit('clearAddTrip');
      this.$store.commit('openModal', 'add-trip');
    },
    handleArchiveTrip(tripIndex, archiveVal) {
      const attributes = {
        index: tripIndex,
        trip: {
          archived: !archiveVal,
        },
      };
      this.$store.dispatch('updateTrip', attributes);
    },
    handleDeleteTrip(tripIndex) {
      this.$store.dispatch('deleteTrip', tripIndex);
    },
  },

  computed: {
    ...mapState({
      trips: state => state.dashboard.trips,
    }),
    ...mapGetters(['numActiveTrips', 'numArchivedTrips', 'newTrip', 'activeTrips', 'archivedTrips']),
  },
};
</script>
