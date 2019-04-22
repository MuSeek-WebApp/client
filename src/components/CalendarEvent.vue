<template>
  <v-menu :close-on-content-click="false" v-model="menu" full-width offset-x>
    <template v-slot:activator="{ on }">
      <div v-ripple class="my-event" v-on="on" v-html="event.name"></div>
    </template>
    <v-card color="grey lighten-4" min-width="350px" flat>
      <v-toolbar flat>
        <v-btn icon @click="menu = false">
          <v-icon>close</v-icon>
        </v-btn>
        <v-toolbar-title v-html="event.name"></v-toolbar-title>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" persistent max-width="1000px" hide-overlay>
          <template v-slot:activator="{ on }">
            <v-btn icon v-on="on">
              <v-icon>edit</v-icon>
            </v-btn>
          </template>
          <Event
            v-bind:bindedEvent="{ ...event }"
            v-on:dialog-close="onDialogClose"
          ></Event>
        </v-dialog>
        <v-btn icon @click="remove()">
          <v-icon>delete_outline</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-title primary-title>
        <span v-html="event.description"></span>
      </v-card-title>
    </v-card>
  </v-menu>
</template>

<script>
import Event from "./Event";
import { REMOVE_EVENT } from "../store/actions.type";
import { STOP_PROGRESS, START_PROGRESS } from "../store/mutations.type";
export default {
  components: {
    Event
  },
  props: ["event"],
  data: function() {
    return {
      menu: false,
      dialog: false
    };
  },
  methods: {
    onDialogClose() {
      this.dialog = false;
      this.menu = false;
    },
    remove() {
      this.$store.commit(START_PROGRESS);
      this.$store
        .dispatch(REMOVE_EVENT, this.event)
        .then(() => {
          this.menu = false;
        })
        .catch(() => {
          // TODO print error message
        })
        .finally(() => {
          this.$store.commit(STOP_PROGRESS);
        });
    }
  }
};
</script>

<style lang="stylus" scoped>
.my-event {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  border-radius: 2px;
  background-color: #1867c0;
  color: #ffffff;
  border: 1px solid #1867c0;
  width: 100%;
  font-size: 12px;
  padding: 3px;
  cursor: pointer;
  margin-bottom: 1px;
}
</style>
