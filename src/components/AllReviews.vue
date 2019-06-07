<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs1>
        <v-icon x-large>stars</v-icon>
      </v-flex>
      <v-flex xs11>
        <span class="large-text font-weight-bold">Reviews</span>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex v-for="review in reviews" :key="review._id" xs12>
        <review :review="review"></review>
      </v-flex>
      <v-flex offset-xs1 v-if="reviews.length === 0">
        <span class="font-size-medium">
          There are no reviews yet.
        </span>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Review from "./Review";

export default {
  components: {
    Review
  },
  data: () => ({
    fab: false
  }),
  computed: {
    avgStars: function() {
      return (
        this.reviews.reduce((acc, item) => acc + item.stars, 0) /
        this.reviews.length
      ).toFixed(2);
    }
  },
  props: ["reviews"]
};
</script>

<style scoped>
.large-text {
  font-size: 1.5vw;
}
</style>
