<template>
  <v-container grid-list-xl>
    <v-sheet elevation="1">
      <v-container>
        <v-layout>
          <v-flex md6>
            <v-card>
              <v-carousel height="225">
                <v-carousel-item
                  v-for="(item, i) in items"
                  :key="i"
                  :src="item.src"
                ></v-carousel-item>
              </v-carousel>
              <v-card-title class="justify-center">
                <p class="display-2 text-xs-center">{{ event.name }}</p>
              </v-card-title>
              <v-card-text>
                <v-layout wrap>
                  <v-flex md1>
                    <v-icon large>access_time</v-icon>
                  </v-flex>
                  <v-flex md2 align-self-center>
                    <p class="subheading mb-0 font-weight-bold">
                      {{ monthName }} {{ date }}
                    </p>
                    <p class="subheading">{{ dayName }}</p>
                  </v-flex>
                  <v-flex md4 align-self-center>
                    <p class="headline">{{ startTime }} - {{ endTime }}</p>
                  </v-flex>
                  <v-flex md1>
                    <v-icon large>music_note</v-icon>
                  </v-flex>
                  <v-flex md4>
                    <p class="subheading mb-0 font-weight-bold">Genres</p>
                    <span>{{ event.genres.toString() }}</span>
                  </v-flex>
                  <v-flex md1>
                    <v-icon>person_outline</v-icon>
                  </v-flex>
                  <v-flex md6>
                    <p class="mb-0">
                      {{ event.business.contactDetails.firstName }}
                      {{ event.business.contactDetails.lastName }}
                    </p>
                    <p class="font-weight-bold">
                      {{ event.business.contactDetails.email }}
                      {{ event.business.contactDetails.phoneNumber }}
                    </p>
                  </v-flex>
                  <v-flex md1>
                    <v-icon>location_city</v-icon>
                  </v-flex>
                  <v-flex md4>
                    <router-link
                      :to="{
                        name: 'Profile',
                        params: { userId: event.business._id }
                      }"
                      target="_blank"
                    >
                      <p class="mb-0">{{ event.business.name }}</p>
                    </router-link>
                    <p class="mb-0 font-weight-bold">
                      {{ event.business.address.city }},
                      {{ event.business.address.streetAddress }}
                    </p>
                    <CustomRating rating="5"></CustomRating>
                  </v-flex>
                  <v-flex></v-flex>
                  <v-flex md12>
                    <v-divider></v-divider>
                  </v-flex>
                  <v-flex>
                    <p>{{ event.description }}</p>
                  </v-flex>
                </v-layout>
              </v-card-text>
            </v-card>
          </v-flex>
          <v-spacer></v-spacer>
          <v-divider vertical></v-divider>
          <v-spacer></v-spacer>
          <v-flex md4>
            <v-card>
              <v-card-title class="justify-center">
                <p class="display-1">Lineup</p>
              </v-card-title>
              <v-card-text>
                <v-layout wrap>
                  <template v-for="request in approvedRequests">
                    <v-flex :key="request.band._id" md3 align-self-center>{{
                      request.band.name
                    }}</v-flex>
                    <v-flex :key="request.band._id" md7 align-self-center>
                      <CustomRating rating="4"></CustomRating>
                    </v-flex>
                    <v-flex :key="request.band._id" md2 align-self-center>
                      <router-link
                        :to="{
                          name: 'Profile',
                          params: { userId: request.band._id }
                        }"
                        target="_blank"
                        class="no-underline"
                      >
                        <v-btn icon>
                          <v-icon color="purple" large>info</v-icon>
                        </v-btn>
                      </router-link>
                    </v-flex>
                  </template>
                </v-layout>
              </v-card-text>
            </v-card>
          </v-flex>
          <v-spacer></v-spacer>
        </v-layout>
      </v-container>
    </v-sheet>
  </v-container>
</template>
<style>
.no-underline {
  text-decoration: none;
}
</style>

<script>
import { FETCH_SINGLE_EVENT } from "../store/actions.type";
import { mapState } from "vuex";
import CustomRating from "../components/CustomRating.vue";
import moment from "moment";
export default {
  components: {
    CustomRating
  },
  data: function() {
    return {
      items: [
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg"
        },
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/sky.jpg"
        },
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/bird.jpg"
        },
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/planet.jpg"
        }
      ],
      monthName: null,
      dayName: null,
      date: null,
      startTime: null,
      endTime: null
    };
  },
  async created() {
    await this.$store.dispatch(FETCH_SINGLE_EVENT, this.$route.params.id);
    this.monthName = moment(this.event.startDate).format("MMM");
    this.dayName = moment(this.event.startDate).format("dddd");
    this.date = moment(this.event.startDate).date();
    this.startTime = moment(this.event.startDate).format("H:mm");
    this.endTime = moment(this.event.endDate).format("H:mm");
  },
  computed: {
    ...mapState({
      event: state => state.event.viewedEvent
    }),
    approvedRequests() {
      return this.event.requests.filter(req => req.status === "APPROVED");
    }
  }
};
</script>
