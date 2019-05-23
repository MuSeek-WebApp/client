<template>
  <v-container class="pa-0">
    <v-layout>
      <v-flex md2>({{ rating || 0 }})</v-flex>
      <v-flex>
        <v-rating
          :value="rating || 0"
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
import ApiService from "../common/api.service";
export default {
  props: ["passedRating", "userId"],
  data: function() {
    return {
      rating: this.passedRating
    };
  },
  async created() {
    if (this.userId) {
      const { data } = await ApiService.get("api/user/rating/" + this.userId);
      this.rating = Number(data[0].avgRating.toFixed(1));
    }
  }
};
</script>
