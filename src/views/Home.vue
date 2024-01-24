<template>
  <v-skeleton-loader
    :loading="isLoading"
    v-if="isLoading"
    height="240"
    type="image, list-item-two-line"
  >
    <v-responsive>
      <v-img :src="src" class="rounded-lg mb-2" cover height="184"></v-img>

      <v-list-item
        :title="title"
        :subtitle="subtitle"
        class="px-0"
      ></v-list-item>
    </v-responsive>
  </v-skeleton-loader>
  <div v-else>
    <v-app-bar
      color="teal-darken-4"
      image="https://picsum.photos/1920/1080?random"
    >
      <template v-slot:image>
        <v-img
          gradient="to top right, rgba(5, 61, 150), rgba(128,208,199,.8)"
        ></v-img>
      </template>
      <v-app-bar-title>ລະບົບຈັດລາຍຊື່ນັກຮຽນ</v-app-bar-title>
      <v-spacer></v-spacer>

      <v-btn id="menu-activator" class="mx-12">
        <v-avatar>
          <v-img src="@/assets/man.png"></v-img>
        </v-avatar>
      </v-btn>

      <v-menu activator="#menu-activator">
        <v-card>
          <v-card-text>
            <div class="mx-auto text-center">
              <v-avatar color="brown">
                <v-img src="../assets/man.png"></v-img>
              </v-avatar>
              <h4 class="mt-1"></h4>
              <p class="text-caption">chanthakhaninsyxiengmai@gmail.com</p>
              <v-divider class="my-3"></v-divider>
              <v-btn rounded variant="text h6" :to="{ name: 'MyRoom' }">
                My Room
              </v-btn>
              <v-divider class="my-3"></v-divider>
              <v-btn rounded variant="text h6"> Logout </v-btn>
            </div>
          </v-card-text>
        </v-card>
      </v-menu>
    </v-app-bar>
    <v-main>
      <v-card elevation="8" class="ma-4 bg-white">
        <v-row class="ma-12 px-auto">
          <v-col sm="6" cols="12">
            <v-card
              color="primary"
              min-width="400"
              max-width="900"
              min-height="200"
              max-height="400"
              class="d-flex flex-column justify-center"
              @click="checkRegister()"
            >
              <h1 class="mx-auto">ເຊັກລາຍຊື່</h1>
            </v-card>

            <v-dialog v-model="showDialog" persistent width="400">
              <v-card>
                <v-card-title>
                  <span class="text-h5">Register</span>
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12">
                        <v-text-field
                          v-model="passcode"
                          label="Enter the room code"
                          variant="outlined"
                          required
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <small
                      v-show="errMessage != null && errMessage != undefined"
                      class="text"
                      >{{ errMessage }}</small
                    >
                  </v-container>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="blue-darken-1"
                    variant="text-red-darken-4"
                    @click="showDialog = false"
                  >
                    Cancel
                  </v-btn>
                  <v-btn
                    color="blue-darken-1"
                    variant="text"
                    @click="submitPasscode(passcode)"
                  >
                    Joint
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-col>

          <v-col sm="6" cols="12" v-for="item in jointedClasses" :key="item.classId">
            <v-card
              color="primary"
              min-width="400"
              max-width="900"
              min-height="200"
              max-height="400"
              image="https://picsum.photos/1920/1080?random"
              class="d-flex flex-column justify-center"
              :to="{name: 'List', params: {id: item.classId}}"
            >
              <template v-slot:image>
                <v-img
                  gradient="to top right, rgba(8, 103, 140), rgba(128,208,199,.8)"
                ></v-img>
              </template>
              <div class="mx-auto">
                <h4>{{ item.name }}</h4>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-card>
    </v-main>
  </div>
</template>

<script>
import { mapActions, mapState, mapWritableState } from "pinia";
import { classStores } from "@/stores/classStore";
import { authStore } from "@/stores/authStore";
export default {
  name: "HomePage",
  data() {
    return {
      passcode: undefined,
    };
  },
  computed: {
    ...mapWritableState(classStores, ["jointedClasses"]),
    ...mapWritableState(authStore, ["user"]),
    ...mapWritableState(classStores, ["showDialog"]),
    ...mapWritableState(classStores, ["errMessage"]),
    ...mapState(classStores, ["selectItem"]),
    ...mapState(classStores, ["isLoading"]),
  },
  methods: {
    submitPasscode() {
      if (this.passcode == null || this.passcode == undefined) {
        this.errMessage = "Please enter the correct code";
        return;
      }

      this.jointClass(this.passcode);
    },
    ...mapActions(classStores, ["getJointedClasses"]),
    ...mapActions(classStores, ["jointClass"]),
    ...mapActions(classStores, ["checkRegister"]),
  },
  async mounted() {
    this.showDialog = false;
    await this.getJointedClasses();
  },
};
</script>
