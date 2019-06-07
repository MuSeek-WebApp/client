import store from "../store";
import { FETCH_EVENTS, FETCH_FEED } from "../store/actions.type";

const WsService = {
  init() {
    const ws = new WebSocket(process.env.VUE_APP_WS_URL + "/ws/event");

    ws.onopen = () => {
      // eslint-disable-next-line
      console.log("WebSocket connection has started");
    };

    ws.onmessage = async message => {
      if (message.data === "UPDATE_EVENTS") {
        try {
          await store.dispatch(FETCH_EVENTS);
          await store.dispatch(FETCH_FEED);
        } catch (err) {
          // eslint-disable-next-line
          console.log("fetch dispatching error " + err);
        }
      }
    };
  }
};

export default WsService;
