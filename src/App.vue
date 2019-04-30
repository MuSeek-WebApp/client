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
import { GET_UID, GET_CURRENT_PROFILE } from "@/store/actions.type";
import { createNamespacedHelpers, mapState } from "vuex";
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
