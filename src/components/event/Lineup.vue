<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
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
</template>

<script>
export default {
  name: "Lineup",
  props: ["value"],
  data: () => ({
    headers: [
      { text: "Band", value: "name", sortable: false },
      { text: "Status", value: "status" },
      { text: "Actions", sortable: false }
    ],
    bands: [
      { name: "Metallica", status: "Aprroved" },
      { name: "Pearl Jam", status: "Waiting Aprroval" },
      { name: "Megadeth", status: "Invitation Sent" }
    ]
  })
};
</script>

<style scoped></style>
