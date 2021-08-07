import firebase from 'firebase/app';
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig={
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId:process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID
}

firebase.initializeApp(firebaseConfig)



const auth = firebase.auth()
const db = firebase.firestore()
const authGoogleProvider = new firebase.auth.GoogleAuthProvider();
const sessionPersistence = firebase.auth.Auth.Persistence.SESSION
const localPersistence = firebase.auth.Auth.Persistence.LOCAL
const credentialWithEmail = firebase.auth.EmailAuthProvider.credential


export {auth,db , authGoogleProvider, localPersistence, credentialWithEmail}