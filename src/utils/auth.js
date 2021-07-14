import { auth } from "../firebase.config.js";


//TODO: IMPLEMENTAR EL USERNAME... user.update(displayName:)
// estuve buscando si se podia ejecutar una accion cuando el usuario confirme su correo, pero no..
// a si que basicamente no podemos dejar loguear gente que no tenga su correo confirmado
// era para que la accion de  confirmar el correo disparara una funcion que creara 
// en firestore un documento con los datos ejemplo {name, email, telefono, telefono-2, etc..}
// pero esto fuera solo creado cuando se confirme el email, cosa que.... no es posible
//  https://stackoverflow.com/questions/43503377/cloud-functions-for-firebase-action-on-email-verified
// en este link explica que por defecto no existe esa funcion en firebase

//asi que aunque el usuario no halla confirmado el correo debemos crear un doc con los datos del usuario


//crea un usuario
const createUser = async (email, password, name) => {
  return new Promise((resolve, reject) => {
    auth.createUserWithEmailAndPassword(email, password)

    //le añado el nombre
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
const singInWithEmail = async (email, password) =>{

  return new Promise((resolve,reject)=>{
    auth.signInWithEmailAndPassword(email,password)
    .then((credential)=>resolve(credential.user))
    .catch((error)=>reject(error))
  })
}

//cierra sesión
const signOff = async()=>{
  auth.signOut()
    .then( ()=>{
      console.log('cerramos sesión')
    })
    .catch((error)=>{
      console.log(error.message)
    })
}


export {createUser, singInWithEmail, signOff};



//si te logueas con un email 

  //existo

    //no esta verificado

      //not isInUserCollection

        //addUserToCollectionStore


    //isVerified
      // redirect to home


  //catch (posibles errores)

    //auth/user-not-found
    //error en pregunta de usercollection
    //error en addusertocollection





//ese logueado tiene que ser guardada la token en localstore o en cookies 

  //