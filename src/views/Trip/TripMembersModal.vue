<template>
  <div>
    <header class="pa3 bb b--shadow-brand flex items-center">
      <h3 class="ml4 mr2 mv0 f4 normal tc brand dib flex-auto">
        Members
      </h3>
    </header>
    <div class="flex pa3 ">
      <button
        id="member-settings-btn"
        class="toggle-btn w-50 pa3"
        :class="{ active: memberSettingsView }"
        @click="showMemberSettings"
      >
        Member Settings
      </button>
      <button
        id="invite-settings-btn"
        class="toggle-btn w-50 pa3"
        :class="{ active: inviteSettingsView }"
        @click="showInviteSettings"
      >
        Invite Members
      </button>
    </div>
    <div v-if="memberSettingsView">
      <form>
        <ul class="list pl0 mt0 measure center">
          <li
            class="flex items-center lh-copy pa3 ph0-l bb b--black-10"
          >
            <img
              class="w2 h2 w3-ns h3-ns br-100"
              src="http://tachyons.io/img/avatar-mrmrs.jpg"
            >
            <div class="pl3 flex-auto">
              <span class="f6 db black-70">
                Name goes here
              </span>
            </div>
            <a class="pl5 flex-auto">
              <p class="f6 db brand underline">
                Delete Member
              </p>
            </a>
            <div>
              <select name="members">
                <option value="admin">
                  Admin
                </option>
                <option value="contributer">
                  Contributer
                </option>
                <option value="viewer">
                  Viewer
                </option>
              </select>
            </div>
          </li>
        </ul>
      </form>
    </div>
    <div
      v-if="inviteSettingsView == true"
      class="list pl0 mt0 measure center"
    >
      <form>
        <label class="f6 b db mb2">
          Shareable Link
        </label>
        <div class="flex">
          <input class="db border-box hover-black w-75 measure ba b--black-20 pa2 mb2 copy-input">
          <button class="db border-box hover-black w-25 measure ba b--black-20 pa2 mb2 copy-btn">
            Copy Link
          </button>
        </div>
        <label class="f6 b db mb2">
          Invite
        </label>
        <input class="db border-box hover-black w-100 measure ba b--black-20 pa2 br2 mb2">
        <label class="f6 b db mb2">
          Messages <span class="normal black-60">
            (Optional)
          </span>
        </label>
        <textarea class="db border-box hover-black w-100 measure ba b--black-20 pa2 br2 mb2" />
      </form>
    </div>
    <footer class="pa3 bt b--shadow-brand flex items-center justify-end">
      <a
        class="bold f6 underline link dim black-40 mr3 pointer"
        @click="closeModal"
      >
        Cancel
      </a>
      <button
        class="br1 f6 bg-brand white b--solid pointer pa2 b--brand"
        type="submit"
      >
        Save Changes
      </button>
    </footer>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';

export default {
  methods: {
    ...mapMutations(['closeModal', 'showMemberSettings', 'showInviteSettings']),
  },
  computed: {
    ...mapState({
      memberSettingsView: state => state.invitations.memberSettingsView,
      inviteSettingsView: state => state.invitations.inviteSettingsView,
    }),
  },
};
</script>
