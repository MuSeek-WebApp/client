<template>
  <v-card>
    <v-container fluid>
      <v-layout>
        <v-form>
          <v-container fluid>
            <v-layout row wrap>
              <v-flex md5>
                <v-layout wrap>
                  <v-flex md12>
                    <v-text-field
                      prepend-icon="event_note"
                      v-model="event.name"
                      label="Event Name"
                    ></v-text-field>
                  </v-flex>
                  <v-flex md5 class="pr-2">
                    <DatetimePicker
                      v-model="event.startDate"
                      format="YYYY-MM-DD"
                    ></DatetimePicker>
                  </v-flex>
                  <v-flex md5 class="pl-2">
                    <DatetimePicker
                      v-model="event.endDate"
                      format="YYYY-MM-DD"
                      :minTime="minTime"
                      :minDate="minDate"
                    ></DatetimePicker>
                  </v-flex>
                </v-layout>
              </v-flex>
              <v-flex md7>
                <v-btn color="pink lighten-1" class="white--text" @click="save"
                  >Save</v-btn
                >
                <v-btn color="primary" @click="close">Cancel</v-btn>
              </v-flex>
              <v-flex md5>
                <v-tabs slider-color="#1976d2">
                  <v-tab ripple>event details</v-tab>
                  <v-tab-item>
                    <genre-select v-model="event.genres"></genre-select>
                    <v-textarea
                      prepend-icon="subject"
                      solo
                      auto-grow
                      label="More details..."
                      v-model="event.description"
                    ></v-textarea>
                    <upload-image v-model="event.photos"></upload-image>
                  </v-tab-item>
                </v-tabs>
              </v-flex>
              <v-flex md7>
                <v-tabs slider-color="#1976d2">
                  <v-tab ripple>lineup</v-tab>
                  <v-tab-item>
                    <v-layout wrap>
                      <v-flex md3 class="pr-2">
                        <v-text-field
                          type="number"
                          label="Minimum lineup"
                          prepend-icon="arrow_downward"
                          v-model="event.min_bands_number"
                        ></v-text-field>
                      </v-flex>
                      <v-flex md3 class="pl-2">
                        <v-text-field
                          type="number"
                          label="Maximum lineup"
                          prepend-icon="arrow_upward"
                          v-model="event.max_bands_number"
                        ></v-text-field>
                      </v-flex>
                      <v-flex md12>
                        <lineup v-model="event.requests"></lineup>
                      </v-flex>
                    </v-layout>
                  </v-tab-item>
                </v-tabs>
              </v-flex>
            </v-layout>
          </v-container>
        </v-form>
      </v-layout>
    </v-container>
    <v-dialog v-model="dialog" width="75%">
      <template v-slot:activator="{ on }">
        <v-btn
          large
          fixed
          fab
          bottom
          right
          color="white"
          v-on="on"
          style="opacity:0.8"
        >
          <v-icon color="pink" large>add</v-icon>
        </v-btn>
      </template>
      <find-bands
        v-model="event"
        :key="event._id"
        @close="dialog = false"
        v-if="dialog"
      ></find-bands>
    </v-dialog>
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
import UploadImage from "../UploadImage";

export default {
  components: {
    UploadImage,
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
      startTimes: [],
      dialog: false
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
