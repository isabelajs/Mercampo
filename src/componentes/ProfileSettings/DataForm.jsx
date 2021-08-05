import React from 'react'

//hooks
import { useAlert, useCounter } from '../../utils/Hooks';

//components
import AddImage from '../common/addImage';
import LocalAlert from '../common/LocalAlert';


//functions
import { validationsInForm } from '../../utils/Helpers/validationsInform';
import { updateUserInfo } from '../../utils/dataBase';


const DataForm = ({data,setData}) => {

  const counter = useCounter()
  const {alertStatus,openAlert} = useAlert()

  const handleChangeInput = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  }

  const changeImage = (image) => {
    setData({
      ...data,
      photo: { ...image },
    });
  };


  //send data to update
  const handleSubmit = async (e) => {

    e.preventDefault();

    const validation = validationsInForm(data);

    if (validation) {
      openAlert({
        error: true,
        message: validation,
      })
      return
    }

    try {

      await updateUserInfo(data);

      openAlert({
        error: false,
        message: "Se ha actualizado la información con exito",
      });
    } catch (error) {
      openAlert({
        error: true,
        message: error.code,
      });
    }
  };

  return (
    <form className="profileSettings__data form" onSubmit={handleSubmit}>
      {counter}
      <div className="data__photo">
        <div className="systemSubGroup__title">Foto:</div>
        <AddImage image={data.photo.url} callback={changeImage} />
        <div className="separation-line"></div>
      </div>

      <div className="data__info">

        <div className="systemSubGroup__title">Perfil:</div>
        <p>
          Esta información se mostrará públicamente para la referencia
          de sus productos.
        </p>

        <div className="l-systemSubGroup">
          <div className="l-info">
            <div className="form-group">
              <label>Nombre y apellido</label>
              <input
                className="form-input"
                name="name"
                type="text"
                placeholder="Ingrese un nombre"
                value={data.name}
                onChange={handleChangeInput}
              />
            </div>

            <div className="form-group">
              <label>Cedula</label>
              <input
                className="form-input"
                name="id"
                type="number"
                value={data.id}
                placeholder="Ingrese número de cédula"
                onChange={handleChangeInput}
              />
            </div>

            <div className="form-group">
              <label>Departamento</label>
              <input
                className="form-input"
                name="department"
                type="text"
                value={data.department}
                placeholder="Ingrese el departamento de residencia"
                autoComplete="false"
                onChange={handleChangeInput}
              />
            </div>

            <div className="form-group">
              <label>Ciudad</label>
              <input
                className="form-input"
                name="city"
                type="text"
                value={data.city}
                placeholder="Ingrese ciudad de residencia"
                onChange={handleChangeInput}
              />
            </div>
          </div>

          <div className="separation-line"></div>
        </div>

        <div className="l-systemSubGroup">
          <div className="systemSubGroup__title">Contacto:</div>

          <div className="l-contacto">
            
            <div className="form-group">
              <label>Telefono-1 (WhatsApp)
                <input
                  className="form-input"
                  name="phoneMain"
                  type="number"
                  value={data.phoneMain}
                  placeholder="Número telefonico principal"
                  onChange={handleChangeInput}
                />
              </label>
            </div>

            <div className="form-group">
              <label>Telefono-2
                <input
                  className="form-input"
                  name="phoneSecond"
                  type="number"
                  value={data.phoneSecond}
                  placeholder="Número telefonico secundario"
                  onChange={handleChangeInput}
                />
              </label>
            </div>

            <div className="form-group">
              <label>Correo Electronico
                <input
                  className="form-input"
                  name="email"
                  type="email"
                  placeholder="Ingrese un correo electronico"
                  value={data.email}
                  autoComplete="false"
                  disabled
                  onChange={handleChangeInput}
                  />
              </label>
            </div>
          
          </div>

          <div className="separation-line"></div>

        </div>

      </div>

      <LocalAlert alertStatus={alertStatus}/>

      <button className="button button--second">Guardar</button>
  
  </form>
  )
}

export default DataForm;