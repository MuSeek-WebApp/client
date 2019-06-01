<template>
  <v-app id="app">
    <v-progress-linear
      v-if="showProgress"
      class="ma-0"
      :active="showProgress"
      :indeterminate="isInProgress"
      height="2"
    ></v-progress-linear>
    <Header v-if="isAuthenticated" />
    <router-view></router-view>
    <ErrorSnackbar />
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
import { GET_CURRENT_PROFILE, GET_UID } from "@/store/actions.type";
import { createNamespacedHelpers, mapGetters, mapState } from "vuex";
import Header from "./components/Header.vue";
import ErrorSnackbar from "./components/ErrorSnackbar.vue";

const { mapActions } = createNamespacedHelpers("profile");

export default {
  name: "app",
  components: {
    Header,
    ErrorSnackbar
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
