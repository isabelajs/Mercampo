import React, { useEffect, useState, useCallback} from "react";
import { connect } from 'react-redux';

//componentes react
import SystemLayout from "../componentes/system/SystemLayout";
import Alert from "../componentes/common/Alert";
import AddImage from "../componentes/common/addImage";

//estilos
import '../assets/styles/componentes/ProfileSettings.scss';

//funciones de auth
import {findUserById, updateUserInfo} from "../utils/dataBase";
import { validationsInForm } from '../utils/Helpers/validationsInform';

//import actions
import { closeAlert, openAlert } from '../actions'

//BUG: Cuando el form no halla cambiado y se hace un guardar evitar, que envie informacion
//TODO: Cuando el nombre del usuario cambie se debe cambiar todos los productos asociados, el nombre del usuario
const ProfileSettings = (props) => {
  const {user,openAlert, closeAlert} = props
  const [isLoading,setIsLoading] = useState(true)

  const [form, setForm] = useState({
    photo: {url:'', file:null},
    city: '',
    department: '',
    email: '',
    id: '',
    name: '',
    phoneMain: '',
    phoneSecond: '',
    })

  const links = [
    { name: "Perfil", url: "/profile/settings" },
    { name: "Settings", url: "/profile/settings" },
  ];

  const handleChange = (e)=>{
    
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const validationForm = useCallback((form)=>validationsInForm(form),[])


  //Fetch data del usuario logueado
  useEffect( ()=>{
    //cierra el alert si esta abierto al momento de montar el componente
    closeAlert()

    //busca el usuario actualiza el estado de form con la información de firestore
    const findUser = async ()=>{

      try{

        let userInData = await findUserById(user.uid)

        setForm({
          photo: {url:userInData.photo, file:null},
          city: userInData.city,
          department: userInData.department,
          email: userInData.email,
          id: userInData.id,
          name: userInData.name,
          phoneMain: userInData.phoneMain,
          phoneSecond: userInData.phoneSecond
        })
        setIsLoading(false)
      }
      catch(err){
        console.log('error desde profile ', err)
      }
      
    }
    
    findUser()

  },[closeAlert, user])

  const handleSubmit = async (e) => {
    e.preventDefault()

    const validation = validationForm(form)

    try{
      if(validation){
        openAlert({
          error:true,
          message:validation
        })
        return
      }

      await updateUserInfo(user,form)


      openAlert({
        error:false,
        message: 'Se ha actualizado la información con exito'
      })

    }catch(error){
      openAlert({
        error:true,
        message:error.message
      })
    }

}

  const changeImage = (image) =>{
    setForm({
      ...form,
      photo: {...image}
    })
  }

  return (

    <SystemLayout links={links} type='settings'  props={props}>

        <div className="l-profileSettings">

        { isLoading ? <h1 style={{textAlign:'center'}}>... Loading</h1>
          :<>
            <form className='profileSettings__data form' onSubmit = {handleSubmit}>

            <div className='data__photo'>
              <div className='systemSubGroup__title'>Foto:</div>
              <AddImage image={form.photo.url} callback={changeImage}/>
              <div className="separation-line"></div>
            </div>

            <div className='data__info'>

              <div className='systemSubGroup__title'>Perfil:</div>
              <p>Esta información se mostrará públicamente para la referencia de sus productos.</p>

              <div className="l-systemSubGroup">

                <div className="l-info">

                  <div className="form-group">
                    <label>Nombre y apellido</label>
                    <input 
                      className="form-input"
                      name='name'
                      type="text"
                      placeholder="Ingrese un nombre"
                      value ={form.name}
                      onChange={handleChange} />
                  </div>

                  <div className="form-group">
                    <label>Cedula</label>
                    <input 
                      className="form-input" 
                      name='id' 
                      type="number" 
                      value ={form.id}
                      placeholder="Ingrese número de cédula" 
                      onChange={handleChange} 
                      />
                  </div>
                  
                  <div className="form-group">
                    <label>Departamento</label>
                    <input 
                      className="form-input" 
                      name='department' 
                      type="text" 
                      value={form.department}
                      placeholder="Ingrese el departamento de residencia" 
                      autoComplete='false' 
                      onChange={handleChange}/>
                  </div>

                  <div className="form-group">
                    <label>Ciudad</label>
                    <input 
                      className="form-input" 
                      name='city' 
                      type="text" 
                      value={form.city}
                      placeholder="Ingrese ciudad de residencia" 
                      onChange={handleChange} 
                    />
                  </div>

                </div>
            
                <div className="separation-line"></div>
                
              </div>

              <div className="l-systemSubGroup">

                <div className='systemSubGroup__title'>Contacto:</div>

                <div className="l-contacto">

                  <div className="form-group">
                    <label>Telefono-1 (WhatsApp)</label>
                    <input 
                      className="form-input" 
                      name='phoneMain' 
                      type="number" 
                      value = {form.phoneMain}
                      placeholder="Número telefonico principal" 
                      onChange={handleChange}/>
                  </div>

                  <div className="form-group">
                    <label>Telefono-2</label>
                    <input 
                      className="form-input" 
                      name='phoneSecond' 
                      type="number" 
                      value= {form.phoneSecond}
                      placeholder="Número telefonico secundario" 
                      onChange={handleChange}/>
                  </div>

                  <div className="form-group">
                    <label>Correo Electronico</label>
                    <input 
                      className="form-input" 
                      name='email' type="email" 
                      placeholder="Ingrese un correo electronico" 
                      value={form.email} 
                      autoComplete='false'
                      disabled
                      onChange={handleChange}
                      />
                  </div>

                </div>

                <div className="separation-line"></div>
              </div>

            </div>
            <Alert/>
            <button className='button button--second'>Guardar</button>

          </form>
            <form className="profileSettings__password l-systemSubGroup form ">
              <div className='systemSubGroup__title'>Cambiar contraseña</div>
              <div className="l-password">
                <div className="form-group">
                  <label htmlFor="">Contraseña actual: </label>
                  <input className='form-input' type="password" placeholder='Contraseña Actual' autoComplete='false'/>
                </div>
                <div className="form-group">
                  <label htmlFor="">Nueva contraseña:  </label>
                  <input className='form-input' type="password" placeholder='Contraseña Nueva' autoComplete='false'/>
                </div>
                <div className="form-group">
                  <label htmlFor="">Repite tu nueva contraseña: </label>
                  <input className='form-input' type="password" placeholder='Repite tu nueva contraseña' autoComplete='false'/>
                </div>
              </div>

              <div className="l-buttons">
                <button className='button button--second'>Cambiar</button>
                <button className='button button--second'>Cancelar</button>
              </div>
            </form>
          </>
        }
        </div>

    </SystemLayout>
  );
};

const mapStateToProps = (state)=>{
  return{
    user : state.user
  }
}

const mapDispatchToProps = {
  openAlert,
  closeAlert
}


export default connect(mapStateToProps,mapDispatchToProps)(ProfileSettings)
