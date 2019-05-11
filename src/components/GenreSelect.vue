<template>
  <v-select
    prepend-icon="music_note"
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
import genres from "../common/genres";

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
    this.genres = genres;
  },
  props: ["value"]
};
</script>
