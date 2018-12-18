<template>
  <div class="
    scrim
    z-999 fixed top-0 right-0 bottom-0 left-0
    /* needed for old browsers */
    block
    /* removes scroll when modal is opened */
    overflow-hidden"
    v-show="show"
  >
    <div class="flex-auto measure-wide center card-brand-ns bg-white mv5-ns modal" @click.stop>

      <header class="pa3 bb b--shadow-brand flex items-center">
        <h3 class="ml4 mr2 mv0 f4 normal tc brand dib flex-auto">Update {{ currentPlan.type | capitalize }} Plan</h3>
        <x-icon class="dib link dim no-underline pointer black-40" @click="closeModal"></x-icon>
      </header>

        <form @submit.prevent="handleUpdatePlan">
          <section class="flex flex-column pa3-ns pv3 ph2 ">
            <div class="w-100 flex flex-row items-center">
              <div class="w-50 mr3">
                <select class="pa3 br3 mb3 mb0-m mv3-l mr3 input-reset ba w-100" v-model="currentPlan.date" @change="startDateChange">
                  <!-- <option :value='day.date' v-for="day in days" :key="day.id">{{ day.date | humanPlanDate }}</option> -->
                </select>
                <div class='br2 f6 bw1 b--brand bg-white brand pa3 mt3-m mb3 mb0-m w-100' v-if="hasVenue"><span class="flex items-center"><span class="f5 truncate w-100 tl">{{ currentPlan.venue.name }}</span></span></div>
                <select class="pa3 br3 mb3 mt3-m mb0-m input-reset ba w-100" v-if="!isEvent" v-model="currentPlan.end_date">
                  <option :value='day.date' v-show="day.date >= currentPlan.date" v-for="day in days" :key="day.id">{{ day.date | humanPlanDate }}</option>
                </select>
              </div>
              <div class="card-brand overflow-hidden w-50 h4">
                <div :style="{'background':'url('+currentPlan.img+') center'}" class="h4 cover flex flex-column">
                  <div class="flex flex-row justify-end" v-if="currentPlan.url">
                    <span class="bg-black-50 pv1 ph2 white br2 h-100 flex items-center">
                      <external-link-icon class="dib w1 h1 f7 ma0 normal pr1"></external-link-icon>
                      <span class="dib">
                        <a :href="currentPlan.url" target="_blank" class="f7 ma0 normal db link dim brand pointer">View Website</a>
                      </span>
                    </span>
                  </div>
                  <div class="flex flex-auto pa2 justify-start items-end">
                    <button type="button" v-if="isEvent" class="br2 f6 ba b--solid bw1 pointer pa2 brand b--brand o-80 mr2" @click="handleToggleVenueImg('left')">
                      <chevron-left-icon></chevron-left-icon>
                    </button>
                    <button type="button" v-if="isEvent" class="br2 f6 ba b--solid bw1 pointer pa2 brand b--brand o-80" @click="handleToggleVenueImg('right')">
                      <chevron-right-icon></chevron-right-icon>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div class="w-100 pt3 flex flex-column items-center">
              <v-input v-model="currentPlan.name" v-show="currentPlan.type === 'transportation'" placeholder="🛃  Add the transportation name here...">Transportation</v-input>
              <v-input v-model="currentPlan.name" v-show="currentPlan.type === 'lodging'" placeholder="🏨  Add the lodging name here...">Lodging Name</v-input>
              <v-input v-model="currentPlan.name" v-show="currentPlan.type === 'event'" placeholder="🎭  Add the event name here...">Event Name</v-input>

              <v-input v-model="currentPlan.location" placeholder="📍  Add the address here..." :disabled="currentPlan.venue && Object.keys(currentPlan.venue).length !== 0">Address</v-input>
              <div class='flex flex-auto w-100 pb3 flex-row-ns flex-column'>
                <label class="f6 f5-ns pa3-ns pb1 br3 br--left-ns w4-ns w-100 bl-ns bt-ns bb-ns b--light-gray tl">
                  Check Times
                </label>
                <span class="pa3 br3 ba flex-auto flex flex-row b--light-gray br--right-ns">
                  <input
                    type="text"
                    class="input-reset bg-transparent bn h1 w-100"
                    v-model="currentPlan.start"
                    placeholder="🕓  Check-in time..."
                    onfocus="this.type='time'"
                    onblur="if(this.value===''){this.type='text'}"
                  >
                  <input
                    type="text"
                    class="input-reset bg-transparent bn h1 w-100"
                    v-model="currentPlan.end"
                    v-if="!isEvent"
                    placeholder="Check-out time..."
                    onfocus="(this.type='time')"
                    onblur="if(this.value===''){this.type='text'}"
                    :min="minTime"
                  >
                </span>
              </div>
              <v-input v-model="currentPlan.price" placeholder="🤑  Add the price here..." >Price</v-input>
              <div class='flex flex-auto w-100 pb3 flex-row-ns flex-column'>
                <label class="f6 f5-ns pa3-ns pb1 br3 br--left-ns w4-ns w-100 bl-ns bt-ns bb-ns b--light-gray tl flex items-center">
                  Notes
                </label>
                <span class="br3 ba flex-auto flex flex-row b--light-gray br--right-ns items-center">
                  <input
                    v-if="!textArea"
                    type="text"
                    class="input-reset bg-transparent bn w-100 pa3"
                    v-model="currentPlan.description"
                    placeholder="📝  Add any other notes here..."
                  >
                  <textarea
                    v-if="textArea"
                    rows="5"
                    style="resize: vertical"
                    class="input-reset bg-transparent bn w-100 pa3"
                    v-model="currentPlan.description"
                    placeholder="📝  Add any other notes here..."
                  ></textarea>
                  <v-button type="button" btnType="tertiary" customClass="h2 w2 mh2" style="padding:4px" :onClick="expandNotes">
                    <maximize-2-icon v-if="!textArea" class="w1 h1"></maximize-2-icon>
                    <minimize-2-icon v-if="!textArea" class="w1 h1"></minimize-2-icon>
                  </v-button>
                </span>
              </div>
            </div>
          </section>

        <footer class="pa3 bt b--shadow-brand flex items-center justify-end">
          <a class="bold f6 underline link dim black-40 mr3 pointer">
            Cancel
          </a>
          <v-button type="submit">
            Update Plan
          </v-button>
        </footer>
      </form>

    </div>
  </div>
