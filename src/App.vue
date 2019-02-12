<template>
  <v-app>
    <router-view/>
    <v-footer class="pa-2">
    <v-spacer></v-spacer>
    <div>&copy; {{ new Date().getFullYear() }}</div>
  </v-footer>
  </v-app>
</template>

<script>
export default {
  name: "app"
};
</script>
