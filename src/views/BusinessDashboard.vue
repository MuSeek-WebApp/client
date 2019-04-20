<template>
  <v-container>
    <v-layout justify-center>
      <v-flex md8>
        <v-sheet elevation="1">
          <v-layout wrap>
            <v-flex xs12>
              <v-sheet height="600">
                <v-calendar
                  ref="calendar"
                  v-model="date"
                  :now="today"
                  :value="today"
                  color="primary"
                >
                  <template v-slot:day="{ date }">
                    <template v-for="event in eventsMap[date]">
                      <v-menu
                        :key="event.title"
                        v-model="event.open"
                        full-width
                        offset-x
                      >
                        <template v-slot:activator="{ on }">
                          <div
                            v-if="!event.time"
                            v-ripple
                            class="my-event"
                            v-on="on"
                            v-html="event.title"
                          ></div>
                        </template>
                        <v-card color="grey lighten-4" min-width="350px" flat>
                          <v-toolbar color="primary" dark>
                            <v-btn icon>
                              <v-icon>edit</v-icon>
                            </v-btn>
                            <v-toolbar-title
                              v-html="event.title"
                            ></v-toolbar-title>
                            <v-spacer></v-spacer>
                          </v-toolbar>
                          <v-card-title primary-title>
                            <span v-html="event.details"></span>
                          </v-card-title>
                          <v-card-actions>
                            <v-btn flat color="secondary">Cancel</v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-menu>
                    </template>
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
import Event from "../components/Event";

export default {
  components: {
    Event
  },
  data: () => ({
    dialog: false,
    date: "",
    events: [
      {
        title: "Open Mic Evening",
        details: "Regular open mic evening",
        date: "2019-03-01",
        open: false
      },
      {
        title: "Eric Clapton",
        details: "Eric Clapton show at The Zone",
        date: "2019-03-02",
        open: false
      },
      {
        title: "70s&80s Evening",
        details: "",
        date: "2019-03-03",
        open: false
      },
      {
        title: "Jam Evening",
        details: "Jam night",
        date: "2019-03-07",
        open: false
      },
      {
        title: "Classic Jazz",
        details: "",
        date: "2019-03-07",
        open: false
      },
      {
        title: "Open Mic Evening",
        details: "Regular open mic evening",
        date: "2019-03-08",
        open: false
      },
      {
        title: "Pearl Jam",
        details: "Pearl Jam show at The Zone",
        date: "2019-03-09",
        open: false
      }
    ]
  }),
  computed: {
    // convert the list of events into a map of lists keyed by date
    eventsMap() {
      const map = {};
      this.events.forEach(e => (map[e.date] = map[e.date] || []).push(e));
      return map;
    }
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

<style lang="stylus" scoped>
.my-event {
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
</style>
