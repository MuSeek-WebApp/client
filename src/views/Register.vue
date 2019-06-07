<template>
  <v-container fill-height class="background">
    <v-layout justify-space-around align-center fill-height>
      <v-flex md11>
        <v-card fill-height class="mx-5 pa-4">
          <v-layout align-center justify-center row>
            <v-flex md4 class="pa-2 mr-3">
              <img class="banner" src="../../public/img/banner.png" />
              <v-divider></v-divider>
              <v-form v-model="userInformationFormValidation">
                <v-layout wrap class="my-3">
                  <v-flex md12>
                    <div class="py-3 title">1. User Information</div>
                  </v-flex>
                  <!-- first name -->
                  <v-flex md6 class="px-1">
                    <v-layout row>
                      <v-icon
                        class="mr-2"
                        :color="usernameFocus ? 'primary' : ''"
                        >person</v-icon
                      >
                      <v-text-field
                        @focus="usernameFocus = true"
                        @blur="usernameFocus = false"
                        v-validate="validationRules.nameRule"
                        data-vv-name="first name"
                        :error-messages="errors.collect('first name')"
                        v-model="userData.contactDetails.firstName"
                        label="First name"
                      ></v-text-field>
                    </v-layout>
                  </v-flex>
                  <!-- last lame -->
                  <v-flex md6 class="px-1">
                    <v-text-field
                      @focus="usernameFocus = true"
                      @blur="usernameFocus = false"
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
                    <v-layout row>
                      <v-icon
                        class="mr-2"
                        :color="passwordFocus ? 'primary' : ''"
                        >lock</v-icon
                      >
                      <v-text-field
                        @focus="passwordFocus = true"
                        @blur="passwordFocus = false"
                        v-validate="validationRules.passwordRule"
                        data-vv-name="password"
                        :error-messages="errors.collect('password')"
                        v-model="password"
                        label="Password"
                        type="password"
                      ></v-text-field>
                    </v-layout>
                  </v-flex>
                  <!-- confirm password -->
                  <v-flex md6 class="px-1">
                    <v-text-field
                      @focus="passwordFocus = true"
                      @blur="passwordFocus = false"
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
            <v-flex md8 class="pa-2 ml-3">
              <v-form v-model="extraInformationFormValidation">
                <v-stepper v-model="step">
                  <v-stepper-header>
                    <v-stepper-step :complete="step > 1" step="1"
                      >Page Information</v-stepper-step
                    >
                    <v-divider></v-divider>
                    <v-stepper-step step="2">Social Media</v-stepper-step>
                  </v-stepper-header>
                  <v-stepper-items>
                    <!-- regular info -->
                    <v-stepper-content step="1">
                      <v-layout wrap>
                        <!-- title & page information -->
                        <v-flex md6 class="px-1">
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
                        <!-- name-->
                        <v-flex md6 class="px-1">
                          <v-text-field
                            :prepend-icon="
                              userData.type.band ? 'mic' : 'business_center'
                            "
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
                        </v-flex>
                        <!-- city -->
                        <v-flex
                          :md4="!userData.type.band"
                          :md6="userData.type.band"
                          class="px-1"
                        >
                          <v-layout row>
                            <v-icon
                              class="mr-2"
                              :color="locationFocus ? 'primary' : ''"
                              >place</v-icon
                            >
                            <v-text-field
                              @focus="locationFocus = true"
                              @blur="locationFocus = false"
                              v-validate="validationRules.cityRule"
                              data-vv-name="city"
                              :error-messages="errors.collect('city')"
                              v-model="userData.address.city"
                              label="City"
                            ></v-text-field>
                          </v-layout>
                        </v-flex>
                        <!-- if business - address -->
                        <v-flex md4 class="px-1" v-if="!userData.type.band">
                          <v-text-field
                            @focus="locationFocus = true"
                            @blur="locationFocus = false"
                            v-validate="validationRules.streetAddressRule"
                            data-vv-name="street address"
                            :error-messages="errors.collect('street address')"
                            v-model="userData.address.streetAddress"
                            label="Street address"
                          ></v-text-field>
                        </v-flex>
                        <!-- country -->
                        <v-flex
                          :md4="!userData.type.band"
                          :md6="userData.type.band"
                          class="px-1"
                        >
                          <CountrySelect
                            @focus="locationFocus = true"
                            @blur="locationFocus = false"
                            v-model="userData.address.country"
                          ></CountrySelect>
                        </v-flex>
                        <v-layout align-end justify-center row fill-height>
                          <!-- description -->
                          <v-flex
                            :md12="!userData.type.band"
                            :md6="userData.type.band"
                            class="px-1"
                          >
                            <v-textarea
                              prepend-icon="notes"
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
                          <!-- if band - select genres -->
                          <v-flex
                            md6
                            class="px-1 mb-2"
                            v-if="userData.type.band"
                          >
                            <GenreSelect
                              v-model="userData.selectedGenres"
                            ></GenreSelect>
                          </v-flex>
                        </v-layout>
                        <!-- band members list -->
                        <v-flex md12 class="px-1">
                          <BandMembersList
                            v-if="userData.type.band"
                            v-model="userData.bandMembers"
                          ></BandMembersList>
                        </v-flex>
                      </v-layout>
                      <v-layout align-end justify-end row fill-height>
                        <v-btn
                          class="ma-1 mt-3"
                          color="primary"
                          @click="nextStep"
                        >
                          Continue <v-icon class="pl-3">arrow_forward</v-icon>
                        </v-btn>
                      </v-layout>
                    </v-stepper-content>
                    <!-- social media -->
                    <v-stepper-content step="2">
                      <v-layout wrap>
                        <v-flex md6 class="px-1 ma-1">
                          <file-pond
                            name="test"
                            ref="pond"
                            label-idle="Drop Profile Picture Here..."
                            accepted-file-types="image/jpeg, image/png"
                            server="/api"
                            v-bind:files="myFiles"
                            v-on:init="handleFilePondInit"
                          />
                        </v-flex>
                        <v-flex md6 class="px-1" v-if="userData.type.band">
                          <v-layout align-center justify-center row fill-height>
                            <img
                              src="../../public/img/icons/youtube.png"
                              class="mr-3"
                            />
                            <v-text-field
                              v-validate="validationRules.urlRule"
                              data-vv-name="youtube"
                              :error-messages="errors.collect('youtube')"
                              v-model="userData.profiles.youtube"
                              label="Youtube"
                            ></v-text-field>
                          </v-layout>
                        </v-flex>
                        <v-flex md6 class="px-1" v-if="userData.type.band">
                          <v-layout align-center justify-center row fill-height>
                            <img
                              src="../../public/img/icons/spotify.png"
                              class="mr-3"
                            />
                            <v-text-field
                              v-validate="validationRules.urlRule"
                              data-vv-name="spotify"
                              :error-messages="errors.collect('spotify')"
                              v-model="userData.profiles.spotify"
                              label="Spotify"
                            ></v-text-field>
                          </v-layout>
                        </v-flex>
                        <v-flex md6 class="px-1">
                          <v-layout align-center justify-center row fill-height>
                            <img
                              src="../../public/img/icons/facebook-icon.png"
                              class="mr-3"
                            />
                            <v-text-field
                              v-validate="validationRules.urlRule"
                              data-vv-name="facebook"
                              :error-messages="errors.collect('facebook')"
                              v-model="userData.profiles.facebook"
                              label="Facebook"
                            ></v-text-field>
                          </v-layout>
                        </v-flex>
                        <v-flex md6 class="px-1">
                          <v-layout align-center justify-center row fill-height>
                            <img
                              src="../../public/img/icons/instagram.png"
                              class="mr-3"
                            />
                            <v-text-field
                              v-validate="validationRules.urlRule"
                              data-vv-name="instagram"
                              :error-messages="errors.collect('instagram')"
                              v-model="userData.profiles.instagram"
                              label="Instagram"
                            ></v-text-field>
                          </v-layout>
                        </v-flex>
                      </v-layout>
                      <v-layout align-end justify-space-between row fill-height>
                        <v-btn class="ma-1 mt-3" @click="step = 1">
                          <v-icon class="pr-3">arrow_back</v-icon> Back
                        </v-btn>
                        <v-btn
                          class="ma-1 mt-3"
                          color="primary"
                          @click="register"
                        >
                          Finish <v-icon class="pl-3">check</v-icon>
                        </v-btn>
                      </v-layout>
                    </v-stepper-content>
                  </v-stepper-items>
                </v-stepper>
              </v-form>
            </v-flex>
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
.v-card {
  background-color: rgba(250, 245, 245, 0.9);
}
.v-stepper {
  background-color: rgba(250, 245, 245, 0);
}
.v-stepper-header {
  background-color: rgba(250, 245, 245, 0);
}
</style>

<script>
import { REGISTER } from "../store/actions.type";
import { START_PROGRESS, STOP_PROGRESS } from "../store/mutations.type";
import GenreSelect from "../components/GenreSelect";
import CountrySelect from "../components/CountrySelect";
import BandMembersList from "../components/BandMembersList";
import FilePond from "../components/FilePond";

export default {
  components: {
    GenreSelect,
    CountrySelect,
    BandMembersList,
    FilePond
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
    locationFocus: false,
    usernameFocus: false,
    passwordFocus: false,
    userInformationFormValidation: false,
    extraInformationFormValidation: false,
    myFiles: [],
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
      },
      profiles: {
        youtube: "",
        spotify: "",
        facebook: "",
        instagram: ""
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
      },
      urlRule: {
        required: false,
        url: true,
        require_protocol: true
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
    handleFilePondInit: function() {
      // console.log('FilePond has initialized');
      // FilePond instance methods are available on `this.$refs.pond`
    },
    nextStep: function() {
      this.$validator.validate().then(() => {
        // if (this.userInformationFormValidation) {
        // eslint-disable-next-line
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
