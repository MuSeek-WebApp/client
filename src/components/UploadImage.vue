<template>
  <v-layout align-start row>
    <v-icon class="mr-2 mt-3">photo</v-icon>
    <v-flex grow>
      <v-card>
        <v-card-text>
          <v-layout wrap>
            <v-flex
              :key="index"
              v-for="(imageUrl, index) in value"
              md4
              class="text-md-right"
            >
              <v-img
                :src="imageUrl"
                aspect-ratio="2"
                class="ma-1 event-image"
                @mouseover="showRemove = index"
                @mouseleave="showRemove = -1"
              >
                <template v-if="showRemove === index">
                  <v-btn
                    dark
                    icon
                    style="opacity:1"
                    @click="removeImage(index)"
                  >
                    <v-icon large>cancel</v-icon>
                  </v-btn>
                </template>
              </v-img>
            </v-flex>
          </v-layout>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <input
            class="hide"
            type="file"
            accept=".png, .jpg, .jpeg"
            @change="uploadImage"
            ref="imageInput"
          />
          <v-btn
            @click="$refs.imageInput.click()"
            :loading="uploading"
            :disabled="uploading"
          >
            UPLOAD
            <v-icon right>cloud_upload</v-icon>
          </v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import ApiService from "../common/api.service";

export default {
  name: "UploadImage",
  props: ["value"],
  data: function() {
    return {
      uploading: false,
      showRemove: -1
    };
  },
  methods: {
    removeImage(index) {
      this.value.splice(index, 1);
    },
    async uploadImage(event) {
      try {
        this.uploading = true;
        const selectedFile = event.target.files[0];
        const fd = new FormData();
        fd.append("image", selectedFile, selectedFile.name);
        const { data } = await ApiService.post("/api/event/uploadImage", fd);
        this.value.push(data.url);
      } catch (error) {
        // show something to user that upload failed
      } finally {
        this.uploading = false;
      }
    }
  }
};
</script>

<style scoped>
.event-image:hover {
  opacity: 0.8;
}
.hide {
  display: none;
}
</style>
