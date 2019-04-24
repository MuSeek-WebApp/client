<template>
  <v-card>
    <v-toolbar flat>
      <v-btn icon @click="close">
        <v-icon>close</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn color="primary" @click="save">Save</v-btn>
    </v-toolbar>
    <v-form>
      <v-container>
        <v-layout wrap>
          <v-flex md12>
            <v-text-field
              prepend-icon="event_note"
              v-model="event.name"
              label="Event Name"
            ></v-text-field>
          </v-flex>

          <v-flex md4>
            <v-menu
              v-model="startDatePicker"
              :close-on-content-click="false"
              :nudge-right="40"
              lazy
              transition="scale-transition"
              offset-y
              full-width
              max-width="290px"
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="event.startDate"
                  label="Start Date"
                  persistent-hint
                  prepend-icon="event"
                  readonly
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="event.startDate"
                no-title
                @input="startDatePicker = false"
              ></v-date-picker>
            </v-menu>
          </v-flex>
          <v-flex md2>
            <v-select v-model="event.startTime" :items="startTimes"></v-select>
          </v-flex>
          <v-flex md4>
            <v-menu
              v-model="endDatePicker"
              :close-on-content-click="false"
              :nudge-right="40"
              lazy
              transition="scale-transition"
              offset-y
              full-width
              max-width="290px"
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="event.endDate"
                  label="End Date"
                  persistent-hint
                  prepend-icon="event"
                  readonly
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="event.endDate"
                no-title
                @input="endDatePicker = false"
              ></v-date-picker>
            </v-menu>
          </v-flex>
          <v-flex md2>
            <v-select v-model="event.endTime" :items="endTimes"></v-select>
          </v-flex>
          <v-flex md12>
            <v-textarea
              prepend-icon="subject"
              solo
              no-resize
              label="More details..."
              v-model="event.description"
            ></v-textarea>
          </v-flex>
          <v-flex md12>
            <GenreSelect v-model="event.genres"></GenreSelect>
          </v-flex>
          <v-flex md2 align-self-center>
            <span class="title text-md-center">Event Lineup</span>
          </v-flex>
          <v-spacer></v-spacer>
          <v-flex md2>
            <v-btn>Find Band</v-btn>
          </v-flex>
          <v-flex md12>
            <v-data-table
              class="elevation-2"
              hide-actions
              :items="event.bands"
              :headers="headers"
            >
              <template v-slot:no-data
                >Add bands to your event</template
              >
              <template v-slot:items="props">
                <td>{{ props.item.name }}</td>
                <td>{{ props.item.status }}</td>
                <td>
                  <v-btn icon>
                    <v-icon>cancel</v-icon>
                  </v-btn>
                </td>
              </template>
            </v-data-table>
          </v-flex>
        </v-layout>
      </v-container>
    </v-form>
  </v-card>
</template>

<script>
import { NEW_EVENT, UPDATE_EVENT } from "../store/actions.type";
import GenreSelect from "./GenreSelect";
import moment from "moment";
import { START_PROGRESS, STOP_PROGRESS } from "../store/mutations.type";

export default {
  components: {
    GenreSelect
  },
  $_veeValidate: {
    validator: "new"
  },
  props: ["bindedEvent"],
  provide: function() {
    return {
      validator: this.$validator
    };
  },
  data: function() {
    return {
      startDatePicker: false,
      endDatePicker: false,
      startTimes: [],
      headers: [
        { text: "Band", value: "name", sortable: false },
        { text: "Status", value: "status" },
        { text: "Actions", sortable: false }
      ]
    };
  },
  beforeMount: function() {
    for (let i = 0; i < 24; i++) {
      this.startTimes.push(i + ":00", i + ":30");
    }
  },
  computed: {
    event() {
      let event = this.bindedEvent;

      if (!event) {
        event = this.getEmptyEvent();

        if (this.bindedDate) {
          event.startDate = this.bindedDate;
          event.endDate = this.bindedDate;
        }
      }

      return event;
    },
    endTimes: function() {
      if (!moment(this.event.endDate).isAfter(this.event.startDate)) {
        let t = [];
        let selectedStartTime = this.event.startTime.split(":");

        if (selectedStartTime[1] == "00") {
          t.push(selectedStartTime[0] + ":00");
        }
        t.push(selectedStartTime[0] + ":30");

        for (
          let i = parseInt(this.event.startTime.split(":")[0]) + 1;
          i < 24;
          i++
        ) {
          t.push(i + ":00", i + ":30");
        }
        return t;
      } else {
        return this.startTimes;
      }
    }
  },
  methods: {
    save() {
      this.$store.commit(START_PROGRESS);
      let action = this.event._id ? UPDATE_EVENT : NEW_EVENT;
      this.$store
        .dispatch(action, this.event)
        .then(() => {
          this.$emit("dialog-close");
        })
        .catch(() => {
          // // TODO print error message
        })
        .finally(() => {
          this.$store.commit(STOP_PROGRESS);
        });
    },
    close() {
      this.$emit("dialog-close");
    }
  }
};
</script>
