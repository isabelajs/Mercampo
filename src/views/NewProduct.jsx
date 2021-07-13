import React, { useCallback, useReducer, useState } from "react";
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
      { name: "Kilogramo", value: '' },
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


  return (
    <SystemLayout links={links} type="products" props={props}>
      <div className="l-profileNewProduct">
        <form className="profileNewProduct form">
          <div className="newProduct__photo">
            <div className="systemSubGroup__title">Fotos:</div>
            <img src="" alt="" />
            <img src="" alt="" />
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

//TODO: ESTUDIAR COMO OPTIMIZAR LOS RENDERIZADOS CON USEMEMO Y USECALLBACK