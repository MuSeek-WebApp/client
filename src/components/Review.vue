<template>
  <v-container class="py-2">
    <v-list-tile>
      <v-list-tile-avatar>
        <v-img class="elevation-6" :src="review.photo"></v-img>
      </v-list-tile-avatar>
      <v-list-tile-content>
        <v-list-tile-title>
          <v-layout row>
            <v-flex xs7>
              <router-link
                :to="`/profile/${review.userId}`"
                v-text="review.userName"
                class="ref"
              ></router-link>
            </v-flex>
            <v-flex xs5 class="py-1">
              <v-rating
                color="yellow darken-1"
                background-color="yellow darken-3"
                half-increments
                readonly
                :value="review.stars"
              ></v-rating>
            </v-flex>
          </v-layout>
        </v-list-tile-title>
        <v-list-tile-sub-title
          v-text="review.description"
        ></v-list-tile-sub-title>
      </v-list-tile-content>

      <v-list-tile-action>
        <v-btn icon ripple>
          <v-icon>delete</v-icon>
        </v-btn>
      </v-list-tile-action>
    </v-list-tile>
  </v-container>
</template>

<script>
export default {
  computed: {},
  props: ["review"]
};
</script>

<style>
.ref {
  color: black;
  text-decoration: none !important;
}

.elevation-6 {
  background-color: dimgrey;
}
</style>
