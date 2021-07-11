import { useState } from 'react';
import {db} from '../firebase.config'
import { auth } from "../firebase.config.js";

// agrega los usuarios a firestore (copia de users + info adicional)
const addUserToStore = async (user) => {
  db.collection('users').doc(user.uid).set({
    name:user.displayName,
    email:user.email,
    id:user.uid,
    phone:'12345'
  })
  .catch((error) => error);

}

const findUserById = async (id)=>{

  return new Promise ((resolve,reject)=>{
    db.collection('users').doc(id).get()
    .then((userRef)=>{
      resolve(userRef)
    })
    .catch((error)=>{
      reject(error)
    })
  })

}

const getCurrentUser = ()=>{
  return auth.currentUser
}

//TODO: Actualizar el usuario sus datos si llega a modificar name o correo -> updateUser

export {addUserToStore, findUserById, getCurrentUser}