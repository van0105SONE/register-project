<template>
  <v-card elevation="8" class="ma-12">
    <v-form>
      <v-container>
        <v-row>
          <v-col cols="12" sm="12">
            <v-text-field label="Room's name" v-model="roomName" variant="outlined"></v-text-field>
          </v-col>
          <small>{{ this.errFormMessage }}</small>
          <v-col>
            <v-btn :loading="isFormLoading" class="w-100 bg-primary" @click="createRoom(roomName)">Create</v-btn>
          </v-col>
        </v-row>
      </v-container>

    </v-form>
  </v-card>
</template>

<script>
import { mapActions, mapState } from 'pinia'
import { classStores } from '@/stores/classStore';
export default{
    name: 'FormCreate',
    data(){
        return {
            roomName: undefined
        }
    },
    computed:{
      ...mapState(classStores, ['isFormLoading']),
      ...mapState(classStores, ['errFormMessage'])
    },
    methods:{
        ...mapActions(classStores, ['createRoom'])
    }
}
</script>