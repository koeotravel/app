const initialState = {
  memberSettingsView: true,
  inviteSettingsView: false,
};

const getters = {};

const actions = {};

const mutations = {
  showMemberSettings(state) {
    state.memberSettingsView = true;
    state.inviteSettingsView = false;
  },
  showInviteSettings(state) {
    state.inviteSettingsView = true;
    state.memberSettingsView = false;
  },
};

export default {
  state: initialState,
  getters,
  actions,
  mutations,
};
