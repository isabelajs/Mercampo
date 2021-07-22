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

//Upload img to server IMGBB
const uploadImg = async (img)=>{

  const data = new FormData()
  data.append('image',img)

  const options ={
    method:'POST',
    body:data,
  }

  try{
    const data = await fetch(`https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_TOKEN_IMGBB}`,options)
    const response = await data.json()
    return response
  }
  catch(err){
    throw new Error(`UploadImg -> ${err}`)
  }

}


const updateUserInfo = async(id,info) =>{

  //data by default
  let userData = {
    ...info,
    photo: info.photo.url
  }

  try{

    //if info has a fileImg to upload 
    if(info.photo.file){
      const urlImgFetched = await uploadImg(info.photo.file)

      userData = {
        ...info,
        photo: urlImgFetched.data.url
      }
    }
    
    //post user information
    await db.collection('users').doc(id).set(userData)

  }catch(err){
    throw new Error(`UpdateUserInfo -> ${err}`)
  }

}

const getCurrentUser = ()=>{
  return auth.currentUser
}

export {addUserToStore, findUserById, getCurrentUser, updateUserInfo}