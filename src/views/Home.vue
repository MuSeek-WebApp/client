<template>
  <component :is="userComponent"></component>
</template>

<script>
import BusinessDashboard from "./BusinessDashboard.vue";
import ArtistDashboard from "./ArtistDashboard.vue";
import { mapGetters } from "vuex";
export default {
  name: "Home",
  components: {
    BusinessDashboard,
    ArtistDashboard
  },
  computed: {
    ...mapGetters(["getUserType"]),
    userComponent() {
      return this.getUserType === "business"
        ? BusinessDashboard
        : ArtistDashboard;
    }
  }
};
</script>
