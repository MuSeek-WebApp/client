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
              <img class="mr-3" src="../assets/facebook.png">
              <v-divider vertical dark></v-divider>
              <v-spacer></v-spacer>
              Sign in With Facebook
              <v-spacer></v-spacer>
            </v-btn>
            <v-btn block color="secondary">
              <img class="mr-3" src="../assets/google.png">
              <v-divider vertical dark></v-divider>
              <v-spacer></v-spacer>
              Sign in With Google
              <v-spacer></v-spacer>
            </v-btn>
            <p class="text-xs-center">or</p>
            <v-divider></v-divider>
            <v-form>
              <v-text-field
                prepend-icon="person"
                label="E-mail"
                v-model="email"
                :rules="emailRules"
                required
              ></v-text-field>
              <v-text-field
                prepend-icon="lock"
                type="password"
                label="Password"
                v-model="password"
                :rules="passwordRules"
                required
              ></v-text-field>
              <p class="red--text">{{error}}</p>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn class="ml-2" outline color="primary">Sign up</v-btn>
            <v-spacer></v-spacer>
            <v-btn class="mr-2" outline color="primary" v-on:click="signIn">Sign in</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import firebase from 'firebase'

export default {
  name: "Login",
  data: () => ({
    email: "",
    password: "",
    error:"",
    emailRules: [
      v => !!v || "Email is required",
      v => /.+@.+/.test(v) || "E-mail must be valid"
    ],
    passwordRules: [
        v => !!v || "Password is required",
        v => (v && (v.length >= 6 && v.length <= 12)) || "Password length should be between 6 to 12"
    ]
  }),
  methods: {
    signIn: function() {
      firebase.auth().signInWithEmailAndPassword(this.email,this.password).then(() => {
        this.$router.push('/Home')
      }).catch((error) => {
        this.error = error.message
      })
    }
  }
};
</script>