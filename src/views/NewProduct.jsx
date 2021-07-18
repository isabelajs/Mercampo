import React, { useEffect, useState } from "react";
import SystemLayout from "../componentes/system/SystemLayout";
import "../assets/styles/componentes/ProfileNewProduct/ProfileNewProduct.scss";
import TableUnitPrices from "../componentes/ProfileNewProduct/TableUnitPrices";

const ProfileNewProduct = (props) => {

  const links = [
    { name: "Mis productos", url: "/profile/products" },
    { name: "Nuevo producto",url: "/profile/products/new"},
  ];

  //TODO: VERFICIAR QUE ES MAS RAPIDO SI TENERLO TODO EN UN SOLO ESTADO O POR SEPARADO
  const [infoProduct, setInfoProduct] = useState({
    photos: [],
    name: "",
    description: "",
    avaliable: true,
    prices: [
      { name: "Kilogramo", value: '5000' },
      { name: "Libra", value: '' },
      { name: "Unidad", value: '' },
    ],
  });

  const handleChange = (e)=> {
    setInfoProduct({
      ...infoProduct,
      [e.target.name]: e.target.value,
    });
  };

  //modificar el nombre del componente UnitPrice
  const handleUnitPrice = (e) => {
    setInfoProduct({
      ...infoProduct,
      prices: infoProduct.prices.map((item) =>
        item.name !== e.target.name ? item : { ...item, value: e.target.value }
      ),
    });
  };

  //agregar un componente UnitPrice
  const insertNewPrice = () => {

    const lastPrice = infoProduct.prices[infoProduct.prices.length-1]

  //si el ultimo elemento no esta completo no dejar agregar mas
    if(lastPrice.isNew && (!isNaN(lastPrice.name) ||  !lastPrice.value)){
      console.log('no puedes agregar')
      return
    }

    setInfoProduct({
      ...infoProduct,
      prices: [
        ...infoProduct.prices,
        {
          name: String(infoProduct.prices.length),
          value: '',
          isNew: true,
        },
      ],
    });
  };

  const deletePrice = (index) =>{

    infoProduct.prices.splice(index,1)

    setInfoProduct({
      ...infoProduct,
      prices: infoProduct.prices
    });
  }

  //cambiar el nombre del componente UnitPrice
  const handleUnitName = (e) => {
    setInfoProduct({
      ...infoProduct,
      prices: infoProduct.prices.map((item, index) =>
        item.name !== e.target.name ? item : { ...item, name: e.target.value }
      ),
    });
  };

  const addPhoto = (e) =>{
    const inputFile = e.target


    console.log(e.target.files[0])

    if(inputFile.files && inputFile.files[0]){

      const url = URL.createObjectURL(inputFile.files[0])

      setInfoProduct({
        ...infoProduct,
        photos: [...infoProduct.photos,{alt:'tpepe',url:url, file:inputFile.files[0]}]
      })

    }
  }

  const handleSubmit = (e) =>{
    e.preventDefault()

    //Send img's to server, get a list of src links to save in firestore
    infoProduct.photos.forEach(photo=>{

      const data = new FormData()
      
      data.append('image',photo.file)

      const options = {
        method:'POST',
        body: data,
      }

      fetch(`https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_TOKEN_IMGBB}`,options)
      .then(response => response.json())
      .then(data=>console.log(data))
      .catch(error=>console.log(error))
    })

  }


  return (
    <SystemLayout links={links} type="products" props={props}>

      <div className="l-profileNewProduct">

        <form className="profileNewProduct form" onSubmit={handleSubmit}>

          <div className="l-newProduct__photos">

            <div className="systemSubGroup__title">Fotos:</div>

              <div className="newProduct__photos">

                {infoProduct.photos.map((item,index)=>{
                  return <img src={item.url} alt={item.alt} key={index} />
                })}
                

                {/* TODO PASAR ESTO A UN COMPONENTE APARTE */}

                <label className="newProduct__addPhoto" name='file'>
                  <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect y="20.1923" width="6.73077" height="35" rx="3.36538" transform="rotate(-90 0 20.1923)" fill="#2EC4B6"/>
                    <rect x="14.8076" width="6.73077" height="35" rx="3.36538" fill="#2EC4B6"/>
                  </svg>
                  <input type="file" accept='image/png, image/jpeg, image/jpg' name='file' onChange={addPhoto}/>
                </label>
              </div>

            <div className="separation-line"></div>
          </div>

          <div className="newProduct__info">
            <div className="systemSubGroup__title">Datos iniciales:</div>

            <div className="l-systemSubGroup">
              <div className="form-group">
                <label htmlFor="">Nombre del producto</label>
                <input
                  className="form-input"
                  name="name"
                  type="text"
                  placeholder="Nombre del producto"
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="">Descripcion</label>
                <textarea
                  className="form-textArea"
                  cols="10"
                  rows="10"
                  name="description"
                  type="text"
                  placeholder="Descripcion del producto"
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="">Disponibilidad</label>
                <select
                  className="form-listBox"
                  name="avaliable"
                  onChange={handleChange}
                >
                  <option value={true}>Disponible</option>
                  <option value={false}>No disponible</option>
                </select>
              </div>

              <div className="separation-line"></div>
            </div>
          </div>

          <div className="newProduct__unitPrices">
            <div className="systemSubGroup__title">Precios Unitarios</div>

            <div className="l-systemSubGroup">
              <div className="form-group newProduct__unitPrices">
                <TableUnitPrices infoProduct={infoProduct} deletePrice={deletePrice} handleUnitName={handleUnitName} handleUnitPrice={handleUnitPrice} insertNewPrice={insertNewPrice}/>
              </div>
            </div>
          </div>

          <button className="button button--second">Guardar</button>
        </form>
      </div>
    </SystemLayout>
  );
};


export default ProfileNewProduct;

//TODO: VALIDACIONES DEL FORMULARIO

  //DEBE EXISTIR ALMENOS 1 PRECIO UNITARIO CON PRECIO
  //LOS PRECIOS QUE NO TENGAN UN VALOR NO LOS ENVIO LA BD?
  //PUEDO GUARDAR UN PRODUCTO SIN PRECIOS PERO NO DISPONIBLE?
  //Utilizar todo esto en redux?

//TODO: ESTUDIAR COMO OPTIMIZAR LOS RENDERIZADOS CON USEMEMO Y USECALLBACK