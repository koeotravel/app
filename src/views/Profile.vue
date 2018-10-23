<template>
  <main>
    <form @submit.prevent="uploadAvatar(file, user.uid)">
      <progress :value="progress" max="100">0%</progress>
      <input type="file" accept="image/*" @change="holdFile($event)">
      <button type="submit">Upload</button>
    </form>

    <img :src="user.photoURL">

    <form @submit.prevent="handleUpdateUser">
      <v-fieldset>
        <div>
          <v-label>Name</v-label>
          <v-input-text v-model.trim="name"></v-input-text>
        </div>

        <div>
          <v-label>Email</v-label>
          <v-input-email model="user.email"></v-input-email>
        </div>
      </v-fieldset>

      <button type="submit">
        Save Changes
      </button>
    </form>

    <div>
      <router-link :to="{name: 'passwordReset'}">
        Reset Password
      </router-link>
    </div>

    <div>
      <button @click="handleDeleteUser">
        Delete Account
      </button>
    </div>
  </main>
</template>

<script>
import { mapState } from 'vuex'
import { storage } from '@/main'
import {
  VFieldset,
  VInputEmail,
  VInputText,
  VLabel,
} from '@/components'

export default {
  components: {
    VFieldset,
    VInputEmail,
    VInputText,
    VLabel,
  },

  data() {
    return {
      email: '',
      name: '',
      file: null,
      progress: 0,
    }
  },

  computed: {
    ...mapState(['user'])
  },

  methods: {
    holdFile(event) {
      this.file = event.target.files[0]
      this.progress = 0
    },

    uploadAvatar(image, userId) {
      if (!image) { throw Error('Please select an image') }
      const storageRef = storage.ref(`users/${userId}/avatar.png`)
      const task = storageRef.put(image)

      task.on('state_changed',
        (snapshot) => {
          const { bytesTransferred, totalBytes } = snapshot
          const p = (bytesTransferred / totalBytes) * 100
          this.progress = p
        },

        (storageError) => {
          throw Error(storageError)
        },

        () => {
          storage.ref().child(`users/${userId}/avatar.png`).getDownloadURL()
            .then((url) => {
              this.$store.dispatch('updatePhoto', { url })
            })
            .catch((error) => {
              throw Error(error)
            })
        }
      )
    },

    handleUpdateUser() {
      const attributes = {
        email: this.email,
        name: this.name,
        photoURL: this.photoURL,
      }
      this.$store.dispatch('update', attributes)
    },

    handleDeleteUser() {
      this.$store.dispatch('delete', this.$store.state.user.currentUser)
    },
  },
}
</script>
