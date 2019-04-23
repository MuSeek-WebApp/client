<template>
  <v-container fill-height class="background">
    <v-layout justify-space-around align-center fill-height>
      <v-flex md10>
        <v-card fill-height class="mx-5 pa-4">
          <v-layout align-center justify-center row fill-height>
            <v-flex md4 class="pa-2">
              <img class="banner" src="../../public/img/banner.png" />
              <v-divider></v-divider>
              <v-form v-model="userInformationFormValidation">
                <v-layout wrap class="my-3">
                  <!-- first name -->
                  <v-flex md6 class="px-1">
                    <v-text-field
                      prepend-icon="person"
                      v-validate="validationRules.nameRule"
                      data-vv-name="first name"
                      :error-messages="errors.collect('first name')"
                      v-model="userData.contactDetails.firstName"
                      label="First name"
                    ></v-text-field>
                  </v-flex>
                  <!-- last lame -->
                  <v-flex md6 class="px-1">
                    <v-text-field
                      v-validate="validationRules.nameRule"
                      data-vv-name="last name"
                      :error-messages="errors.collect('last name')"
                      v-model="userData.contactDetails.lastName"
                      label="Last name"
                    ></v-text-field>
                  </v-flex>
                  <!-- e-mail -->
                  <v-flex md12 class="px-1">
                    <v-text-field
                      prepend-icon="email"
                      v-validate="validationRules.emailRule"
                      data-vv-name="e-mail"
                      :error-messages="errors.collect('e-mail')"
                      v-model="userData.contactDetails.email"
                      label="E-mail"
                    ></v-text-field>
                  </v-flex>
                  <!-- phone number -->
                  <v-flex md12 class="px-1">
                    <v-text-field
                      prepend-icon="phone"
                      v-validate="validationRules.phoneNumberRule"
                      data-vv-name="phone number"
                      :error-messages="errors.collect('phone number')"
                      v-model="userData.contactDetails.phoneNumber"
                      label="Phone number"
                    ></v-text-field>
                  </v-flex>
                  <!-- password -->
                  <v-flex md6 class="px-1">
                    <v-text-field
                      prepend-icon="lock"
                      v-validate="validationRules.passwordRule"
                      data-vv-name="password"
                      :error-messages="errors.collect('password')"
                      v-model="password"
                      label="Password"
                      type="password"
                    ></v-text-field>
                  </v-flex>
                  <!-- confirm password -->
                  <v-flex md6 class="px-1">
                    <v-text-field
                      v-validate="confirmPasswordRule"
                      data-vv-name="confirm"
                      :error-messages="errors.collect('confirm')"
                      v-model="confirmPassword"
                      label="Confirm"
                      type="password"
                    ></v-text-field>
                  </v-flex>
                </v-layout>
              </v-form>
            </v-flex>
            <v-divider vertical></v-divider>
            <v-flex md8 class="pa-2"> </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<style scoped>
.background {
  background-image: url(../../public/img/background/pink4.jpg);
  background-size: 100%;
  max-width: 100%;
}
.banner {
  height: 100px;
}
/* .registration-form {
  transition: width 2s;
  transition: height 2s;
} */
.v-card {
  background-color: rgba(250, 245, 245, 0.9);
  max-height: 550px;
}
/* .v-card {
  background-color: rgba(0, 0, 0, 0);
  max-height: 400px;
  overflow-y: scroll;
} */
</style>

<script>
import { REGISTER } from "../store/actions.type";
import { START_PROGRESS, STOP_PROGRESS } from "../store/mutations.type";
import GenreSelect from "../components/GenreSelect";
import CountrySelect from "../components/CountrySelect";
import BandMembersList from "../components/BandMembersList";

export default {
  components: {
    GenreSelect,
    CountrySelect,
    BandMembersList
  },
  $_veeValidate: {
    validator: "new"
  },
  provide: function() {
    return {
      validator: this.$validator
    };
  },
  data: () => ({
    step: 1,
    userInformationFormValidation: false,
    extraInformationFormValidation: false,
    userData: {
      type: {
        band: true
      },
      contactDetails: {
        firstName: "",
        lastName: "",
        phoneNumber: "",
        email: ""
      },
      name: "",
      description: "",
      bandMembers: [],
      selectedGenres: [],
      address: {
        country: "",
        city: "",
        streetAddress: ""
      }
    },
    password: "",
    confirmPassword: "",
    validationRules: {
      nameRule: {
        required: true,
        max: 20,
        min: 3
      },
      emailRule: {
        required: true,
        email: true
      },
      phoneNumberRule: {
        required: true,
        regex: /^(\(?\+?[0-9]*\)?)?[0-9_\- \\(\\)]*$/
      },
      passwordRule: {
        required: true,
        max: 15,
        min: 8
      },
      descriptionRule: {
        required: true,
        max: 400
      },
      cityRule: {
        required: true,
        alpha_spaces: true
      },
      streetAddressRule: {
        required: true
      }
    }
  }),
  computed: {
    confirmPasswordRule: function() {
      return {
        required: true,
        is: this.password
      };
    }
  },
  methods: {
    nextStep: function() {
      this.$validator.validate().then(() => {
        // if (this.userInformationFormValidation) {
        if (true) {
          this.$validator.reset();
          // Todo: Check if this email already exist in firebase users before procceed to next step.
          this.step = 2;
        }
      });
    },
    register: function() {
      this.$validator.validate().then(() => {
        if (this.extraInformationFormValidation) {
          this.$store.commit(START_PROGRESS);
          let user = {
            auth: {
              email: this.userData.contactDetails.email,
              phoneNumber: this.userData.contactDetails.phoneNumber,
              password: this.password
            },
            userData: this.userData
          };
          this.$store
            .dispatch(REGISTER, user)
            .then(() => {
              this.$router.push("/home");
            })
            .finally(() => {
              this.$store.commit(STOP_PROGRESS);
            });
        }
      });
    }
  }
};
</script>
