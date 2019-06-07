<template>
  <v-card class="ma-1">
    <v-img
      class="white--text"
      height="150px"
      :src="
        event.photos
          ? event.photos[0]
          : require('../../public/img/default-event.jpg')
      "
    >
      <v-container fill-height class="pa-1">
        <v-layout>
          <v-flex md8>
            <v-layout align-start justify-end column fill-height>
              <v-flex md4 class="ml-3">
                <h2>{{ event.name }}</h2>
                <h3>{{ monthName }} {{ date }}</h3>
              </v-flex>
            </v-layout>
          </v-flex>
          <v-flex md3 class="pt-0">
            <v-layout>
              <v-spacer></v-spacer>
              <v-flex md6>
                <v-btn
                  color="white"
                  icon
                  :to="`/event/${event._id}`"
                  target="_blank"
                >
                  <v-icon color="purple" large>info</v-icon>
                </v-btn>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-container>
    </v-img>

    <v-divider></v-divider>
    <v-card-text>
      <v-layout wrap>
        <v-flex md7>
          <h2>
            <v-icon class="pr-2">access_time</v-icon>
            {{ startTime }} - {{ endTime }}
          </h2>
        </v-flex>
        <v-flex md5>
          <router-link
            :to="{ name: 'Profile', params: { userId: event.business._id } }"
            target="_blank"
          >
            <h4>
              <v-icon class="pr-2">location_city</v-icon>
              {{ event.business.name }}
            </h4>
          </router-link>
          <custom-rating
            :reviewed-id="event.business._id"
            disabled
          ></custom-rating>
        </v-flex>
        <v-flex class="pt-0">
          <h4>
            <v-icon class="pr-2">music_note</v-icon>
            {{ event.genres.toString() }}
          </h4>
        </v-flex>
      </v-layout>
      <p class="mt-3">{{ event.description }}</p>
    </v-card-text>
    <v-divider></v-divider>

    <template v-if="currentStatus !== null">
      <v-card-actions
        :class="cardActionStyle"
        class="text-md-center bottom-buttons"
      >
        <v-flex md4>
          <h5>IN PROGRESS</h5>
        </v-flex>
        <v-divider vertical></v-divider>
        <v-flex>
          <h4>{{ currentStatus }}</h4>
        </v-flex>
      </v-card-actions>
    </template>
    <template v-else>
      <v-card-actions class="bottom-buttons">
        <v-spacer></v-spacer>
        <v-btn dark color="black" @click="sendRequest">RSVP</v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
    </template>
  </v-card>
</template>
<style scoped>
.v-card >>> p {
  height: 100px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
}

a {
  text-decoration: none;
}
</style>

<script>
import moment from "moment";
import { REGISTER_EVENT } from "../store/actions.type";
import { START_PROGRESS, STOP_PROGRESS } from "../store/mutations.type";
import CustomRating from "../components/CustomRating.vue";

export default {
  components: {
    CustomRating
  },
  props: ["event", "currentStatus"],
  data: function() {
    return {
      monthName: moment(this.event.startDate).format("MMM"),
      date: moment(this.event.startDate).date(),
      startTime: moment(this.event.startDate).format("H:mm"),
      endTime: moment(this.event.endDate).format("H:mm")
    };
  },
  computed: {
    cardActionStyle() {
      let color = null;
      switch (this.currentStatus) {
        case "Ignored": {
          color = "red lighten-3";
          break;
        }
        case "Approved": {
          color = "green lighten-3";
          break;
        }
        default: {
          color = "yellow lighten-3";
        }
      }
      return color;
    }
  },
  methods: {
    async sendRequest() {
      this.$store.commit(START_PROGRESS);

      const event = {
        event: this.event
      };
      try {
        await this.$store.dispatch(REGISTER_EVENT, event);
      } catch (error) {
        // Todo display error to user
      } finally {
        this.$store.commit(STOP_PROGRESS);
      }
    }
  }
};
</script>

<style scoped>
.bottom-buttons {
  height: 7vh;
}
</style>
