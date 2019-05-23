<template>
  <v-container class="background-image">
    <v-layout justify-center>
      <v-flex md8>
        <v-sheet elevation="1">
          <v-layout wrap>
            <v-flex xs12>
              <v-sheet height="600">
                <v-calendar
                  ref="calendar"
                  v-model="date"
                  color="primary"
                  @click:date="addEventFromCalendar()"
                >
                  <template v-slot:day="{ date }">
                    <div :key="event._id" v-for="event in eventsMap[date]">
                      <CalendarEvent :event="event"></CalendarEvent>
                    </div>
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
        <v-dialog v-model="dialog" persistent fullscreen>
          <template v-slot:activator="{ on }">
            <v-btn
              @click="addEvent()"
              fixed
              dark
              fab
              bottom
              right
              v-on="on"
              color="pink"
            >
              <v-icon>add</v-icon>
            </v-btn>
          </template>
          <Event
            v-bind:bindedEvent="this.event"
            v-on:dialog-close="onDialogClose"
          ></Event>
        </v-dialog>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import CalendarEvent from "../components/CalendarEvent";
import Event from "../components/event/Event";
import { FETCH_EVENTS } from "../store/actions.type";
import moment from "moment";

export default {
  components: {
    Event,
    CalendarEvent
  },
  data: function() {
    return {
      dialog: false,
      date: "",
      event: {
        name: "",
        startDate: moment().format("YYYY-MM-DD"),
        endDate: moment().format("YYYY-MM-DD"),
        startTime: "0:00",
        endTime: "0:00",
        description: "",
        genres: [],
        bands: [],
        requests: [],
        photos: []
      }
    };
  },
  computed: {
    eventsMap() {
      const eventsByDate = {};
      this.$store.getters.getAllEvents.forEach(e => {
        (eventsByDate[moment(e.startDate).format("YYYY-MM-DD")] =
          eventsByDate[moment(e.startDate).format("YYYY-MM-DD")] || []).push(e);
      });

      for (let date in eventsByDate) {
        eventsByDate[date].sort((d1, d2) => {
          return moment(d1.startDate) - moment(d2.startDate);
        });
      }

      return eventsByDate;
    }
  },
  created() {
    this.$store.dispatch(FETCH_EVENTS);
  },
  methods: {
    onDialogClose() {
      this.dialog = false;
    },
    addEventFromCalendar() {
      this.restoreDefaultEvent();
      this.event.startDate = this.date;
      this.event.endDate = this.date;
      this.dialog = true;
    },
    addEvent() {
      this.restoreDefaultEvent();
    },
    restoreDefaultEvent() {
      let event = this.event;
      event.name = "";
      event.startDate = moment().format("YYYY-MM-DD");
      event.endDate = moment().format("YYYY-MM-DD");
      event.startTime = "0:00";
      event.endTime = "0:00";
      event.description = "";
      event.genres = [];
      event.bands = [];
      event.requests = [];
      event.photos = [];
    }
  }
};
</script>
