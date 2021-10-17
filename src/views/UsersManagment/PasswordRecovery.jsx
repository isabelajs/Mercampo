import React, {useState, useEffect, useCallback  } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

//redux actions
import { openAlert,closeAlert } from '@actions';

//componentes de react
import Alert from '@components/common/Alert'
import LayoutSignMethod from '@components/Layouts/LayoutSignMethod';

//funciones de firebase
import { passwordReset } from '@utils/auth'
import {validationsInForm} from '@helpers/validationsInform';

//styles
import '@styles/componentes/PasswordRecovery.scss'

function RecoverPassword (props){
  const {openAlert, closeAlert} = props

  useEffect(()=>{
    closeAlert()
  },[closeAlert])

  const [form, setForm ] =  useState({email: ''})

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

      await passwordReset(form.email.trim())

      openAlert({
        error: true,
        message: 'Se ha enviado un correo electronico para la recuperacion de tu cuenta, revisa la bandeja de entrada'
      })

    }catch(err){
      openAlert({
        error: true,
        message: err.code
      })
    }
  }

  
  return(

    <LayoutSignMethod>
      
      <div className="recovery">

      <div className="recovery__title">
        <div className='title'>Recovery</div>
        <div className='subtitle'>Ingresa tu correo para continuar</div>
      </div>

      <form className='form' onSubmit={handleSubmit} >
        <Alert/>
        <div className="form-group">
          <label>Email</label>
          <input 
            className="form-input" 
            onChange={handleInput}   
            name='email' 
            type="text" 
            placeholder="Ingresa un correo electronico registrado" 
          />
        </div>

        <button className="button button--main">Confirmar</button>

      </form>

      <div className="login__register">
        <div className="login__register--text">¿Ya estas registrado? <Link to={'/login'} className='bold'>Ingresa</Link></div>
      </div>

    </div>

    </LayoutSignMethod>
  )
}

const mapDispatchToProps ={
  openAlert,
  closeAlert
}

export default connect(null, mapDispatchToProps)(RecoverPassword)