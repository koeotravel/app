<template>
  <VPlan
    left-title-top="Time:"
    :left-subtitle-top="details.start | humanTime"
    left-title-bottom="Price:"
    :leftsubtitle-bottom="details.price"
    :details="details"
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
