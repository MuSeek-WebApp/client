<template>
  <v-card class="pa-2">
    <span v-text="media" class="text-capitalize display-1"></span>
    <v-form ref="form" lazy-validation>
      <v-layout>
        <v-flex md10>
          <v-text-field
            v-model="profile[media]"
            :rules="urlRules"
            label="Social Media URL"
          ></v-text-field>
        </v-flex>
        <v-flex md2>
          <v-btn color="success" @click="setProfile">
            SET
          </v-btn>
        </v-flex>
      </v-layout>
      <span class="error-text" v-if="!validURL"
        >Invalid {{ this.media }} URL.</span
      >
    </v-form>
  </v-card>
</template>

<script>
export default {
  name: "SocialMediaUpload",
  props: ["media", "profiles"],
  data: function() {
    return {
      profile: [],
      validURL: true
    };
  },
  created: function() {
    this.profile = this.profiles;
  },
  methods: {
    setProfile: function() {
      let regex;
      if (this.profile[this.media] === "") {
        this.profiles[this.media] = "";
      } else {
        if (this.media === "facebook") {
          regex = /^https?:\/\/?(?:www\.)?facebook\.com\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[\w\-]*\/)*([\w\-]*)/;
        } else if (this.media === "youtube") {
          regex = /^https?:\/\/?(www\.youtube\.com|youtu\.?be)\/.+$/;
        } else if (this.media === "instagram") {
          regex = /^https?:\/\/?(?:www.)?(?:instagram.com|instagr.am)\/([A-Za-z0-9-_\.]+)/im;
        } else if (this.media === "spotify") {
          regex = /^https?:\/\/(?:open|play)\.spotify\.com\/artist\/[\w\d]+$/i;
        }
        this.validURL = regex.test(this.profile[this.media]);
        if (this.validURL) {
          this.profiles[this.media] = this.profile[this.media];
        }
      }
    }
  }
};
</script>

<style scoped>
.error-text {
  font-size: 14px;
  color: #b92311;
}
</style>
