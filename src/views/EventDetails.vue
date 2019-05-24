<template>
  <v-container grid-list-xs class="background-image">
    <v-sheet elevation="1" class="sheet-background">
      <v-container fluid>
        <v-layout row>
          <v-flex md6>
            <v-container>
              <v-layout wrap>
                <v-flex md1 align-self-center>
                  <v-icon x-large>event</v-icon>
                </v-flex>
                <v-flex md1>
                  <p class="mb-0 headline">{{ date }}</p>
                  <p class="subheading">{{ monthName }}</p>
                </v-flex>
                <v-flex md10 align-self-center>
                  <p class="display-1">{{ event.name }}</p>
                </v-flex>
                <v-flex md12>
                  <v-divider class="mb-3"></v-divider>
                </v-flex>
                <v-flex md1>
                  <v-icon large>access_time</v-icon>
                </v-flex>
                <v-flex md3>
                  <p class="subheading mb-0 font-weight-bold">{{ dayName }}</p>
                  <p>{{ startTime }} - {{ endTime }}</p>
                </v-flex>
                <v-flex md1>
                  <v-icon large>music_note</v-icon>
                </v-flex>
                <v-flex md3>
                  <p class="subheading mb-0 font-weight-bold">Genres</p>
                  <p>{{ event.genres.join(", ") }}</p>
                </v-flex>
                <v-flex md1>
                  <v-icon large>thumbs_up_down</v-icon>
                </v-flex>
                <v-flex md3>
                  <p class="subheading mb-0 font-weight-bold">Rating</p>
                  <custom-rating :userId="event.business._id"></custom-rating>
                </v-flex>
                <v-flex md1>
                  <v-icon large>location_on</v-icon>
                </v-flex>
                <v-flex md3>
                  <p class="subheading mb-0 font-weight-bold">
                    {{ event.business.name }}
                  </p>
                  <p>
                    {{ event.business.address.city }},
                    {{ event.business.address.streetAddress }}
                  </p>
                </v-flex>
                <v-flex md1>
                  <v-icon large>contact_mail</v-icon>
                </v-flex>
                <v-flex md3>
                  <p class="subheading mb-0 font-weight-bold">
                    Email
                  </p>
                  <p>{{ event.business.contactDetails.email }}</p>
                </v-flex>
                <v-flex md1>
                  <v-icon large>contact_mail</v-icon>
                </v-flex>
                <v-flex md3>
                  <p class="subheading mb-0 font-weight-bold">
                    Phone
                  </p>
                  <p>{{ event.business.contactDetails.phoneNumber }}</p>
                </v-flex>
                <v-flex md12>
                  <v-divider class="mb-3"></v-divider>
                </v-flex>
                <v-flex md1>
                  <v-icon>event_note</v-icon>
                </v-flex>
                <v-flex md11>
                  <p>{{ event.description }}</p>
                </v-flex>
                <v-flex md12>
                  <v-divider class="mt-3 mb-3"></v-divider>
                </v-flex>
                <v-flex md1>
                  <v-icon x-large>queue_music</v-icon>
                </v-flex>
                <v-flex md11>
                  <p class="display-1">Lineup</p>
                </v-flex>
                <v-flex md12>
                  <v-list two-line subheader>
                    <v-list-tile
                      v-for="request in approvedRequests"
                      :key="request.band._id"
                      avatar
                    >
                      <v-list-tile-avatar>
                        <img :src="request.band.profile_photo" alt="" />
                      </v-list-tile-avatar>

                      <v-list-tile-content>
                        <v-list-tile-title
                          v-html="request.band.name"
                        ></v-list-tile-title>
                        <v-list-tile-sub-title
                          v-html="request.band.description"
                        ></v-list-tile-sub-title>
                      </v-list-tile-content>

                      <v-list-tile-action>
                        <custom-rating
                          :userId="request.band._id"
                        ></custom-rating>
                      </v-list-tile-action>
                    </v-list-tile>
                    <v-divider inset></v-divider>
                  </v-list>
                </v-flex>
              </v-layout>
            </v-container>
          </v-flex>
          <v-flex md6>
            <v-carousel>
              <v-carousel-item
                v-for="(imageUrl, i) in event.photos"
                :key="i"
                :src="imageUrl"
              ></v-carousel-item>
            </v-carousel>
          </v-flex>
        </v-layout>
      </v-container>
    </v-sheet>
  </v-container>
</template>

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

<style scoped>
.v-list {
  background: transparent;
}
.no-underline {
  text-decoration: none;
}
.v-sheet.sheet-background {
  background-color: rgba(250, 245, 245, 0.8);
}
</style>
