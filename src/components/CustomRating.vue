<template>
  <v-layout row class="grow">
    <v-dialog v-model="reviewDialog" width="400">
      <template v-slot:activator="{ on }">
        <v-btn
          icon
          flat
          class="ma-0"
          v-on="on"
          :color="myReview.like === 1 ? 'blue lighten-1' : 'inherit'"
          :disabled="disabled"
          @click="chosenRate = likeIcon"
        >
          <v-icon>{{ likeIcon }}</v-icon>
        </v-btn>
        <span class="align-self-center">{{ likes }}</span>
        <v-btn
          icon
          flat
          class="ma-0"
          v-on="on"
          :color="myReview.dislike === 1 ? 'blue lighten-1' : 'inherit'"
          :disabled="disabled"
          @click="chosenRate = dislikeIcon"
        >
          <v-icon>{{ dislikeIcon }}</v-icon>
        </v-btn>
        <span class="align-self-center">{{ dislikes }}</span>
      </template>
      <write-review
        v-model="myReview"
        :icon="chosenRate"
        :save="save"
        :cancel="cancel"
      ></write-review>
    </v-dialog>
  </v-layout>
</template>

<script>
import ApiService from "../common/api.service";
import { NEW_REVIEW, UPDATE_REVIEW } from "../store/actions.type";
import { START_PROGRESS, STOP_PROGRESS } from "../store/mutations.type";
import { mapState } from "vuex";
import WriteReview from "./WriteReview";

export default {
  components: { WriteReview },
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    reviewedId: {
      type: String,
      required: true
    }
  },
  data: function() {
    return {
      likes: 0,
      dislikes: 0,
      reviewDialog: false,
      chosenRate: null,
      likeIcon: "thumb_up_off_alt",
      dislikeIcon: "thumb_down_off_alt"
    };
  },
  async created() {
    let { data } = await ApiService.get("api/user/rating/" + this.reviewedId);
    if (data.length > 0) {
      this.likes = data[0].likes;
      this.dislikes = data[0].dislikes;
    }
  },
  computed: {
    ...mapState({
      userData: state => state.auth.userData,
      eventReviews: state => state.event.viewedEventReviews,
      viewedEvent: state => state.event.viewedEvent
    }),
    myReview: function() {
      console.log("eventReviews");
      console.log(this.eventReviews);
      const userReviews = this.eventReviews
        .filter(eventReview => eventReview._id === this.reviewedId)
        .map(eventReview => eventReview.reviews)[0];
      if (userReviews !== undefined) {
        let res = userReviews.filter(
          review => review.userId === this.userData._id
        )[0];
        console.log("res");
        console.log(res);
        if (res) {
          return res;
        }
      }
      return {
        description: "",
        like: 0,
        dislike: 0,
        userId: this.userData._id,
        userName: this.userData.name,
        eventId: this.viewedEvent ? this.viewedEvent._id : null,
        eventName: this.viewedEvent ? this.viewedEvent.name : null,
        photo: this.userData.profile_photo
      };
    }
  },
  methods: {
    cancel() {
      this.chosenRate = null;
      this.reviewDialog = false;
    },
    save() {
      this.myReview.like = this.chosenRate === this.likeIcon ? 1 : 0;
      this.myReview.dislike = this.chosenRate === this.dislikeIcon ? 1 : 0;
      this.chosenRate = null;
      this.$store.commit(START_PROGRESS);
      if (this.myReview._id) {
        this.myReview.timestamp = new Date().toJSON();
        this.$store
          .dispatch(UPDATE_REVIEW, {
            userId: this.reviewedId,
            review: this.myReview
          })
          .then(() => {
            if (this.myReview.like) {
              this.likes++;
              this.dislikes--;
            } else {
              this.likes--;
              this.dislikes++;
            }
            this.reviewDialog = false;
          })
          .catch(() => {
            // TODO print error message
          })
          .finally(() => {
            this.$store.commit(STOP_PROGRESS);
          });
      } else {
        this.$store
          .dispatch(NEW_REVIEW, {
            userId: this.reviewedId,
            review: this.myReview
          })
          .then(() => {
            if (this.myReview.like) {
              this.likes++;
            } else {
              this.dislikes++;
            }
            this.reviewDialog = false;
          })
          .catch(() => {
            // TODO print error message
          })
          .finally(() => {
            this.$store.commit(STOP_PROGRESS);
          });
      }
    }
  }
};
</script>

<style scoped>
.v-text-field >>> .v-icon {
  color: #42a5f5;
}
</style>
