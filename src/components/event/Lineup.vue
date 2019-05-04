<template>
  <v-list two-line subheader class="scroll-y">
    <template v-if="approved.length">
      <v-list-group value="Expands">
        <template v-slot:activator>
          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-title
                >Approved ({{ approved.length }})</v-list-tile-title
              >
            </v-list-tile-content>
          </v-list-tile>
        </template>

        <band-list-tile
          v-for="band in approved"
          :key="band.name"
          :band="band"
          :status="'APPROVED'"
        ></band-list-tile>
      </v-list-group>

      <v-divider></v-divider>
    </template>

    <template v-if="waitingForBusiness.length">
      <v-list-group>
        <template v-slot:activator>
          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-title
                >Waiting For Your Approval ({{
                  waitingForBusiness.length
                }})</v-list-tile-title
              >
            </v-list-tile-content>
          </v-list-tile>
        </template>

        <band-list-tile
          v-for="band in waitingForBusiness"
          :key="band.name"
          :band="band"
          :status="'WAITING_FOR_BUSINESS_APPROVAL'"
        ></band-list-tile>
      </v-list-group>

      <v-divider></v-divider>
    </template>

    <template v-if="waitingForBand.length">
      <v-list-group>
        <template v-slot:activator>
          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-title
                >Waiting For Their Approval ({{
                  waitingForBand.length
                }})</v-list-tile-title
              >
            </v-list-tile-content>
          </v-list-tile>
        </template>

        <band-list-tile
          v-for="band in waitingForBand"
          :key="band._id"
          :band="band"
          :status="'WAITING_FOR_BAND_APPROVAL'"
        ></band-list-tile>
      </v-list-group>

      <v-divider></v-divider>
    </template>

    <template v-if="denied.length">
      <v-list-group>
        <template v-slot:activator>
          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-title
                >Denied ({{ denied.length }})</v-list-tile-title
              >
            </v-list-tile-content>
          </v-list-tile>
        </template>

        <band-list-tile
          v-for="band in denied"
          :key="band.name"
          :band="band"
          :status="'DENIED'"
        ></band-list-tile>
      </v-list-group>
    </template>
  </v-list>
</template>

<script>
import BandListTile from "./BandListTile";

export default {
  name: "Lineup",
  props: ["value"],
  components: {
    BandListTile
  },
  methods: {
    filterByStatus: function(requests, status) {
      return requests
        .filter(request => {
          return request.status === status;
        })
        .map(request => {
          return request.band;
        });
    }
  },
  computed: {
    approved: function() {
      return this.filterByStatus(this.value, "APPROVED");
    },
    waitingForBand: function() {
      return this.filterByStatus(this.value, "WAITING_FOR_BAND_APPROVAL");
    },
    waitingForBusiness: function() {
      return this.filterByStatus(this.value, "WAITING_FOR_BUSINESS_APPROVAL");
    },
    denied: function() {
      return this.filterByStatus(this.value, "DENIED");
    }
  }
};
</script>

<style scoped>
.v-list {
  max-height: 450px;
}
</style>
