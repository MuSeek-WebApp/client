<template>
  <v-card>
    <v-img
      class="white--text"
      height="150px"
      src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
    >
      <v-container fill-height class="pa-1">
        <v-layout align-start justify-end column fill-height>
          <v-flex md4 class="ml-3">
            <h2>{{ event.name }}</h2>
            <h3>{{ monthName }} {{ date }}</h3>
          </v-flex>
        </v-layout>
        <v-layout>
          <v-spacer></v-spacer>
          <v-flex md6>
            <v-btn color="white" icon>
              <v-icon color="purple" large>info</v-icon>
            </v-btn>
          </v-flex>
        </v-layout>
      </v-container>
    </v-img>
    <v-card-title class="pb-2">
      <h4>{{ event.business.name }}</h4>
      <v-spacer></v-spacer>
      <v-rating
        readonly
        v-model="rating"
        background-color="orange lighten-3"
        color="orange"
        small
      ></v-rating>
    </v-card-title>
    <v-divider></v-divider>
    <v-card-text>
      <h4>
        <v-icon class="pr-2">access_time</v-icon>
        {{ startTime }} - {{ endTime }}
      </h4>
      <h4>
        <v-icon class="pr-2">music_note</v-icon>
        {{ event.genres.toString() }}
      </h4>
      <p class="mt-3">{{ event.description }}</p>
    </v-card-text>
    <v-divider></v-divider>

    <template v-if="currentStatus !== null">
      <v-card-actions class="purple lighten-3">
        <v-flex md4>
          <h5>IN PROGRESS</h5>
        </v-flex>
        <v-divider vertical></v-divider>
        <v-flex>
          <h4>{{ currentStatus }}</h4>
        </v-flex>
      </v-card-actions>
    </template>
    <template v-else>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn dark color="black" @click="sendRequest">RSVP</v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
    </template>
  </v-card>
</template>
<style>
p {
  height: 100px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
}
</style>

<script>
import moment from "moment";
import { REGISTER_EVENT } from "../store/actions.type";
export default {
  props: ["event", "currentStatus"],
  data: function() {
    return {
      monthName: moment(this.event.startDate).format("MMM"),
      date: moment(this.event.startDate).date(),
      startTime: moment(this.event.startDate).format("H:mm"),
      endTime: moment(this.event.endDate).format("H:mm")
    };
  },
  computed: {
    rating() {
      return (
        this.event.business.reviews.reduce((a, b) => a + (b["stars"] || 0), 0) /
        this.event.business.reviews.length
      );
    }
  },
  methods: {
    async sendRequest() {
      const event = {
        event: this.event
      };
      await this.$store.dispatch(REGISTER_EVENT, event);
    }
  }
};
</script>
