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
                    <p class="subheading mb-0 font-weight-bold">May 14</p>
                    <p class="subheading">Wednesday</p>
                  </v-flex>
                  <v-flex md4 align-self-center>
                    <p class="headline">14:00 - 20:00</p>
                  </v-flex>
                  <v-flex md1>
                    <v-icon large>music_note</v-icon>
                  </v-flex>
                  <v-flex md4>
                    <p class="subheading mb-0 font-weight-bold">Genres</p>
                    <span>Rock, Jazz, Progressive</span>
                  </v-flex>
                  <v-flex md1>
                    <v-icon>person_outline</v-icon>
                  </v-flex>
                  <v-flex md6>
                    <p class="mb-0">Yossi Gartner</p>
                    <p class="font-weight-bold">
                      yosigartner@gmail.com +972525419901
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
                      Tel Aviv, Rothschild Boulevard 99
                    </p>
                    <CustomRating rating="5"></CustomRating>
                  </v-flex>
                  <v-flex></v-flex>
                  <v-flex md12>
                    <v-divider></v-divider>
                  </v-flex>
                  <v-flex>
                    <p>
                      tiam est risus, scelerisque vitae bibendum a, malesuada
                      sed elit. Cras finibus, neque vehicula accumsan vehicula,
                      justo risus eleifend libero, eu pretium dui justo sit amet
                      nulla. Etiam tincidunt tempus lacus. Phasellus laoreet sem
                      eu tempus placerat. Nam feugiat, nisi nec pretium
                      tincidunt, neque tellus iaculis enim, nec elementum justo
                      eros eu odio. Praesent sed arcu leo. Orci varius natoque
                      penatibus et magnis dis parturient montes, nascetur
                      ridiculus mus. Nullam nec lorem dignissim ex sagittis
                      sagittis. Ut porttitor maximus porttitor. Praesent leo
                      sapien, elementum eu ultricies nec, congue vel diam.
                      Pellentesque habitant morbi tristique senectus et netus et
                      malesuada fames ac turpis egestas. Sed placerat, tellus
                      tempor gravida aliquet, metus mi placerat nunc, eget
                      aliquam sem dolor id velit. Praesent pellentesque risus
                      ex, sed auctor dui aliquet lobortis.
                    </p>
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
                  <v-flex md3 align-self-center>Band 1#</v-flex>
                  <v-flex md7 align-self-center>
                    <CustomRating rating="4"></CustomRating>
                  </v-flex>
                  <v-flex md2 align-self-center>
                    <v-btn icon>
                      <v-icon>info</v-icon>
                    </v-btn>
                  </v-flex>
                  <v-flex md3 align-self-center>Band 2#</v-flex>
                  <v-flex md7 align-self-center>
                    <CustomRating rating="2"></CustomRating>
                  </v-flex>
                  <v-flex md2 align-self-center>
                    <v-btn icon>
                      <v-icon>info</v-icon>
                    </v-btn>
                  </v-flex>
                  <v-flex md3 align-self-center>Band 3#</v-flex>
                  <v-flex md7 align-self-center>
                    <CustomRating rating="5"></CustomRating>
                  </v-flex>

                  <v-flex md2 align-self-center>
                    <v-btn icon>
                      <v-icon>info</v-icon>
                    </v-btn>
                  </v-flex>
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

<script>
import { FETCH_SINGLE_EVENT } from "../store/actions.type";
import { mapState } from "vuex";
import CustomRating from "../components/CustomRating.vue";

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
      ]
    };
  },
  async created() {
    await this.$store.dispatch(FETCH_SINGLE_EVENT, this.$route.params.id);
  },
  computed: {
    ...mapState({
      event: state => state.event.viewedEvent
    })
  }
};
</script>
