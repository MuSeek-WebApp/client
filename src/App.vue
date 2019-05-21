<template>
  <v-app>
    <v-progress-linear
      v-if="showProgress"
      class="ma-0"
      :active="showProgress"
      :indeterminate="isInProgress"
      height="2"
    ></v-progress-linear>
    <Header v-if="isAuthenticated" />
    <router-view />
    <Footer />
  </v-app>
</template>

<style>
.background-image {
  background-image: url(../public/img/background/pink4_opacity.png);
  background-size: 100%;
  max-width: 100%;
}
</style>

<script>
import { mapState, mapGetters } from "vuex";
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";

export default {
  name: "app",
  components: {
    Header,
    Footer
  },
  async created() {},
  computed: {
    ...mapGetters(["isAuthenticated"]),
    ...mapState({
      showProgress: state => state.progress.show,
      isInProgress: state => state.progress.isInProgress
    })
  }
};
</script>
