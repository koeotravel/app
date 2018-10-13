<template>
  <aside class="measure fr bg-main min-h-100 w-100 w-40-m overflow-hidden flex flex-column">
    <header class="pa3 bb b--shadow-brand bg-white">
      <button class="b--white bg-white brand">All Trips</button>
      <span @click="handleToggleChat">close</span>
      <h1 class="f3 ma0 normal">Trip Name</h1>
    </header>

    <div class="flex pa3 ">
      <button class="b--brand bg-brand white br0 w-50 pa2">Messages</button>
      <button class="b--brand bg-white br0 brand w-50 pa3">Notifications</button>
    </div>

    <ul class="list pa3 vh-60 overflow-scroll">
      <li
        v-for="message in messages"
        :key="message.id"
        class="flex f6 mb2 w-90 overflow-hidden"
        :class="{'fr': message.sender.id == user.uid}"
      >
        <div v-if="message.sender.id == user.uid" class="flex flex-auto">
          <img :src="currentUser.photoURL" class="order-2 h2 w2 mb3 ml1 br-100 message-photo">
          <article class="flex-auto order-1">
            <p class="bg-blue white ma0 pa2 br2">
              {{message.body}}
            </p>
            <time class="db gray f7 mt1 tr" :datetime="message.timestamp">
              {{message.timestamp | humanDate}}
            </time>
          </article>
        </div>

        <div v-else class="flex flex-auto items-end">
          <img :src="message.sender.photoURL || 'https://placehold.it/100'" class="h2 w2 mr1 br-100 message-photo">
          <article class="flex-auto">
            <p class="bg-light-gray ma0 pa2 br2">
              {{message.body}}
            </p>
            <time class="db gray f7 mt1" :datetime="message.timestamp">
              {{message.timestamp | humanDate}}
            </time>
          </article>
        </div>
      </li>
    </ul>


    <form @submit.prevent="handleSendMessage(message)" class="pa3">
      <textarea type="text" row="1" v-model.trim="message" @keydown="errorMess=''" placeholder="Type here ..." class="db border-box hover-black w-100 measure ba b--black-20 pa2 br2"></textarea>
      <button type="submit" class="bg-brand b--brand white fr pa2">Send Message</button>
    </form>
    {{errorMess}}
  </aside>
</template>

<style>
  .message-photo {
    margin-bottom: 13px;
  }
</style>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      message: '',
      chatId: this.$route.params.id,
      errorMess: ''
    }
  },

  methods: {
    handleToggleChat() {
      this.$store.commit('toggleChat')
    },
    handleSendMessage(text) {
      const message = { text, chatId: this.chatId }
      this.$store.dispatch('send', message)
    },
  },
  created() {
    const id = { chatId: this.chatId }
    this.$store.dispatch('fetchMessages', id)
  },
  computed: {
    ...mapGetters(['messages', 'currentUser'])
  }
}
</script>
