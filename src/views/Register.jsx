import React , {useState}from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../firebase.config';
import LayoutSignMethod from '../componentes/Layouts/LayoutSignMethod';
import google from '../assets/static/google-icon.svg'
import facebook from '../assets/static/facebook-icon.svg'
import phone from '../assets/static/phone-icon.svg'
import '../assets/styles/componentes/Register.scss'


function Register(){


  const [form, setForm ]=  useState({
    name:'',
    email: '',
    password: '',
  })

  const handleChange = (event)=>{
  setForm({
    ...form,
    [event.target.name]: event.target.value
    })
  }        


  const handleSubmit = (e,a)=>{
    e.preventDefault()
    auth.createUserWithEmailAndPassword(form.email,form.password)
      .then((user)=>{

        //crear una store para almacenar la info diferente


      })
      .catch(
        (error)=>{

        }
      )
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
              onChange={handleChange} />
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
              />
          </div>

          <div className="form-group">
            <label>Contraseña</label>   
            <input 
              onChange={handleChange}
              className='form-input' 
              name='password' 
              type='text' 
              placeholder='Ingresa tu contraseña' 
              value = {form.password}
              autoComplete='false' />
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

export default Register;





//funciones aparte


  //