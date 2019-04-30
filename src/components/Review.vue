<template>
  <v-card class="my-2" v-bind:color="colour" dark>
    <v-card-text class="headline font-weight-bold" v-text="review.description"></v-card-text>
    <v-card-actions>
      <v-list-tile class="grow">
        <v-list-tile-avatar color="grey darken-3">
          <v-img class="elevation-6" :src="review.photo"></v-img>
        </v-list-tile-avatar>
        <v-list-tile-content>
          <v-list-tile-title>
            <router-link
              :to="`/profile/${review.userId}`"
              v-text="review.userName"
              class="ref"
            ></router-link>
          </v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile>
        <v-rating
          color="yellow darken-1"
          background-color="yellow darken-3"
          half-increments
          readonly
          v-bind:value="review.stars"
        ></v-rating>
      </v-list-tile>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  computed: {
    color: function() {
      return this.colors[Math.floor(Math.random() * this.colors.length)];
    }
  },
  props: ["review", "colour"]
};
</script>

<style>
.ref {
  color: white;
  text-decoration: none !important;
}
</style>
