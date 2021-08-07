import { auth, authGoogleProvider, localPersistence, credentialWithEmail} from "../firebase.config.js";
import { registerUser } from "./dataBase.js";
//  https://stackoverflow.com/questions/43503377/cloud-functions-for-firebase-action-on-email-verified -> no existe funcion que dispare el evento de confirmacion

const signUpWithEmail = (email, password, name) => {

  const nameForAvatar = name.split(' ').slice(0,2).join('+')
  const randomColor = Math.floor(Math.random()*16777215).toString(16)
  const gravatar= `https://ui-avatars.com/api/?name=${nameForAvatar}&background=${randomColor}`

  return new Promise((resolve, reject) => {
    auth
      .createUserWithEmailAndPassword(email, password)

      // Update user of auth
      .then((credential) => {
        credential.user.updateProfile({
          displayName: name,
          photoURL:gravatar,
        });

        return credential.user;
      })
      
      // send verification email -> user{original}
      .then((user) => {
        user.sendEmailVerification();
        return user;
      })

      //add user in store (is not equal tu user of auth) 
      .then((user)=>{
        return registerUser({email,name,gravatar,uid:user.uid})
      })

      //return -> user{name,email,uid} and logout (if not logout error in login without refresh)
      .then((user) => {
        // auth.signOut()
        resolve(user);
      })

      //detecto si fallo algo en alguna parte de las promesas
      .catch((error) => {
        reject(error);
      });
  });
};

//ingresa sesión con correo y contraseña
const signInWithEmail = (email, password) => {
  return new Promise((resolve, reject) => {
    auth
      .setPersistence(localPersistence)
      .then(()=> auth.signInWithEmailAndPassword(email, password))
      .then((credential) => resolve(credential.user))
      .catch((error) => reject(error));
  });
};

const signInWithGoogle = () => {
  return new Promise((resolve, reject) => {
    auth
      .signInWithPopup(authGoogleProvider)
      .then((credential) =>resolve(credential))
      .catch((error) => reject(error));
  });
};

//cierra sesión
const signOut = () => {
  return new Promise((resolve, reject) => {
    auth
      .signOut()
      .then(() => resolve())
      .catch((error) => reject(error));
  });
};

const passwordReset = (email) =>{
  return new Promise((resolve,reject)=>{
    auth.sendPasswordResetEmail(email)
    .then(()=>resolve('Mensaje enviado'))
    .catch((err)=>reject(err))
  })
}

const changePassword = (password,newPassword) =>{

  const user = auth.currentUser

  return new Promise((resolve,reject)=>{
    user.reauthenticateWithCredential(credentialWithEmail(user.email,password))
      .then(()=> user.updatePassword(newPassword))
      .then(()=> resolve({user:user,message:'Password Cambiado con exito'}))
      .catch((err)=>reject(err))
  })
}

export {signUpWithEmail,
        signInWithEmail,
        signOut,
        passwordReset,
        changePassword
      };
