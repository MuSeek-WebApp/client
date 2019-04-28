<template>
  <v-container class="py-0">
    <input
      style="display: none"
      type="file"
      accept=".png, .jpg, .jpeg"
      @change="onFileSelected"
      ref="imageInput"
    />
    <v-hover>
      <v-avatar slot-scope="{ hover }" class="mx-auto mb-3 d-block" size="150">
        <v-img :src="profile.profile_photo">
          <v-expand-transition>
            <v-btn
              v-if="hover"
              dark
              fab
              color="blue"
              class="transition-fast-in-fast-out v-card--reveal mt-5"
              @click="$refs.imageInput.click()"
            >
              <v-icon dark>cloud_upload</v-icon>
            </v-btn>
          </v-expand-transition>
        </v-img>
      </v-avatar>
    </v-hover>
    <v-card-text class="text-xs-center">
      <v-layout justify-center>
        <h4 class="mx-2 my-auto font-weight-bold" v-text="profile.name"></h4>
        <v-chip small color="blue" text-color="white">
          <v-avatar>
            <v-icon v-if="isBand">music_note</v-icon>
            <v-icon v-else>business_center</v-icon>
          </v-avatar>
          <span v-text="type"></span>
        </v-chip>
      </v-layout>
      <p
        class="card-description font-weight-light"
        v-text="profile.description"
      ></p>
    </v-card-text>

    <v-card>
      <v-list two-line>
        <v-list-tile>
          <v-list-tile-action>
            <v-icon color="indigo">mail</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title
              v-text="profile.contactDetails.email"
            ></v-list-tile-title>
            <v-list-tile-sub-title
              >Electronic Mail Address</v-list-tile-sub-title
            >
          </v-list-tile-content>

          <v-btn icon>
            <v-icon>edit</v-icon>
          </v-btn>
        </v-list-tile>

        <v-list-tile>
          <v-list-tile-action>
            <v-icon color="indigo">phone</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title
              v-text="profile.contactDetails.phoneNumber"
            ></v-list-tile-title>
            <v-list-tile-sub-title>Cellphone Number</v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-divider inset></v-divider>

        <v-list-tile
          v-for="(artist, index) in profile.bandMembers"
          readonly
          v-bind:key="index"
        >
          <v-list-tile-action>
            <v-icon color="indigo">person</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title v-text="artist.name"></v-list-tile-title>
            <v-list-tile-sub-title
              v-for="(role, index2) in artist.roles"
              v-text="role"
              v-bind:key="index2"
            ></v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-divider inset></v-divider>

        <v-list-tile readonly v-if="profile.type === 'band'">
          <v-list-tile-action>
            <v-icon color="indigo">music_note</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title
              v-for="(genre, index) in profile.genres"
              v-text="genre"
              v-bind:key="index"
            ></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-divider inset v-if="profile.type === 'band'"></v-divider>

        <v-list-tile>
          <v-list-tile-action>
            <v-icon color="indigo">location_on</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>{{
              `${profile.address.city} @ ${profile.address.country}`
            }}</v-list-tile-title>
            <v-list-tile-sub-title
              v-if="profile.address.streetAddress"
              v-text="profile.address.streetAddress"
            ></v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-card>
  </v-container>
</template>

<script>
import { UPLOAD_PROFILE_IMAGE } from "@/store/actions.type";
import { createNamespacedHelpers } from "vuex";
const { mapActions } = createNamespacedHelpers("profile");

export default {
  methods: {
    ...mapActions([UPLOAD_PROFILE_IMAGE]),
    onFileSelected: async function(event) {
      const selectedFile = event.target.files[0];
      const fd = new FormData();
      fd.append("image", selectedFile, selectedFile.name);

      await this.uploadProfileImage(fd);
      console.log("UPLOADED");
    }
  },
  computed: {
    type: function() {
      return this.profile.type.toUpperCase();
    },
    isBand: function() {
      return this.profile.type === "band";
    }
  },
  props: ["profile"]
};
</script>

<style>
.v-card--reveal {
  opacity: 0.65;
}
</style>
