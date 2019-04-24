<template>
  <v-menu :close-on-content-click="false" v-model="menu" full-width offset-x>
    <template v-slot:activator="{ on }">
      <div
        v-ripple
        :class="[isActive() ? 'active-event' : 'past-event']"
        v-on="on"
        v-html="event.name"
      ></div>
    </template>
    <v-card color="grey lighten-4" min-width="350px" flat>
      <v-toolbar flat dense>
        <v-btn icon @click="menu = false">
          <v-icon>close</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" persistent max-width="1000px" hide-overlay>
          <template v-slot:activator="{ on }">
            <v-btn icon v-on="on">
              <v-icon>edit</v-icon>
            </v-btn>
          </template>
          <Event
            v-bind:bindedEvent="{ ...event }"
            v-on:dialog-close="onDialogClose"
          ></Event>
        </v-dialog>
        <v-btn icon @click="remove()">
          <v-icon>delete_outline</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-title class="pt-1" primary-title>
        <div>
          <div class="headline mb-3" v-html="event.name"></div>
          <h4 class="mb-2">
            <v-icon class="mr-2">calendar_today</v-icon>
            {{ eventDateToString }}
          </h4>
          <h4 class="mb-2">
            <v-icon class="mr-2">people</v-icon>
            {{ event.bands.length }} Bands
          </h4>
          <h4 class="mb-2">
            <v-icon>music_note</v-icon>
            {{ event.genres.toString() }}
          </h4>
        </div>
      </v-card-title>
    </v-card>
  </v-menu>
</template>

<script>
import Event from "./Event";
import { REMOVE_EVENT } from "../store/actions.type";
import { STOP_PROGRESS, START_PROGRESS } from "../store/mutations.type";
import moment from "moment";
export default {
  components: {
    Event
  },
  props: ["event"],
  data: function() {
    return {
      menu: false,
      dialog: false
    };
  },
  computed: {
    eventDateToString: function() {
      let startDate = moment(this.event.startDate + " " + this.event.startTime);
      let endDate = moment(this.event.endDate + " " + this.event.endTime);

      return (
        startDate.format("MMMM, DD, YYYY, HH:mm") +
        " - " +
        endDate.format("MMMM, DD, YYYY, HH:mm")
      );
    }
  },
  methods: {
    onDialogClose() {
      this.dialog = false;
      this.menu = false;
    },
    remove() {
      this.$store.commit(START_PROGRESS);
      this.$store
        .dispatch(REMOVE_EVENT, this.event)
        .then(() => {
          this.menu = false;
        })
        .catch(() => {
          // TODO print error message
        })
        .finally(() => {
          this.$store.commit(STOP_PROGRESS);
        });
    },
    isActive() {
      return !moment(this.event.endDate + " " + this.event.endTime).isBefore(
        moment()
      );
    }
  }
};
</script>

<style lang="stylus" scoped>
.active-event {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  border-radius: 2px;
  background-color: #1867c0;
  color: #ffffff;
  border: 1px solid #1867c0;
  width: 100%;
  font-size: 12px;
  padding: 3px;
  cursor: pointer;
  margin-bottom: 1px;
}

.past-event {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  border-radius: 2px;
  background-color: grey;
  color: #ffffff;
  border: 1px solid grey;
  width: 100%;
  font-size: 12px;
  padding: 3px;
  cursor: pointer;
  margin-bottom: 1px;
}
</style>