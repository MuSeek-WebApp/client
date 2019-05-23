import { DISPATCH_ERROR_MESSAGE, CLEAR_ERROR_MESSAGE } from "./mutations.type";

const state = {
  error: null,
  isShown: false
};

const mutations = {
  [DISPATCH_ERROR_MESSAGE](state, error) {
    state.error = error;
    state.isShown = true;
  },
  [CLEAR_ERROR_MESSAGE](state, value) {
    state.error = null;
    state.isShown = value;
  }
};

export default {
  state,
  mutations
};
