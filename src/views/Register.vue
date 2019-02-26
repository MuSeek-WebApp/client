<template>
  <v-container fill-height>
    <v-layout justify-center>
      <v-flex md6>
        <v-stepper v-model="step">
          <v-stepper-header>
            <v-stepper-step :editable="step > 1" :complete="step > 1" step="1"
              >Who are you?</v-stepper-step
            >
            <v-divider></v-divider>
            <v-stepper-step :editable="step > 2" :complete="step > 2" step="2"
              >Basic Information</v-stepper-step
            >
            <v-divider></v-divider>
            <v-stepper-step :editable="step > 3" :complete="step > 3" step="3"
              >Extra Information</v-stepper-step
            >
            <v-divider></v-divider>
            <v-stepper-step :editable="step > 4" :complete="step > 4" step="4"
              >Confirm Registeration</v-stepper-step
            >
          </v-stepper-header>
          <v-stepper-items>
            <v-stepper-content step="1">
              <v-card>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn v-on:click="nextStep">Band or Artist</v-btn>
                  <v-spacer></v-spacer>
                  <v-btn v-on:click="nextStep">Business Owner</v-btn>
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-stepper-content>
            <v-stepper-content step="2">
              <v-form>
                <v-container>
                  <v-flex md4>
                    <v-text-field label="Band/Artist Name"></v-text-field>
                  </v-flex>
                  <v-textarea
                    no-resize
                    box
                    :counter="450"
                    label="Band/Artist Description"
                  ></v-textarea>
                  <v-flex md3>
                    <v-select
                      solo
                      label="Select Country"
                      :items="countries"
                    ></v-select>
                  </v-flex>
                  <v-flex md8>
                    <v-select
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
                      <v-text-field label="First Name"></v-text-field>
                    </v-flex>
                    <v-flex md6 xs12>
                      <v-text-field label="Last Name"></v-text-field>
                    </v-flex>
                    <v-flex md6 xs12>
                      <v-text-field label="E-Mail"></v-text-field>
                    </v-flex>
                    <v-flex md6 xs12>
                      <v-text-field label="Phone Number"></v-text-field>
                    </v-flex>
                    <v-flex offset-md10>
                      <v-btn v-on:click="nextStep" color="primary"
                        >Next<v-icon>arrow_right_alt</v-icon></v-btn
                      >
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-form>
            </v-stepper-content>
            <v-stepper-content step="3"> </v-stepper-content>
            <v-stepper-content step="4"></v-stepper-content>
          </v-stepper-items>
        </v-stepper>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    step: 1
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
      this.step++;
    }
  }
};
</script>
