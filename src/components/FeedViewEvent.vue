<template>
  <v-card>
    <v-img
      class="white--text"
      height="150px"
      src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
    >
      <v-container fill-height class="pa-1">
        <v-layout align-start justify-end column fill-height>
          <v-flex md4 class="ml-3">
            <h2>Event Name</h2>
            <h3>May 13</h3>
          </v-flex>
        </v-layout>
        <v-layout>
          <v-spacer></v-spacer>
          <v-flex md6>
            <v-btn color="white" icon>
              <v-icon color="purple" large>info</v-icon>
            </v-btn>
          </v-flex>
        </v-layout>
      </v-container>
    </v-img>
    <v-card-title class="pb-2">
      <h4>Business Name</h4>
      <v-spacer></v-spacer>
      <v-rating
        readonly
        v-model="rating"
        background-color="orange lighten-3"
        color="orange"
        small
      ></v-rating>
    </v-card-title>
    <v-divider></v-divider>
    <v-card-text>
      <h4>
        <v-icon class="pr-2">access_time</v-icon>
        {{ "00:00 - 02:00" }}
      </h4>
      <h4>
        <v-icon class="pr-2">music_note</v-icon>
        {{ "Rock, Jazz" }}
      </h4>
      <p class="mt-3">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ultrices
        leo a magna pharetra sollicitudin. Nunc risus nibh, tincidunt vel
        placerat in, sollicitudin elementum ante. Curabitur vestibulum nec quam
        ac ullamcorper. Nullam vel libero interdum, euismod mi eget,
      </p>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn dark color="black">RSVP</v-btn>
      <v-spacer></v-spacer>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    rating: 4
  })
};
</script>
