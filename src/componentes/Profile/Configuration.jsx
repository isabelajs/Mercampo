import React from 'react'
import Button from '../common/Button'

const Configuration = ()=>{

  
  return (
    <div className='profile__view-container'>

      <form className='form conf__profile'>

        <div className='profile-group conf__photo'>
          <p className='group__title'>Foto:</p>
          <img src="" alt="" />
        </div>

        <div className='profile-group conf__perfil'>
          <div className="group__title">Perfil:</div>
          <p>Esta información se mostrará públicamente, así que tenga cuidado con lo que comparte.</p>
        
          <div className="form-group">
            <label>Nombre y apellido</label>
            <input className="form-input" name='email' type="email" placeholder="Ingresa un correo electrónico" />
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

          <div className="group__sub-title">Contacto:</div>

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

        <div className='form__text'>Olvidaste tu contraseña</div>

        <Button color='main' text='Guardar'/>

      </form>




    </div>
  )
}

export default Configuration