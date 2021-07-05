import React from 'react';
import Button from './generales/Button';
import google from '../assets/static/google-icon.svg'
import facebook from '../assets/static/facebook-icon.svg'
import phone from '../assets/static/phone-icon.svg'
import '../assets/styles/componentes/Login.scss'
import '../assets/styles/componentes/generales/Form.scss'

function Login (){
  return(
    <div className="Login">

      <div className="Login__title">
        <div className='title'>Bienvenido</div>
        <div className='subtitle'>Ingresa para continuar</div>
      </div>

      <form className='form' >
        <div className="form-group">
          <label >Usuario</label>
          <input className="form-input" name='email' type="email" placeholder="Ingresa un correo electrónico" />
        </div>

        <div className="form-group">
          <label>Contraseña</label>
          <input className="form-input" name='password' type="text" placeholder="Ingresa la contraseña" />
        </div>

        <div className='form__text'>Olvidaste tu contraseña</div>

        <Button color='main' text='Ingresar'/>
      </form>

      <div className="Login__options">
        <div className="Login__options--text">Ingresar con:</div>
        <div className="Login__options--options">
          <img className='method-icon' src={google} alt="" />
          <img className='method-icon' src={facebook} alt="" />
          <img className='method-icon' src={phone} alt="" />
        </div>
      </div>

      <div className="separator"></div>

      <div className="Login__register">
        <div className="Login__register--text">¿No estas registrado?</div>
        <Button color='main' text='Resgistrate'/>
      </div>

    </div>
  )
}

export default Login