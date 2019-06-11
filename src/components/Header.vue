<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div>
    <v-toolbar>
      <v-toolbar-title @click="routeTo('/home')">
        <img src="../../public/img/logo_museek.png" height="75" class="mt-2" />
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <div>
        <multiselect
          v-model="selectedItems"
          :options="options"
          group-values="values"
          group-label="itemType"
          placeholder="Type to search"
          track-by="name"
          label="name"
          :clear-on-select="true"
          :close-on-select="true"
        >
          <span slot="noResult"
            >Oops! No elements found. Consider changing the search query.</span
          >
        </multiselect>
      </div>
      <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <v-btn flat v-on="on">
            <v-icon left color="red">settings</v-icon>
            <span>Settings</span>
          </v-btn>
        </template>

        <v-list>
          <v-list-tile @click="routeTo('/profile/' + getUserUid)">
            <v-icon left>person</v-icon>
            <v-list-tile-title>Profile</v-list-tile-title>
          </v-list-tile>
          <v-list-tile @click="signOut()">
            <v-icon left>exit_to_app</v-icon>
            <v-list-tile-title>Sign out</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
      <v-toolbar-items></v-toolbar-items>
    </v-toolbar>
  </div>
</template>

<script>
import { SIGN_OUT } from "@/store/actions.type";
import { mapGetters, mapState } from "vuex";
import Multiselect from "vue-multiselect";
import _ from "lodash";
import { GET_SEARCH } from "../store/actions.type.js";
import { SET_SEARCHED_DATA } from "../store/mutations.type";

export default {
  components: { Multiselect },

  computed: {
    ...mapGetters(["getUserUid"])
  },
  methods: {
    signOut: async function() {
      await this.$store.dispatch(SIGN_OUT);
      this.$router.push("/login");
    },

    routeTo: function(page) {
      this.$router.push(page);
    }
  },

  data() {
    return {
      options: [
        {
          itemType: "Events",
          values: [
            { _id: "312312", name: "Amazing Event" },
            { _id: "3123dewrew12", name: "Amazing Event 2" }
          ]
        },
        {
          itemType: "Bands",
          values: [
            { _id: "3123dd12", name: "Amazing Band" },
            { _id: "fdsfdsf", name: "Amazing Band 2" }
          ]
        },
        {
          itemType: "Businesses",
          values: [
            { _id: "ssss", name: "Amazing Business" },
            { _id: "3123dewgggssrew12", name: "Amazing Business 2" }
          ]
        }
      ],
      selectedItems: []
    };
  }
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style scoped>
.mt-2 {
  cursor: pointer;
}
.multiselect {
  width: 30vw;
}

.v-toolbar {
  z-index: 1;
}
</style>
