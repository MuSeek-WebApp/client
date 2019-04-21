import { SAVE_EVENT, FETCH_EVENTS } from "./actions.type";
import { SET_EVENTS } from "./mutations.type";
import ApiService from "@/common/api.service";

const state = {
  events: []
};

const getters = {
  getAllEvents(state) {
    return state.events;
  }
};

const actions = {
  [SAVE_EVENT](context, event) {
    return new Promise((resolve, reject) => {
      ApiService.post("api/events", event)
        .then(() => {
          context.commit(SET_EVENTS, [event]);
          resolve();
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  [FETCH_EVENTS](context) {
    return new Promise((resolve, reject) => {
      ApiService.get("api/events")
        .then(result => {
          context.commit(SET_EVENTS, result.data);
          resolve();
        })
        .catch(err => {
          reject(err);
        });
    });
  }
};

const mutations = {
  [SET_EVENTS](state, events) {
    state.events.push(...events);
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
