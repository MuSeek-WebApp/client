<template>
  <v-container>
    <v-layout justify-center>
      <v-flex md8>
        <v-sheet elevation="1">
          <v-layout wrap>
            <v-flex xs12>
              <v-sheet height="600">
                <v-calendar ref="calendar" v-model="date" color="primary">
                  <template v-slot:day="{ date }">
                    <CalendarEvent
                      v-bind:event="event"
                      v-bind:key="event._id"
                      v-for="event in eventsMap[date]"
                    ></CalendarEvent>
                  </template>
                </v-calendar>
              </v-sheet>
            </v-flex>

            <v-flex class="text-sm-left" xs6>
              <v-btn @click="$refs.calendar.prev()">Prev</v-btn>
            </v-flex>
            <v-flex class="text-xs-right" xs6>
              <v-btn @click="$refs.calendar.next()">Next</v-btn>
            </v-flex>
          </v-layout>
        </v-sheet>
        <v-dialog v-model="dialog" persistent max-width="1000px" hide-overlay>
          <template v-slot:activator="{ on }">
            <v-btn fixed dark fab button right v-on="on" color="pink">
              <v-icon>add</v-icon>
            </v-btn>
          </template>
          <Event v-on:dialog-close="onDialogClose"></Event>
        </v-dialog>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import CalendarEvent from "../components/CalendarEvent";
import Event from "../components/Event";
import { FETCH_EVENTS } from "../store/actions.type";

export default {
  components: {
    Event,
    CalendarEvent
  },
  data: () => ({
    dialog: false,
    date: ""
  }),
  computed: {
    // convert the list of events into a map of lists keyed by date
    eventsMap() {
      const map = {};
      this.$store.getters.getAllEvents.forEach(e =>
        (map[e.startDate] = map[e.startDate] || []).push(e)
      );
      return map;
    }
  },
  created() {
    this.$store.dispatch(FETCH_EVENTS);
  },
  methods: {
    open(event) {
      alert(event.title);
    },
    onDialogClose() {
      this.dialog = false;
    }
  }
};
</script>
