import firebase from 'firebase/app';
import "firebase/auth";
import "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyCup4iPQ5AvmAB_jn2vYMsSWvSk9UJuNPs",
  authDomain: "mercampo-a82b0.firebaseapp.com",
  projectId: "mercampo-a82b0",
  storageBucket: "mercampo-a82b0.appspot.com",
  messagingSenderId: "541415259968",
  appId: "1:541415259968:web:d06668d096bc6e94bbc4a5",
  measurementId: "G-PPQK1T1TBD"
};


firebase.initializeApp(firebaseConfig)


const auth = firebase.auth()
const db = firebase.firestore()


export {auth,db}