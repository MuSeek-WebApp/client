<template>
  <v-container class="pa-0">
    <v-layout>
      <v-flex md1> ({{ rating || 0 }}) </v-flex>
      <v-flex class="pl-2">
        <v-rating
          :value="rating"
          dense
          readonly
          background-color="orange lighten-3"
          color="orange"
          small
        ></v-rating>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  props: ["rating"]
};
</script>
