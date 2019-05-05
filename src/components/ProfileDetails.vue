<template>
  <v-container class="py-0">
    <v-card>
      <input
        class="hide"
        type="file"
        accept=".png, .jpg, .jpeg"
        @change="onFileSelected"
        ref="imageInput"
      />
      <v-hover>
        <v-avatar slot-scope="{ hover }" class="mx-auto d-block" size="175">
          <v-img :src="profile.profile_photo" class="mt-2">
            <v-expand-transition>
              <v-btn
                v-if="hover"
                dark
                fab
                color="blue"
                class="transition-fast-in-fast-out v-card--reveal my-5"
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
          <span
            class="display-1 mx-2 my-1 font-weight-bold"
            v-text="profile.name"
          ></span>
          <v-chip small color="blue" text-color="white" class="my-auto">
            <v-avatar>
              <v-icon v-if="isBand">music_note</v-icon>
              <v-icon v-else>business_center</v-icon>
            </v-avatar>
            <span v-text="type"></span>
          </v-chip>
        </v-layout>

        <textarea-autosize
          v-model="profileCopy.description"
          class="full"
          :readonly="!isEditing"
          placeholder="A Profile's short description (40-400 characters)."
        ></textarea-autosize>
        <span class="error--text" v-if="!isDescriptionValid"
          >A description has to be at least 40 characters and 400 characters
          maximum.</span
        >
      </v-card-text>

      <v-divider></v-divider>

      <v-list two-line>
        <v-list-tile>
          <v-list-tile-action>
            <v-icon color="indigo">mail</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>
              <input
                :readonly="!isEditing"
                type="text"
                class="full"
                v-model="profileCopy.contactDetails.email"
              />
            </v-list-tile-title>
            <v-list-tile-sub-title
              >Electronic Mail Address</v-list-tile-sub-title
            >
            <span class="error--text" v-if="!isEmailValid"
              >Invalid email format.</span
            >
          </v-list-tile-content>

          <v-expand-x-transition>
            <div v-if="!isEditing && isCurrentUser">
              <v-btn icon @click="startEdit()">
                <v-icon color="black">edit</v-icon>
              </v-btn>
            </div>
          </v-expand-x-transition>
          <v-expand-x-transition>
            <div v-if="isEditing" class="moveGroup">
              <v-btn icon @click="cancelEdit()">
                <v-icon color="red">cancel</v-icon>
              </v-btn>
              <v-btn icon @click="saveEdit()" :disabled="validationErrors">
                <v-icon color="indigo">save</v-icon>
              </v-btn>
            </div>
          </v-expand-x-transition>
        </v-list-tile>

        <v-list-tile>
          <v-list-tile-action>
            <v-icon color="indigo">phone</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <input
              :readonly="!isEditing"
              type="text"
              class="full"
              v-model="profileCopy.contactDetails.phoneNumber"
            />
            <v-list-tile-sub-title>Cellphone Number</v-list-tile-sub-title>
            <span class="error--text" v-if="!isCellphoneValid"
              >A cellphone must have 9 digits only.</span
            >
          </v-list-tile-content>
        </v-list-tile>

        <v-divider inset></v-divider>

        <v-list-tile>
          <v-list-tile-action>
            <v-icon color="indigo">person</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>
            Band Members
          </v-list-tile-title>

          <v-dialog v-model="membersDialog" width="700">
            <template v-slot:activator="{ on }">
              <v-expand-x-transition>
                <v-btn icon ripple v-if="isEditing">
                  <v-icon color="green lighten-1" v-on="on">edit</v-icon>
                </v-btn>
              </v-expand-x-transition>
            </template>
            <BandMembersList
              class="pa-4"
              :members="profileCopy.bandMembers"
              :headline="false"
            ></BandMembersList>
          </v-dialog>
        </v-list-tile>

        <v-list-tile
          v-for="(artist, index) in profileCopy.bandMembers"
          :key="index"
        >
          <v-list-tile-action></v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="artist.name"></v-list-tile-title>
            <v-list-tile-sub-title
              v-for="(role, index2) in artist.roles"
              v-text="role"
              :key="index2"
            ></v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-divider inset></v-divider>

        <v-list-tile readonly v-if="isBand">
          <v-list-tile-action>
            <v-icon color="indigo">music_note</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>
              Genres: <span v-text="selectedGenres"></span>
            </v-list-tile-title>
          </v-list-tile-content>

          <v-dialog v-model="genresDialog" width="500">
            <template v-slot:activator="{ on }">
              <v-expand-x-transition>
                <v-btn icon ripple v-if="isEditing">
                  <v-icon color="green lighten-1" v-on="on">edit</v-icon>
                </v-btn>
              </v-expand-x-transition>
            </template>
            <v-card class="pa-3">
              <v-select
                prepend-icon="music_note"
                dense
                v-model="profileCopy.genres"
                required
                deletable-chips
                chips
                clearable
                multiple
                label="Select Your Genres"
                :items="genres"
              ></v-select>
            </v-card>
          </v-dialog>
        </v-list-tile>

        <v-divider inset v-if="isBand"></v-divider>

        <v-list-tile class="mt-4">
          <v-list-tile-action>
            <v-icon color="indigo">location_on</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>
              <input
                :readonly="!isEditing"
                type="text"
                class="full"
                v-model="profileCopy.address.city"
              />
            </v-list-tile-title>
            <v-list-tile-title>
              <input
                :readonly="!isEditing"
                type="text"
                class="full"
                v-model="profileCopy.address.country"
              />
            </v-list-tile-title>
            <v-list-tile-sub-title v-if="profileCopy.address.streetAddress">
              <input
                :readonly="!isEditing"
                type="text"
                class="full"
                v-model="profileCopy.address.streetAddress"
              />
            </v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-card>
  </v-container>
