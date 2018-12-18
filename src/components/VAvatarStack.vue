<template>
  <ul>
    <li
      v-for="user in users"
      :key="user.photoUrl"
    >
      <VAvatar :src="user.photoUrl" />
    </li>
  </ul>
</template>

<script>
import VAvatar from './VAvatar';

export default {

  components: {
    VAvatar,
  },
  props: {
    users: {
      type: Array,
    },
  },
};
</script>
