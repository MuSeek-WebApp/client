<template>
  <v-container grid-list-xl>
    <v-layout>
      <v-flex md8>
        <v-card max-height="700" height="700" class="scroll-y">
          <v-card-title> </v-card-title>
          <v-card-text>
            <v-container>
              <v-layout wrap>
                <v-flex md4>
                  <FeedViewEvent></FeedViewEvent>
                </v-flex>
                <v-flex md4>
                  <FeedViewEvent></FeedViewEvent>
                </v-flex>
                <v-flex md4>
                  <FeedViewEvent></FeedViewEvent>
                </v-flex>
                <v-flex md4>
                  <FeedViewEvent></FeedViewEvent>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex md4>
        <v-card max-height="700" class="scroll-y">
          <v-card-text>
            <h1 class="mb-1">Upcoming Events</h1>
            <div :key="status" v-for="status in Object.keys(displayStatuses)">
              <template v-if="mapEvents[status]">
                <v-divider class="mb-3"></v-divider>
                <h3 class="mb-3">{{ displayStatuses[status] }}</h3>
                <SmallViewEvent
                  :event="{ ...event }"
                  :key="event._id"
                  v-for="event in mapEvents[status]"
                ></SmallViewEvent>
              </template>
            </div>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import SmallViewEvent from "../components/SmallViewEvent.vue";
import FeedViewEvent from "../components/FeedViewEvent.vue";

import { FETCH_EVENTS } from "../store/actions.type.js";
import moment from "moment";
export default {
  components: {
    FeedViewEvent,
    SmallViewEvent
  },
  data: function() {
    return {
      events: this.$store.getters.getAllEvents,
      displayStatuses: {
        APPROVED: "Approved Events",
        WAITING_FOR_BAND_APPROVAL: "Waiting for your approval",
        WAITING_FOR_BUSINESS_APPROVAL: "Waiting for business approval",
        DENIED: "Ignored Events"
      }
    };
  },
  created() {
    this.$store.dispatch(FETCH_EVENTS);
  },
  computed: {
    mapEvents() {
      const map = {};
      this.events.forEach(e =>
        (map[e.requests.status] = map[e.requests.status] || []).push(e)
      );

      for (let status in map) {
        map[status].sort((e1, e2) => {
          return moment(e1.startDate) - moment(e2.startDate);
        });
      }

      return map;
    }
  }
};
</script>
