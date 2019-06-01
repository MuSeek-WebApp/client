<template>
  <v-container class="py-0">
    <input
      class="hide"
      type="file"
      accept=".png, .jpg, .jpeg"
      @change="onFileSelected"
      ref="imageInput"
    />
    <v-layout align-center>
      <v-flex offset-xs1 xs2>
        <v-hover>
          <v-avatar slot-scope="{ hover }" class="mx-auto" size="125">
            <v-img :src="profile.profile_photo" class="mt-2">
              <v-expand-transition>
                <v-btn
                  v-if="hover && isCurrentUser"
                  dark
                  fab
                  color="blue"
                  class="transition-fast-in-fast-out v-card--reveal mt-4"
                  @click="$refs.imageInput.click()"
                >
                  <v-icon dark>cloud_upload</v-icon>
                </v-btn>
              </v-expand-transition>
            </v-img>
          </v-avatar>
        </v-hover>
      </v-flex>

      <v-flex xs10>
        <v-layout row>
          <v-flex xs10 class="no-pad ml-2">
            <span
              class="display-1 font-weight-bold ml-3"
              v-text="profile.name"
            ></span>
          </v-flex>
          <v-flex xs1 class="no-pad">
            <v-expand-transition>
              <div v-if="isEditing" class="moveGroup">
                <v-btn icon @click="cancelEdit()" small>
                  <v-icon color="red">cancel</v-icon>
                </v-btn>
              </div>
            </v-expand-transition>
          </v-flex>
          <v-flex xs1 class="no-pad">
            <v-expand-transition>
              <div v-if="!isEditing && isCurrentUser">
                <v-btn icon @click="startEdit()" small>
                  <v-icon color="black">edit</v-icon>
                </v-btn>
              </div>
            </v-expand-transition>
            <v-expand-transition>
              <div v-if="isEditing" class="moveGroup">
                <v-btn
                  icon
                  @click="saveEdit()"
                  :disabled="validationErrors"
                  small
                >
                  <v-icon color="indigo">save</v-icon>
                </v-btn>
              </div>
            </v-expand-transition>
          </v-flex>
        </v-layout>
        <v-layout row class="ml-2">
          <v-flex class="no-pad">
            <v-chip small color="blue" text-color="white" class="my-auto">
              <v-avatar>
                <v-icon v-if="isBand">music_note</v-icon>
                <v-icon v-else>business_center</v-icon>
              </v-avatar>
              <span v-text="type"></span>
            </v-chip>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>

    <v-layout align-center>
      <v-flex xs1 class="no-pad">
        <v-icon x-large>
          contact_support
        </v-icon>
      </v-flex>
      <v-flex xs3 class="no-pad">
        <span class="display-h1">Who are we?</span>
      </v-flex>
      <v-flex>
        <v-divider></v-divider>
      </v-flex>
    </v-layout>

    <v-layout>
      <v-flex offset-xs1 class="no-pad">
        <textarea-autosize
          v-model="profileCopy.description"
          class="full font-size-medium"
          :readonly="!isEditing"
          placeholder="A Profile's short description (40-400 characters)."
        ></textarea-autosize>
        <span class="error-text font-size-medium" v-if="!isDescriptionValid"
          >A description has to be at least 40 characters and 400 characters
          maximum.</span
        >
      </v-flex>
    </v-layout>

    <v-divider></v-divider>

    <v-layout row class="mt-2">
      <v-flex xs1 class="no-pad">
        <v-icon x-large>
          people
        </v-icon>
      </v-flex>
      <v-flex xs3 class="no-pad">
        <span class="display-h1">Band Members</span>
      </v-flex>
      <v-flex offset-xs7 xs1 class="no-pad">
        <v-dialog v-model="membersDialog" width="700">
          <template v-slot:activator="{ on }">
            <v-expand-transition>
              <v-btn icon ripple v-if="isEditing" small>
                <v-icon color="green lighten-1" v-on="on">edit</v-icon>
              </v-btn>
            </v-expand-transition>
          </template>
          <v-card>
            <BandMembersList
              class="pa-4"
              :members="profileCopy.bandMembers"
              :headline="false"
            ></BandMembersList>
          </v-card>
        </v-dialog>
      </v-flex>
    </v-layout>

    <v-layout row wrap>
      <v-flex v-for="(artist, n) in profileCopy.bandMembers" :key="n" xs12 md6>
        <v-list-tile class="grow">
          <v-list-tile-avatar>
            <img class="elevation-6" src="../../public/img/download.jpg" />
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title
              v-text="artist.name"
              class="font-size-medium font-weight-bold"
            ></v-list-tile-title>
            <v-list-tile-sub-title
              v-text="arrayFormat(artist.roles)"
              class="font-size-medium"
            ></v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-flex>
    </v-layout>

    <v-divider></v-divider>

    <v-layout row class="mt-2">
      <v-flex offset-xs1 xs3 class="no-pad">
        <span class="display-h1">Contact Details</span>
      </v-flex>
      <v-flex offset-xs2 xs1 class="no-pad">
        <v-icon x-large>
          music_note
        </v-icon>
      </v-flex>
      <v-flex xs2 class="no-pad" v-if="isBand">
        <span class="display-h1">Genres</span>
      </v-flex>
      <v-flex offset-xs2 xs1 class="no-pad" v-if="isBand">
        <v-dialog v-model="genresDialog" width="400">
          <template v-slot:activator="{ on }">
            <v-expand-transition>
              <v-btn icon ripple v-if="isEditing" small>
                <v-icon color="green lighten-1" v-on="on">edit</v-icon>
              </v-btn>
            </v-expand-transition>
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
      </v-flex>
    </v-layout>

    <v-layout row align-center>
      <v-flex xs6 class="no-pad">
        <v-list-tile>
          <v-list-tile-action>
            <v-icon>mail</v-icon>
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
            <span class="error-text" v-if="!isEmailValid"
              >Invalid email format.</span
            >
          </v-list-tile-content>
        </v-list-tile>
      </v-flex>
      <v-flex offset-xs1 xs5 class="no-pad" v-if="isBand">
        <span v-text="selectedGenres" class="font-size-medium"> </span>
      </v-flex>
    </v-layout>

    <v-layout row>
      <v-flex class="no-pad">
        <v-list-tile>
          <v-list-tile-action>
            <v-icon>phone</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>
              <input
                :readonly="!isEditing"
                type="text"
                class="full"
                v-model="profileCopy.contactDetails.phoneNumber"
              />
            </v-list-tile-title>
            <span class="error-text" v-if="!isCellphoneValid"
              >Cellphone must have 9 digits.</span
            >
          </v-list-tile-content>
        </v-list-tile>
      </v-flex>
    </v-layout>

    <v-layout row class="mb-3">
      <v-flex class="no-pad">
        <v-list-tile>
          <v-list-tile-action>
            <v-icon>location_on</v-icon>
          </v-list-tile-action>

          <v-list-tile-content class="longer">
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
      </v-flex>
    </v-layout>
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
      return this.arrayFormat(this.profileCopy.genres);
    },
    isDescriptionValid: function() {
      return (
        this.profileCopy.description.length > 40 &&
        this.profileCopy.description.length < 400
      );
    },
    isEmailValid: function() {
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(
        String(this.profileCopy.contactDetails.email).toLowerCase()
      );
    },
    isCellphoneValid: function() {
      return (
        this.profileCopy.contactDetails.phoneNumber.length === 9 &&
        parseInt(this.profileCopy.contactDetails.phoneNumber)
      );
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

    arrayFormat: function(roles) {
      return roles.join(", ");
    },

    onFileSelected: async function(event) {
      const selectedFile = event.target.files[0];
      const fd = new FormData();
      fd.append("image", selectedFile, selectedFile.name);

      await this.uploadProfileImage({ file: fd, uid: this.profile._id });
    }
  },
  props: ["profile", "isCurrentUser"]
};
</script>

<style scoped>
.no-pad {
  padding: 0 !important;
}

.display-h1 {
  font-size: 24px;
  font-weight: bold;
  font-family: "Roboto", sans-serif;
  line-height: 40px;
}

.font-size-medium {
  font-family: "Roboto", sans-serif !important;
  font-size: 16px !important;
}

.longer {
  height: 120%;
}

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

.error-text {
  font-size: 14px;
  color: #b92311;
}

textarea::placeholder {
  color: #000;
}
</style>
