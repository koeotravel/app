<template>
  <div class="ph3 mv3">
    <p class="serif normal f1 ma0 mb4">
      To complete the signup process, please click on the button below.
      Please note that by completing your signup you are agreeing to our
      Terms of Service and Privacy Policy:
    </p>

    <BaseButton :onClick="confirm(email)">I agree</BaseButton>
  </div>
</template>

<script>
import { auth } from '@/main'

export default {
  data() {
    return {
      email: undefined,
    };
  },

  created() {
    // Confirm the link is a sign-in with email link.
    if (auth.isSignInWithEmailLink(window.location.href)) {
      // Additional state parameters can also be passed via URL.
      // This can be used to continue the user's intended action before triggering
      // the sign-in operation.
      // Get the email if available. This should be available if the user completes
      // the flow on the same device where they started it.
      this.email = window.localStorage.getItem('emailForSignIn');
      if (!this.email) {
        // User opened the link on a different device. To prevent session fixation
        // attacks, ask the user to provide the associated email again. For example:
        this.email = window.prompt('Please provide your email for confirmation');
      }
    }
  },

  methods: {
    confirm(email) {
      // The client SDK will parse the code from the link for you.
      auth.signInWithEmailLink(email, window.location.href)
        .then((result) => {
          // Clear email from storage.
          window.localStorage.removeItem('emailForSignIn');
          // You can access the new user via result.user
          // Additional user info profile not available via:
          // result.additionalUserInfo.profile == null
          // You can check if the user is new or existing:
          // result.additionalUserInfo.isNewUser
          this.$store.dispatch('setUser', result.user );
        })
        .catch((error) => {
          // Some error occurred, you can inspect the code: error.code
          // Common errors could be invalid email and invalid or expired OTPs.
          throw Error(error)
        })
    }
  },
}
</script>
