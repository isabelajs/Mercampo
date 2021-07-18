import React from "react";
import { useEffect } from "react";
import { connect } from 'react-redux'

import SystemLayout from "../componentes/system/SystemLayout";

//estilos
import '../assets/styles/componentes/ProfileSettings.scss'
//funciones de auth
import { findUserById } from "../utils/dataBase";
import { useState } from "react";

const ProfileSettings = (props) => {
  const {user} = props
  const [form, setForm] = useState({
    name: '',
    })

  const links = [
    { name: "Perfil", url: "/profile/settings" },
    { name: "Settings", url: "/profile/settings" },
  ];

  const handleChange = (e)=>{
    console.log('pepe')
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }


  useEffect( ()=>{

    const findUser = async ()=>{
      let userInData = await findUserById(user.uid)
      setForm({
        ...form,
        name: userInData.name,
        email: userInData.email,
      })
    }

    findUser()

   
  }
    ,[])

  const handleSubmit = (e)=>{
    e.preventDefault()
    console.log(user)
  }

 
  return (

    <SystemLayout links={links} type='settings'  props={props}>

        <div className="l-profileSettings">

          <form className='profileSettings__data form' onSubmit = {handleSubmit}>

            <div className='data__photo'>
              <div className='systemSubGroup__title'>Foto:</div>
              <img src="" alt="" />

              <div className="separation-line"></div>
            </div>

            <div className='data__info'>

              <div className='systemSubGroup__title'>Perfil:</div>
              <p>Esta información se mostrará públicamente para la referencia de sus productos.</p>

              <div className="l-systemSubGroup">

                <div className="l-info">

                  <div className="form-group">
                    <label>Nombre y apellido</label>
                    <input className="form-input" name='name' type="text" placeholder="Ingresa tu nombre" value ={form.name} onChange={handleChange} />
                  </div>

                  <div className="form-group">
                    <label>Cedula</label>
                    <input className="form-input" name='password' type="text" placeholder="Ingresa la contraseña" />
                  </div>
                  
                  <div className="form-group">
                    <label>Departamento</label>
                    <input className="form-input" name='departamento' type="text" placeholder="Ingresa la contraseña" autoComplete='false'/>
                  </div>

                  <div className="form-group">
                    <label>Municipio</label>
                    <input className="form-input" name='municipio' type="text" placeholder="Ingresa la contraseña" />
                  </div>

                </div>
            
                <div className="separation-line"></div>
                
              </div>

              <div className="l-systemSubGroup">

                <div className='systemSubGroup__title'>Contacto:</div>

                <div className="l-contacto">

                  <div className="form-group">
                    <label>Telefono-1 (WhatsApp)</label>
                    <input className="form-input" name='telefono-1' type="text" placeholder="Ingresa la contraseña"/>
                  </div>

                  <div className="form-group">
                    <label>Telefono-2</label>
                    <input className="form-input" name='telefono-2' type="text" placeholder="Ingresa la contraseña"/>
                  </div>

                  <div className="form-group">
                    <label>Correo Electronico</label>
                    <input className="form-input" name='correo' type="text" placeholder="Ingresa la contraseña" autoComplete='false'/>
                  </div>

                </div>

                <div className="separation-line"></div>
              </div>

            </div>

            <button className='button button--second'>Guardar</button>

          </form>

          <form className="profileSettings__password l-systemSubGroup form ">

            <div className='systemSubGroup__title'>Cambiar contraseña</div>

            <div className="l-password">
              <div className="form-group">
                <label htmlFor="">Contraseña actual: </label>
                <input className='form-input' type="password" placeholder='Contraseña Actual'/>
              </div>
              <div className="form-group">
                <label htmlFor="">Nueva contraseña:  </label>
                <input className='form-input' type="password" placeholder='Contraseña Nueva'/>
              </div>
              <div className="form-group">
                <label htmlFor="">Repite tu nueva contraseña: </label>
                <input className='form-input' type="password" placeholder='Repite tu nueva contraseña'/>
              </div>
            </div>



            <div className="l-buttons">
              <button className='button button--second'>Cambiar</button>
              <button className='button button--second'>Cancelar</button>
            </div>

          </form>
  
        </div>

    </SystemLayout>
  );
};

const mapDispatchToProps = (state)=>{
  return{
    user : state.user
  }
}


export default connect (mapDispatchToProps,null)(ProfileSettings)
