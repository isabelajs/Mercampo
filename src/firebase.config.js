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


//auth se vuelve a crear, revisa cookies o la base de datos firebase -> quienes estan logueados
//base de datos y dijo ese man ya no tiene accceso se deslogueo, 

//activar el evento onAuthStateChange -> 
const auth = firebase.auth()
const db = firebase.firestore()


//subscripcion para ver el cambio de estado en el usuario
// auth.onAuthStateChanged((user)=>{
//   console.log(user)
// })

export {auth,db}