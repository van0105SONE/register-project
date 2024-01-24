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
        <v-table height="500px" class="bg-white">
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
              <td>{{item.studentClass}}</td>
              <td>{{item.createAt.toDate().toDateString() + " -- " +item.createAt.toDate().toLocaleTimeString('en-US')}}</td>
            </tr>
          </tbody>
        </v-table>
      </v-card>
    </v-main>
  </div>
</template>
<script>
import { mapActions, mapState} from 'pinia'
import { classStores } from '@/stores/classStore';
export default{
  name: 'DetailList',
  data(){
    return{

    }
  },
  computed:{
     ...mapState(classStores, ['students'])
  },
  methods:{
    ...mapActions(classStores, ["GetStudents"])
  },
  mounted(){
     var id  = this.$route.params.id;
     this.GetStudents(id);
  }
}
</script>