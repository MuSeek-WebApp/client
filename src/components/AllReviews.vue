<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs1>
        <v-icon x-large>stars</v-icon>
      </v-flex>
      <v-flex xs5>
        <span class="large-text font-weight-bold">Reviews</span>
      </v-flex>
      <v-flex offset-xs2 xs4>
        <v-select :items="dates" v-model="filterDate" class="py-0"></v-select>
      </v-flex>
    </v-layout>
    <v-layout row wrap style="height: 100vh; overflow-y: auto;">
      <v-flex v-for="review in filteredReviews" :key="review._id" xs12>
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
    fab: false,
    dates: [
      "Since the beginning",
      "Last 24 hours",
      "Last Week",
      "Last Month",
      "Last Year"
    ],
    filterDate: "Since the beginning"
  }),
  computed: {
    filteredReviews: function() {
      if (this.filterDate === this.dates[1]) {
        return this.reviews.filter(
          review =>
            new Date(review.timestamp) > new Date() - 24 * 60 * 60 * 1000
        );
      } else if (this.filterDate === this.dates[2]) {
        return this.reviews.filter(
          review =>
            new Date(review.timestamp) > new Date() - 7 * 24 * 60 * 60 * 1000
        );
      } else if (this.filterDate === this.dates[3]) {
        return this.reviews.filter(
          review =>
            new Date(review.timestamp) > new Date() - 30 * 24 * 60 * 60 * 1000
        );
      } else if (this.filterDate === this.dates[4]) {
        return this.reviews.filter(
          review =>
            new Date(review.timestamp) > new Date() - 365 * 24 * 60 * 60 * 1000
        );
      }
      return this.reviews;
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
