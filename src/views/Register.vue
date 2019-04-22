<template>
  <v-container fill-height class="background">
    <v-layout justify-start align-center fill-height>
      <v-flex md8>
        <v-stepper :value="step" class="mx-5 pa-3 stepper" fill-height>
          <v-stepper-header>
            <v-stepper-step :complete="step > 1" step="1"
              >User Information</v-stepper-step
            >
            <v-divider></v-divider>
            <v-stepper-step :complete="step > 2" step="2"
              >Extra Information</v-stepper-step
            >
            <v-divider></v-divider>
            <v-stepper-step :complete="step > 3" step="3"
              >Social Media</v-stepper-step
            >
          </v-stepper-header>
          <v-stepper-items>
            <v-stepper-content step="1">
              <v-card>
                <v-form v-model="userInformationFormValidation">
                  <v-container>
                    <v-layout wrap>
                      <v-flex md12>
                        <v-radio-group v-model="userData.type" row>
                          <v-radio
                            label="Artist/Band"
                            :value="{ band: true }"
                          ></v-radio>
                          <v-radio
                            label="Business Owner"
                            :value="{ business: true }"
                          ></v-radio>
                        </v-radio-group>
                      </v-flex>
                      <v-flex md6>
                        <v-text-field
                          v-validate="validationRules.nameRule"
                          data-vv-name="first name"
                          :error-messages="errors.collect('first name')"
                          v-model="userData.contactDetails.firstName"
                          label="First name"
                        ></v-text-field>
                      </v-flex>
                      <v-flex md6>
                        <v-text-field
                          v-validate="validationRules.nameRule"
                          data-vv-name="last name"
                          :error-messages="errors.collect('last name')"
                          v-model="userData.contactDetails.lastName"
                          label="Last name"
                        ></v-text-field>
                      </v-flex>
                      <v-flex md6>
                        <v-text-field
                          v-validate="validationRules.emailRule"
                          data-vv-name="e-mail"
                          :error-messages="errors.collect('e-mail')"
                          v-model="userData.contactDetails.email"
                          label="E-mail"
                        ></v-text-field>
                      </v-flex>
                      <v-flex md6>
                        <v-text-field
                          v-validate="validationRules.phoneNumberRule"
                          data-vv-name="phone number"
                          :error-messages="errors.collect('phone number')"
                          v-model="userData.contactDetails.phoneNumber"
                          label="Phone number"
                        ></v-text-field>
                      </v-flex>
                      <v-flex>
                        <v-text-field
                          v-validate="validationRules.passwordRule"
                          data-vv-name="password"
                          :error-messages="errors.collect('password')"
                          v-model="password"
                          label="Password"
                          type="password"
                        ></v-text-field>
                      </v-flex>
                      <v-flex>
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
                  </v-container>
                </v-form>
                <v-divider></v-divider>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    :disabled="!userInformationFormValidation"
                    @click="nextStep"
                    >Next</v-btn
                  >
                </v-card-actions>
              </v-card>
            </v-stepper-content>
            <v-stepper-content step="2">
              <v-card>
                <v-form v-model="extraInformationFormValidation">
                  <v-container>
                    <v-layout wrap>
                      <v-flex md6>
                        <v-text-field
                          v-validate="validationRules.nameRule"
                          :counter="validationRules.nameRule.max"
                          data-vv-name="name"
                          :error-messages="errors.collect('name')"
                          v-model="userData.name"
                          :label="
                            userData.type.band
                              ? 'Band/Artist name'
                              : 'Business name'
                          "
                        ></v-text-field>
                        <GenreSelect
                          v-if="userData.type.band"
                          v-model="userData.selectedGenres"
                        ></GenreSelect>
                      </v-flex>
                      <v-flex md6>
                        <v-textarea
                          v-validate="validationRules.descriptionRule"
                          data-vv-name="description"
                          :error-messages="errors.collect('description')"
                          :counter="validationRules.descriptionRule.max"
                          box
                          no-resize
                          v-model="userData.description"
                          :label="
                            userData.type.band
                              ? 'Band/Artist description'
                              : 'Business description'
                          "
                        ></v-textarea>
                      </v-flex>
                      <v-flex md6>
                        <CountrySelect
                          v-model="userData.address.country"
                        ></CountrySelect>
                      </v-flex>
                      <v-flex md6>
                        <v-text-field
                          v-validate="validationRules.cityRule"
                          data-vv-name="city"
                          :error-messages="errors.collect('city')"
                          v-model="userData.address.city"
                          label="City"
                        ></v-text-field>
                      </v-flex>
                    </v-layout>
                    <v-flex md12>
                      <v-text-field
                        v-if="!userData.type.band"
                        v-validate="validationRules.streetAddressRule"
                        data-vv-name="street address"
                        :error-messages="errors.collect('street address')"
                        v-model="userData.address.streetAddress"
                        label="Street address"
                      ></v-text-field>
                    </v-flex>
                    <v-flex>
                      <BandMembersList
                        v-if="userData.type.band"
                        v-model="userData.bandMembers"
                      ></BandMembersList>
                    </v-flex>
                  </v-container>
                </v-form>
                <v-divider></v-divider>
                <v-card-actions>
                  <v-btn @click="step = 1">Back</v-btn>
                  <v-spacer></v-spacer>
                  <v-btn
                    :disabled="!extraInformationFormValidation"
                    @click="register"
                    >Finish</v-btn
                  >
                </v-card-actions>
              </v-card>
            </v-stepper-content>
            <v-stepper-content step="3">
              <v-card>
                <v-form v-model="extraInformationFormValidation">
                  <v-container>
                    <v-layout wrap>
                      <v-flex md6>
                        <v-text-field
                          v-validate="validationRules.nameRule"
                          :counter="validationRules.nameRule.max"
                          data-vv-name="name"
                          :error-messages="errors.collect('name')"
                          v-model="userData.name"
                          :label="
                            userData.type.band
                              ? 'Band/Artist name'
                              : 'Business name'
                          "
                        ></v-text-field>
                        <GenreSelect
                          v-if="userData.type.band"
                          v-model="userData.selectedGenres"
                        ></GenreSelect>
                      </v-flex>
                      <v-flex md6>
                        <v-textarea
                          v-validate="validationRules.descriptionRule"
                          data-vv-name="description"
                          :error-messages="errors.collect('description')"
                          :counter="validationRules.descriptionRule.max"
                          box
                          no-resize
                          v-model="userData.description"
                          :label="
                            userData.type.band
                              ? 'Band/Artist description'
                              : 'Business description'
                          "
                        ></v-textarea>
                      </v-flex>
                      <v-flex md6>
                        <CountrySelect
                          v-model="userData.address.country"
                        ></CountrySelect>
                      </v-flex>
                      <v-flex md6>
                        <v-text-field
                          v-validate="validationRules.cityRule"
                          data-vv-name="city"
                          :error-messages="errors.collect('city')"
                          v-model="userData.address.city"
                          label="City"
                        ></v-text-field>
                      </v-flex>
                    </v-layout>
                    <v-flex md12>
                      <v-text-field
                        v-if="!userData.type.band"
                        v-validate="validationRules.streetAddressRule"
                        data-vv-name="street address"
                        :error-messages="errors.collect('street address')"
                        v-model="userData.address.streetAddress"
                        label="Street address"
                      ></v-text-field>
                    </v-flex>
                    <v-flex>
                      <BandMembersList
                        v-if="userData.type.band"
                        v-model="userData.bandMembers"
                      ></BandMembersList>
                    </v-flex>
                  </v-container>
                </v-form>
                <v-divider></v-divider>
                <v-card-actions>
                  <v-btn @click="step = 1">Back</v-btn>
                  <v-spacer></v-spacer>
                  <v-btn
                    :disabled="!extraInformationFormValidation"
                    @click="register"
                    >Finish</v-btn
                  >
                </v-card-actions>
              </v-card>
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
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
.stepper {
  background-color: rgba(250, 245, 245, 0.9);
  max-height: 550px;
}
.v-card {
  background-color: rgba(0, 0, 0, 0);
}
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
