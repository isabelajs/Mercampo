import { db } from "../firebase.config";
import { auth } from "../firebase.config.js";
import { listToObject,textToKeywords, newNameList, buildKeywords, replaceVowelsTick, concatItems} from "@helpers/conversionFunctions";

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

// export const findUserByEmail = (email) =>{
//   return new Promise((resolve,reject)=>{-
//     db.collection('users')
//       .where('email','==', email)
//       .get()
//       .then(users=>{
//         resolve(users.docs.map(user=>user.data()))
//       })
//       .catch(err=> reject(err))
//   })
// }

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

  const date = new Date(Date.now())

  //obtengo las urls de las imagenes
  const photosUrls = resultPostPhotos.map(({ data: { url } }) => url);

  //se cambia la estructura de prices por un objeto 
  const pricesObject = listToObject(prices);
    
  //obtengo los elementos de la información básica
  const { userName, keywords, name, description,city }= basic 

  //concateno todos los valores
  const newKeywords = [...new Set([].concat(
    newNameList(userName),
    newNameList(name),
    textToKeywords({text:keywords,typeSplit:','}),
    textToKeywords({text:description}),
    ))]

  const filtersType = {
    prices: Object.keys(pricesObject),
    ubication: [replaceVowelsTick(city).replace(new RegExp(' ','g'),'-')]
  }


  let productInfo = {
    ...basic,
    photos: photosUrls,
    prices: pricesObject,
    date,
    search: buildKeywords(newKeywords,filtersType),
  };

  try {
    await db.collection("products").doc().set(productInfo);
  } catch (error) {
    throw new Error(`addProduct -> ${error}`);
  }
}

export const removeProduct = async (id) => {
  try{
    await db.collection('products').doc(id).delete()
  }catch(err){
    throw new Error(err)
  }
}

//se actualiza un producto
export const updateProduct = async (id,basic, photos, prices)=>{

  try{

    const { userName, keywords, name, description, city} = basic 
    
    const previousPhotosUrls = photos.filter(photo=> !photo.hasOwnProperty('file')).map( photo => photo.url)

    const newPhotos = photos.filter(photo=> photo.hasOwnProperty('file'))

    const resultPostPhotos = await Promise.all(newPhotos.map((photo)=> uploadImg(photo.file)))

    const newPhotosUrls = resultPostPhotos.map( ({data:{url}}) => url )
    
    //se cambia la estructura de prices por un objeto 
    const pricesObject = listToObject(prices);

    //Creo una lista con las palabras claves necesarias
    const newKeywords = [...new Set([].concat(
      newNameList(userName),
      newNameList(name),
      textToKeywords({text:keywords,typeSplit:','}),
      textToKeywords({text:description}),
      ))]

    const filtersType = {
      prices: Object.keys(pricesObject),
      ubication: [replaceVowelsTick(city).replace(new RegExp(' ','g'),'-')]
    }

    let productInfo = {
      ...basic,
      photos: [].concat(previousPhotosUrls,newPhotosUrls),
      prices: pricesObject,
      search: buildKeywords(newKeywords,filtersType),
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

//obtengo todos los productos disponibles -> only 20
export const getAllProducts = async (limit = 20) => {
  try {
    let data = await db.collection("products").where('avaliable','==','true').orderBy('date','desc').limit(limit).get();

    const result = {products: data.docs.map((doc) =>({...doc.data(),id:doc.id})), lastProduct:data.docs.at(-1)}
    
    return result

    // return data.docs.map((doc) =>({...doc.data(),id:doc.id}))
  } catch (err) {
    throw new Error(`getAllProducts -> ${err}`);
  }
};

//obtengo los productos por medio del search
export const getProductsByFilters = async (querySearch, category, filter, lastProduct, limit = 20) =>{


  //avaliable //date //category //search

  try{

    let products = db.collection('products').where('avaliable','==','true')
    let searchList = []

  
    if(category !== 'All'){
      products = products.where('category','==',category)
    }

    if(querySearch){

      if(filter.length > 0 ){
        searchList = searchList.concat(...newNameList(querySearch).map(query=>concatItems(query,filter)))
      }else{
        searchList = searchList.concat(...newNameList(querySearch))
      }

    }

    if(filter.length > 0 && querySearch === ''){
      searchList = searchList.concat(...filter)
    }

    if(searchList.length > 0){
      products = products.where('search','array-contains-any',searchList)
    }
    
    let data

    if(lastProduct){
      data = await products.limit(limit).orderBy('date','desc').startAfter(lastProduct).get()
    }else{
      data = await products.limit(limit).orderBy('date','desc').get()
    }

    const result =   {products: data.docs.map((doc) =>({...doc.data(),id:doc.id})), lastProduct:data.docs.at(-1)}
    
    return result

  }catch(err){
    throw new Error(`getProductsBySearch ${err}`)
  } 
}

  export const avaliableUnits = [
    {
      value: "unidad", label: "Unidad", minimify: "Und"
    },
    {
      value: "libra", label: "Libra", minimify: "Lb"
    },
    {
      value: "kilogramo", label: "Kilogramo", minimify: "Kg"
    },
    {
      value: "tonelada", label: "Tonelada", minimify: "Ton"
    }
  ]

  export const avaliableUnitsTranslate = avaliableUnits.reduce((acum,unit) => {
    acum[unit.value] =  unit.minimify
    return acum
  },{})



    
    //filterSearch = [videño, libra, unidad, kilogramo, villavo]


    //query                 -> 'videño'
    //filter-price          -> ['kilogramo','libra']
    //filter-ubicaction     -> ''

    //prices.map(elemento => query__price__{elemento}) -> ['videño__price__kilogramo','videño__price_libra]
    

    //query                 -> 'videño'
    //filter-price          -> ['kilogramo','libra']
    //filter-ubicaction     -> 'villavo'

    //prices.map(elemento => query__price__{elemento}) -> ['videño__price__kilogramo__ubication__villavo','videño__price_libra__ubication__villavo]
    


    // const lista = ['yougurt-melo-gomelo__price__libra__ubication__villavo',
    //   'yougurt-melo-gomelo__price__kilogramo__ubication__villavo',
    //   'yougurt-melo-gomelo__price__unidad__ubication__villavo']

    
    //   lista.forEach(element => console.log(element.split('-')))
