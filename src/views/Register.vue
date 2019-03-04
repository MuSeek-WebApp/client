<template>
  <v-container fill-height>
    <v-layout justify-center>
      <v-flex md5>
        <v-stepper :value="step">
          <v-stepper-header>
            <v-stepper-step :complete="step > 1" step="1"
              >Basic Information</v-stepper-step
            >
            <v-divider></v-divider>
            <v-stepper-step :complete="step > 2" step="2"
              >Extra Information</v-stepper-step
            >
          </v-stepper-header>
          <v-stepper-items>
            <v-stepper-content step="1">
              <v-card>
                <v-form v-model="basicInformationFormValidation">
                  <v-container>
                    <v-layout wrap>
                      <v-flex md12>
                        <v-radio-group v-model="type" row>
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
                          v-model="firstName"
                          label="First name"
                        ></v-text-field>
                      </v-flex>
                      <v-flex md6>
                        <v-text-field
                          v-validate="validationRules.nameRule"
                          data-vv-name="last name"
                          :error-messages="errors.collect('last name')"
                          v-model="lastName"
                          label="Last name"
                        ></v-text-field>
                      </v-flex>
                      <v-flex md6>
                        <v-text-field
                          v-validate="validationRules.emailRule"
                          data-vv-name="e-mail"
                          :error-messages="errors.collect('e-mail')"
                          v-model="email"
                          label="E-mail"
                        ></v-text-field>
                      </v-flex>
                      <v-flex md6>
                        <v-text-field
                          v-validate="validationRules.phoneNumberRule"
                          data-vv-name="phone number"
                          :error-messages="errors.collect('phone number')"
                          v-model="phoneNumber"
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
                    :disabled="!basicInformationFormValidation"
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
                          v-model="name"
                          :label="
                            type.band ? 'Band/Artist name' : 'Business name'
                          "
                        ></v-text-field>
                      </v-flex>
                      <v-flex md12>
                        <v-textarea
                          box
                          no-resize
                          height="100"
                          v-model="description"
                          :label="
                            type.band
                              ? 'Band/Artist description'
                              : 'Business description'
                          "
                        ></v-textarea>
                      </v-flex>
                      <v-flex md10>
                        <v-select
                          v-if="this.type.band"
                          v-model="selectedGeners"
                          required
                          deletable-chips
                          chips
                          clearable
                          multiple
                          label="Select Your Genres"
                          :items="geners"
                        ></v-select>
                      </v-flex>
                      <v-flex md6>
                        <v-select
                          v-model="address.country"
                          required
                          label="Select Country"
                          :items="countries"
                        ></v-select>
                      </v-flex>
                      <v-flex md6>
                        <v-text-field
                          v-model="address.city"
                          label="City"
                        ></v-text-field>
                      </v-flex>
                    </v-layout>
                    <v-flex md10>
                      <v-text-field
                        v-if="!this.type.band"
                        v-model="address.streetAddress"
                        label="Street address"
                      ></v-text-field>
                    </v-flex>
                    <v-flex>
                      <template v-if="this.type.band">
                        <h5 class="pb-1">Band members:</h5>
                        <v-toolbar>
                          <v-form v-model="addMemberValidation">
                            <v-container>
                              <v-layout wrap>
                                <v-flex md6>
                                  <v-text-field
                                    v-model="memberName"
                                    label="Member name"
                                  ></v-text-field>
                                </v-flex>
                                <v-flex md6>
                                  <v-text-field
                                    v-model="memberRole"
                                    label="Member role"
                                  ></v-text-field>
                                </v-flex>
                              </v-layout>
                            </v-container>
                          </v-form>
                          <v-spacer></v-spacer>
                          <v-btn @click="addMember">Add</v-btn>
                        </v-toolbar>
                        <v-card max-height="150" height="150" class="scroll-y">
                          <v-list>
                            <v-list-tile
                              :key="member.name"
                              v-for="member in bandMembers"
                            >
                              <v-list-tile-content>
                                <v-list-tile-title>{{
                                  member.name
                                }}</v-list-tile-title>
                                <v-list-tile-sub-title>{{
                                  member.role
                                }}</v-list-tile-sub-title>
                              </v-list-tile-content>
                            </v-list-tile>
                          </v-list>
                        </v-card>
                      </template>
                    </v-flex>
                  </v-container>
                </v-form>

                <v-divider></v-divider>
                <v-card-actions>
                  <v-btn @click="prevStep">Back</v-btn>
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

<script>
import { mapGetters } from "vuex";
import { EXTRA_INFO_STEP, INFO_STEP } from "../store/mutations.type";

export default {
  $_veeValidate: {
    validator: "new"
  },
  data: () => ({
    basicInformationFormValidation: false,
    extraInformationFormValidation: false,
    type: {
      band: true
    },
    name: "",
    description: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
    bandMembers: [],
    memberName: "",
    memberRole: "",
    geners: [],
    selectedGeners: [],
    countries: [],
    address: {
      country: "",
      city: "",
      streetAddress: ""
    },
    validationRules: {
      nameRule: {
        required: true,
        max: 10,
        min: 3
      },
      emailRule: {
        required: true,
        email: true
      },
      phoneNumberRule: {
        required: true,
        digits: 10
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
        alpha: true
      },
      streetAddress: {
        required: true,
        alpha_num: true
      }
    }
  }),
  computed: {
    ...mapGetters({
      step: "currentStep"
    }),
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
        if (this.basicInformationFormValidation) {
          this.$validator.reset();
          this.$store.commit(EXTRA_INFO_STEP);
        }
      });
    },
    prevStep: function() {
      this.$store.commit(INFO_STEP);
    },
    addMember: function() {
      this.bandMembers.push({ name: this.memberName, role: this.memberRole });
    },
    register: function() {}
  },
  mounted: function() {
    this.geners = [
      "Pop",
      "Rock",
      "Metal",
      "Jazz",
      "Progressive Rock",
      "Electronic",
      "House",
      "EDM"
    ];
    this.countries = [
      "Israel",
      "United States",
      "United Kingdom",
      "Sweden",
      "Denemark",
      "Saudi Arabia"
    ];
  }
};
</script>
