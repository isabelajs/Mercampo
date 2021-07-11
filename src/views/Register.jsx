import React , {useEffect, useState}from 'react';
import { Link } from 'react-router-dom';

import LayoutSignMethod from '../componentes/Layouts/LayoutSignMethod';
import google from '../assets/static/google-icon.svg'
import facebook from '../assets/static/facebook-icon.svg'
import phone from '../assets/static/phone-icon.svg'
import '../assets/styles/componentes/Register.scss'

import Modal from '../componentes/common/Modal'
import {createUser} from '../utils/auth'


//TODO: LEER DONDE ENCONTRE LA SOLUCION https://stackoverflow.com/questions/51819349/getting-uncaught-after-catching-error-in-firebase-auth-with-async
//TODO: DARLE MAS WIDTH AL CONTENEDOR DEL FORM EN TAMAÑO 1024 
//BUG NO SE CIERRA CON ENTER EL MODAL


function Register(){
  
  const [form, setForm ]=  useState({
    name:'',
    email: '',
    password: '',
  })

  const [statusRegister, setStatusRegister] = useState({
    error: null,
    message: '',
    isOpen: false,
  })

  const handleChange = (event)=>{
  setForm({
    ...form,
    [event.target.name]: event.target.value
    })

  }        

  const handleSubmit = async (e)=>{
    e.preventDefault()

    try{
      const user = await createUser(form.email,form.password, form.name)
      setStatusRegister({
        error: null,
        message: `Se ha enviado un correo de confirmacion al email ${user.email}, porfavor revisa la bandeja de entrada o spam de tu correo electronico`,
        isOpen: true,
      })
    }catch(error){
      setStatusRegister({
        error: error,
        message: `Hemos encontrado un error ${error.message}`,
        isOpen: true,
      })
    }
  
  }

  const handleCloseModal = ()=>{
    setStatusRegister(false)
  }


  return(

    <LayoutSignMethod>
      <div className="register">

        <div className="register__title">
        <div className='title'>Bienvenido</div>
          <div className='subtitle'>Registrate para continuar</div>
        </div>

        <form className="form" onSubmit={handleSubmit}>

          <div className="form-group">
            <label>Nombre</label>   
            <input 
              className='form-input' 
              name='name' 
              type='text' 
              placeholder='Ingresa tu nombre' 
              autoComplete='false'
              value={form.name}
              onChange={handleChange}
              required
            />
            
          </div>

          <div className="form-group">
            <label>Correo</label>   
            <input 
              className='form-input' 
              onChange={handleChange}
              name='email' 
              type='email' 
              placeholder='Ingresa tu correo electronico' 
              autoComplete='false' 
              value = {form.email}
              required
              />
          </div>

          <div className="form-group">
            <label>Contraseña</label>   
            <input 
              onChange={handleChange}
              className='form-input' 
              name='password' 
              type='password' 
              placeholder='Ingresa tu contraseña' 
              value = {form.password}
              autoComplete='false'
              required
            />
          </div>

          <button className='button button--main'>Registrate</button>
         
        </form>

        <div className="login__options">
          <div className="login__options--text">Registrate con:</div>
          <div className="login__options--options">
            <img className='method-icon' src={google} alt="" />
            <img className='method-icon' src={facebook} alt="" />
            <img className='method-icon' src={phone} alt="" />
          </div>
        </div>

        <div className="login__register">
          <div className="login__register--text">¿Ya estas registrado? <Link to={'/login'} className='bold'>Ingresa</Link>   </div>
        </div>

      </div>
      {
        statusRegister.isOpen && <Modal status={statusRegister} handleClose={handleCloseModal} />
      }
    </LayoutSignMethod>

  )
}

export default Register;



//FIXME UNA OPCION PUEDE SER UTILIZAR EL REDUX PARA CUALQUIER MODAL Y TENERLO COMO ESTADO GLOBAL

//POR QUE EL MODAL NO PUEDE TENER SU PROPIO ESTADO SOBRE SI ESTA ABIERTO O CERRADO? 

  //POR QUE DE ALGUNA MANERA DEBE SER INSERTADO Y ESO ES MEDIANTE UN PADRE ASI QUE REALMENTE ES EL PADRE EL QUE LO RENDERIZO
  //Y POR ENDE EL ES EL QUE CONTROLA CUANDO SE DEBE VER O NO DEBE VER EL HIJO


  //OTRA OPCION ES QUE EL STATUS DEL MODAL SEA GLOBAL POR EJEMPLO CON REDUX
  //ENTONCES AHORA (NADIE ES PADRE DEL MODAL) -> EL QUE lO NECESITE USAR TIENE QUE HACER UN DISPATCH (PARA CAMBIAR EL MODAL A OPEN PASANDOLE
  //LAS DEMAS PROPIEDADES QUE NECESITE COMO MESSGAE O TYPE) AL CAMBIAR EL ESTADO MEDIANTE ESE DISPATCH, APP LO DIBUJARA OSEA SIEMPRE ESTARIA 
  //AL LADO DE LAS RUTAS PREGUNTANDOSE SI    modalIsOpen ? <modal/> connect({error,message}, {cerrarModal})  