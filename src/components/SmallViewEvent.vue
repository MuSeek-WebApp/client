<template>
  <v-container elevation-2 class="mb-3">
    <v-layout wrap>
      <v-flex md2>
        <h3>{{ month }} {{ date }}</h3>
        <h4>{{ dayOfWeek }}</h4>
      </v-flex>
      <v-flex md4>
        <h3>
          <a>{{ event.name }}</a>
        </h3>
        <span>{{ startTime }} - {{ endTime }}</span>
      </v-flex>
      <v-spacer></v-spacer>
      <template v-if="event.requests.status === 'WAITING_FOR_BAND_APPROVAL'">
        <v-flex md3>
          <v-btn color="green lighten-1" small round @click="approve()">
            <v-icon class="mr-1">done</v-icon>Going
          </v-btn>
        </v-flex>
        <v-flex md3>
          <v-btn color="red lighten-1" small round @click="deny()">
            <v-icon class="mr-1">close</v-icon>Ignore
          </v-btn>
        </v-flex>
      </template>

      <template v-if="event.requests.status === 'APPROVED'">
        <v-flex md3>
          <v-menu offset-y content-class="rounded-menu">
            <template v-slot:activator="{ on }">
              <v-btn round color="green lighten-1" v-on="on" small depressed>
                <v-icon class="mr-1">done</v-icon>Going
                <v-icon class="ml-1">keyboard_arrow_down</v-icon>
              </v-btn>
            </template>
            <v-sheet>
              <v-btn
                round
                color="red lighten-1"
                flat
                small
                class="ma-2"
                @click="deny()"
              >
                <v-icon>close</v-icon>Not Going
              </v-btn>
            </v-sheet>
          </v-menu>
        </v-flex>
      </template>
      <template
        v-if="event.requests.status === 'WAITING_FOR_BUSINESS_APPROVAL'"
      >
        <v-flex md3>
          <v-btn round disabled small depressed>Request Sent</v-btn>
        </v-flex>
      </template>
      <template v-if="event.requests.status === 'DENIED'">
        <v-flex md3>
          <v-btn round disabled small depressed>Ignored</v-btn>
        </v-flex>
      </template>
    </v-layout>
  </v-container>
</template>
<style>
.rounded-menu {
  border-radius: 50px;
}
</style>

<script>
import moment from "moment";
import { APPROVE_BY_ARTIST, DENY_BY_ARTIST } from "../store/actions.type";

export default {
  props: ["event"],
  data: function() {
    return {
      month: moment(this.event.startDate).format("MMM"),
      date: moment(this.event.startDate).date(),
      dayOfWeek: moment(this.event.startDate).format("ddd"),
      startTime: moment(this.event.startDate).format("H:mm"),
      endTime: moment(this.event.endDate).format("H:mm")
    };
  },
  computed: {
    momentDate() {
      return moment(this.event.startDate);
    }
  },
  methods: {
    updateStatus(action) {
      const payload = {
        event: this.event
      };
      this.$store.dispatch(action, payload);
    },
    approve() {
      this.updateStatus(APPROVE_BY_ARTIST);
    },
    deny() {
      this.updateStatus(DENY_BY_ARTIST);
    }
  }
};
</script>
