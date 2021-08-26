import React, {useState , useCallback  } from 'react';
import { Link } from 'react-router-dom';

//componentes de react
import LocalAlert from '../componentes/common/LocalAlert'
import LayoutSignMethod from '../componentes/Layouts/LayoutSignMethod';

//imagenes
// import google from '../assets/static/google-icon.svg'
// import facebook from '../assets/static/facebook-icon.svg'
// import phone from '../assets/static/phone-icon.svg'
import '../assets/styles/componentes/Login.scss'

//funciones de firebase
import { signInWithEmail, signOut } from '../utils/auth'
import {validationsInForm} from '../utils/Helpers/validationsInform';

import {useAlert} from '../utils/Hooks'

// https://dribbble.com/wenhy/collections/1631290-design
//  https://co.pinterest.com/pin/184577284702032988/


function Login (props){

  const {alertStatus,openAlert,closeAlert} = useAlert()

  
  const [form, setForm ] =  useState({
                              email: '',
                              password: '',
                            })

  const validationForm = useCallback((form)=>{validationsInForm(form)},[])

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
      const user = await signInWithEmail(form.email, form.password)

      // si el usuario esta verificado, se confirma si esta en la base de datos
      if(!user.emailVerified){
        await signOut()
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
        <div className='title'>Bienvenido !</div>
        <div className='subtitle'>Ingresa para continuar</div>
      </div>

      <form className='form' onSubmit={handleSubmit} >

        <LocalAlert alertStatus={alertStatus} closeAlert={closeAlert}/>

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

        <Link to='/recovery' className='form__text'>¿Olvidaste tu contraseña?</Link>
        <button className="button button--main">Ingresar</button>


      </form>

      <div className="login__register">
        <div className="login__register--text">¿No estas registrado? <Link to={'/register'} className='bold'>Registrate</Link>   </div>
      </div>

    </div>

    </LayoutSignMethod>
  )
}



export default Login