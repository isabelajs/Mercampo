import React from 'react'

//hooks
import { useAlert, useModal } from '../../utils/Hooks';

//components
import AddImage from '../common/addImage';
import LocalAlert from '../common/LocalAlert';
import ConfirmationModal from '../common/ConfirmationModal';

//functions
import { validationsInForm } from '../../utils/Helpers/validationsInform';
import { updateUserInfo } from '../../utils/dataBase';
import FormListbox from '../common/formListbox';

//listas
import { departments,cities } from '../../utils/Helpers/dataBaseCities';

const DataForm = ({data,setData}) => {

  const {alertStatus,openAlert, closeAlert} = useAlert()

  const {modalStatus,closeModal,openModal} = useModal()


  const handleChangeInput = ({target}) => {

    if(target.name === 'department'){
      setData({
        ...data,
        [target.name]: target.value,
        'city': cities(target.value)[0],
      })
    }
    else{
      setData({
        ...data,
        [target.name]: target.value,
      });
    }
  }

  const changeImage = (image) => {
    setData({
      ...data,
      photo: { ...image },
    });
  };

  //send data to update
  const sendData = async () => {

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
    
    closeModal()
  };

  const handleSubmit = (e) => {

    e.preventDefault()

    const validation = validationsInForm(data)

    if (validation) {

      openAlert({
        error: true,
        message: validation,
      })

    }

    else{

      closeAlert()

      openModal()
    }
    
  } 

  return (
    <form className="profileSettings__data form" onSubmit={handleSubmit}>

      <LocalAlert alertStatus={alertStatus} closeAlert={closeAlert}/>


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

            <FormListbox
              titleName = {'Departamento'}
              name = {'department'}
              setValue = {handleChangeInput}
              value = {data.department}
            > 
              {
                  departments.map(department=>{

                    if(department === ''){
                      return (<option key={department} value=''>----</option>)
                    }

                    return <option key={department} value={department}>{department}</option>
                  })
                }
            </FormListbox>

            <FormListbox
                titleName = {'Ciudad'}
                name = {'city'}
                setValue = {handleChangeInput}
                value = {data.city}
              >
                {
                  cities(data.department).map(city=>{

                    if(city === ''){
                      return (<option key={city} value=''>----</option>)
                    }
                    return (<option key={city} value={city}>{city}</option>)
                  })
                }
              </FormListbox>

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


      <ConfirmationModal isOpen={modalStatus} closeCallback={closeModal} acceptCallback={sendData}/>
      
      <button className="button button--second">Guardar</button>
  
  </form>
  )
}

export default DataForm;