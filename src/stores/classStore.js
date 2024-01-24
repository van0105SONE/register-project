import { defineStore } from "pinia";
import {
  collection,
  getDocs,
  getDoc,
  query,
  where,
  doc,
  addDoc,
  Timestamp,
} from "firebase/firestore"
import { db } from "@/FirebaseConfig";
import router from "@/router";

export const classStores = defineStore("classRoom", {
  state: () => {
    return {
      classrooms: [],
      jointedClasses: [],
      students: [],
      showDialog: false,
      selectItem: null,
      errMessage: null,
      isLoading: false,
      isFormLoading: false,
      errFormMessage: null,
    };
  },
  getters: {},
  actions: {


    async GetMyClasses() {
      this.isLoading = true;
      this.classrooms = [];
      var userId = localStorage.getItem('uid');
      const myClassRef = collection(db, "classrooms");
      const condition = query(myClassRef, where("uid", "==", userId));
      const querySnapshot = await getDocs(condition);
      querySnapshot.forEach((doc) => {
        let item = {
          id: doc.id,
          name: doc.data().name,
          createAt: doc.data().createAt,
          location: doc.data().location,
        };
        this.classrooms.push(item);
      });
      this.isLoading = false;
    },
    
    async getJointedClasses(){
        var userId = localStorage.getItem('uid')

        if(userId){
          let studentRef = collection(db, "students");
          const condition1 = query(studentRef, where("userId", "==", userId));
          const studentSnapshot = await getDocs(condition1);
          let classIdList = []
          studentSnapshot.forEach((doc)=>{
            classIdList.push(doc.data().classId)
          })

          classIdList.forEach( async (id)=>{
            const myClassRef = doc(db, "classrooms", id);
            const querySnapshot = await getDoc(myClassRef);
            var item = {classId:querySnapshot.id,name:querySnapshot.data().name,location: querySnapshot.data().location, userId:querySnapshot.data().uid };
            this.jointedClasses.push(item)
          })
        }else{
          throw new Error("user id is undefined")
        }

    },

    async GetStudents(classId) {
      try {
        this.students = [];
        const studentRef = collection(db, "students");
        const q = query(studentRef, where("classId", "==", classId));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          let item = {
            id: doc.id,
            fname: doc.data().fname,
            lname: doc.data().lname,
            studentClass: doc.data().studentClass,
            createAt: doc.data().createAt,
          };
          this.students.push(item);
        });
      } catch (err) {
        throw new Error("unable to load the students");
      }
    },

    async createRoom(roomName) {
      try{
        this.isFormLoading = true;
        let dateTime = new Date(Date.now());
        await navigator.geolocation.getCurrentPosition((position) => {
          const langtitude = position.coords.latitude;
          const longtitude = position.coords.longitude;
          var userId = localStorage.getItem('uid')
          if(userId){
            let room = {
              name: roomName,
              createAt: Timestamp.fromDate(dateTime),
              location: {
                longtitude: longtitude,
                langtitude: langtitude,
              },
              endAt: Timestamp.fromDate(dateTime),
              uid: userId,
            };
            const classRef = collection(db, "classrooms");
            addDoc(classRef, room);
            this.isFormLoading = false;
            router.push({name: 'MyRoom'})
          }else{
             this.errFormMessage = "something went wront!!"
          }
        });
      }catch(err){
        this.errFormMessage = "Something went wrong!!"
      }

    },
    async checkRegister(){
         this.showDialog = true;
    },
    async jointClass(passcode) {
      this.errMessage = null;
      await  navigator.geolocation.getCurrentPosition(async (position)=>{
        const docRef = doc(db, "classrooms", passcode);
        const docSnap = await getDoc(docRef);
        var location1 = docSnap.data().location;
        var lat1 = location1.langtitude;
        var lon1 = location1.longtitude;
       var distance = this.calculateDistance(lat1, lon1, position.coords.latitude, position.coords.longitude)
       if(distance < 0.5){
        var userId = localStorage.getItem('uid');
        if(userId){  
          if (docSnap.exists()) {
            var userList = [];
            const userRef = collection(db, "users");
            const q = query(userRef, where("userId", "==", userId));
            const userSnapshot = await getDocs(q);
          

            userSnapshot.forEach((item) => {
              var user = {
                userId: item.data().userId,
                fname: item.data().fname,
                lname: item.data().lnam,
                className: item.data().className
              };
              userList.push(user);
            });
            if(userList.length > 0){
              let dateTime = new Date(Date.now());
              var newUser = userList[0];
              console.log(newUser)
              var userCheckList = {
                userId: newUser.userId,
                fname: newUser.fname,
                lname: newUser.lname,
                studentClass:  newUser.className,
                classId: docSnap.id,
                className: docSnap.data().name,
                createAt: Timestamp.fromDate(dateTime),

              };
                const studentsRef = collection(db, "students");
                addDoc(studentsRef, userCheckList);
                this.showDialog = false;
                router.push({name: 'Class', params:{id:docSnap.id }})
            }else {
              console.log("No such user!");
            }
          } else {
            console.log("No such document!");
          }
        }else{
          throw new Error("unable to register")
        }
       }else{
        this.errMessage = `You are ${distance.toFixed(2)} km away from the place`
        throw new Error("Your are too far from room")
       }

  
      })

    },

    calculateDistance(lat1, lon1, lat2, lon2){
       var R = 6371
       var dLat = this.toRad(lat2 - lat1)
       var dLon = this.toRad(lon2 - lon1)
       lat1 = this.toRad(lat1)
       lat2 = this.toRad(lat2)
       var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
       Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
       console.log(a)
     var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
     var d = R * c;
     return d;
    },

    toRad(value){
      return value * (Math.PI / 180);
    }
  },
});
