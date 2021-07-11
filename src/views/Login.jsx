import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import Modal from '../componentes/common/Modal'
import LayoutSignMethod from '../componentes/Layouts/LayoutSignMethod';

import google from '../assets/static/google-icon.svg'
import facebook from '../assets/static/facebook-icon.svg'
import phone from '../assets/static/phone-icon.svg'
import '../assets/styles/componentes/Login.scss'

import { singInWithEmail } from '../utils/auth'
import {addUserToStore, findUserById, getCurrentUser} from '../utils/dataBase';

// https://dribbble.com/wenhy/collections/1631290-design
//  https://co.pinterest.com/pin/184577284702032988/


//TODO: SI YA ESTA LOGUEADO NO ENTRAR A LOGIN....  REDIRECT DIRECTO A PROFILE SUPONGO
function Login (props){

  // console.log(props)

  const history = useHistory()

  const [form, setForm ]=  useState({
                                      email: '',
                                      password: '',
                                    })

  const [statusModal, setStatusLogin] = useState({
    isOpen:false,
    message: ''
  })

  const [test,setTest] = useState({isOpen:false, message:''})

  const handleInput = (event)=>{
    setForm({
      ...form,
      [event.target.name]: event.target.value
    })
  }        

  const handleSubmit = async (event)=>{
    event.preventDefault()

    try{
      //loggin user
      const user = await singInWithEmail(form.email, form.password)

      //si esta verificado 
      if(user.emailVerified){
        

        const userRef = await findUserById(user.uid)
        console.log(user,userRef)

        if(!userRef.exists){
          await addUserToStore(user)
        }

        history.push('/')

      }else{
        
        //desloguear ese perro
        setStatusLogin({
          isOpen:true,
          message:'Tu correo actualmente no se encuentra verificado, por favor verificalo para ingresar'
        })
      }


    }catch (error){
      console.log(error);
      
      let message = ''

      switch (error.code) {
        //if the user not exists 
        case 'auth/user-not-found':
          message = 'El perro hpta no existe en la base de datos'
          break
        case 'auth/wrong-password':
          message = 'Contraseña incorrecta mi perro'
          break
        default:
          message = error.message
      }

      setStatusLogin({
        isOpen: true,
        message: `${message}`
      })
    }
  }

  const handleClose = ()=>{
    setStatusLogin({
      isOpen: false,
      message: null
    })
  }

  return(


      <LayoutSignMethod>

        {/* {props.test && <div>melo</div>} */}
        
        <div className="login">

        {
          test.isOpen ? <div>{test.message}</div> : undefined
        }

        <div className="login__title">
          <div className='title'>Bienvenido</div>
          <div className='subtitle'>Ingresa para continuar</div>
        </div>

        <form className='form' onSubmit={handleSubmit} >
          <div className="form-group">
            <label >Usuario</label>
            <input 
              className="form-input" 
              onChange={handleInput}   
              name='email' type="email" 
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

        { statusModal.isOpen && <Modal status={statusModal} handleClose={handleClose}></Modal>}

      </LayoutSignMethod>
  )
}

export default Login