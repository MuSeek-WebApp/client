<template>
  <v-layout wrap class="find-bands">
    <v-flex md12>
      <v-text-field
        prepend-icon="search"
        label="Band Name"
        @input="findByName"
      ></v-text-field>
    </v-flex>
    <v-flex md12>
      <v-data-table :headers="headers" :items="bands" class="elevation-1">
        <template v-slot:items="props">
          <td>{{ props.item.name }}</td>
          <td class="text-xs-center">
            <v-chip v-for="genre in props.item.genres" :key="genre">{{
              genre
            }}</v-chip>
          </td>
          <td
            class="text-xs-center"
            v-if="typeof props.item.address === 'undefined'"
          ></td>
          <td class="text-xs-center" v-else>{{ props.item.address.city }}</td>
          <td>
            <v-rating
              class="text-xs-center"
              v-model="props.item.rating"
              color="yellow darken-3"
              background-color="grey darken-1"
              half-increments
              readonly
            ></v-rating>
          </td>
          <td class="btn">
            <v-btn
              small
              round
              depressed
              color="success lighten-1"
              v-on:click="addBand(props.item)"
            >
              add
              <v-icon right>add_circle</v-icon>
            </v-btn>
          </td>
          <td class="btn">
            <v-btn
              small
              round
              depressed
              color="pink lighten-1"
              class="white--text"
            >
              profile
              <v-icon right color="white">person</v-icon>
            </v-btn>
          </td>
        </template>
      </v-data-table>
    </v-flex>
  </v-layout>
</template>

<script>
import { FIND_BANDS } from "@/store/actions.type";
import { createNamespacedHelpers } from "vuex";

const { mapState, mapActions } = createNamespacedHelpers("band");

export default {
  name: "FindBands",
  props: ["value"],
  data: function() {
    return {
      headers: [
        { text: "Name", value: "name", align: "left" },
        { text: "Genres", value: "genres", align: "center" },
        { text: "City", value: "address.city", align: "center" },
        { text: "Rating", value: "rating", align: "center" },
        { sortable: false, width: "1%", class: "btn" },
        { sortable: false, width: "1%", class: "btn" }
      ]
    };
  },
  methods: {
    ...mapActions([FIND_BANDS]),
    findByName: async function(name) {
      this.findBands(name);
    },
    addBand(band) {
      this.value.push({
        band: band,
        status: "WAITING_FOR_BAND_APPROVAL"
      });
    }
  },
  computed: {
    ...mapState(["filteredBands"]),
    bands() {
      return this.filteredBands.filter(band => {
        const { _id } = band;
        for (const id of this.bandsExists) {
          if (id === _id) {
            return false;
          }
        }
        return true;
      });
    },
    bandsExists() {
      return this.value.map(request => {
        const { _id } = request.band;
        return _id;
      });
    }
  }
};
</script>

<style scoped>
.find-bands >>> table.v-table thead td:not(:nth-child(1)),
.find-bands >>> table.v-table tbody td:not(:nth-child(1)),
.find-bands >>> table.v-table thead th:not(:nth-child(1)),
.find-bands >>> table.v-table tbody th:not(:nth-child(1)),
.find-bands >>> table.v-table thead td:first-child,
.find-bands >>> table.v-table tbody td:first-child,
.find-bands >>> table.v-table thead th:first-child,
.find-bands >>> table.v-table tbody th:first-child {
  padding: 0 5px;
}
.find-bands >>> table.v-table .v-btn {
  margin-left: 0;
  margin-right: 0;
}
.find-bands >>> table.v-table .v-btn .v-icon--right {
  margin-left: 5px;
}
table.v-table td >>> .v-rating .v-icon {
  padding: 0 !important;
}
</style>
