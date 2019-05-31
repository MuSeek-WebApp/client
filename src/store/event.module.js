import {
  APPROVE_BY_ARTIST,
  DENY_BY_ARTIST,
  FETCH_EVENT_REVIEWS,
  FETCH_EVENTS,
  FETCH_FEED,
  FETCH_SINGLE_EVENT,
  NEW_EVENT,
  NEW_REVIEW,
  REGISTER_EVENT,
  REMOVE_EVENT,
  UPDATE_EVENT,
  UPDATE_REVIEW
} from "./actions.type";
import {
  ADD_OR_UPDATE_EVENT_REVIEWS,
  CLEAR_EVENTS,
  CLEAR_FEED,
  DELETE_EVENT,
  SET_EVENT,
  SET_EVENT_REVIEWS,
  SET_EVENTS,
  SET_FEED,
  SET_VIEWED_EVENT
} from "./mutations.type";
import ApiService from "@/common/api.service";

const state = {
  events: [],
  feed: [],
  viewedEvent: null,
  viewedEventReviews: []
};

const getters = {
  getAllEvents(state) {
    return state.events;
  },
  getAllFeed(state) {
    return state.feed;
  },
  getViewedEvent(state) {
    return state.viewedEvent;
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
  [FETCH_FEED](context, filter) {
    return new Promise((resolve, reject) => {
      ApiService.post("api/event/my-feed", filter)
        .then(result => {
          context.commit(CLEAR_FEED);
          context.commit(SET_FEED, result.data);
          resolve();
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  [NEW_REVIEW](context, review) {
    return new Promise((resolve, reject) => {
      ApiService.post("api/user/review", review)
        .then(result => {
          review.review._id = result.data[result.data.length - 1]._id;
          context.commit(ADD_OR_UPDATE_EVENT_REVIEWS, {
            _id: review.userId,
            reviews: [review.review]
          });
          resolve();
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  [UPDATE_REVIEW](context, args) {
    return new Promise((resolve, reject) => {
      ApiService.put("api/user/review/" + args.userId, args.review)
        .then(() => {
          resolve();
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  async [APPROVE_BY_ARTIST](context, payload) {
    await ApiService.post("api/event/approve-band/", payload);
  },
  async [DENY_BY_ARTIST](context, payload) {
    await ApiService.post("api/event/deny-band/", payload);
  },
  async [REGISTER_EVENT](context, event) {
    await ApiService.post("api/event/register-band", event);
  },
  async [FETCH_SINGLE_EVENT](context, id) {
    const { data } = await ApiService.get("api/event/id/" + id);
    context.commit(SET_VIEWED_EVENT, data);
  },
  async [FETCH_EVENT_REVIEWS](context, id) {
    const { data } = await ApiService.get("api/event/reviews/" + id);
    context.commit(SET_EVENT_REVIEWS, data);
  }
};

const mutations = {
  [CLEAR_EVENTS](state) {
    state.events.splice(0, state.events.length);
  },
  [CLEAR_FEED](state) {
    state.feed.splice(0, state.feed.length);
  },
  [SET_EVENTS](state, events) {
    state.events.push(...events);
  },
  [SET_FEED](state, feed) {
    state.feed.push(...feed);
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
  },
  [SET_VIEWED_EVENT](state, event) {
    state.viewedEvent = event;
  },
  [SET_EVENT_REVIEWS](state, reviews) {
    state.viewedEventReviews.splice(0, state.viewedEventReviews.length);
    state.viewedEventReviews.push(...reviews);
  },
  [ADD_OR_UPDATE_EVENT_REVIEWS](state, review) {
    let index = state.viewedEventReviews.findIndex(
      obj => obj._id === review._id
    );

    if (index !== -1) {
      state.viewedEventReviews.splice(index, 1);
    }

    state.viewedEventReviews.push(review);
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
