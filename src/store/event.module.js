import {
  NEW_EVENT,
  FETCH_EVENTS,
  UPDATE_EVENT,
  REMOVE_EVENT,
  UPDATE_STATUS_BY_ARTIST
} from "./actions.type";
import {
  CLEAR_EVENTS,
  SET_EVENTS,
  SET_EVENT,
  DELETE_EVENT
} from "./mutations.type";
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
  [NEW_EVENT](context, event) {
    return new Promise((resolve, reject) => {
      ApiService.post("api/event", event)
        .then(result => {
          context.commit(SET_EVENT, result.data);
          resolve();
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  [UPDATE_EVENT](context, event) {
    return new Promise((resolve, reject) => {
      ApiService.put("api/event/" + event._id, event)
        .then(result => {
          context.commit(SET_EVENT, result.data);
          resolve();
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  [REMOVE_EVENT](context, event) {
    return new Promise((resolve, reject) => {
      ApiService.delete("api/event/" + event._id)
        .then(() => {
          context.commit(DELETE_EVENT, event);
          resolve();
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  [FETCH_EVENTS](context) {
    return new Promise((resolve, reject) => {
      ApiService.get("api/event/my-events")
        .then(result => {
          context.commit(CLEAR_EVENTS);
          context.commit(SET_EVENTS, result.data);
          resolve();
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  async [UPDATE_STATUS_BY_ARTIST](context, payload) {
    const { data } = await ApiService.put(
      "api/event/status/" + payload.event._id,
      payload
    );
    payload.event.requests.status = data;
  }
};

const mutations = {
  [CLEAR_EVENTS](state) {
    state.events.splice(0, state.events.length);
  },
  [SET_EVENTS](state, events) {
    state.events.push(...events);
  },
  [SET_EVENT](state, event) {
    let index = state.events.findIndex(obj => obj._id === event._id);

    if (index !== -1) {
      state.events.splice(index, 1);
    }

    state.events.push(event);
  },
  [DELETE_EVENT](state, event) {
    let index = state.events.findIndex(obj => obj._id === event._id);

    if (index !== -1) {
      state.events.splice(index, 1);
    }
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
