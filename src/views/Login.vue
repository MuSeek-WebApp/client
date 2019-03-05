<template>
  <v-container fill-height>
    <v-layout justify-center align-center>
      <v-flex md3 xs6>
        <v-card>
          <v-card-title primary-title>
            <v-flex>
              <h2 class="text-xs-center">Sign in</h2>
              <h4 class="text-xs-center">to continue to Museek</h4>
            </v-flex>
          </v-card-title>
          <v-card-text>
            <v-btn block color="primary">
              <img class="mr-3" src="../../public/img/icons/facebook.png" />
              <v-divider vertical dark></v-divider>
              <v-spacer></v-spacer>Sign in With Facebook
              <v-spacer></v-spacer>
            </v-btn>
            <v-btn block color="secondary" @click="signInWithGoogle">
              <img class="mr-3" src="../../public/img/icons/google.png" />
              <v-divider vertical dark></v-divider>
              <v-spacer></v-spacer>Sign in With Google
              <v-spacer></v-spacer>
            </v-btn>
            <p class="text-xs-center">or</p>
            <v-divider></v-divider>
            <v-form>
              <v-text-field
                prepend-icon="person"
                label="E-mail"
                v-model="email"
                v-validate="emailRules"
                data-vv-name="e-mail"
                :error-messages="errors.collect('e-mail')"
                required
              ></v-text-field>
              <v-text-field
                prepend-icon="lock"
                type="password"
                label="Password"
                v-model="password"
                v-validate="passwordRules"
                data-vv-name="password"
                :error-messages="errors.collect('password')"
                required
              ></v-text-field>
              <p class="red--text">{{ error }}</p>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn
              class="ml-2"
              outline
              color="primary"
              @click="redirectToRegister()"
              >Sign up</v-btn
            >
            <v-spacer></v-spacer>
            <v-btn
              class="mr-2"
              outline
              color="primary"
              @click="signInWithEmailAndPassword(email, password)"
              >Sign in</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { SIGN_IN, SIGN_IN_WITH_GOOGLE } from "@/store/actions.type";
import { START_PROGRESS, STOP_PROGRESS } from "../store/mutations.type";

export default {
  $_veeValidate: {
    validator: "new"
  },
  name: "Login",
  data: () => ({
    email: "",
    password: "",
    error: "",
    emailRules: {
      required: true,
      email: true
    },
    passwordRules: {
      required: true,
      max: 15,
      min: 8
    }
  }),
  methods: {
    signInWithEmailAndPassword: function(email, password) {
      this.$validator.validate().then(isValid => {
        if (isValid) {
          this.$store.commit(START_PROGRESS);
          this.$store
            .dispatch(SIGN_IN, { email, password })
            .then(() => {
              this.$router.push("/home");
            })
            .catch(error => {
              this.error = error.message;
            })
            .finally(() => {
              this.$store.commit(STOP_PROGRESS);
            });
        }
      });
    },
    signInWithGoogle: function() {
      this.$store.commit(START_PROGRESS);
      this.$store
        .dispatch(SIGN_IN_WITH_GOOGLE)
        .then(() => {
          this.$router.push("/home");
        })
        .catch(error => {
          this.error = error.message;
        })
        .finally(() => {
          this.$store.commit(STOP_PROGRESS);
        });
    },
    redirectToRegister: function() {
      this.$router.push("/register");
    }
  }
};
</script>
