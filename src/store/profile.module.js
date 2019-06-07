import ApiService from "@/common/api.service";

import {
  GET_PROFILE,
  UPLOAD_PROFILE_IMAGE,
  SAVE_PROFILE_DATA
} from "./actions.type";
import { SET_PROFILE } from "./mutations.type";

const state = {
  profileData: {}
};

const actions = {
  async [GET_PROFILE]({ commit }, userId) {
    try {
      commit(
        SET_PROFILE,
        await ApiService.post("/api/profile/get", { userId: userId })
      );
    } catch (error) {
      // eslint-disable-next-line
      console.log("ERROR");
    }
  },

  async [UPLOAD_PROFILE_IMAGE]({ dispatch }, { file, uid }) {
    try {
      await ApiService.post("/api/profile/upload", file);
      dispatch(GET_PROFILE, uid);
    } catch (error) {
      // eslint-disable-next-line
      console.log("ERROR");
    }
  },

  async [SAVE_PROFILE_DATA]({ dispatch }, profile) {
    try {
      await ApiService.post("/api/profile/update", { profile: profile });
      dispatch(GET_PROFILE, profile._id);
    } catch (error) {
      // eslint-disable-next-line
      console.log("ERROR");
    }
  }
};

const mutations = {
  [SET_PROFILE](state, { data }) {
    state.profileData = data;
  }
};

export default {
  namespaced: true,
  state,
  actions,
  mutations
};
