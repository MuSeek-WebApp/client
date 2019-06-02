<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs1>
        <v-icon x-large>stars</v-icon>
      </v-flex>
      <v-flex xs11>
        <span class="display-1">Reviews</span>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex v-for="review in reviews" :key="review._id" xs12>
        <review :review="review"></review>
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
