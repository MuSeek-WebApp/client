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
      <v-container fluid>
        <v-layout wrap>
          <v-flex md12>
            <v-text-field
              prepend-icon="event_note"
              v-model="event.name"
              label="Event Name"
            ></v-text-field>
          </v-flex>
          <v-flex md6>
            <DatetimePicker
              v-model="event.startDate"
              format="YYYY-MM-DD"
            ></DatetimePicker>
          </v-flex>
          <v-flex md6>
            <DatetimePicker
              v-model="event.endDate"
              format="YYYY-MM-DD"
              :minTime="minTime"
              :minDate="minDate"
            ></DatetimePicker>
          </v-flex>
          <v-flex md4>
            <v-tabs slider-color="#1976d2">
              <v-tab ripple>
                event details
              </v-tab>
              <v-tab-item>
                <v-layout row>
                  <v-flex md12>
                    <v-textarea
                      prepend-icon="subject"
                      solo
                      no-resize
                      label="More details..."
                      v-model="event.description"
                    ></v-textarea>
                    <genre-select v-model="event.genres"></genre-select>
                  </v-flex>
                </v-layout>
              </v-tab-item>
            </v-tabs>
          </v-flex>
          <v-flex md8 pl-4>
            <v-tabs slider-color="#1976d2">
              <v-tab ripple>
                lineup
              </v-tab>
              <v-tab ripple>
                find bands
              </v-tab>
              <v-tab-item :transition="false" :reverse-transition="false">
                <lineup v-model="event.requests"></lineup>
              </v-tab-item>
              <v-tab-item :transition="false" :reverse-transition="false">
                <find-bands v-model="event.requests"></find-bands>
              </v-tab-item>
            </v-tabs>
          </v-flex>
        </v-layout>
      </v-container>
    </v-form>
  </v-card>
</template>

<script>
import { NEW_EVENT, UPDATE_EVENT } from "../../store/actions.type";
import GenreSelect from "../GenreSelect";
import Lineup from "./Lineup";
import FindBands from "./FindBands";
import DatetimePicker from "../DatetimePicker";
import { START_PROGRESS, STOP_PROGRESS } from "../../store/mutations.type";
import moment from "moment";

export default {
  components: {
    GenreSelect,
    Lineup,
    FindBands,
    DatetimePicker
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
      event: this.bindedEvent,
      startTimes: []
    };
  },
  beforeMount: function() {
    for (let i = 0; i < 24; i++) {
      this.startTimes.push(i + ":00", i + ":30");
    }
  },
  computed: {
    minTime: function() {
      return moment(this.event.startDate).format("H:mm");
    },
    minDate: function() {
      return moment(this.event.startDate).format("YYYY-MM-DD");
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
