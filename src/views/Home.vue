<template>
  <!--<BusinessDashboard></BusinessDashboard> -->
  <ArtistDashboard></ArtistDashboard>
</template>

<script>
import BusinessDashboard from "./BusinessDashboard.vue";
import ArtistDashboard from "./ArtistDashboard.vue";

export default {
  name: "Home",
  components: {
    BusinessDashboard,
    ArtistDashboard
  }
};
</script>
