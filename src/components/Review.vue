<template>
  <v-container class="py-2">
    <v-list-tile>
      <v-list-tile-avatar>
        <v-img class="elevation-6" :src="review.photo"></v-img>
      </v-list-tile-avatar>
      <v-list-tile-content class="maxHeight">
        <v-list-tile-title>
          <router-link
            :to="`/profile/${review.userId}`"
            v-text="review.userName"
            class="ref font-weight-bold"
          ></router-link>
          <v-icon v-if="review.like" class="ml-2">thumb_up</v-icon>
          <v-icon v-else class="ml-2">thumb_down</v-icon>
        </v-list-tile-title>
        <v-list-tile-sub-title>
          <span v-text="date"></span>
          @
          <router-link
            :to="`/event/${review.eventId}`"
            v-text="review.eventName"
            class="font-weight-bold ref"
          ></router-link>
        </v-list-tile-sub-title>
        <v-list-tile-sub-title
          v-text="review.description"
        ></v-list-tile-sub-title>
      </v-list-tile-content>

      <v-list-tile-action>
        <v-btn icon ripple>
          <v-icon v-if="isCurrentUserReview">delete</v-icon>
        </v-btn>
      </v-list-tile-action>
    </v-list-tile>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["getUserUid"]),
    isCurrentUserReview: function() {
      return this.getUserUid === this.review.userId;
    },
    date: function() {
      return new Date(this.review.timestamp).toDateString();
    }
  },
  props: ["review"]
};
</script>

<style>
.ref {
  color: black;
  text-decoration: none !important;
}

.maxHeight {
  height: 150%;
}

.elevation-6 {
  background-color: dimgrey;
}
</style>
