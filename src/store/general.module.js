import ApiService from "@/common/api.service";
import { GET_SEARCH } from "./actions.type";
import { SET_SEARCHED_DATA } from "./mutations.type";

const state = {
  searchedData: []
};

const actions = {
  async [GET_SEARCH](context, name) {
    const { data } = await ApiService.get("api/general/search/" + name);
    context.commit(SET_SEARCHED_DATA, data);
  }
};

const mutations = {
  [SET_SEARCHED_DATA](state, data) {
    state.searchedData = data;
  }
};

export default {
  namespaced: true,
  state,
  actions,
  mutations
};
