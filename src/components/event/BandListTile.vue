<template>
  <!--eslint-disable-next-line-->
  <v-list-tile avatar @click="">
    <v-list-tile-avatar>
      <img :src="band.avatar" alt="" />
    </v-list-tile-avatar>

    <v-list-tile-content>
      <v-list-tile-title v-html="band.name"></v-list-tile-title>
      <v-list-tile-sub-title v-html="band.description"></v-list-tile-sub-title>
    </v-list-tile-content>

    <v-list-tile-action v-if="status === 'WAITING_FOR_BUSINESS_APPROVAL'">
      <v-btn icon ripple>
        <v-icon color="green lighten-1">check_circle</v-icon>
      </v-btn>
    </v-list-tile-action>

    <v-list-tile-action v-if="status !== 'DENIED'">
      <v-btn icon ripple>
        <v-icon color="red lighten-1">cancel</v-icon>
      </v-btn>
    </v-list-tile-action>

    <v-list-tile-action>
      <v-btn icon ripple>
        <v-icon color="grey lighten-1">info</v-icon>
      </v-btn>
    </v-list-tile-action>
  </v-list-tile>
</template>

<script>
export default {
  name: "BandListTile",
  props: ["band", "status"]
};
</script>

<style scoped></style>
