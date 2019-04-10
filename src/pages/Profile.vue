<template>
  <main class="ph3 mv3 center">
    <form @submit.prevent="uploadAvatar(file, account.currentUser.uid)" class="measure mb4 pa3 br2 ba b--black-10">
      <legend class="b f4">Upate Profile</legend>

      <img
        class="w-100"
        :src="account.currentUser.photoURL"
      />

      <progress
        class="w-100"
        :value="progress"
        max="100"
      >
        0%
      </progress>

      <input
        type="file"
        accept="image/*"
        @change="holdFile($event)"
      >

      <div>
        <div class="mv3">
          <BaseLabel>Display Name</BaseLabel>
          <BaseInputText v-model.trim="name" />
        </div>
      </div>
      <BaseButton type="submit">
        Upload
      </BaseButton>
    </form>

    <form @submit.prevent="handleUpdateUser" class="measure mb4 pa3 br2 ba b--black-10">
      <BaseFieldset>
        <legend class="b f4">Update Email</legend>
        <div class="mv3">
          <BaseLabel>Email ({{ account.currentUser.emailVerified }})</BaseLabel>
          <BaseInputEmail v-model="account.currentUser.email" />
        </div>
      </BaseFieldset>

      <BaseButton type="submit">
        Update Profile
      </BaseButton>
    </form>

    <form @submit.prevent="handleUpdatePassword" class="measure mb4 pa3 br2 ba b--black-10">
      <BaseFieldset>
        <legend class="b f4">Change Password</legend>
        <div class="mv3">
          <BaseLabel>New Password</BaseLabel>
          <BaseInputPassword v-model.trim="password" />
        </div>
        <div class="mv3">
          <BaseLabel>Confirm New Password</BaseLabel>
          <BaseInputPassword v-model.trim="passwordConfirm" />
        </div>
      </BaseFieldset>

      <p v-if="account.errors && account.errors.length > 0" class="f6 ma0 mt3 pa3 bg-washed-red dark-red">
        {{ account.errors }}
      </p>

      <BaseButton type="submit">
        Update Password
      </BaseButton>
    </form>

    <div class="measure mb4 pa3 ba b--black-10">
      <legend class="b f4">Delete you account</legend>

      <button onClick="handleDeleteUser">
        Delete Account
      </button>
    </div>
  </main>
</template>

<script>
import { mapState } from 'vuex';
import { storage } from '@/main';
import { log } from 'util';

export default {
  data() {
    return {
      email: '',
      name: '',
      file: null,
      progress: 0,
      password: '',
      passwordConfirm: '',
    };
  },

  computed: {
    ...mapState(['account']),
  },

  methods: {
    holdFile(event) {
      this.file = event.target.files[0];
      this.progress = 0;
    },

    handleUpdatePassword() {
      this.$store.dispatch('updatePassword', {
        password: this.password,
        passwordConfirm: this.passwordConfirm,
      });

    },

    uploadAvatar(image, userId) {
      if (!image) { throw Error('Please select an image'); }
      const storageRef = storage.ref(`users/${userId}/avatar.png`);
      const task = storageRef.put(image);

      task.on('state_changed',
        (snapshot) => {
          const { bytesTransferred, totalBytes } = snapshot;
          const p = (bytesTransferred / totalBytes) * 100;
          this.progress = p;
        },

        (storageError) => {
          throw Error(storageError);
        },

        () => {
          storage.ref().child(`users/${userId}/avatar.png`).getDownloadURL()
            .then((url) => {
              this.$store.dispatch('updatePhoto', { url });
            })
            .catch((error) => {
              throw Error(error);
            });
        });
    },

    handleUpdateUser() {
      const attributes = {
        email: this.email,
        name: this.name,
        photoURL: this.photoURL,
      };
      this.$store.dispatch('update', attributes);
    },

    handleDeleteUser() {
      this.$store.dispatch('delete', this.$store.state.account.currentUser);
    },
  },
};
</script>
