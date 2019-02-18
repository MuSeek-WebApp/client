<template>
  <v-toolbar>
    <v-toolbar-title>Museek</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-btn flat>Profile</v-btn>
      <v-btn flat v-on:click="signOut">Sign out</v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
import { SIGN_OUT } from "@/store/actions.type";

export default {
  methods: {
    signOut: function() {
      this.$store.dispatch(SIGN_OUT).then(() => {
        this.$router.push("/login");
      });
    }
  }
};
</script>
