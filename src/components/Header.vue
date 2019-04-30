<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <v-toolbar>
    <v-toolbar-title @click="routeTo('/home')">
      <img src="../../public/img/logo_museek.png" height="75" class="mt-2" />
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-menu offset-y>
      <template v-slot:activator="{ on }">
        <v-btn flat v-on="on">
          <v-icon left color="red">settings</v-icon>
          <span>Settings</span>
        </v-btn>
      </template>

      <v-list>
        <v-list-tile @click="routeTo('/profile/' + uid)">
          <v-icon left>person</v-icon>
          <v-list-tile-title>Profile</v-list-tile-title>
        </v-list-tile>
        <v-list-tile @click="signOut()">
          <v-icon left>exit_to_app</v-icon>
          <v-list-tile-title>Sign out</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>
    <v-toolbar-items> </v-toolbar-items>
  </v-toolbar>
</template>

<script>
import { SIGN_OUT } from "@/store/actions.type";
import { createNamespacedHelpers } from "vuex";
const { mapState } = createNamespacedHelpers("profile");

export default {
  computed: { ...mapState(["uid"]) },
  methods: {
    signOut: async function() {
      await this.$store.dispatch(SIGN_OUT);
      this.$router.push("/login");
    },

    routeTo: function(page) {
      this.$router.push(page);
    }
  }
};
</script>
