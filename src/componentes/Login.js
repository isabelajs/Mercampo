import React from 'react';
import Button from './generales/Button';
import '../assets/styles/componentes/Login.scss'
import '../assets/styles/componentes/generales/Form.scss'

function Login (){
  return(
    <div className="Login">

      <div className="Login__title">
        <div className='title'>Bienvenido</div>
        <div className='subtitle'>Ingresa para continuar</div>
      </div>

      <form >
        <div className="form-group">
          <label className>Usuario</label>
          <input className="form-input" name='email' type="email" placeholder="Ingresa un correo electrónico" />
        </div>

        <div className="form-group">
          <label>Contraseña</label>
          <input className="form-input" name='password' type="text" placeholder="Ingresa la contraseña" />
        </div>

        <div>Olvidaste tu contraseña</div>
      <Button color='main' text='Ingresar'/>

      </form>

    </div>
  )
}

export default Login