import store from "../store";
import { FETCH_EVENTS, FETCH_FEED } from "../store/actions.type";
import { WS_URL } from "./config";

const WsService = {
  init() {
    const ws = new WebSocket(WS_URL + "/ws/event");

    ws.onopen = () => {
      console.log("WebSocket connection has started");
    };

    ws.onmessage = async message => {
      if (message.data === "UPDATE_EVENTS") {
        try {
          await store.dispatch(FETCH_EVENTS);
          await store.dispatch(FETCH_FEED);
        } catch (err) {
          console.log("fetch dispatching error " + err);
        }
      }
    };
  }
};

export default WsService;
