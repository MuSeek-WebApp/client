<template>
  <RequestsTable
    :requests="requests"
    :isShowStatus="true"
    :sortable="false"
  ></RequestsTable>
</template>

<script>
import RequestsTable from "./RequestsTable";

export default {
  name: "Lineup",
  props: ["value"],
  components: {
    RequestsTable
  },
  data: function() {
    return {
      statusEnum: {
        APPROVED: {
          order: 0,
          icon: "check_circle_outline",
          color: "success lighten-1",
          tooltip: "Approve",
          method: this.approveAction
        },
        WAITING_FOR_BUSINESS_APPROVAL: {
          order: 2,
          icon: "reply",
          tooltip: "Waiting for your approval"
        },
        WAITING_FOR_BAND_APPROVAL: {
          order: 3,
          icon: "hourglass_empty",
          tooltip: "Waiting for band approval"
        },
        DENIED: {
          order: 4,
          icon: "block",
          color: "error lighten-1",
          tooltip: "Deny",
          method: this.denyAction
        }
      }
    };
  },
  methods: {
    findRequest: function(request) {
      for (let i = 0; i < this.value.length; i++) {
        if (this.value[i].band._id === request.band._id) {
          return this.value[i];
        }
      }
    },
    denyAction: function(request) {
      this.findRequest(request).status = "DENIED";
    },
    approveAction: function(request) {
      this.findRequest(request).status = "APPROVED";
    }
  },
  computed: {
    actions: function() {
      return {
        APPROVED: [this.statusEnum["DENIED"]],
        WAITING_FOR_BUSINESS_APPROVAL: [
          this.statusEnum["APPROVED"],
          this.statusEnum["DENIED"]
        ],
        WAITING_FOR_BAND_APPROVAL: [this.statusEnum["DENIED"]],
        DENIED: []
      };
    },
    requests: function() {
      return this.value
        .map(request => {
          return {
            band: request.band,
            status: request.status,
            icon: {
              icon: this.statusEnum[request.status].icon,
              tooltip: this.statusEnum[request.status].tooltip
            },
            actions: this.actions[request.status]
          };
        })
        .sort((a, b) => {
          return (
            this.statusEnum[a.status].order - this.statusEnum[b.status].order
          );
        });
    }
  }
};
</script>

<style scoped></style>
