<template>
  <v-sheet>
    <h4 class="pb-1">Band members:</h4>
    <v-toolbar>
      <v-form>
        <v-container>
          <v-layout wrap>
            <v-flex md6>
              <v-text-field
                v-model="memberName"
                label="Member name"
              ></v-text-field>
            </v-flex>
            <v-flex md6>
              <v-select
                dense
                multiple
                :items="roles"
                v-model="memberRoles"
                label="Member roles"
              ></v-select>
            </v-flex>
          </v-layout>
        </v-container>
      </v-form>
      <v-spacer></v-spacer>
      <v-btn @click="members.push({ name: memberName, roles: memberRoles })"
        >Add</v-btn
      >
    </v-toolbar>
    <v-card max-height="150" height="150" class="scroll-y">
      <v-list>
        <v-list-tile :key="member.name" v-for="(member, index) in members">
          <v-list-tile-content>
            <v-list-tile-title>{{ member.name }}</v-list-tile-title>
            <v-list-tile-sub-title>
              <span :key="role" v-for="role in member.roles">{{ role }},</span>
            </v-list-tile-sub-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-btn @click="members.splice(index, 1)" icon ripple>
              <v-icon color="red">delete_forever</v-icon>
            </v-btn>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>
    </v-card>
  </v-sheet>
</template>

<style scoped>
.v-sheet {
  background-color: rgba(0, 0, 0, 0.06);
}
</style>

<script>
export default {
  data: () => ({
    roles: [],
    memberName: "",
    memberRoles: []
  }),
  created: function() {
    this.roles = [
      "Lead Singer",
      "Lead Guitars",
      "Guitars",
      "Piano",
      "Bass",
      "Drums",
      "Vocals",
      "Keyboard"
    ];
  },
  model: {
    prop: "members"
  },
  props: ["members"]
};
</script>
