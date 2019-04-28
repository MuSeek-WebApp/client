<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout justify-center>
      <v-flex xs12 md4 class="v-card-profile">
        <profile-details :profile="profileData"></profile-details>
      </v-flex>
      <v-flex xs12 md8>
        <v-layout row wrap>
          <v-flex v-for="n in profileData.reviews.length" :key="n" xs12 md6>
            <review :review="profileData.reviews[n - 1]"></review>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import ProfileDetails from "../components/ProfileDetails";
import Review from "../components/Review";
import { GET_PROFILE } from "@/store/actions.type";
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions } = createNamespacedHelpers("profile");

export default {
  created() {
    this.getProfile(this.$route.params.userId);
  },
  computed: {
    ...mapState(["uid"]),
    ...mapState(["profileData"])
  },
  methods: {
    ...mapActions([GET_PROFILE])
  },
  components: {
    ProfileDetails,
    Review
  }
};
</script>

<style scoped></style>
