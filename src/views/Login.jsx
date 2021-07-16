import React, {useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
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
import { singInWithEmail, signOff } from '../utils/auth'
import {addUserToStore, findUserById} from '../utils/dataBase';
import { useCallback } from 'react';

// https://dribbble.com/wenhy/collections/1631290-design
//  https://co.pinterest.com/pin/184577284702032988/


function Login (props){
  const {openAlert, closeAlert} = props

  //como la alerta no es un modal, yo creo que no deberia estar en el redux, aahora que lo pienso
  //si fuera un modal si me interesaria que todos supieran sobre su estado
  //pero lo estamos utilizando como un componente de dibujo normal...
  useEffect(()=>{
    closeAlert()
  },[])

  // const history = useHistory()

  const [form, setForm ] =  useState({
                              email: '',
                              password: '',
  })

  const validationsInForm = useCallback((form)=>{
    let message = null

    if(form.email === '' || (form.email.length < 10 && !form.email.includes('@'))){
      message = 'Por favor ingresa un correo válido'
    }else if(form.password === ' ' || form.password.length < 8){
      message = 'La contraseña es muy corta'
    }

    return message

  },[])

  const handleInput = (event)=>{
    setForm({
      ...form,
      [event.target.name]: event.target.value
    })
  }        

  const handleSubmit = async (event)=>{

    event.preventDefault()
    
    const validation = validationsInForm(form)

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


      //si el ususario existe en la base de datos , confirma si se encuentra verificado
      if(user.emailVerified){
        
        const userRef = await findUserById(user.uid)

        if(!userRef.exists){
          await addUserToStore(user)
        }

        //COMPLETE PERDI 1 HORA POR QUE AL LOGUEARME ME REDIRECCIONABA A HOME ...
        // history.push('/')

      }else{
        // signOff() -> esto ya no tiene proposito aca
        openAlert({
          error: true,
          message: 'Tu correo actualmente no se encuentra verificado'
        })
      }
    }catch (error){
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