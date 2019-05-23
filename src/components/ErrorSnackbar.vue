<template>
  <v-snackbar color="red" v-model="isError" top>{{ errorMessage }}</v-snackbar>
</template>
<script>
import { CLEAR_ERROR_MESSAGE } from "../store/mutations.type";
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState({
      errorMessage: state => state.error.error
    }),
    isError: {
      get() {
        return this.$store.state.error.isShown;
      },
      set(newValue) {
        this.$store.commit(CLEAR_ERROR_MESSAGE, newValue);
      }
    }
  }
};
</script>
