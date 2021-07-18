import React, {useState, useEffect, useCallback  } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { openAlert,closeAlert } from '../actions';

//componentes de react
import Alert from '../componentes/common/Alert'
import LayoutSignMethod from '../componentes/Layouts/LayoutSignMethod';

//imagenes
import google from '../assets/static/google-icon.svg'
import facebook from '../assets/static/facebook-icon.svg'
import phone from '../assets/static/phone-icon.svg'
import '../assets/styles/componentes/Login.scss'

//funciones de firebase
import { singInWithEmail } from '../utils/auth'
import {addUserToStore, findUserById} from '../utils/dataBase';
import validationsInForm from '../utils/validationsInform';

// https://dribbble.com/wenhy/collections/1631290-design
//  https://co.pinterest.com/pin/184577284702032988/


function Login (props){
  const {openAlert, closeAlert} = props

  useEffect(()=>{
    closeAlert()
  },[])

  const [form, setForm ] =  useState({
                              email: '',
                              password: '',
  })

  const validationForm = useCallback((form)=>{validationsInForm(form)},[])

  // const validationsInForm = useCallback((form)=>{
  //   let message = null

  //   if(form.email === '' || (form.email.length < 10 && !form.email.includes('@'))){
  //     message = 'Por favor ingresa un correo válido'
  //   }else if(form.password === ' ' || form.password.length < 8){
  //     message = 'La contraseña es muy corta'
  //   }

  //   return message

  // },[])

  const handleInput = (event)=>{
    setForm({
      ...form,
      [event.target.name]: event.target.value
    })
  }        

  const handleSubmit = async (event)=>{

    event.preventDefault()
    
    const validation = validationForm(form)

    if(validation){
    openAlert({
      error:true,
      message: validation,
    })
    return
    }

    try{

      //El usuario intenta loguearse
      const user = await singInWithEmail(form.email, form.password)

      //si el usuario esta verificado, se confirma si esta en la base de datos
      if(user.emailVerified){
      
        const userRef = await findUserById(user.uid)
        console.log(userRef)
        if(userRef === undefined){
          await addUserToStore(user)
        }

      }else{
        openAlert({
          error: true,
          message: 'Tu correo actualmente no se encuentra verificado'
        })
      }
    }catch (error){
      console.log(error)
      openAlert({
        error: true,
        message: error.code
      })
    }
  }

  
  return(

    <LayoutSignMethod>
      
      <div className="login">

      <div className="login__title">
        <div className='title'>Bienvenido</div>
        <div className='subtitle'>Ingresa para continuar</div>
      </div>

      <form className='form' onSubmit={handleSubmit} >
        <Alert/>
        <div className="form-group">
          <label >Usuario</label>
          <input 
            className="form-input" 
            onChange={handleInput}   
            name='email' 
            type="text" 
            placeholder="Ingresa un correo electrónico" 
          />
        </div>

        <div className="form-group">
          <label>Contraseña</label>
          <input 
            onChange={handleInput} 
            className="form-input" 
            name='password' 
            type="password" 
            placeholder="Ingresa la contraseña" 
            autoComplete='false'/>
        </div>

        <Link to={'/register'} className='form__text'>¿Olvidaste tu contraseña?</Link>
        <button className="button button--main">Ingresar</button>


      </form>

      <div className="login__options">
        <div className="login__options--text">Ingresar con:</div>
        <div className="login__options--options">
          <img className='method-icon' src={google} alt="" />
          <img className='method-icon' src={facebook} alt="" />
          <img className='method-icon' src={phone} alt="" />
        </div>
      </div>

      <div className="login__register">
        <div className="login__register--text">¿No estas registrado? <Link to={'/register'} className='bold'>Registrate</Link>   </div>
      </div>

    </div>

    </LayoutSignMethod>
  )
}



const mapDispatchToProps ={
  openAlert,
  closeAlert
}

export default connect (null, mapDispatchToProps)(Login)