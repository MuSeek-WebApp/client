import { INFO_STEP, EXTRA_INFO_STEP } from "./mutations.type";

const state = {
  step: 1,
  registerData: {}
};

const getters = {
  currentStep(state) {
    return state.step;
  }
};

const mutations = {
  [INFO_STEP](state) {
    state.step = 1;
  },
  [EXTRA_INFO_STEP](state) {
    state.step = 2;
  }
};

export default {
  state,
  getters,
  mutations
};
