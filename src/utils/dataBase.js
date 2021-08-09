import { db } from "../firebase.config";
import { auth } from "../firebase.config.js";
import { listToObject,textToKeywords,concatItems } from "./Helpers/conversionFunctions";

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
export const updateUserInfo = async(info) =>{

  const user = auth.currentUser

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

  //lista de precios concatenada con price ejm price__unidad
  const pricesKeywords = prices.map(price => `price__${price.name}`)

  //se cambia la estructura de prices por un objeto 
  const pricesList = listToObject(prices);
    
  //obtengo los elementos de la información básica
  const { userName, keywords, name, description,city }= basic 

  let info = {
    ...basic,
    photos: photosUrls,
    prices: pricesList,
    search: [...new Set([].concat(
      textToKeywords({text:userName}), 
      textToKeywords({text:name}),
      concatItems(textToKeywords({text:keywords,typeSplit:','}),name.toLowerCase()), 
      concatItems(textToKeywords({text:description}), name.toLowerCase()),
      concatItems(pricesKeywords, name.toLowerCase()),
    ))],
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
    
    //a cada unidad de precio le concateno price
    const pricesKeywords = prices.map(price => `price__${price.name}`)
    
    //se cambia la estructura de prices por un objeto 
    const pricesList = listToObject(prices);

    let productInfo = {
      ...basic,
      photos: [].concat(previousPhotosUrls,newPhotosUrls),
      prices: pricesList,
      search: [...new Set([].concat(
          textToKeywords({text:userName}), 
          textToKeywords({text:name}),
          concatItems(textToKeywords({text:keywords,typeSplit:','}),name.toLowerCase()), 
          concatItems(textToKeywords({text:description}), name.toLowerCase()),
          concatItems(pricesKeywords, name.toLowerCase())
          ))],
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
  console.log(filter);

  try{

    let products = db.collection('products').where('avaliable','==','true')
    let searchList = []

    if(category !== 'All'){
        products = products.where('category','==',category)
      }


    if(querySearch){
      searchList.push(querySearch)
    }


    //if(filter.length > 0){
    //   listaBuscar = listBuscar.concat(filter)
    // }

    if(searchList.length > 0){
      products = products.where('search','array-contains-any',searchList)
    }

    
    //uvas

      //u__price__libra__ubicacion__villavicencio
      //uv
      //uva
      //uvas

      //v
      //va
      //vas

      //a
      //as


    //videño

      //v
      //vi
  
    // n * m * 1 * 1 * 1

    // uvas__price__libra__ubicacion__villavicencio
    // uvas__price__libra__ubicacion__villavicencio
    // uvas__price__libra__ubicacion__villavicencio

    // uvas__price__libra__ubicacion__puertolleras


    //where('search','array-contains-any',[uvas,price__libra])       //todos los que contenga libra o contengan buenas 

    //where('search','array-contains-any',[uvas__price__libra])      //todos los que contenga (libra y buenas)


    //where('search','array-contains-any',[uvas__price__libra,villavicencio]) //todos los que contenga (uvas y libra) o contengan (villavicencio)


    //filtro multiple? [villavicencio,puerto lleras]

  

    
    let data = await products.limit(20).get()

    console.log(data);

    return   data.docs.map((doc) =>({...doc.data(),id:doc.id}))

  }catch(err){
    throw new Error(`getProductsBySearch ${err}`)
  }
}

// function buildKeyWords(text){

//   const listWords = text.split(' ')

//   const keyWords = {}

//   listWords.forEach(word=>{
    
//     const listWord = word.split('')

//     for(const i = 0; i < listWord.length; i++){
//       keyWords[word.slice()]
//     }

//   })

// }


// buildKeyWords('hola esto sera un texto')


// //hola
//   //h
//   //ho
//   //hol
//   //hola

//   //o
//   //ol
//   //ola

//   //l
//   //la

// //esto
//   //e
//   //es
//   //est
  //esto