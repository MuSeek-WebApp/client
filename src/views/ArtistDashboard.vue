<template>
  <v-container grid-list-md>
    <v-layout>
      <v-flex md8>
        <v-card height="500" class="scroll-y">
          <v-card-title>
            <h3 class="pa-3">Plan Your Next Gig!</h3>
          </v-card-title>
          <v-card-text></v-card-text>
        </v-card>
      </v-flex>
      <v-flex md4>
        <v-sheet class="elevation-2" tile>
          <h3 class="pa-3">Upcoming Events</h3>
        </v-sheet>
        <v-card max-height="500" class="scroll-y">
          <v-card-text>
            <SmallViewEvent
              :event="{ ...event }"
              :key="event._id"
              v-for="event in events"
            ></SmallViewEvent>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import SmallViewEvent from "../components/SmallViewEvent.vue";
import { FETCH_EVENTS } from "../store/actions.type.js";

export default {
  components: {
    SmallViewEvent
  },
  data: function() {
    return {
      events: this.$store.getters.getAllEvents
    };
  },
  created() {
    this.$store.dispatch(FETCH_EVENTS);
  }
};
</script>
