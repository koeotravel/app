<template>
  <form
    class="ph4-l ph3-m tl"
    @submit.prevent
  >
    <div class="card-brand trip-description mb4 overflow-hidden">
      <div
        class="h5 cover flex flex-column"
        :style="{'background':'url('+currentTrip.img+') center'}"
      >
        <div class="flex justify-end">
          <span class="bg-black-50 pv1 ph2 white br2 h-100">
            <h6 class="f7 ma0 normal">
              Image Powered by
              <a
                href="https://unsplash.com/?utm_source=koeo&utm_medium=referral&utm_campaign=api-credit"
                target="_blank"
                class="link dim brand"
              >
                Unsplash
              </a> |
              <a
                :href="currentTrip.img_author_url"
                target="_blank"
                class="link dim brand pointer"
              >
                {{ currentTrip.img_author }}
              </a>
            </h6>
          </span>
        </div>
        <span class="flex-auto" />
        <VAvatarStack :users="party" />
      </div>
    </div>
  </form>
</template>

<script>
import { mapGetters } from 'vuex';
import { EditIcon } from 'vue-feather-icons';
import moment from 'moment';
import { VAvatarStack } from '@/components';


export default {
  components: {
    EditIcon,
    VAvatarStack,
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
      showEditHover: {
        name: false,
        dates: false,
        description: false,
      },
      showInput: {
        name: false,
        dates: false,
        description: false,
      },

    };
  },
  methods: {
    openInlineEdit(tripInput) {
      if (tripInput === 'tripName') {
        this.showInput.name = true;
      }
      if (tripInput === 'tripDates') {
        this.showInput.dates = true;
      }
      if (tripInput === 'tripDescription') {
        this.showInput.description = true;
      }
    },
  },
  computed: {
    minTime() {
      if (this.date === this.end_date) {
        return this.newPlan.start;
      }
      return null;
    },
    ...mapGetters(['showChat', 'currentTrip', 'days', 'plans', 'planCities', 'newPlan', 'today', 'currentMaxEndDate', 'venues', 'venue', 'venuePhotos']),
  },
  filters: {
    humanTripDate(date) {
      if (date === 'Pre-Trip') {
        return 'Pre-Trip';
      }
      return moment(date).format('MMMM Do YYYY');
    },
    humanTime(time) {
      if (moment(time, 'HH:mm').format('h:mm A') !== 'Invalid date') {
        return moment(time, 'HH:mm').format('h:mm A');
      }
      return '-';
    },
  },
};
</script>
