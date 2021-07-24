import { db } from "../firebase.config";
import { auth } from "../firebase.config.js";
import { listToObject } from "./Helpers/convertedObjetList";

// agrega los usuarios a firestore (copia de users + info adicional)
const addUserToStore = async (user) => {
  db.collection("users")
    .doc(user.uid)
    .set({
      city: "",
      department: "",
      email: user.email,
      id: user.uid,
      name: user.displayName,
      phoneMain: "",
      phoneSecond: "",
      photo:'',
    })
    .catch((error) => error);
};

const findUserById = (id) => {
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
const uploadImg = async (img) => {
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
const updateUserInfo = async (user, info) => {
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
const getCurrentUser = () => {
  return auth.currentUser;
};

//funciones sobre base de dato de los productos

//se agrega un producto
const addProductToStore = async (basic, photos, prices) => {
  const results = await Promise.all(
    photos.map((photo) => uploadImg(photo.file))
  );
  //obtengo las urls de las imagenes
  const urls = results.map(({ data: { url } }) => url);
  //se cambia la estructura de prices por un objeto
  const pricesList = listToObject(prices);

  let info = {
    ...basic,
    photos: urls,
    prices: pricesList,
  };

  try {
    db.collection("products").doc().set(info);
  } catch (error) {
    throw new Error(`addProduct -> ${error}`);
  }
};

const getProductByUser = async (id) => {
  try {
    let querySnapshot = await db
      .collection("products")
      .where("userId", "==", id)
      .get();
    return querySnapshot.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });
  } catch (err) {
    throw new Error(`getProductByUser -> ${err}`);
  }
};

const getProductById = async (id) => {
  try {
    let querySnapshot = await db.collection("products").doc(id).get();
    // return querySnapshot.docs.map(doc => doc.data() )
    return querySnapshot.data();
  } catch (err) {
    throw new Error(`getProductById -> ${err}`);
  }
};

const getAllProducts = async () => {
  try {
    let data = await db.collection("products").get();

    return data.docs.map((doc) => doc.data());
  } catch (err) {
    throw new Error(`getAllProducts -> ${err}`);
  }
};

export {
  addUserToStore,
  findUserById,
  getCurrentUser,
  updateUserInfo,
  getProductById,
  addProductToStore,
  getProductByUser,
  getAllProducts,
};
