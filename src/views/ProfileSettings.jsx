import React, { useEffect, useState, useCallback} from "react";
import { connect } from 'react-redux';

//componentes react
import SystemLayout from "../componentes/system/SystemLayout";
import Alert from "../componentes/common/Alert";

//estilos
import '../assets/styles/componentes/ProfileSettings.scss';

//funciones de auth
import { findUserById, updateUserInfo } from "../utils/dataBase";
import validationsInForm from '../utils/validationsInform';

//import actions
import { closeAlert, openAlert } from '../actions'

//TODO Campos obligatorios deberia mostratme un alert??


const ProfileSettings = (props) => {
  const {user,openAlert, closeAlert} = props

  const [form, setForm] = useState({
    city: '',
    department: '',
    email: '',
    id: '',
    name: '',
    phoneMain: '',
    phoneSecond: ''
    })

  const links = [
    { name: "Perfil", url: "/profile/settings" },
    { name: "Settings", url: "/profile/settings" },
  ];

  const handleChange = (e)=>{
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const validationForm = useCallback((form)=>validationsInForm(form),[])

  useEffect( ()=>{

    const findUser = async ()=>{
      let userInData = await findUserById(user.uid)
      setForm({
        ...form,
        city: userInData.city,
        department: userInData.department,
        email: userInData.email,
        id: userInData.id,
        name: userInData.name,
        phoneMain: userInData.phoneMain,
        phoneSecond: userInData.phoneSecond

      })
    }

    findUser()
  }
    ,[])

  
  const handleSubmit = (e)=>{
    e.preventDefault()

    const validation = validationForm(form)

    if(validation){
      openAlert({
        error:true,
        message:validation
      }
      )
    }else{
      closeAlert()
    }
    // updateUserInfo(user.uid,form)
    
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
                    <input 
                      className="form-input"
                      name='name'
                      type="text"
                      placeholder="Ingrese un nombre"
                      value ={form.name}
                      onChange={handleChange} />
                  </div>

                  <div className="form-group">
                    <label>Cedula</label>
                    <input 
                      className="form-input" 
                      name='id' 
                      type="number" 
                      value ={form.id}
                      placeholder="Ingrese número de cédula" 
                      onChange={handleChange} 
                      />
                  </div>
                  
                  <div className="form-group">
                    <label>Departamento</label>
                    <input 
                      className="form-input" 
                      name='department' 
                      type="text" 
                      value={form.department}
                      placeholder="Ingrese el departamento de residencia" 
                      autoComplete='false' 
                      onChange={handleChange}/>
                  </div>

                  <div className="form-group">
                    <label>Ciudad</label>
                    <input 
                      className="form-input" 
                      name='city' 
                      type="text" 
                      value={form.city}
                      placeholder="Ingrese ciudad de residencia" 
                      onChange={handleChange} 
                    />
                  </div>

                </div>
            
                <div className="separation-line"></div>
                
              </div>

              <div className="l-systemSubGroup">

                <div className='systemSubGroup__title'>Contacto:</div>

                <div className="l-contacto">

                  <div className="form-group">
                    <label>Telefono-1 (WhatsApp)</label>
                    <input 
                      className="form-input" 
                      name='phoneMain' 
                      type="number" 
                      value = {form.phoneMain}
                      placeholder="Número telefonico principal" 
                      onChange={handleChange}/>
                  </div>

                  <div className="form-group">
                    <label>Telefono-2</label>
                    <input 
                      className="form-input" 
                      name='phoneSecond' 
                      type="number" 
                      value= {form.phoneSecond}
                      placeholder="Número telefonico secundario" 
                      onChange={handleChange}/>
                  </div>

                  <div className="form-group">
                    <label>Correo Electronico</label>
                    <input 
                      className="form-input" 
                      name='email' type="email" 
                      placeholder="Ingrese un correo electronico" 
                      value={form.email} 
                      autoComplete='false'
                      onChange={handleChange}/>
                  </div>

                </div>

                <div className="separation-line"></div>
              </div>

            </div>
            <Alert/>
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

const mapStateToProps = (state)=>{
  return{
    user : state.user
  }
}

const mapDispatchToProps = {
  openAlert,
  closeAlert
}


export default connect (mapStateToProps,mapDispatchToProps)(ProfileSettings)
