<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div>
    <v-toolbar>
      <v-toolbar-title @click="routeTo('/home')">
        <img src="../../public/img/logo_museek.png" height="75" class="mt-2" />
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <div>
        <multiselect
          v-model="value"
          :options="searchedData"
          group-values="values"
          group-label="itemType"
          placeholder="Type to search"
          track-by="name"
          label="name"
          close-on-select
          @search-change="debouncedSearch"
          @input="selectSearched"
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
import { SIGN_OUT, GET_SEARCH } from "@/store/actions.type";
import { mapGetters, mapState, createNamespacedHelpers } from "vuex";
import Multiselect from "vue-multiselect";
import _ from "lodash";

const { mapActions } = createNamespacedHelpers("general");

export default {
  components: { Multiselect },
  computed: {
    ...mapState({
      searchedData: state => state.general.searchedData
    }),
    ...mapGetters(["getUserUid"])
  },
  methods: {
    ...mapActions([GET_SEARCH]),
    signOut: async function() {
      await this.$store.dispatch(SIGN_OUT);
      this.$router.push("/login");
    },

    routeTo: function(page) {
      this.$router.push(page);
    },

    debounceSearch: function(searchQuery) {
      this.getSearch(searchQuery);
    },

    selectSearched: function() {
      if (this.value.type == "business" || this.value.type == "band") {
        this.routeTo("/profile/" + this.value._id);
      } else {
        this.routeTo("/event/" + this.value._id);
      }
    }
  },
  created: function() {
    this.debouncedSearch = _.debounce(this.debounceSearch, 500);
  },
  data() {
    return {
      value: []
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
