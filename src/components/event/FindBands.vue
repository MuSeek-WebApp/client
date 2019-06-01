<template>
  <v-layout wrap>
    <v-flex md6>
      <v-text-field
        v-model="nameInput"
        prepend-icon="search"
        label="Band Name"
        @input="findByName"
      ></v-text-field>
    </v-flex>
    <v-flex md6>
      <genre-select
        :no-validate="true"
        v-model="genresInput"
        @input="findByGenres"
      ></genre-select>
    </v-flex>
    <v-flex md12>
      <requests-table :requests="requests" :sortable="true"></requests-table>
    </v-flex>
  </v-layout>
</template>

<script>
import { FIND_BANDS } from "@/store/actions.type";
import { createNamespacedHelpers } from "vuex";
import RequestsTable from "./RequestsTable";
import GenreSelect from "../GenreSelect";

const { mapState, mapActions } = createNamespacedHelpers("band");

export default {
  name: "FindBands",
  props: ["value"],
  components: {
    GenreSelect,
    RequestsTable
  },
  data: function() {
    return {
      nameInput: "",
      genresInput: []
    };
  },
  methods: {
    ...mapActions([FIND_BANDS]),
    findByName: function(name) {
      this.nameInput = name;
      this.findBands({ name: name, genres: this.genresInput });
    },
    findByGenres: function(genres) {
      if (genres.length === 0) {
        this.findBands({ name: this.nameInput });
      } else {
        this.genresInput = genres;
        this.findBands({ genres: genres });
      }
    },
    addRequest(request) {
      this.value.push({
        band: request.band,
        status: "WAITING_FOR_BAND_APPROVAL"
      });
    }
  },
  computed: {
    ...mapState(["filteredBands"]),
    bandsExists() {
      return this.value.map(request => {
        const { _id } = request.band;
        return _id;
      });
    },
    requests() {
      return this.filteredBands
        .filter(band => {
          const { _id } = band;
          for (const id of this.bandsExists) {
            if (id === _id) {
              return false;
            }
          }
          return true;
        })
        .map(band => {
          return {
            band: band,
            actions: [
              {
                icon: "add_circle_outline",
                color: "success lighten-1",
                tooltip: "Add",
                method: this.addRequest
              }
            ]
          };
        });
    }
  }
};
</script>

<style scoped></style>
