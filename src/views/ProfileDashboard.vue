<template>
  <v-container fill-height fluid grid-list-xl class="background">
    <v-layout justify-center>
      <v-flex xs10>
        <v-card color="rgb(212, 215, 221, 0.6)" class="pa-3">
          <v-layout>
            <v-flex xs12 md6 class="v-card-profile">
              <profile-details
                :profile="profileData"
                :is-current-user="profileData._id === getUserUid"
                :key="profileData._id"
                v-if="profileData.type"
              ></profile-details>
            </v-flex>
            <v-flex xs12 md6>
              <all-reviews
                :reviews="profileData.reviews"
                :key="profileData._id"
                v-if="profileData.reviews"
              ></all-reviews>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import ProfileDetails from "../components/ProfileDetails";
import AllReviews from "../components/AllReviews";
import { GET_PROFILE } from "@/store/actions.type";
import { createNamespacedHelpers, mapGetters } from "vuex";
const { mapState, mapActions } = createNamespacedHelpers("profile");

export default {
  data: () => ({
    colors: ["blue", "purple", "red"]
  }),
  created() {
    this.getProfile(this.$route.params.userId);
  },
  computed: {
    ...mapGetters(["getUserUid"]),
    ...mapState(["profileData"])
  },
  methods: {
    ...mapActions([GET_PROFILE])
  },
  components: {
    ProfileDetails,
    AllReviews
  }
};
</script>

<style scoped>
.background {
  background-image: url(../../public/img/background/pink4.jpg);
  background-size: 100%;
  max-width: 100%;
}
</style>
