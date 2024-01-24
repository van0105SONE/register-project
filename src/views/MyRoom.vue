<template>
  <div>
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
              <v-btn rounded variant="text h6"> My Room </v-btn>
              <v-divider class="my-3"></v-divider>
              <v-btn rounded variant="text h6"> Logout </v-btn>
            </div>
          </v-card-text>
        </v-card>
      </v-menu>
    </v-app-bar>

    <v-main>
      <v-card elevation="8" class="ma-4 bg-white">
        <v-row>
          <v-col cols="12" v-for="item in classrooms" :key="item.id">
            <v-card
              min-height="200"
              max-height="600"
              color="primary"
              class="d-flex flex-column justify-center ma-4"
              :to="{name: 'Class', params: {id:item.id}}"
            >
              <h1 class="mx-auto">{{ item.name }}</h1>
            </v-card>
          </v-col>
          <v-col cols="12">
            <v-card
              min-height="200"
              max-height="600"
              color="primary"
              class="d-flex flex-column justify-center ma-4"
              :to="{ name: 'Create' }"
            >
              <v-icon class="mx-auto" size="40" icon="mdi-plus"></v-icon>
            </v-card>
          </v-col>
        </v-row>
      </v-card>
    </v-main>
  </div>
</template>

<script>
import { mapActions, mapState } from "pinia";
import { classStores } from "@/stores/classStore";
export default {
  name: "MyRoom",
  data() {
    return {};
  },
  computed: {
    ...mapState(classStores, ["classrooms"]),
  },
  methods: {
    ...mapActions(classStores, ["GetMyClasses"]),
  },
  mounted() {
    this.GetMyClasses();
  },
};
</script>