<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <v-layout column>
    <v-layout row>
      <v-flex md2 align-self-center>
        <span class="title text-md-center">Event Lineup</span>
      </v-flex>
      <v-spacer></v-spacer>
      <v-flex md2>
        <v-btn>Find Band</v-btn>
      </v-flex>
    </v-layout>
    <v-flex md12>
      <v-data-table
        class="elevation-2"
        hide-actions
        :items="bands"
        :headers="headers"
      >
        <template v-slot:no-data
          >Add bands to your event</template
        >
        <template v-slot:items="props">
          <td>{{ props.item.name }}</td>
          <td>{{ props.item.status }}</td>
          <td>
            <v-btn icon>
              <v-icon>cancel</v-icon>
            </v-btn>
          </td>
        </template>
      </v-data-table>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: "Lineup",
  props: ["bands"],
  data: () => ({
    headers: [
      { text: "Band", value: "name", sortable: false },
      { text: "Status", value: "status" },
      { text: "Actions", sortable: false }
    ]
  })
};
</script>

<style scoped></style>
