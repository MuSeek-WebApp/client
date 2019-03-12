<template>
  <v-select
    dense
    v-validate="countryRule"
    data-vv-name="country"
    :error-messages="errors.collect('country')"
    :value="value"
    @input="$emit('input', $event)"
    required
    label="Select Country"
    :items="countries"
  ></v-select>
</template>

<script>
export default {
  inject: ["validator"],
  data: () => ({
    countries: [],
    countryRule: {
      required: true
    }
  }),
  created: function() {
    this.$validator = this.validator;
    this.countries = [
      "Israel",
      "United States",
      "United Kingdom",
      "Sweden",
      "Denemark",
      "Saudi Arabia"
    ];
  },
  props: ["value"]
};
</script>
