import ApiService from "@/common/api.service";
import { FIND_BANDS, SUGGEST_BANDS } from "./actions.type";
import { SET_FIND_BANDS, SET_SUGGEST_BANDS } from "./mutations.type";

const state = {
  filteredBands: [],
  suggestedBands: []
};

const actions = {
  async [FIND_BANDS]({ commit }, args) {
    try {
      if (args.name || (args.genres && args.genres.length)) {
        commit(
          SET_FIND_BANDS,
          await ApiService.get("/api/band/findBands", args)
        );
      }
    } catch (error) {
      throw error;
    }
  },
  async [SUGGEST_BANDS]({ commit }, args) {
    try {
      commit(SET_SUGGEST_BANDS, []);
      if (args) {
        commit(
          SET_SUGGEST_BANDS,
          await ApiService.post("/api/event/recommend", args)
        );
      }
    } catch (error) {
      throw error;
    }
  }
};

const mutations = {
  [SET_FIND_BANDS](state, { data }) {
    state.filteredBands = data;
  },
  [SET_SUGGEST_BANDS](state, { data }) {
    state.suggestedBands = data;
  }
};

export default {
  namespaced: true,
  state,
  actions,
  mutations
};
