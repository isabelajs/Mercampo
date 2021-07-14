import React , { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
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
import {createUser, signOff} from '../utils/auth'

//actiones
import { openAlert } from '../actions'
import Modal from '../componentes/common/Modal';

//TODO deberia exister un elemento que me retorne a home?
//TODO: DARLE MAS WIDTH AL CONTENEDOR DEL FORM EN TAMAÑO 1024 
//TODO CONFIRMACIÓN DE CONTRASEÑA Y VISUALIZACIÓN
//BUG NO SE CIERRA CON ENTER EL MODAL


function Register(props){

  const {openAlert} = props
  

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

  const validationsInForm = (form)=>{
    if (form.name){
      return 'nombre esta ok'
    }
  } 

  const handleSubmit = async (e)=>{
    e.preventDefault()

    try{
      const user = await createUser(form.email,form.password, form.name)
      openAlert({
        error:false,
        message: 'Todo esta correcto'
      })
      signOff()
      
    }catch(error){
      openAlert({
        error: error,
        message: error.message
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
            
    </LayoutSignMethod>

  )
}

const mapStateToProps = state => {
  return {
    statusAlert :state.statusAlert
  }
}

const mapDispatchToProps = {
  openAlert
}


export default connect(null,mapDispatchToProps)(Register);





// hanlde(){

//   message = validateRegister(form)

  //si existe un mensaje 'que hay algo mal escroto'
    //alert({error:true,message:message})
    //return --> no sigue mas codigo


  //createuser()

    //then
      //alert({error:null,message:'Todo correcto y yo que me alegro'})

    //catch
      //alert({error:true,message:'no conocemos'})
// }