<template>
  <v-card>
    <v-toolbar>
      <v-btn icon @click="$emit('dialog-close')">
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
        </v-layout>
      </v-container>
    </v-form>
  </v-card>
</template>

<script>
import { SAVE_EVENT } from "../store/actions.type";
export default {
  data: function() {
    return {
      startDatePicker: false,
      endDatePicker: false,
      event: {
        name: "",
        startDate: "",
        endDate: "",
        startTime: "0:00",
        endTime: "0:00"
      },

      startTimes: []
    };
  },
  beforeMount: function() {
    for (let i = 0; i < 24; i++) {
      this.startTimes.push(i + ":00", i + ":30");
    }
  },
  computed: {
    endTimes: function() {
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
    }
  },
  methods: {
    save() {
      this.$store
        .dispatch(SAVE_EVENT, this.event)
        .then(() => {
          this.$emit("dialog-close");
        })
        .catch(() => {});
    }
  }
};
</script>
