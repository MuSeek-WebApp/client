<template>
  <v-sheet>
    <v-container>
      <v-layout wrap>
        <v-flex xs12>
          <v-btn flat icon large class="ma-0" @click="$emit('close')">
            <v-icon>close</v-icon>
          </v-btn>
        </v-flex>
        <v-flex xs6>
          <v-text-field
            v-model="nameInput"
            prepend-icon="search"
            label="Band Name"
            @input="debounceFilter"
          ></v-text-field>
        </v-flex>
        <v-flex xs6>
          <genre-select
            :no-validate="true"
            v-model="genresInput"
            @input="findByGenres"
          ></genre-select>
        </v-flex>
        <v-flex xs12 class="display-1 font-weight-medium grey--text">{{
          nameInput ? "Search Results" : "Similar events also liked"
        }}</v-flex>
        <v-flex xs12>
          <band-cards :bands="bands" @add="addRequest"></band-cards>
        </v-flex>
      </v-layout>
    </v-container>
  </v-sheet>
</template>

<script>
import { FIND_BANDS, SUGGEST_BANDS } from "@/store/actions.type";
import { createNamespacedHelpers } from "vuex";
import GenreSelect from "../GenreSelect";
import BandCards from "./BandCards";
import _ from "lodash";
const { mapState, mapActions } = createNamespacedHelpers("band");

export default {
  name: "FindBands",
  props: ["value"],
  components: {
    BandCards,
    GenreSelect
  },
  data: function() {
    return {
      nameInput: "",
      genresInput: []
    };
  },
  created: function() {
    if (this.notDeniedBandsExists && this.notDeniedBandsExists.length > 0) {
      this.suggestBands({
        bands: this.notDeniedBandsExists
      });
    } else if (this.value.genres && this.value.genres.length > 0) {
      this.suggestBands({
        genres: this.value.genres
      });
    } else {
      this.suggestBands();
    }

    this.debounceFilter = _.debounce(this.findByName, 500);
  },
  methods: {
    ...mapActions([FIND_BANDS, SUGGEST_BANDS]),
    findByName: function() {
      this.findBands({ name: this.nameInput, genres: this.genresInput });
    },
    findByGenres: function(genres) {
      if (genres.length === 0) {
        this.findBands({ name: this.nameInput });
      } else {
        this.genresInput = genres;
        this.findBands({ genres: genres });
      }
    },
    addRequest(band) {
      this.value.requests.push({
        band: band,
        status: "WAITING_FOR_BAND_APPROVAL"
      });

      this.suggestBands({
        bands: this.notDeniedBandsExists
      });
    }
  },
  computed: {
    ...mapState(["filteredBands", "suggestedBands"]),
    notDeniedBandsExists() {
      if (!this.value.requests) {
        return [];
      }
      return this.value.requests
        .filter(request => {
          return request.status !== "DENIED";
        })
        .map(request => {
          const { _id } = request.band;
          return _id;
        });
    },
    bandsExists() {
      if (!this.value.requests) {
        return [];
      }
      return this.value.requests.map(request => {
        const { _id } = request.band;
        return _id;
      });
    },
    bands() {
      if (!this.nameInput && !this.genres) {
        return this.suggestedBands;
      }
      return this.filteredBands.filter(band => {
        const { _id } = band;
        for (const id of this.bandsExists) {
          if (id === _id) {
            return false;
          }
        }
        return true;
      });
    }
  }
};
</script>
