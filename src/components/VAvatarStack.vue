<template>
  <ul>
    <li
      v-for="user in users"
      :key="user.photoUrl"
    >
      <v-avatar :src="user.photoUrl"></v-avatar>
    </li>
  </ul>
</template>

<script>
import VAvatar from './VAvatar';

export default {
  props: {
    users: {
      type: Array,
    },
  },

  components: {
    VAvatar,
  },
};
</script>
