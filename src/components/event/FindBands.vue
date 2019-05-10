<template>
  <v-layout wrap>
    <v-flex md12>
      <v-text-field
        prepend-icon="search"
        label="Band Name"
        @input="findByName"
      ></v-text-field>
    </v-flex>
    <v-flex md12>
      <RequestsTable :requests="requests" :sortable="true"></RequestsTable>
    </v-flex>
  </v-layout>
</template>

<script>
import { FIND_BANDS } from "@/store/actions.type";
import { createNamespacedHelpers } from "vuex";
import RequestsTable from "./RequestsTable";

const { mapState, mapActions } = createNamespacedHelpers("band");

export default {
  name: "FindBands",
  props: ["value"],
  components: {
    RequestsTable
  },
  methods: {
    ...mapActions([FIND_BANDS]),
    findByName: async function(name) {
      this.findBands(name);
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
