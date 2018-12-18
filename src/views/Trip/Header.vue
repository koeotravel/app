<template>
  <header>
    <HeaderImage />
    <button @click="handleInvites">
      invite
    </button>
    <HeaderDetails />
  </header>
</template>

<script>
import { mapMutations } from 'vuex';
import HeaderImage from './HeaderImage';
import HeaderDetails from './HeaderDetails';
import TripMembersModal from './TripMembersModal';

export default {
  components: {
    HeaderImage,
    HeaderDetails,
    TripMembersModal,
  },
  methods: {
    ...mapMutations(['openModal', 'closeModal', 'showMemberSettings']),
    handleInvites() {
      this.$store.commit('openModal', 'trip-members-modal');
      this.$store.commit('showMemberSettings');
    },
  },
};
</script>
