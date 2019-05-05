import ApiService from "@/common/api.service";

import {
  GET_UID,
  GET_PROFILE,
  UPLOAD_PROFILE_IMAGE,
  GET_CURRENT_PROFILE,
  SAVE_PROFILE_DATA
} from "./actions.type";
import { SET_UID, SET_PROFILE, SET_CURRENT_PROFILE } from "./mutations.type";

const state = {
  currentProfileData: {},
  profileData: {},
  uid: "xxx"
};

const actions = {
  async [GET_UID]({ commit }) {
    try {
      commit(SET_UID, await ApiService.get("/api/profile/uid"));
    } catch (error) {
      console.log("ERROR");
    }
  },

  async [GET_PROFILE]({ commit }, userId) {
    try {
      commit(
        SET_PROFILE,
        await ApiService.post("/api/profile/get", { userId: userId })
      );
    } catch (error) {
      console.log("ERROR");
    }
  },

  async [UPLOAD_PROFILE_IMAGE]({ state, dispatch }, file) {
    try {
      await ApiService.post("/api/profile/upload", file);
      dispatch(GET_PROFILE, state.uid);
    } catch (error) {
      console.log("ERROR");
    }
  },

  async [SAVE_PROFILE_DATA]({ state, dispatch }, profile) {
    try {
      await ApiService.post("/api/profile/update", { profile: profile });
      dispatch(GET_PROFILE, state.uid);
    } catch (error) {
      console.log("ERROR");
    }
  },

  async [GET_CURRENT_PROFILE]({ state, commit }) {
    try {
      commit(
        SET_CURRENT_PROFILE,
        await ApiService.post("/api/profile/get", { userId: state.uid })
      );
    } catch (error) {
      console.log("ERROR");
    }
  }
};

const mutations = {
  [SET_UID](state, { data }) {
    state.uid = data;
  },

  [SET_PROFILE](state, { data }) {
    state.profileData = data;
  },

  [SET_CURRENT_PROFILE](state, { data }) {
    state.currentProfileData = data;
  }
};

export default {
  namespaced: true,
  state,
  actions,
  mutations
};
