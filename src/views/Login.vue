<template>
  <v-container fill-height class="background">
    <v-layout justify-center align-center>
      <v-flex md4>
        <v-card fill-height class="login-form">
          <v-card-title primary-title>
            <img class="banner" src="../../public/img/banner.png" />
          </v-card-title>
          <v-card-text class="login-details">
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
          <v-card-actions class="card-action">
            <v-btn
              block
              outline
              color="primary"
              @click="signInWithEmailAndPassword(email, password)"
              >Sign in</v-btn
            >
            <p class="sign-up-link">
              Don’t have an account?
              <a v-on:click="redirectToRegister()"> Sign up </a>
            </p>
          </v-card-actions>
          <v-divider></v-divider>
          <v-card-text>
            <v-btn block color="#4267B2" class="social-media-btn text-none">
              <img
                class="mr-3 social-media-btn-icon"
                src="../../public/img/icons/facebook.png"
              />
              <v-divider vertical dark></v-divider>
              <v-spacer></v-spacer>Continue With Facebook
              <v-spacer></v-spacer>
            </v-btn>
            <v-btn
              block
              color="#FFF"
              @click="signInWithGoogle"
              class="text-none google-btn social-media-btn "
            >
              <img
                class="mr-3 social-media-btn-icon"
                src="../../public/img/icons/google.png"
              />
              <v-divider vertical></v-divider>
              <v-spacer></v-spacer>Sign in With Google
              <v-spacer></v-spacer>
            </v-btn>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex md8 xs6> </v-flex>
    </v-layout>
  </v-container>
</template>

<style scoped>
.background {
  background-image: url(../../public/img/background/login-background.jpg);
  max-width: 100%;
  margin: 0px;
}
.login-form {
  margin-left: 150px;
  padding: 10px;
  background-color: rgba(250, 245, 245, 0.9);
}
.card-action {
  display: flex;
  flex-direction: column;
}
.login-details {
  padding: 0px 16px;
}
.sign-up-link {
  padding: 10px 0px;
}
.banner {
  width: 100%;
}
.social-media-btn {
  margin: 20px 0px;
  color: #fff;
}
.social-media-btn-icon {
  height: 24px;
  width: 24px;
}
.google-btn {
  color: #737373;
  font-family: "Roboto", sans-serif;
}
</style>

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
