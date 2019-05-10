import ApiService from "@/common/api.service";
import { FIND_BANDS } from "./actions.type";
import { SET_FIND_BANDS } from "./mutations.type";

const state = {
  filteredBands: []
};

const actions = {
  async [FIND_BANDS]({ commit }, args) {
    try {
      if (args.name || (args.genres && args.genres.length)) {
        commit(
          SET_FIND_BANDS,
          await ApiService.get("/api/band/findBands", args)
        );
      } else {
        commit(SET_FIND_BANDS, await ApiService.get("/api/band/all"));
      }
    } catch (error) {
      throw error;
    }
  }
};

const mutations = {
  [SET_FIND_BANDS](state, { data }) {
    state.filteredBands = data;
  }
};

export default {
  namespaced: true,
  state,
  actions,
  mutations
};
