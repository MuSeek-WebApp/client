<template>
  <v-select
    dense
    v-validate="genresRule"
    data-vv-name="geners"
    :error-messages="errors.collect('geners')"
    :value="value"
    @input="$emit('input', $event)"
    required
    deletable-chips
    chips
    clearable
    multiple
    label="Select Your Genres"
    :items="genres"
  ></v-select>
</template>

<script>
export default {
  inject: ["validator"],
  data: () => ({
    genres: [],
    genresRule: {
      required: true
    }
  }),
  created: function() {
    this.$validator = this.validator;
    this.genres = [
      "Pop",
      "Rock",
      "Metal",
      "Jazz",
      "Progressive Rock",
      "Electronic",
      "House",
      "EDM"
    ];
  },
  props: ["value"]
};
</script>
