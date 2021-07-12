import React, { useReducer, useState } from "react";
import SystemLayout from "../componentes/system/SystemLayout";
import "../assets/styles/componentes/ProfileNewProduct.scss";

const UnitPrice = (props) => {

  const {
    name,
    value,
    handleUnitPrice,
    handleUnitName,
    isOpenEdit,
    isNew,
    onClick,
  } = props

  return (
    <tr>
      {isNew ? (
        <td>
          <input
            className="form-input"
            onChange={handleUnitName}
            name={name}
            placeholder="Tipo de und"
          />
        </td>
      ) : (
        <td>
          <p>{name}</p>
        </td>
      )}

      <td>
        <input
          className="form-input"
          onChange={handleUnitPrice}
          name={name}
          type="text"
          placeholder={`$  ${value}`}
          onClick={onClick}
        />
      </td>

      <td >
        <div className='unitPrice__buttons'>
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            >
            <path
              d="M13.9691 13.4736L15.0802 12.2238C15.2538 12.0285 15.5559 12.1652 15.5559 12.4464V18.1253C15.5559 19.1603 14.8093 20 13.8892 20H1.6667C0.746544 20 0 19.1603 0 18.1253V4.37729C0 3.34228 0.746544 2.50256 1.6667 2.50256H11.1634C11.41 2.50256 11.535 2.83845 11.3614 3.03764L10.2502 4.28746C10.1981 4.34604 10.1287 4.37729 10.0523 4.37729H1.6667V18.1253H13.8892V13.6923C13.8892 13.6103 13.917 13.5322 13.9691 13.4736ZM19.4067 5.59195L10.2884 15.8483L7.14946 16.2388C6.23972 16.3521 5.4654 15.4889 5.56609 14.4578L5.91332 10.9271L15.0316 0.6708C15.8267 -0.2236 17.1115 -0.2236 17.9032 0.6708L19.4032 2.35805C20.1984 3.25245 20.1984 4.70146 19.4067 5.59195ZM15.976 6.79881L13.9586 4.52961L7.50711 11.7903L7.25363 14.3407L9.52104 14.0556L15.976 6.79881ZM18.2261 3.68598L16.7261 1.99873C16.5837 1.8386 16.351 1.8386 16.2122 1.99873L15.1392 3.20559L17.1566 5.47478L18.2296 4.26793C18.3685 4.10389 18.3685 3.84612 18.2261 3.68598Z"
              fill="#B8B5B5"
              />
          </svg>

          <svg  width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19.1667 3.6H17.8333C16.7288 3.6 15.8333 2.70457 15.8333 1.6V1.6C15.8333 0.7175 15.0859 0 14.1667 0H5.83333C4.91406 0 4.16667 0.7175 4.16667 1.6V1.6C4.16667 2.70457 3.27124 3.6 2.16667 3.6H0.833333C0.372396 3.6 0 3.9575 0 4.4V5.2C0 5.31 0.09375 5.4 0.208333 5.4V5.4C1.08926 5.4 1.81525 6.09115 1.85854 6.97102L2.42448 18.475C2.46615 19.3275 3.20052 20 4.08854 20H15.9115C16.8021 20 17.5339 19.33 17.5755 18.475L18.1415 6.97102C18.1847 6.09115 18.9107 5.4 19.7917 5.4V5.4C19.9062 5.4 20 5.31 20 5.2V4.4C20 3.9575 19.6276 3.6 19.1667 3.6ZM6.04167 2.7C6.04167 2.20294 6.44461 1.8 6.94167 1.8H13.0583C13.5554 1.8 13.9583 2.20294 13.9583 2.7V2.7C13.9583 3.19706 13.5554 3.6 13.0583 3.6H6.94167C6.44461 3.6 6.04167 3.19706 6.04167 2.7V2.7ZM15.8982 14.3967C15.7933 16.5268 14.0357 18.2 11.903 18.2H8.09697C5.96429 18.2 4.20668 16.5268 4.10181 14.3967L3.86548 9.59671C3.75304 7.31309 5.57426 5.4 7.86064 5.4H12.1394C14.4257 5.4 16.247 7.31308 16.1345 9.5967L15.8982 14.3967Z" fill="#B8B5B5"/>
          </svg>
        </div>
      </td>
      {/* } */}
    </tr>
  );
};

const ProfileNewProduct = (props) => {
  const links = [
    { name: "Mis productos", url: "/profile/products" },
    {
      name: "Nuevo producto",
      url: "/profile/products/new",
    },
  ];

  //TODO: VERFICIAR QUE ES MAS RAPIDO SI TENERLO TODO EN UN SOLO ESTADO O POR SEPARADO
  const [infoProduct, setInfoProduct] = useState({
    photos: [],
    name: "",
    description: "",
    avaliable: true,
    prices: [
      { name: "Kilogramo", value: 0 },
      { name: "Libra", value: 0 },
      { name: "Unidad", value: 0 },
    ],
  });

  const handleChange = (e) => {
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
    setInfoProduct({
      ...infoProduct,
      prices: [
        ...infoProduct.prices,
        {
          name: String(infoProduct.prices.length),
          value: 0,
          isNew: true,
          isOpenEdit: false,
        },
      ],
    });
  };

  //cambiar el nombre del componente UnitPrice
  const handleUnitName = (e) => {
    setInfoProduct({
      ...infoProduct,
      prices: infoProduct.prices.map((item, index) =>
        item.name !== e.target.name ? item : { ...item, name: e.target.value }
      ),
    });
  };

  const openEdit = (e) => {
    console.log("cambiando");
    setInfoProduct({
      ...infoProduct,
      prices: infoProduct.prices.map((item, index) =>
        item.name !== e.target.name ? item : { ...item, isOpenEdit: true }
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
                <div className="l-table">
                  <table>
                    <colgroup>
                      <col className="colNames" />
                      <col className="colPrices" />
                      <col className="colOptions" />
                    </colgroup>

                    <tbody>
                      <tr>
                        <td>
                          <p>Unidad</p>
                        </td>
                        <td>
                          <p>Precio</p>
                        </td>
                        <td></td>
                      </tr>

                      {infoProduct.prices.map((item, index) => (
                        <UnitPrice
                          key={index}
                          {...item}
                          handleUnitPrice={handleUnitPrice}
                          handleUnitName={handleUnitName}
                          onClick={openEdit}
                        />
                      ))}

                      <tr>
                        <td className="newProduct__addUnitPrice" colSpan="3">
                          <div
                            className="button button--icon"
                            onClick={insertNewPrice}
                          >
                            <svg
                              className="button__icon"
                              width="15"
                              height="15"
                              viewBox="0 0 15 15"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <rect
                                y="8.65381"
                                width="2.88462"
                                height="15"
                                rx="1.44231"
                                transform="rotate(-90 0 8.65381)"
                                fill="#2EC4B6"
                              />
                              <rect
                                x="6.34607"
                                width="2.88462"
                                height="15"
                                rx="1.44231"
                                fill="#2EC4B6"
                              />
                            </svg>

                            <p>Nuevo</p>
                          </div>
                        </td>
                        {/* <td><input className="form-input" name='disponibility' type="text" placeholder="$  0" disabled/></td>
                        <td></td> */}
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <button className="button button--second">Guardar</button>
        </form>
      </div>
    </SystemLayout>
  );
};

//FIXME: por defecto el boton de añadir unit price solo debe servir como boton

export default ProfileNewProduct;
