import React , { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';

//componentes react
import LocalAlert from '@components/common/LocalAlert';
import LayoutSignMethod from '@components/Layouts/LayoutSignMethod';

//styles
import '@styles/componentes/Register.scss'

//hooks
import {useVisibilityPassword} from '@hooks'

//funciones auth and database
import { signUpWithEmail } from '@utils/auth'
import { validationsInForm } from '@helpers/validationsInform';

//actiones
import { useAlert } from '@hooks';

//TODO CONFIRMACIÓN DE CONTRASEÑA Y VISUALIZACIÓN

function Register(props){

  const { alertStatus ,openAlert, closeAlert} = useAlert()

  const [form, setForm ]=  useState({
    name:'',
    email: '',
    password: '',
  })

  const {visibilityPassword, handlerVisibilityPassword} = useVisibilityPassword()
  
  //agrega información a mi estado form
  const handleChange = (event)=>{
    setForm({
      ...form,
      [event.target.name]: event.target.value
      })
  }        

  const validationForm = useCallback((form)=>validationsInForm(form),[])

  //validate and do stuff to create a user in firebase
  const handleSubmit = async (e)=>{
    e.preventDefault()

    const validation = validationForm(form)

    if(validation){
      openAlert({
        error:true,
        message: validation,
      })
      return
    }

    try{

      await signUpWithEmail(form.email.trim(),form.password, form.name.trim())
      
      openAlert({
        error:false,
        message: 'Se ha enviado un correo de verificación, por favor revisa tu bandeja de entrada'
      })
      
    }catch(error){
      openAlert({
        error: error,
        message: error.code
      })
    
    }
    
  }  

  return(

    <LayoutSignMethod>

      <div className="register">

        <div className="register__title">
        <div className='title'>Bienvenido !</div>
          <div className='subtitle'>Registrate para continuar</div>
        </div>

        <form className="form" onSubmit={handleSubmit}>
          
          <LocalAlert alertStatus={alertStatus} closeAlert={closeAlert}/>

          <div className="form-group">
            <label>Nombre</label>   
            <input 
              className='form-input' 
              name='name' 
              type='text' 
              placeholder='Ingresa tu nombre' 
              autoComplete='false'
              onChange={handleChange}
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
              />
          </div>

          <div className="form-group">
            <label>Contraseña</label>   
            <input 
              onChange={handleChange}
              className='form-input' 
              name='password' 
              type={`${visibilityPassword ? 'text' : 'password'}`}
              placeholder='Ingresa tu contraseña' 
              autoComplete='false'
            />
          </div>

          <div className="form__checkbox">
            <input onChange={handlerVisibilityPassword} id='viewPassword' type='checkbox'/>
            <label htmlFor="viewPassword">Ver contraseña</label>
          </div>

          <button className='button button--main'>Registrate</button>
        </form>

        <div className="login__register">
          <div className="login__register--text">¿Ya estas registrado? <Link to={'/login'} className='bold'>Ingresa</Link>   </div>
        </div>
      
      </div>
            
    </LayoutSignMethod>

  )
}

export default Register