import {
  ACCOUNT_TYPE_STEP,
  INFO_STEP,
  EXTRA_INFO_STEP,
  FINAL_STEP
} from "./mutations.type";

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
  [ACCOUNT_TYPE_STEP](state) {
    state.step = 1;
  },
  [INFO_STEP](state) {
    state.step = 2;
  },
  [EXTRA_INFO_STEP](state) {
    state.step = 3;
  },
  [FINAL_STEP](state) {
    state.step = 4;
  }
};

export default {
  state,
  getters,
  mutations
};
