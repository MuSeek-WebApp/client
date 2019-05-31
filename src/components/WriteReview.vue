<template>
  <v-card>
    <v-card-title class="grey lighten-3">
      <v-flex class="text-md-center subheading font-weight-bold"
        >Your review
      </v-flex>
    </v-card-title>
    <v-divider></v-divider>
    <v-card-text class="text-md-center">
      <v-text-field
        placeholder="Add a review..."
        v-model="value.description"
        :prepend-icon="icon"
      ></v-text-field>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions>
      <v-btn @click="cancel()">cancel</v-btn>
      <v-spacer></v-spacer>
      <v-btn color="success" @click="save()">save</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "WriteReview",
  props: ["value", "icon", "save", "cancel"]
};
</script>

<style scoped></style>
