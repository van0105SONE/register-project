<template>
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
    <v-row class="mx-4" justify="between">
      <v-col cols="8">
        <v-text-field
          v-model="passcode"
          append-icon="mdi-paperclip"
          :prepend-icon="icon"
          variant="outlined"
          clear-icon="mdi-close-circle"
          clearable
          label="Passcode"
          type="text"
          @click:append="copyPasscode"
        ></v-text-field>
      </v-col>

      <v-col cols="2">
        <v-btn size="50"  @click="exportExcel()">
          <v-icon icon="mdi-arrow-down" size="40"/>
        </v-btn>
      </v-col>
    </v-row>
    <v-card elevation="8" class="ma-4 bg-white">
      <v-table id="check-list" height="500px" class="bg-white">
        <thead>
          <tr>
            <th class="text-left">ຊື່ ແລະ ນາມສະກຸນ</th>
            <th class="text-left">ຫ້ອງ</th>
            <th class="text-left">ເວລາມາຮອດ</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in students" :key="item.name">
            <td>{{ item.fname + " " + item.lname }}</td>
            <td>{{ item.studentClass }}</td>
            <td>{{ item.createAt.toDate().toDateString() + " -- " +item.createAt.toDate().toLocaleTimeString('en-US') }}</td>
          </tr>
        </tbody>
      </v-table>
    </v-card>
  </v-main>
</template>

<script>
import { mapActions, mapState } from "pinia";
import { classStores } from "@/stores/classStore";

import {  utils, writeFileXLSX } from 'xlsx';

export default {
  name: "StudentPage",
  data() {
    return {
      passcode: null,
    };
  },
  computed: {
    ...mapState(classStores, ["students"]),
  },
  methods: {
    exportExcel() {
      /* generate worksheet from state */
  const ws = utils.json_to_sheet(this.students);
  /* create workbook and append worksheet */
  const wb = utils.book_new();
  utils.book_append_sheet(wb, ws, "Data");
  /* export to XLSX */
  writeFileXLSX(wb, "SheetJSVueAoO.xlsx");
    },
    copyPasscode() {
      navigator.clipboard.writeText(this.passcode);
    },
    ...mapActions(classStores, ["GetStudents"]),
  },
  mounted() {
    this.passcode = this.$route.params.id;
    this.GetStudents(this.$route.params.id);
  },
};
</script>