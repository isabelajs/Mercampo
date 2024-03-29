import React, {useState , useCallback  } from 'react';
import { Link } from 'react-router-dom';

//components
import LocalAlert from '@components/common/LocalAlert'
import LayoutSignMethod from '@components/Layouts/LayoutSignMethod';

//hooks
import {useVisibilityPassword} from '@hooks'

//styles
import '@styles/componentes/Login.scss'

//firebase functions
import { signInWithEmail, signOut } from '@utils/auth'
import {validationsInForm} from '@helpers/validationsInform';

import {useAlert} from '@hooks'

// https://dribbble.com/wenhy/collections/1631290-design
//  https://co.pinterest.com/pin/184577284702032988/


function Login (props){

  const {alertStatus,openAlert,closeAlert} = useAlert()

  const [form, setForm ] =  useState({
                              email: '',
                              password: '',
                            })

  const {visibilityPassword, handlerVisibilityPassword} = useVisibilityPassword()

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
      const user = await signInWithEmail(form.email.trim(), form.password)

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
            type={`${visibilityPassword ? 'text' : 'password'}`}
            placeholder="Ingresa la contraseña" 
            autoComplete='false'/>
        </div>

        <div className="form__checkbox">
          <input onChange={handlerVisibilityPassword} id='viewPassword' type='checkbox'/>
          <label htmlFor="viewPassword">Ver contraseña</label>
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