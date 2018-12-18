<template>
  <v-plan
    leftTitleTop = "Time:"
    :leftSubtitleTop = "details.start | humanTime"
    leftTitleBottom = "Price:"
    :leftsubtitleBottom = "details.price"
    :details = "details"
  />
</template>

<script>
import Main from './main';

export default {
  components: {
    'v-plan': Main,
  },
  props: {
    details: {
      type: Object,
      default: () => {},
    },
  },
};
</script>