</template>


<script>
import { mapGetters, mapMutations } from 'vuex';
import moment from 'moment';
import {
  XIcon, ShuffleIcon, Maximize2Icon, Minimize2Icon, ChevronLeftIcon, ChevronRightIcon, ExternalLinkIcon,
} from 'vue-feather-icons';
import VButton from '@/components/VButton';
import Input from '@/components/Input';

export default {
  components: {
    ChevronLeftIcon,
    ChevronRightIcon,
    ExternalLinkIcon,
    Maximize2Icon,
    Minimize2Icon,
    XIcon,
    ShuffleIcon,
    VButton,
    'v-input': Input,
  },

  data() {
    return {
      show: this.$store.state.showModalView === 'modal-update-plan',
      textArea: false,
    };
  },

  computed: {
    hasVenue() {
      return this.currentPlan.venue && Object.keys(this.currentPlan.venue).length !== 0;
    },
    isEvent() {
      return this.currentPlan.type === 'event';
    },
    showTextArea() {
      return this.textArea === true;
    },
    ...mapGetters(['currentTrip', 'currentPlan', 'days']),
    minTime() {
      if (this.date === this.end_date) {
        return this.start;
      }
      return null;
    },
  },

  filters: {
    humanPlanDate(date) {
      return moment(date).format('MMMM Do YYYY');
    },
    capitalize(value) {
      if (!value) return '';
      return value.charAt(0).toUpperCase() + value.slice(1);
    },
  },

  mounted() {
    document.addEventListener('keydown', (e) => {
      if (this.$store.state.trip.showPlanModal === true && e.keyCode === 27) {
        this.$store.commit('closePlanModal');
      }
    });
  },

  methods: {
    ...mapMutations(['openModal', 'closeModal']),
    handleToggleVenueImg(direction) {
      let i = this.currentPlan.venuePhotosIndex;
      if (direction === 'left') {
        if (i === 0) {
          i = this.currentPlan.venuePhotos.length - 1;
        } else {
          i -= 1;
        }
      }
      if (direction === 'right') {
        if (i === this.currentPlan.venuePhotos.length - 1) {
          i = 0;
        } else {
          i += 1;
        }
      }
      this.currentPlan.venuePhotosIndex = i;
      this.currentPlan.img = `${this.currentPlan.venuePhotos[i].prefix}${this.currentPlan.venuePhotos[i].height}x${this.currentPlan.venuePhotos[i].width}${this.currentPlan.venuePhotos[i].suffix}`;
    },
    expandNotes() {
      this.textArea = !this.textArea;
    },
    startDateChange() {
      if (this.currentPlan.end_date <= this.currentPlan.date) {
        this.currentPlan.end_date = this.currentPlan.date;
      }
    },
    shuffleUnsplash() {
      const img = this.currentPlan.img.slice(0, -1);
      const rand = Math.floor(Math.random() * 9) + 1;
      const newImg = img + rand;
      this.currentPlan.img = newImg;
    },
    handleUpdatePlan() {
      const attributes = {
        tripId: this.$route.params.id,
        plan: this.currentPlan,
      };
      this.$store.dispatch('updatePlan', attributes);
      this.$store.commit('closePlanModal');
    },
  },
};
</script>
