<template>
  <v-layout>
    <v-flex md8>
      <v-menu
        v-model="datetimePicker"
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
            :value="date"
            :label="label"
            persistent-hint
            prepend-icon="event"
            readonly
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
          :min="minDate"
          no-title
          @input="inputDate($event)"
        ></v-date-picker>
      </v-menu>
    </v-flex>
    <v-flex md4 class="ml-3">
      <v-select
        :value="time"
        :items="times"
        @input="inputTime($event)"
      ></v-select>
    </v-flex>
  </v-layout>
</template>
<script>
import moment from "moment";
export default {
  props: ["value", "minDate", "minTime", "label", "format"],
  data: function() {
    return {
      datetimePicker: false
    };
  },
  computed: {
    times() {
      const times = [];
      let minHour = 0;
      if (!moment(this.date).isAfter(this.minDate) && this.minTime) {
        minHour = parseInt(this.minTime.split(":")[0]);
        if (this.minTime.split(":")[1] === "30") {
          times.push(this.minTime);
          minHour += 1;
        }
      }

      for (let i = minHour; i < 24; i++) {
        times.push(i + ":00", i + ":30");
      }

      return times;
    },
    date() {
      return moment(this.value).format(this.format);
    },
    time() {
      return moment(this.value).format("H:mm");
    }
  },
  methods: {
    inputDate(date) {
      this.emitData(date, this.time);
    },
    inputTime(time) {
      this.emitData(this.date, time);
    },
    emitData(date, time) {
      this.$emit("input", moment(date + " " + time));
      this.datetimePicker = false;
    }
  }
};
</script>
