<template>
  <v-container class="pa-0">
    <v-layout>
      <v-flex md2>({{ rating || computedRating || 0 }})</v-flex>
      <v-flex>
        <v-rating
          :value="rating || computedRating || 0"
          dense
          readonly
          background-color="orange lighten-3"
          color="orange"
          small
        ></v-rating>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  props: ["rating", "reviews"],
  computed: {
    computedRating() {
      return this.reviews
        ? this.reviews.reduce((a, b) => a + (b["stars"] || 0), 0) /
            this.reviews.length
        : 0;
    }
  }
};
</script>
