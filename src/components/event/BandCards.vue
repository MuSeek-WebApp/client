<template>
  <v-card height="500" class="scroll-y">
    <v-container grid-list-md class="pa-3">
      <div v-if="bands" class="display-1 font-weight-medium grey--text">
        Similar events also liked:
      </div>
      <div v-if="!bands" class="display-1 font-weight-medium grey--text">
        Searching...
      </div>
      <v-progress-circular
        v-if="!bands"
        :size="255"
        :width="20"
        color="pink"
        indeterminate
      ></v-progress-circular>
      <v-layout row wrap>
        <v-flex xs6 lg4 xl3 v-for="band in bands" :key="band._id" class="pa-3">
          <v-card color="grey lighten-2" class="white--text" height="210">
            <v-card-title>
              <div class="headline text-truncate">
                <router-link
                  :to="`/profile/${band._id}`"
                  target="_blank"
                  class="no-underline black--text"
                >
                  <span>{{ band.name }}</span>
                </router-link>
              </div>
            </v-card-title>
            <v-card-text class="pt-0">
              <v-layout wrap>
                <v-flex xs4 xl3 align-self-center>
                  <v-avatar size="85">
                    <v-img content :src="band.profile_photo"></v-img>
                  </v-avatar>
                </v-flex>
                <v-flex xs8 xl9>
                  <v-layout pl-5 pt-2 wrap>
                    <v-flex xs2 xl1>
                      <v-icon>location_on</v-icon>
                    </v-flex>
                    <v-flex pl-3 xs10 xl11 class="black--text">
                      <template v-if="band.address">
                        {{ band.address.city }}
                      </template>
                    </v-flex>
                    <v-flex xs2 xl1>
                      <v-icon>music_note</v-icon>
                    </v-flex>
                    <v-flex pl-3 xs10 xl11 class="black--text">
                      {{ band.genres.join(", ") }}
                    </v-flex>
                  </v-layout>
                </v-flex>
                <custom-rating
                  :reviewed-id="band._id"
                  disabled
                  class="black--text"
                ></custom-rating>
                <v-spacer></v-spacer>
                <v-btn
                  color="pink lighten-2"
                  @click="$emit('add', band)"
                  class="white--text"
                  >Add to lineup</v-btn
                >
              </v-layout>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
</template>

<script>
import CustomRating from "../CustomRating";

export default {
  name: "BandCards",
  props: ["bands"],
  components: {
    CustomRating
  }
};
</script>

<style scoped>
.v-progress-circular {
  position: absolute;
  top: 20%;
  right: 50%;
  transform: translateX(50%);
}
.no-underline {
  text-decoration: none;
}
</style>
