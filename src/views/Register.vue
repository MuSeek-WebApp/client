<template>
  <v-container fill-height>
    <v-layout justify-center>
      <v-flex md6>
        <v-stepper :value="step">
          <v-stepper-header>
            <v-stepper-step :complete="step > 1" step="1"
              >Who are you?</v-stepper-step
            >
            <v-divider></v-divider>
            <v-stepper-step :complete="step > 2" step="2"
              >Basic Information</v-stepper-step
            >
            <v-divider></v-divider>
            <v-stepper-step :complete="step > 3" step="3"
              >Extra Information</v-stepper-step
            >
            <v-divider></v-divider>
            <v-stepper-step :complete="step > 4" step="4"
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
              <BandBasicInformation />
            </v-stepper-content>
            <v-stepper-content step="3"></v-stepper-content>
            <v-stepper-content step="4"></v-stepper-content>
          </v-stepper-items>
        </v-stepper>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import BandBasicInformation from "../components/BandBasicInformation.vue";
import { mapGetters } from "vuex";
import { INFO_STEP } from "../store/mutations.type";

export default {
  components: {
    BandBasicInformation
  },
  computed: {
    ...mapGetters({
      step: "currentStep"
    })
  },
  methods: {
    nextStep: function() {
      this.$store.commit(INFO_STEP);
    }
  }
};
</script>
