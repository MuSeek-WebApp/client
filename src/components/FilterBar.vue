<template>
  <v-toolbar dense class="mb-1">
    <v-text-field
      hide-details
      solo
      label="Search..."
      prepend-icon="search"
    ></v-text-field>
    <v-divider vertical></v-divider>
    <v-btn flat large class="pa-1">
      Start Date
      <v-icon class="ml-5">arrow_drop_down</v-icon>
    </v-btn>
    <v-divider vertical></v-divider>
    <v-divider vertical></v-divider>
    <v-btn flat large class="pa-1">
      End Date
      <v-icon class="ml-5">arrow_drop_down</v-icon>
    </v-btn>
    <v-divider vertical></v-divider>
    <v-btn flat large class="pa-1">
      Genres
      <v-icon class="ml-5">arrow_drop_down</v-icon>
    </v-btn>
  </v-toolbar>
</template>
<script>
export default {};
</script>
