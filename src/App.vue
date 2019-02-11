<template>
  <v-app>
    <Login/>
    <v-footer class="pa-2">
    <v-spacer></v-spacer>
    <div>&copy; {{ new Date().getFullYear() }}</div>
  </v-footer>
  </v-app>
</template>

<script>
import Login from "./components/Login.vue";

export default {
  name: "app",
  components: {
    Login
  }
};
</script>
