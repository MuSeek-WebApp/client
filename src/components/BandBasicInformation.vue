<template>
  <v-form v-model="valid">
    <v-container>
      <v-flex md4>
        <v-text-field
          :rules="bandNameRules"
          required
          label="Band/Artist Name"
        ></v-text-field>
      </v-flex>
      <v-textarea
        required
        no-resize
        box
        :counter="450"
        label="Band/Artist Description"
      ></v-textarea>
      <v-flex md3>
        <v-select
          required
          solo
          label="Select Country"
          :items="countries"
        ></v-select>
      </v-flex>
      <v-flex md8>
        <v-select
          required
          solo
          deletable-chips
          chips
          clearable
          multiple
          label="Select Your Genres"
          :items="genres"
        ></v-select>
      </v-flex>
      <v-layout wrap>
        <v-flex md12 xs12>
          <h4>Contact Details</h4>
        </v-flex>
        <v-flex md6 xs12>
          <v-text-field
            :rules="firstNameRules"
            required
            label="First Name"
          ></v-text-field>
        </v-flex>
        <v-flex md6 xs12>
          <v-text-field
            :rules="lastNameRules"
            required
            label="Last Name"
          ></v-text-field>
        </v-flex>
        <v-flex md6 xs12>
          <v-text-field
            :rules="emailRules"
            required
            label="E-Mail"
          ></v-text-field>
        </v-flex>
        <v-flex md6 xs12>
          <v-text-field
            :rules="phoneNumberRules"
            required
            label="Phone Number"
          ></v-text-field>
        </v-flex>
        <v-flex>
          <v-btn @click="previusStep" color="secondary">
            <v-icon>arrow_left</v-icon>Back
          </v-btn>
        </v-flex>
        <v-flex offset-md8>
          <v-btn :disabled="!valid" @click="nextStep" color="primary"
            >Next
            <v-icon>arrow_right</v-icon>
          </v-btn>
        </v-flex>
      </v-layout>
    </v-container>
  </v-form>
</template>

<script>
import { EXTRA_INFO_STEP, ACCOUNT_TYPE_STEP } from "../store/mutations.type";

export default {
  data: () => ({
    valid: false,
    emailRules: [
      v => !!v || "Email is required",
      v => /.+@.+/.test(v) || "E-mail must be valid"
    ],
    phoneNumberRules: [v => !!v || "Phone number is required"],
    bandNameRules: [v => !!v || "Band name is required"],
    firstNameRules: [v => !!v || "First name is required"],
    lastNameRules: [v => !!v || "Last name is required"]
  }),
  computed: {
    countries: function() {
      //Todo: impelemnt getting countries from an api. (https://restcountries.eu)
      return [
        "Israel",
        "United States",
        "United Kingdom",
        "Sweden",
        "Denemark",
        "Saudi Arabia"
      ];
    },
    genres: function() {
      // Todo: implement getting genres from spotify api or something else (https://developer.spotify.com/console/get-available-genre-seeds/)
      return [
        "Pop",
        "Rock",
        "Metal",
        "Jazz",
        "Progressive Rock",
        "Electronic",
        "House",
        "EDM"
      ];
    }
  },
  methods: {
    nextStep: function() {
      this.$store.commit(EXTRA_INFO_STEP);
    },
    previusStep: function() {
      this.$store.commit(ACCOUNT_TYPE_STEP);
    }
  }
};
</script>
