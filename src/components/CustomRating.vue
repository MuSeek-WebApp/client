<template>
  <v-layout class="font-weight-bold">
    <v-icon>thumb_up_off_alt</v-icon>
    {{ likes }}
    <v-icon class="ml-3">thumb_down_off_alt</v-icon>
    {{ dislikes }}
  </v-layout>
</template>

<script>
import ApiService from "../common/api.service";
export default {
  props: ["userId"],
  data: function() {
    return {
      rating: this.passedRating,
      likes: 0,
      dislike: 0
    };
  },
  async created() {
    if (this.userId) {
      const { data } = await ApiService.get("api/user/rating/" + this.userId);
      this.likes = data[0].likes;
      this.dislikes = data[0].dislikes;
    }
  }
};
</script>
