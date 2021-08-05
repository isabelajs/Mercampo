import { db } from "../firebase.config";
import { auth } from "../firebase.config.js";
import { listToObject,textToKeywords } from "./Helpers/conversionFunctions";

// agrega los usuarios a firestore (copia de users + info adicional)
export const registerUser = (user) => {

  return new Promise((resolve,reject)=>{
    db.collection('users')
    .doc(user.uid)
    .set({
      city: "",
      department: "",
      email: user.email,
      id: '',
      name: user.name,
      phoneMain: "",
      phoneSecond: "",
      photo:user.gravatar,
    })
    .then(()=>resolve(user))
    .catch(err=>reject(`RegisterUser -> ${err}`))
  })

};

//encuentra un usuaruo por su id
export const findUserById = (id) => {
  return new Promise((resolve, reject) => {
    db.collection("users")
      .doc(id)
      .get()
      .then((userRef) => {
        resolve(userRef.data());
      })
      .catch((error) => {
        reject(error);
      });
  });
};

//Upload img to server IMGBB
export const uploadImg = async (img) => {
  const data = new FormData();
  data.append("image", img);

  const options = {
    method: "POST",
    body: data,
  };

  try {
    const data = await fetch(
      `https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_TOKEN_IMGBB}`,
      options
    );
    const response = await data.json();
    return response;
  } catch (err) {
    throw new Error(`UploadImg -> ${err}`);
  }
};

//actualizar la info de un usuario
export const updateUserInfo = async(user,info) =>{

  //data by default
  let userData = {
    ...info,
    photo: info.photo.url,
  };

  try {
    //if info has a fileImg to upload
    if (info.photo.file) {
      const urlImgFetched = await uploadImg(info.photo.file);
      console.log(urlImgFetched);
      userData = {
        ...info,
        photo: urlImgFetched.data.url,
      };
    }

    //post user information
    await db.collection("users").doc(user.uid).set(userData);

    // await db.collection('users').doc(id).update({photoURL: userData.photo})

    await user.updateProfile({
      photoURL: userData.photo,
    });
  } catch (err) {
    throw new Error(`UpdateUserInfo -> ${err}`);
  }
};

//obtener el estado actual del usuario
export const getCurrentUser = ()=>{
  return auth.currentUser
}

//funciones sobre base de dato de los productos

//se agrega un producto
export const addProductToStore = async (basic, photos, prices)=>{

  //lista de promesas (envio de photos)
  const resultPostPhotos = await Promise.all(photos.map((photo)=> uploadImg(photo.file)))

  //obtengo las urls de las imagenes
  const photosUrls = resultPostPhotos.map(({ data: { url } }) => url);

  //se cambia la estructura de prices por un objeto
  const pricesList = listToObject(prices);

  //agrego el campo search
  const { userName, keywords, name, description }= basic 

  let info = {
    ...basic,
    photos: photosUrls,
    prices: pricesList,
    search: [].concat(textToKeywords({text:userName}), textToKeywords({text:keywords,typeSplit:','}), textToKeywords({text:name}), textToKeywords({text:description}))
  };

  try {
    db.collection("products").doc().set(info);
  } catch (error) {
    throw new Error(`addProduct -> ${error}`);
  }
}

//se actualiza un producto
export const updateProduct = async (id,basic, photos, prices)=>{

  try{

    const { userName, keywords, name, description }= basic 
    
    const previousPhotosUrls = photos.filter(photo=> !photo.hasOwnProperty('file')).map( photo => photo.url)

    const newPhotos = photos.filter(photo=> photo.hasOwnProperty('file'))

    const resultPostPhotos = await Promise.all(newPhotos.map((photo)=> uploadImg(photo.file)))

    const newPhotosUrls = resultPostPhotos.map( ({data:{url}}) => url )
 
    const pricesList = listToObject(prices);

    let productInfo = {
      ...basic,
      photos: [].concat(previousPhotosUrls,newPhotosUrls),
      prices: pricesList,
      search: [].concat(textToKeywords({text:userName}), textToKeywords({text:keywords,typeSplit:','}), textToKeywords({text:name}), textToKeywords({text:description}))
    }

    await db.collection('products').doc(id).set(productInfo)
    
  }catch(err){
    throw new Error(`UpdateProduct -> ${err}`)
  }
}

//obtengo todos los productos de un usuario en la coleccion de productos
export const getProductsByUser = async ( id )=>{
  try{
    let querySnapshot = await db.collection('products').where('userId', '==', id).get()
    const products = querySnapshot.docs.map(doc => {
      return {id:doc.id,...doc.data()}
    } )
    const productsAvaliables =products.filter(product=> product.avaliable === 'true').length
    const productsNotAvaliables = products.length - productsAvaliables
    return {products, productsAvaliables, productsNotAvaliables}
  }catch(err){
    throw new Error(`getProductByUser -> ${err}`)
  }
};

//obtengo el producto de acuerdo a su id
export const getProductById = async ( id )=>{
  try{
    let querySnapshot = await db.collection('products').doc(id).get()
    return querySnapshot.data()
  }catch(err){
    throw new Error(`getProductById -> ${err}`)
  }
};

//obtengo todos los productos disponibles
export const getAllProducts = async () => {
  try {
    let data = await db.collection("products").where('avaliable','==','true').limit(20).get();
    return data.docs.map((doc) =>({...doc.data(),id:doc.id}))
  } catch (err) {
    throw new Error(`getAllProducts -> ${err}`);
  }
};

//obtengo los productos por medio del search
export const getProductsByFilters = async (querySearch, category, filter) =>{

  try{

    let products = db.collection('products').where('avaliable','==','true')

    if(category !== 'All'){
        products = products.where('category','==',category)
      }
    
      
    // if(filter.length > 0){
    //   products = products.where(`${'prices'.filter[0]}, '>=','0'`)
    // }

    if(querySearch !== ''){
      products = products.where('search','array-contains',querySearch)
    }
    
    
    let data = await products.limit(20).get()

    return   data.docs.map((doc) =>({...doc.data(),id:doc.id}))




 


  }catch(err){

    throw new Error(`getProductsBySearch ${err}`)
  }
}


