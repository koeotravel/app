<template>
  <div class="scrim z-999 fixed top-0 right-0 bottom-0 left-0 block overflow-hidden">
    <div @click="closeModal">
      &times;
    </div>
    <div class="flex-auto measure-wide center card-brand-ns bg-white mv5-ns modal">
      <Component :is="currentView" />
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import ModalUpdatePlan from '@/views/Trip/ModalUpdatePlan';
import TripMembersModal from '@/views/Trip/TripMembersModal';
import AddTrip from './AddTrip';

export default {
  components: {
    AddTrip,
    ModalUpdatePlan,
    TripMembersModal,
  },
  methods: {
    ...mapMutations(['closeModal']),
  },
  computed: {
    ...mapState({
      currentView: state => state.showModalView,
    }),
  },
};
</script>
