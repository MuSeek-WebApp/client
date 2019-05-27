<template>
  <v-container grid-list-xs class="background-image">
    <v-layout>
      <v-flex md8>
        <FilterBar></FilterBar>
        <v-sheet max-height="700" height="700" class="scroll-y" elevation="1">
          <v-container>
            <v-layout wrap>
              <v-flex md6 lg4 xs12 :key="item._id" v-for="item in feed">
                <FeedViewEvent
                  :currentStatus="getFeedEventStatus(item)"
                  :event="item"
                ></FeedViewEvent>
              </v-flex>
            </v-layout>
          </v-container>
        </v-sheet>
      </v-flex>
      <v-flex md4>
        <v-card max-height="700" class="scroll-y">
          <v-card-text>
            <h1 class="mb-1">Upcoming Events</h1>
            <div :key="status" v-for="status in Object.keys(displayStatuses)">
              <template v-if="mapEventsByStatus[status]">
                <v-divider class="mb-3"></v-divider>
                <h3 class="mb-3">{{ displayStatuses[status] }}</h3>
                <SmallViewEvent
                  :event="{ ...event }"
                  :key="event._id"
                  v-for="event in mapEventsByStatus[status]"
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
import FilterBar from "../components/FilterBar.vue";
import { FETCH_EVENTS, FETCH_FEED } from "../store/actions.type.js";
import moment from "moment";
export default {
  components: {
    FeedViewEvent,
    SmallViewEvent,
    FilterBar
  },
  data: function() {
    return {
      events: this.$store.getters.getAllEvents,
      displayStatuses: {
        APPROVED: "Approved",
        WAITING_FOR_BAND_APPROVAL: "Waiting for your approval",
        WAITING_FOR_BUSINESS_APPROVAL: "Waiting for business approval",
        DENIED: "Ignored"
      },
      feed: this.$store.getters.getAllFeed
    };
  },
  created() {
    this.$store.dispatch(FETCH_EVENTS);
    this.$store.dispatch(FETCH_FEED);
  },
  computed: {
    mapEventsByStatus() {
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
    },
    mapEventsById() {
      const map = {};
      this.events.forEach(e => (map[e._id] = map[e._id] || []).push(e));
      return map;
    }
  },
  methods: {
    getFeedEventStatus(feedEvent) {
      return this.mapEventsById[feedEvent._id]
        ? this.displayStatuses[
            this.mapEventsById[feedEvent._id][0].requests.status
          ]
        : null;
    }
  }
};
</script>
