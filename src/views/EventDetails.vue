<template>
  <v-container grid-list-xl>
    <v-sheet elevation="1">
      <v-container>
        <v-layout>
          <v-flex md6>
            <v-card>
              <v-carousel height="300">
                <v-carousel-item
                  v-for="(item, i) in items"
                  :key="i"
                  :src="item.src"
                ></v-carousel-item>
              </v-carousel>
              <v-card-title>
                <p class="display-2">{{ event.name }}</p>
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
          <v-flex md4>
            <v-card>
              <v-card-title>
                <p class="display-1">{{ event.business.name }}</p>
              </v-card-title>
              <v-divider></v-divider>
              <v-card-text>
                <v-layout wrap>
                  <v-flex md1>
                    <v-icon>person_outline</v-icon>
                  </v-flex>
                  <v-flex md11>
                    <p class="mb-0">Yossi Gartner</p>
                    <p class="font-weight-bold">
                      yosigartner@gmail.com +972525419901
                    </p>
                  </v-flex>
                  <v-flex md1>
                    <v-icon>location_city</v-icon>
                  </v-flex>
                  <v-flex md11>
                    <p>Tel Aviv, Rothschild Boulevard 99</p>
                  </v-flex>
                </v-layout>
              </v-card-text>
            </v-card>
            <GmapMap
              class="mt-5"
              :center="{ lat: 31.824159, lng: 34.75430039 }"
              :zoom="7"
              map-type-id="terrain"
              style="width: 560px; height: 300px"
            ></GmapMap>
          </v-flex>
        </v-layout>
      </v-container>
    </v-sheet>
  </v-container>
</template>

<script>
import { FETCH_SINGLE_EVENT } from "../store/actions.type";
import { mapState } from "vuex";
export default {
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
