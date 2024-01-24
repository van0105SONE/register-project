import { auth } from "@/FirebaseConfig";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import {
  doc,
  setDoc
} from "firebase/firestore";
import { db } from "@/FirebaseConfig";
import router from "@/router";
import { defineStore } from "pinia";

export const authStore = defineStore("authUser", {
  state: () => {
    return {
      user: null,
      isLoading: false,
      errMessage: null,
      isLogIn: 1,
    };
  },
  getters: {},
  actions: {
    async logIn(email, password){
      if(email == null || email == undefined){
        this.errMessage = "Please enter your email address"
         return;
      }else if(password == null || password ==  undefined){
        this.errMessage = "Please enter your password"
         return;
      }

      this.isLoading = true;
     const response = await signInWithEmailAndPassword(auth, email, password)
     if(response){
         this.user = response.user;
         localStorage.setItem('uid', response.user.uid)
         this.isLoading = false;
         router.push('/home');
     }else{
      this.isLoading = false;
      this.errMessage = "Unable to sign in"
      throw new Error("unable to sig in")
     }
    },
    async register(userParam) {
      console.log(userParam)
      if(userParam.password != userParam.cfPassword){
        return;
      }else if(userParam.fname == null && userParam.fname == undefined){
        return;
      }else if(userParam.lname == null && userParam.lname == undefined){
        return;
      }else if(userParam.className == null && userParam.className == undefined){
        return;
      }
      const response = await createUserWithEmailAndPassword(
        auth,
        userParam.email,
        userParam.password
      );

      if (response) {
        var newUser = { 
          userId: response.user.uid,
          fname: userParam.fname,
          lnam:  userParam.lname,
          className: userParam.className
        }
        setDoc(doc(db, 'users',response.user.uid,), newUser);
        this.user = response.user;
        localStorage.setItem('uid', response.user.uid)
        this.isLogIn = 1
      }else{
        this.errMessage = "Something went wrong. please contact developer"
        throw new Error("Unable to register new user")
      }
    }
  },
});
