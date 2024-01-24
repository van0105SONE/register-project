<template>
  <v-parallax
    class="w-100 h-100"
    src="https://images.pexels.com/photos/4019754/pexels-photo-4019754.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  >
    <div class="h-75 d-flex flex-column justify-center">
      <v-card elevation="10" min-width="400" max-width="500" class="mx-auto">
        <v-form class="mx-12 my-12" v-show="isLogIn == 1">
          <v-text-field
            v-model="email"
            label="Email"
            variant="outlined"
          ></v-text-field>

          <v-text-field
            v-model="password"
            label="Password"
            variant="outlined"
          ></v-text-field>

          <small class="text-red-lighten-1 my-4">{{ errMessage }}</small>
          
          <v-btn
            :loading="isLoading"
            color="primary"
            class="w-100"
            @click="logIn(email, password)"
            >ເຂົ້າຊູ່ລະບົບ</v-btn
          >
        </v-form>

        <v-form v-show="isLogIn == 2" class="mx-12 my-12" ref="form" @click.prevent="(e)=> e.preventDefault()">
          <v-text-field
            v-model="registerForm.fname"
            label="First name"
            variant="outlined"
          >
          </v-text-field>

          <v-text-field
            v-model="registerForm.lname"
            label="Last name"
            variant="outlined"
          >
          </v-text-field>

          <v-text-field
            v-model="registerForm.email"
            label="Email"
            variant="outlined"
          ></v-text-field>

          <v-text-field
            v-model="registerForm.className"
            label="Class's name"
            variant="outlined"
          ></v-text-field>

          <v-text-field
            v-model="registerForm.password"
            label="Password"
            variant="outlined"
          ></v-text-field>

          <v-text-field
            v-model="registerForm.cfPassword"
            label="Confirm password"
            :rules="passwordRules"
            variant="outlined"
          ></v-text-field>

           <small class="text-red-lighten-1 my-4">{{ errMessage }}</small>

          <v-btn
            :loading="isLoading"
            block
            color="primary"
            size="large"
            type="submit"
            variant="elevated"
            @click="register(registerForm)"
            >ສະມັກ</v-btn
          >
        </v-form>
        <div class="d-flex justify-center">
          <v-btn-toggle
            v-model="text"
            rounded="0"
            color="deep-purple-accent-3"
            group
            class="my-4"
          >
            <v-btn active value="center" @click="isLogIn = 1; errMessage = ''"> Log in </v-btn>

            <v-btn value="right" @click="isLogIn = 2; errMessage = ''"> Register </v-btn>
          </v-btn-toggle>
        </div>
      </v-card>
    </div>
  </v-parallax>
</template>

<script>
import { mapActions, mapState, mapWritableState } from "pinia";
import { authStore } from "@/stores/authStore";
export default {
  name: "LogIn",
  data() {
    return {
      email: undefined,
      password: undefined,

      registerForm: {
        fname: undefined,
        lname: undefined,
        email: undefined,
        className: undefined,
        password: undefined,
        cfPassword: undefined,
      },
      passwordRules: [
        (v) => !!v || "Please! Enter password",
        (v) =>
          (v && v === this.registerForm.password) || "Password isn't match",
      ],
    };
  },
  computed: {
    ...mapState(authStore, ["user"]),
    ...mapWritableState(authStore, ["isLoading"]),
    ...mapWritableState(authStore, ["errMessage"]),
    ...mapWritableState(authStore, ['isLogIn'])
  },
  methods: {
    ...mapActions(authStore, ["register"]),
    ...mapActions(authStore, ["logIn"]),
  },
};
</script>