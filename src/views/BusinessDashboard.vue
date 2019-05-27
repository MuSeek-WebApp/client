<template>
  <v-container class="background-image">
    <v-layout justify-center>
      <v-flex md11>
        <v-sheet elevation="1">
          <v-layout wrap justify-center>
            <v-flex class="text-sm-center" xs1>
              <v-btn icon @click="$refs.calendar.prev()">
                <v-icon>chevron_left</v-icon>
              </v-btn>
            </v-flex>
            <v-flex class="text-sm-center headline" align-self-center xs1>
              {{ getSelectedMonthAndYear }}
            </v-flex>
            <v-flex class="text-xs-center" xs1>
              <v-btn icon @click="$refs.calendar.next()">
                <v-icon>chevron_right</v-icon>
              </v-btn>
            </v-flex>

            <v-flex xs12 mt-2>
              <v-sheet height="700" elevation="2">
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
          </v-layout>
        </v-sheet>
        <v-dialog v-model="dialog" persistent fullscreen>
          <template v-slot:activator="{ on }">
            <v-btn
              @click="addEvent()"
              large
              fixed
              fab
              bottom
              right
              color="white"
              v-on="on"
              class="ma-5"
              style="opacity:0.8"
            >
              <v-icon color="pink" large>add</v-icon>
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
import {
  START_PROGRESS,
  STOP_PROGRESS,
  DISPATCH_ERROR_MESSAGE
} from "../store/mutations.type";

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
    },
    getSelectedMonthAndYear() {
      let seletedMonth = moment();
      if (this.date) {
        seletedMonth = moment(this.date);
      }
      return seletedMonth.format("MMM") + " " + seletedMonth.format("YYYY");
    }
  },
  async created() {
    try {
      this.$store.commit(START_PROGRESS);
      await this.$store.dispatch(FETCH_EVENTS);
    } catch (error) {
      this.$store.commit(
        DISPATCH_ERROR_MESSAGE,
        "Error fetching data from server"
      );
    } finally {
      this.$store.commit(STOP_PROGRESS);
    }
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
      event.max_bands_number = 1;
      event.min_bands_number = 1;
    }
  }
};
</script>
