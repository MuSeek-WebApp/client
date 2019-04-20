import { SAVE_EVENT } from "./actions.type";
import ApiService from "@/common/api.service";

const state = {};

const actions = {
  [SAVE_EVENT](context, event) {
    return ApiService.post("api/events", event);
  }
};

export default {
  state,
  actions
};
