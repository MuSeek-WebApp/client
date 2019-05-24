<template>
  <v-container>
    <v-layout row wrap justify-center>
      <span class="display-1" v-text="avgStars"></span>
    </v-layout>
    <v-layout row wrap justify-center>
      <v-rating
        color="yellow darken-1"
        background-color="yellow darken-3"
        half-increments
        readonly
        :value="avgStars"
      ></v-rating>
    </v-layout>
    <v-layout row wrap>
      <v-flex v-for="review in reviews" :key="review.description" xs12>
        <review :review="review"></review>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex offset-xs11 xs1>
        <v-btn v-model="fab" color="pink" dark fab>
          <v-icon>add</v-icon>
        </v-btn>
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
