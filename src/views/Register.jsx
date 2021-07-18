import React , { useState,useEffect,useCallback } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'

//componentes react
import Alert from '../componentes/common/Alert'
import LayoutSignMethod from '../componentes/Layouts/LayoutSignMethod';

//imagenes y estilos css
import google from '../assets/static/google-icon.svg'
import facebook from '../assets/static/facebook-icon.svg'
import phone from '../assets/static/phone-icon.svg'
import '../assets/styles/componentes/Register.scss'

//funciones auth
import {createUser} from '../utils/auth'
import validationsInForm from '../utils/validationsInform';
//actiones
import { openAlert, closeAlert } from '../actions'


//TODO deberia exister un elemento que me retorne a home?
//TODO CONFIRMACIÓN DE CONTRASEÑA Y VISUALIZACIÓN



function Register(props){
  const {openAlert, closeAlert} = props
  const [form, setForm ]=  useState({
    name:'',
    email: '',
    password: '',
  })

  //cierro el alert al montar el componente
  useEffect(()=>{
    closeAlert();
  },[])
  
  //agrega información a mi estado form
  const handleChange = (event)=>{
    setForm({
      ...form,
      [event.target.name]: event.target.value
      })
  }        

  const validationForm = useCallback((form)=>validationsInForm(form),[])

  //function to validate register form use hook 'useCallback' why it not need to change in every render
  // const validationsInForm = useCallback((form)=>{
    
  //   let message = null
  
  //   if (form.name.length <= 8 || !isNaN(form.name)){
  //     message =  'Nombre invalido'
  //   }
  //   else if(form.password.length < 8 ){
  //     message = 'La contraseña es demasiado corta'
  //   }
  
  //   return message
  // },[])

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
      await createUser(form.email,form.password, form.name)
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
        <div className='title'>Bienvenido</div>
          <div className='subtitle'>Registrate para continuar</div>
        </div>

        <form className="form" onSubmit={handleSubmit}>
          
          <Alert/>

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
              type='password' 
              placeholder='Ingresa tu contraseña' 
              autoComplete='false'
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
            
    </LayoutSignMethod>

  )
}


const mapDispatchToProps = {
  openAlert,
  closeAlert
}


export default connect(null,mapDispatchToProps)(Register);