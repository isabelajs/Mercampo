import { auth } from "../firebase.config.js";
//  https://stackoverflow.com/questions/43503377/cloud-functions-for-firebase-action-on-email-verified -> no existe funcion que dispare el evento de confirmacion

//FIXME: Viabilidad de crear el usuario en store inmediatamente o solo cuando se loguee por primera vez... 
const createUser = async (email, password, name) => {
  return new Promise((resolve, reject) => {
    auth.createUserWithEmailAndPassword(email, password)

    //creo el dato en display name
    .then((credential) => {
      credential.user.updateProfile({
        displayName: name
      });
      return credential
    })

    //espero que el usuario se cree y envio un correo de verificacion
      .then((credential) => {
        credential.user.sendEmailVerification();
        return credential
      })

    //ejecuto el signout para no estar logueado
      .then((credential)=>{
        auth.signOut();
        return credential
      })

    //resuelvo la promesa original 
      .then((credential)=>{
        resolve(credential.user);
      })
    
    //detecto si fallo algo en alguna parte de las promesas
      .catch((error) => {
        reject(error);
      });
  });
};

//ingresa sesión con correo y contraseña
const singInWithEmail = (email, password) =>{
  return new Promise((resolve,reject)=>{
    auth.signInWithEmailAndPassword(email,password)
    .then((credential)=> resolve(credential.user))
    .catch((error)=>reject(error))
  })
}

//cierra sesión
const signOut = ()=>{
  return new Promise ((resolve,reject)=>{
    auth.signOut()
    .then(()=> resolve())
    .catch((error)=> reject(error))
  })
}


export {createUser, singInWithEmail, signOut};