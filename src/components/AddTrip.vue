<template>
  <div class="
    scrim
    z-999 fixed top-0 right-0 bottom-0 left-0
    /* needed for old browsers */
    block
    /* removes scroll when modal is opened */
    overflow-hidden">
    <div class="" @click.stop>

      <header class="r">
        <h3 class="">Add Trip</h3>
        <x-icon class="dib link dim no-underline pointer black-40" @click="closeModal"></x-icon>
      </header>

      <form @submit.prevent="handleAddTrip">
        <v-fieldset class="">
            <div class="">
              <div :style="{'background':'url('+newTrip.img+') center'}" class="h4 pa2 cover flex items-end justify-start">
                <v-button type="button" btnType="secondary" :onClick="shuffleUnsplash" customClass="o-80">
                  <shuffle-icon></shuffle-icon>
                </v-button>
                <span class="flex-auto"></span>
                <div class="">
                  <h6 class="f7 ma0 normal dib-ns">Trip Cover Image:</h6>
                  <span class="dib-ns">
                    <h6 class="f7 ma0 normal">Powered by
                      <a href="https://unsplash.com/?utm_source=koeo&utm_medium=referral&utm_campaign=api-credit" target="_blank" class="link dim brand">Unsplash</a> |
                      <a :href="newTrip.img_author_url" target="_blank" class="link dim brand pointer"> {{ newTrip.img_author }} </a>
                    </h6>
                  </span>
                </div>
              </div>
            </div>
            <v-input modal v-model="newTrip.name" placeholder="🗺  Add the trip name here...">Trip Name</v-input>
            <div class='flex flex-auto w-100 pb3 flex-row-ns flex-column'>
              <label class="f6 f5-ns pa3-ns pb1 br3 br--left-ns w-20-ns w-100 bl-ns bt-ns bb-ns b--light-gray tl">
                Trip Dates
              </label>
              <span class="pa3 br3 ba flex-auto flex flex-row b--light-gray br--right-ns">
                <v-date-picker v-model="startDate"></v-date-picker>
                <v-date-picker v-model="endDate"></v-date-picker>
              </span>
            </div>
            <textarea class="br3 pa3 input-reset ba bg-transparent w-100 b--light-gray" cols="30" rows="4" id="description" name="description" type="description" v-model.trim="newTrip.description" placeholder="📝 Add some notes about this trip here..."></textarea>
        </v-fieldset>

        <footer class='pa3 bt b--shadow-brand flex items-center justify-end'>
          <a class='bold f6 underline link dim black-40 mr3 pointer' @click="closeModal">
            Cancel
          </a>
          <v-button type="submit">Add Trip This Button</v-button>
        </footer>
      </form>

    </div>
  </div>
</template>

<style>
.scrim {
  background-color: rgba(22, 51, 49, 0.5);
}

.modal {
  max-height: 150vh;
  overflow-y: auto;
}
</style>

<script>
import { mapGetters, mapMutations } from 'vuex'
import { XIcon, ShuffleIcon } from 'vue-feather-icons'
import moment from 'moment'
import Unsplash, { toJson } from 'unsplash-js'
import { VDatePicker } from '@/components'
import VButton from '@/components/VButton'
import Input from '@/components/Input'
import VFieldset from '@/components/VFieldset'

const unsplash = new Unsplash({
  applicationId: '301382d5663e6043af8bb281b504459890c41a97a921be0e1d3c1f60d9d8d940',
  secret: 'bf18a083c2fcac2843da10f311839a078580ad6de58bfbe8385fa71b3f449f31',
  callbackUrl: 'urn:ietf:wg:oauth:2.0:oob',
})

export default {
  components: {
    XIcon,
    ShuffleIcon,
    VFieldset,
    VButton,
    VDatePicker,
    'v-input': Input
  },

  data() {
    return {
      startDate: moment().format('YYYY-MM-DD'),
      endDate: moment().format('YYYY-MM-DD'),
    }
  },

  mounted() {
    document.addEventListener('keydown', (e) => {
      if (this.$store.state.dashboard.showTripModal === true && e.keyCode === 27) {
        this.$store.commit('closeTripModal')
        if (this.$route.name === 'Dashboard') {
          this.$store.commit('clearAddTrip')
        }
      }
    })
  },

  computed: {
    ...mapGetters(['newTrip', 'today', 'newMaxEndDate']),
    currentDate: () => moment().format('YYYY-MM-DD')
  },

  created() {
    unsplash.photos.getRandomPhoto({ query: 'travel' })
      .then(toJson)
      .then((response) => {
        this.newTrip.img = response.urls.regular
        this.newTrip.img_author = response.user.name
        this.newTrip.img_author_url = `https://unsplash.com/@${response.user.username}?utm_source=your_app_name&utm_medium=referral`
      })
  },

  methods: {
    ...mapMutations(['openModal', 'closeModal']),
    shuffleUnsplash() {
      unsplash.photos.getRandomPhoto({ query: 'travel' })
        .then(toJson)
        .then((response) => {
          this.newTrip.img = response.urls.regular
          this.newTrip.img_author = response.user.name
          this.newTrip.img_author_url = `https://unsplash.com/${response.user.username}?utm_source=koeo&utm_medium=referral&utm_campaign=api-credit`
        })
    },
    handleAddTrip() {
        const attributes = {
        trip: this.$store.state.dashboard.newTrip,
        userId: this.$store.state.user.data.uid,
        userEmail: this.$store.state.user.data.email,
        startDate: this.startDate,
        endDate: this.endDate,
      }
      this.$store.dispatch('addTrip', attributes)
      this.$store.commit('closeModal')
    },
  },
}
</script>
