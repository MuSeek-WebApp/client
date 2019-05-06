<template>
  <v-app class="background">
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

<style scoped>
.background {
  background-image: url(../public/img/background/pink4_opacity.png);
  background-size: 100%;
  max-width: 100%;
}
</style>

<script>
import { GET_UID, GET_CURRENT_PROFILE } from "@/store/actions.type";
import { createNamespacedHelpers, mapState, mapGetters } from "vuex";
const { mapActions } = createNamespacedHelpers("profile");
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";

export default {
  name: "app",
  components: {
    Header,
    Footer
  },
  async created() {
    await this.getUid();
    await this.getCurrentProfile();
  },
  methods: {
    ...mapActions([GET_UID]),
    ...mapActions([GET_CURRENT_PROFILE])
  },
  computed: {
    ...mapGetters(["isAuthenticated"]),
    ...mapState({
      showProgress: state => state.progress.show,
      isInProgress: state => state.progress.isInProgress
    })
  }
};
</script>
