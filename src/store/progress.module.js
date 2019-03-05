import { START_PROGRESS, STOP_PROGRESS } from "./mutations.type";

const state = {
  isInProgress: false,
  show: false
};

const mutations = {
  [START_PROGRESS](state) {
    state.isInProgress = true;
    state.show = true;
  },
  [STOP_PROGRESS](state) {
    state.isInProgress = false;
    state.show = false;
  }
};

export default {
  state,
  mutations
};
