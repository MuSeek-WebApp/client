<template>
  <v-container grid-list-xs class="background-image">
    <v-sheet elevation="1" class="sheet-background">
      <v-container>
        <v-layout>
          <v-flex md6>
            <v-container>
              <v-layout wrap>
                <v-flex md1>
                  <p class="mb-0 headline">{{ date }}</p>
                  <p class="subheading">{{ monthName }}</p>
                </v-flex>
                <v-flex md11 align-self-center>
                  <p class="display-1">{{ event.name }}</p>
                </v-flex>
                <v-flex md12>
                  <v-divider class="mb-3"></v-divider>
                </v-flex>
                <v-flex md1>
                  <v-icon large>access_time</v-icon>
                </v-flex>
                <v-flex md6>
                  <p class="subheading font-weight-bold mb-0">{{ dayName }}</p>
                  <p class="subheading">{{ startTime }} - {{ endTime }}</p>
                </v-flex>
                <v-flex md1>
                  <v-icon large>music_note</v-icon>
                </v-flex>
                <v-flex md4>
                  <p class="subheading mb-0 font-weight-bold">Genres</p>
                  <span>{{ event.genres.toString() }}</span>
                </v-flex>
                <v-flex md1>
                  <v-icon large>location_on</v-icon>
                </v-flex>
                <v-flex md6>
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
                  <CustomRating
                    :reviews="event.business.reviews"
                  ></CustomRating>
                </v-flex>
                <v-flex md1>
                  <v-icon large>person</v-icon>
                </v-flex>
                <v-flex md4>
                  <p class="mb-0">
                    {{ event.business.contactDetails.firstName }}
                    {{ event.business.contactDetails.lastName }}
                  </p>
                  <p class="font-weight-bold">
                    {{ event.business.contactDetails.email }}
                    {{ event.business.contactDetails.phoneNumber }}
                  </p>
                </v-flex>
                <v-flex mt-3>
                  <p>{{ event.description }}</p>
                </v-flex>
                <v-flex md12>
                  <v-divider class="mt-3 mb-3"></v-divider>
                </v-flex>
                <v-flex md12>
                  <p class="display-1">Lineup</p>
                </v-flex>
                <v-flex
                  :key="request.band._id"
                  v-for="request in approvedRequests"
                  md4
                >
                  <v-layout wrap>
                    <v-flex md3 align-self-center>
                      <v-icon large>person</v-icon>
                    </v-flex>
                    <v-flex
                      align-self-center
                      md4
                      class="subheading font-weight-bold"
                    >
                      {{ request.band.name }}</v-flex
                    >
                    <v-flex align-self-center md5>
                      <router-link
                        :to="{
                          name: 'Profile',
                          params: { userId: request.band._id }
                        }"
                        target="_blank"
                        class="no-underline"
                      >
                        <v-btn icon>
                          <v-icon color="purple">info</v-icon>
                        </v-btn>
                      </router-link>
                    </v-flex>
                    <v-flex offset-md3>
                      <CustomRating
                        :reviews="request.band.reviews"
                      ></CustomRating>
                    </v-flex>
                  </v-layout>
                </v-flex>
              </v-layout>
            </v-container>
          </v-flex>
          <v-flex>
            <v-carousel>
              <v-carousel-item
                v-for="(item, i) in items"
                :key="i"
                :src="item.src"
              ></v-carousel-item>
            </v-carousel>
          </v-flex>
        </v-layout>
      </v-container>
    </v-sheet>
  </v-container>
</template>
<style>
.no-underline {
  text-decoration: none;
}
.v-sheet.sheet-background {
  background-color: rgba(250, 245, 245, 0.8);
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
