<template>
  <v-app>
    <v-progress-linear
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

<script>
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
import { mapState } from "vuex";

export default {
  name: "app",
  components: {
    Header,
    Footer
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    },
    ...mapState({
      showProgress: state => state.progress.show,
      isInProgress: state => state.progress.isInProgress
    })
  }
};
</script>
