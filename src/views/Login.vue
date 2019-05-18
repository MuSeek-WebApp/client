<template>
  <v-container fill-height class="background">
    <v-layout justify-start align-center fill-height>
      <v-flex md4>
        <v-card fill-height class="mx-5 pa-3 login-form">
          <v-card-title primary-title>
            <img
              class="banner animated jackInTheBox slow"
              src="../../public/img/banner.png"
            />
          </v-card-title>
          <v-card-text class="py-0">
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
              <p class="ma-1 red--text">{{ error }}</p>
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
            <p class="py-2">
              Don’t have an account?
              <a v-on:click="redirectToRegister()">Sign up</a>
            </p>
          </v-card-actions>
          <v-divider></v-divider>
          <v-card-text>
            <v-btn
              block
              color="#4267B2"
              @click="signInWithFacebook"
              class="text-none facebook-btn"
            >
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
              class="mt-3 text-none google-btn"
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
      <v-flex md7 xs6></v-flex>
    </v-layout>
  </v-container>
</template>

<style scoped>
@import "../../node_modules/animate.css/animate.min.css";

.background {
  background-image: url(../../public/img/background/pink4.jpg);
  background-size: 100%;
  max-width: 100%;
}
.login-form {
  background-color: rgba(250, 245, 245, 0.9);
  max-height: 550px;
}
.card-action {
  display: flex;
  flex-direction: column;
}
.banner {
  width: 100%;
}
.social-media-btn-icon {
  height: 24px;
  width: 24px;
}
.facebook-btn {
  color: #fff;
  font-family: "Roboto", sans-serif;
}
.google-btn {
  color: #737373;
  font-family: "Roboto", sans-serif;
}
</style>

<script>
import {
  SIGN_IN,
  SIGN_IN_WITH_GOOGLE,
  SIGN_IN_WITH_FACEBOOK
} from "@/store/actions.type";
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
    signInWithEmailAndPassword: async function(email, password) {
      let isValid = await this.$validator.validate();
      if (isValid) {
        this.$store.commit(START_PROGRESS);
        try {
          await this.$store.dispatch(SIGN_IN, { email, password });
          this.$router.push("/home");
        } catch (error) {
          this.error = error.message;
        } finally {
          this.$store.commit(STOP_PROGRESS);
        }
      }
    },
    signInWithFacebook: async function() {
      this.$store.commit(START_PROGRESS);
      try {
        await this.$store.dispatch(SIGN_IN_WITH_FACEBOOK);
        this.$router.push("/home");
      } catch (error) {
        this.error = error.message;
      } finally {
        this.$store.commit(STOP_PROGRESS);
      }
    },
    signInWithGoogle: async function() {
      this.$store.commit(START_PROGRESS);
      try {
        await this.$store.dispatch(SIGN_IN_WITH_GOOGLE);
        this.$router.push("/home");
      } catch (error) {
        this.error = error.message;
      } finally {
        this.$store.commit(STOP_PROGRESS);
      }
    },
    redirectToRegister: function() {
      this.$router.push("/register");
    }
  }
};
</script>
