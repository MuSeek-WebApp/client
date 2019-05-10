<template>
  <v-data-table
    :headers="headers"
    :items="requests"
    class="elevation-1 requests-table"
  >
    <template v-slot:items="props">
      <td v-if="isShowStatus">
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-icon v-on="on">{{ props.item.icon.icon }}</v-icon>
          </template>
          <span>{{ props.item.icon.tooltip }}</span>
        </v-tooltip>
      </td>
      <td>{{ props.item.band.name }}</td>
      <td>
        <v-chip v-for="genre in props.item.band.genres" :key="genre">{{
          genre
        }}</v-chip>
      </td>
      <td>
        <template v-if="typeof props.item.band.address !== 'undefined'">
          {{ props.item.band.address.city }}
        </template>
      </td>
      <td>
        <v-rating
          v-model="props.item.band.rating"
          color="yellow darken-3"
          background-color="grey darken-1"
          half-increments
          readonly
          dense
          size="20"
        ></v-rating>
      </td>
      <td class="justify-end layout px-0">
        <v-tooltip
          bottom
          v-for="(action, index) in props.item.actions"
          :key="index"
        >
          <template v-slot:activator="{ on }">
            <v-btn
              flat
              icon
              class="mx-0"
              :color="action.color"
              v-on="on"
              @click="action.method(props.item)"
            >
              <v-icon>{{ action.icon }}</v-icon>
            </v-btn>
          </template>
          <span>{{ action.tooltip }}</span>
        </v-tooltip>
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn flat icon class="mx-0" color="pink lighten-1" v-on="on">
              <v-icon>person</v-icon>
            </v-btn>
          </template>
          <span>Profile</span>
        </v-tooltip>
      </td>
    </template>
  </v-data-table>
</template>

<script>
export default {
  name: "RequestsTable",
  props: ["requests", "isShowStatus", "sortable"],
  computed: {
    headers() {
      let headers = [
        {
          text: "Name",
          value: "band.name",
          sortable: this.sortable,
          align: "left"
        },
        { text: "Genres", value: "band.genres", sortable: this.sortable },
        { text: "City", value: "band.address.city", sortable: this.sortable },
        {
          text: "Rating",
          value: "band.rating",
          sortable: this.sortable,
          width: "124"
        },
        {
          text: "Actions",
          value: "actions",
          sortable: false,
          align: "right",
          class: "pr-3"
        }
      ];
      if (this.isShowStatus) {
        headers.unshift({
          text: "Status",
          value: "status",
          sortable: false
        });
      }
      return headers;
    }
  }
};
</script>

<style scoped>
.requests-table >>> table.v-table thead td:not(:nth-child(1)),
.requests-table >>> table.v-table tbody td:not(:nth-child(1)),
.requests-table >>> table.v-table thead th:not(:nth-child(1)),
.requests-table >>> table.v-table tbody th:not(:nth-child(1)),
.requests-table >>> table.v-table thead td:first-child,
.requests-table >>> table.v-table tbody td:first-child,
.requests-table >>> table.v-table thead th:first-child,
.requests-table >>> table.v-table tbody th:first-child {
  padding: 0 5px;
}
/*.requests-table >>> table.v-table .v-btn {*/
/*  margin-left: 0;*/
/*  margin-right: 0;*/
/*}*/
/*.el-table--striped .el-table__body tr.el-table__row--striped td {*/
/*  background: #fafafa;*/
/*}*/
</style>