import {db} from '../firebase.config'
import { auth } from "../firebase.config.js";

// agrega los usuarios a firestore (copia de users + info adicional)
const addUserToStore = async (user) => {
  db.collection('users').doc(user.uid).set({
    city: '',
    department:'',
    email:user.email,
    id:user.uid,
    name:user.displayName,
    phoneMain:'',
    phoneSecond:''
  })
  .catch((error) => error);

}

const findUserById = async (id)=>{

  return new Promise ((resolve,reject)=>{
    db.collection('users').doc(id).get()
    .then((userRef) =>{
      resolve(userRef.data())
    })
    .catch((error)=>{
      reject(error)
    })
  })

}

const updateUserInfo = async(id,info) =>{
  db.collection('users').doc(id).set(info)
    .then(()=>{
      console.log('Todo fine');
    })
    .catch((error) =>{
      console.error('error al sobre escribir la información:', error)
    })
}

const getCurrentUser = ()=>{
  return auth.currentUser
}

export {addUserToStore, findUserById, getCurrentUser, updateUserInfo}