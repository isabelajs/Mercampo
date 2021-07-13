import React , {useEffect, useState}from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'

//componentes react
import Modal from '../componentes/common/Modal'
import LayoutSignMethod from '../componentes/Layouts/LayoutSignMethod';

//imagenes y estilos css
import google from '../assets/static/google-icon.svg'
import facebook from '../assets/static/facebook-icon.svg'
import phone from '../assets/static/phone-icon.svg'
import '../assets/styles/componentes/Register.scss'

//funciones auth
import {createUser, signOff} from '../utils/auth'
//actiones
import { messageInModal } from '../actions'

//TODO deberia exister un elemento que me retorne a home?
//TODO: DARLE MAS WIDTH AL CONTENEDOR DEL FORM EN TAMAÑO 1024 
//BUG NO SE CIERRA CON ENTER EL MODAL


function Register(props){

  const {statusModal} = props

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

  const handleMessageInModal = (email)=>{
    props.messageInModal({
      error: null,
      message: `Se ha enviado un correo de confirmacion al email ${email}, porfavor revisa la bandeja de entrada o spam de tu correo electronico`,
      isOpen: true
    })
  }

  const handleErrorInModal = (error) => {
    props.messageInModal({
      error:error,
      message: `Hemos encontrado un error ${error.message}`,
      isOpen:true
    })
  }

  const handleSubmit = async (e)=>{
    e.preventDefault()

    try{
      const user = await createUser(form.email,form.password, form.name)
      handleMessageInModal(user.email)
      signOff()

    }catch(error){
      handleErrorInModal(error)
    }
  
  }

  const handleCloseModal = ()=>{
    props.messageInModal({
      error:null,
      message: '',
      isOpen: false
    })
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
              onChange={handleChange}
              required
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
              value = {form.email}
              required
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
              value = {form.password}
              autoComplete='false'
              required
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
            
      {
        statusModal.isOpen && <Modal status={statusModal} handleClose = {handleCloseModal}/>
      }
    </LayoutSignMethod>

  )
}

const mapStateToProps = state =>{
  return{
    statusModal: state.statusModal
  }
}

const mapDispatchToProps = {
  messageInModal
}


export default connect(mapStateToProps,mapDispatchToProps)(Register);


