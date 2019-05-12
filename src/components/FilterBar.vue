<template>
  <v-toolbar dense class="mb-1">
    <v-text-field
      @input="debouncedFilter()"
      v-model="search"
      hide-details
      solo
      label="Search..."
      prepend-icon="search"
    ></v-text-field>
    <v-divider vertical></v-divider>
    <v-menu
      ref="startDateMenu"
      v-model="startDateMenu"
      :close-on-content-click="false"
      :nudge-right="40"
      lazy
      transition="scale-transition"
      offset-y
      full-width
      min-width="290px"
    >
      <template v-slot:activator="{ on }">
        <v-btn flat large class="pa-1" v-on="on">
          {{ startDate || "START DATE" }}
          <v-icon class="ml-5">arrow_drop_down</v-icon>
        </v-btn>
      </template>
      <v-date-picker v-model="startDate" no-title scrollable>
        <v-spacer></v-spacer>
        <v-btn flat color="primary" @click="cancelStartDate()">Cancel</v-btn>
        <v-btn flat color="primary" @click="chooseStartDate()">OK</v-btn>
      </v-date-picker>
    </v-menu>
    <v-divider vertical></v-divider>
    <v-menu
      ref="endDateMenu"
      v-model="endDateMenu"
      :close-on-content-click="false"
      :nudge-right="40"
      lazy
      transition="scale-transition"
      offset-y
      full-width
      min-width="290px"
    >
      <template v-slot:activator="{ on }">
        <v-btn flat large class="pa-1" v-on="on">
          {{ endDate || "END DATE" }}
          <v-icon class="ml-5">arrow_drop_down</v-icon>
        </v-btn>
      </template>
      <v-date-picker :min="startDate" v-model="endDate" no-title scrollable>
        <v-spacer></v-spacer>
        <v-btn flat color="primary" @click="cancelEndDate()">Cancel</v-btn>
        <v-btn flat color="primary" @click="chooseEndDate()">OK</v-btn>
      </v-date-picker>
    </v-menu>
    <v-divider vertical></v-divider>
    <v-flex md3 class="pa-0">
      <v-select
        small-chips
        dense
        v-model="selectedGenres"
        chips
        multiple
        :items="genres"
        solo
        label="Genres"
        hide-details
        @change="debouncedFilter()"
      >
        <template v-slot:selection="{ item, index }">
          <v-chip v-if="index === 0">
            <span>{{ item }}</span>
          </v-chip>
          <span v-if="index === 1" class="grey--text caption"
            >(+{{ selectedGenres.length - 1 }} others)</span
          >
        </template>
      </v-select>
    </v-flex>
  </v-toolbar>
</template>
<script>
import _ from "lodash";
import moment from "moment";
import { FETCH_FEED } from "../store/actions.type.js";

export default {
  data: function() {
    return {
      startDateMenu: false,
      endDateMenu: false,
      startDate: null,
      endDate: null,
      selectedGenres: [],
      genres: [
        "Pop",
        "Rock",
        "Metal",
        "Jazz",
        "Progressive Rock",
        "Electronic",
        "House",
        "EDM"
      ],
      search: ""
    };
  },
  methods: {
    chooseStartDate() {
      (this.startDateMenu = false), (this.endDateMenu = true);
    },
    chooseEndDate() {
      this.endDateMenu = false;
      this.debouncedFilter();
    },
    cancelStartDate() {
      this.startDateMenu = false;
      this.startDate = null;
      this.endDate = null;
      this.debouncedFilter();
    },
    cancelEndDate() {
      this.endDateMenu = false;
      this.endDate = null;
      this.debouncedFilter();
    },
    filter() {
      let filterData = {
        lowerDateLimit: moment(this.startDate),
        higherDateLimit: moment(this.endDate),
        genres: this.selectedGenres,
        name: this.search
      };

      this.$store.dispatch(FETCH_FEED, filterData);
    }
  },
  created: function() {
    this.debouncedFilter = _.debounce(this.filter, 500);
  }
};
</script>
