<template>
  <v-container elevation-2 class="mb-3">
    <v-layout wrap>
      <v-flex md2>
        <h3>{{ momentDate.format("MMM ") }} {{ momentDate.date() }}</h3>
        <h4>{{ momentDate.format("ddd") }}</h4>
      </v-flex>
      <v-flex md4>
        <h3>
          <a>{{ event.name }}</a>
        </h3>
        <span>{{ event.startTime }} - {{ event.endTime }}</span>
      </v-flex>
      <v-spacer></v-spacer>
      <template v-if="event.requests.status === 'WAITING_FOR_BAND_APPROVAL'">
        <v-flex md3>
          <v-btn
            color="green lighten-1"
            small
            round
            @click="updateStatus('APPROVED')"
          >
            <v-icon class="mr-1">done</v-icon>Going
          </v-btn>
        </v-flex>
        <v-flex md3>
          <v-btn
            color="red lighten-1"
            small
            round
            @click="updateStatus('DENIED')"
          >
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
                @click="updateStatus('DENIED')"
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
import { UPDATE_STATUS_BY_ARTIST } from "../store/actions.type";

export default {
  props: ["event"],
  computed: {
    momentDate() {
      return moment(this.event.startDate);
    }
  },
  methods: {
    updateStatus(action) {
      const payload = {
        event: this.event,
        action: action
      };

      this.$store.dispatch(UPDATE_STATUS_BY_ARTIST, payload);
    }
  }
};
</script>
