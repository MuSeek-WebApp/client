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

const { mapActions } = createNamespacedHelpers("profile");

export default {
  name: "app",
  components: {
    Header
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