</template>

<script>
import { UPLOAD_PROFILE_IMAGE, SAVE_PROFILE_DATA } from "@/store/actions.type";
import { createNamespacedHelpers } from "vuex";
import BandMembersList from "./BandMembersList";
import genres from "../common/genres";
const { mapActions } = createNamespacedHelpers("profile");

export default {
  components: { BandMembersList },
  data: () => ({
    isEditing: false,
    profileCopy: {},
    membersDialog: false,
    genresDialog: false
  }),
  computed: {
    type: function() {
      return this.profile.type.toUpperCase();
    },
    isBand: function() {
      return this.profile.type === "band";
    },
    selectedGenres: function() {
      return this.profileCopy.genres.join().replace(",", ", ");
    },
    isDescriptionValid: function() {
      return (
        this.profileCopy.description.length > 40 &&
        this.profileCopy.description.length < 400
      );
    },
    isEmailValid: function() {
      let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(
        String(this.profileCopy.contactDetails.email).toLowerCase()
      );
    },
    isCellphoneValid: function() {
      return this.profileCopy.contactDetails.phoneNumber.length === 9;
    },
    validationErrors: function() {
      if (!this.isDescriptionValid) return true;
      if (!this.isEmailValid) return true;
      if (!this.isCellphoneValid) return true;
      return false;
    }
  },
  created: function() {
    this.profileCopy = JSON.parse(JSON.stringify(this.profile));
    this.genres = genres;
  },
  methods: {
    ...mapActions([UPLOAD_PROFILE_IMAGE]),
    ...mapActions([SAVE_PROFILE_DATA]),

    startEdit: function() {
      this.isEditing = true;
    },

    cancelEdit: function() {
      this.isEditing = false;
      this.profileCopy = JSON.parse(JSON.stringify(this.profile));
    },

    saveEdit: async function() {
      await this.saveProfileData(this.profileCopy);
      this.isEditing = false;
    },

    removeBandMember: function(index) {
      this.$delete(this.profileCopy.bandMembers, index);
    },

    onFileSelected: async function(event) {
      const selectedFile = event.target.files[0];
      const fd = new FormData();
      fd.append("image", selectedFile, selectedFile.name);

      await this.uploadProfileImage(fd);
    }
  },
  props: ["profile", "isCurrentUser"]
};
</script>

<style>
.v-card--reveal {
  opacity: 0.65;
}

input:focus {
  outline: none;
}

.full {
  width: 100%;
}

.moveGroup {
  white-space: nowrap;
}

textarea {
  border: none;
  overflow: auto;
  outline: none;
  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  box-shadow: none;
  resize: none;
}

.hide {
  display: none;
}

.error--text {
  font-size: 14px;
}
</style>
