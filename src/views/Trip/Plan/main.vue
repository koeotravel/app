<template>
  <div class="w-100 flex-ns mb3">
    <aside class="w-25-ns w-100 tr-ns tl flex items-end-l items-start-m justify-end">
      <div class="w-100 pr3">
        <h5 class="f6 bold label ma0">{{ leftTitleTop }}</h5>
        <h4 class="f4 normal mt0 mb3">{{ leftSubtitleTop }}</h4>
        <h5 class="f6 bold label ma0">{{ leftTitleBottom }}</h5>
        <h4 class="f4 normal mt0 mb3">{{ leftSubtitleBottom }}</h4>
      </div>
    </aside>
    <article class="w-75-ns w-100 card-brand overflow-hidden">
      <div class="w-30-l h-100-l fl-l bg-brand">
        <!-- NORMAL CARD -->
        <slot name="planImagePanel">
          <div
            :style="{'background':'url('+details.img+') center'}"
            class="pa2 w-100 h-100-l cover flex items-end justify-start"
          >
            <span class="br-100 w3 h3 o-80 flex items-center justify-center"
              v-bind:class="{
                'bg-light-blue': isTransportation,
                'bg-yellow': isLodging,
                'bg-brand': isEvent }">
              <navigation-icon v-show="isTransportation" class="white w2 h2"></navigation-icon>
              <home-icon v-show="isLodging" class="white w2 h2"></home-icon>
              <sun-icon v-show="isEvent" class="white w2 h2"></sun-icon>
            </span>
          </div>
        </slot>
      </div>

      <div class="tl w-70-l fr-l">
        <div class="flex items-center pa3 bb bw1 b--shadow-brand">
          <h3 class="f4 ma0 normal w-100 measure-narrow db truncate">{{ details.name }}</h3>
          <span class="flex-auto"></span>
          <a @click="handlePlanModal(details.id)">
            <edit-icon class='brand ml3 label pointer link dim"'></edit-icon>
          </a>
          <a @click='handleDeletePlan(details.id)'>
            <trash-2-icon class="ml3 label pointer link dim"></trash-2-icon>
          </a>
        </div>
        <div class="pa3">
          <h4 class="f6 bold label ma0">
            <slot name="planDescription">
              {{ details.location }}
            </slot>
          </h4>
          <p class="f5 lh-copy multiline-truncate mb0">{{ details.description }}</p>
        </div>
      </div>
    </article>
  </div>
</template>

<script>
import { NavigationIcon, HomeIcon, SunIcon, EditIcon, Trash2Icon } from 'vue-feather-icons'

export default {
  components: {
    NavigationIcon,
    HomeIcon,
    SunIcon,
    EditIcon,
    Trash2Icon,
  },

  computed: {
    isTransportation() {
      return this.details.type === 'transportation'
    },
    isLodging() {
      return this.details.type === 'lodging'
    },
    isEvent() {
      return this.details.type === 'event'
    },
  },

  methods: {
    handlePlanModal(planId) {
      const attributes = {
        tripId: this.$route.params.id,
        planId
      }
      this.$store.dispatch('fetchPlan', attributes)
    },
    handleDeletePlan(planId) {
      const attributes = {
        tripId: this.$route.params.id,
        planId
      }
      this.$store.dispatch('deletePlan', attributes)
    }
  },

  props: {
    details: {
      type: Object,
      default: () => {}
    },
    layover: {
      type: Object,
      default: () => {}
    },
    leftTitleTop: {
      type: String,
      default: ''
    },
    leftSubtitleTop: {
      type: String,
      default: ''
    },
    leftTitleBottom: {
      type: String,
      default: ''
    },
    leftSubtitleBottom: {
      type: String,
      default: ''
    },
  }
}
</script>
