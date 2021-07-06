import React from 'react';
import Button from '../componentes/common/Button';
import google from '../assets/static/google-icon.svg'
import facebook from '../assets/static/facebook-icon.svg'
import phone from '../assets/static/phone-icon.svg'
import '../assets/styles/componentes/Login.scss'
import '../assets/styles/generales/Form.scss'


//le coloque overflow-y scroll, asi ocupa el tamaño que tiene de height si no seguira de largo ocupadno hacia abajo cuanto necesite 
//Me preocupa ese menu inferior, dberiamos pensarlo mejor si queremos que en version mobil se vea como una app
//por que si podemos hacerlo que se esconda pero por ejemplo en el login que aparezca me parece horrible, abre la version mobile y mira 
// https://dribbble.com/wenhy/collections/1631290-design
//  https://co.pinterest.com/pin/184577284702032988/
// le veo mas potencial al ultimo link para organizar un menu... mañana lo hablamos bien
// lo mismo en login no deberia aparecer el hedaer apenas una flechita intuitiva de ir hacia atras.. no sheee, lo veo dudosiño
function Login (props){

  console.log(props);
  
  return(
    <div className="login">

      <div className="login__title">
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
          <input className="form-input" name='password' type="password" placeholder="Ingresa la contraseña" autoComplete='false'/>
        </div>

        <div className='form__text'>Olvidaste tu contraseña</div>

        <Button color='main' text='Ingresar'/>
      </form>

      <div className="login__options">
        <div className="login__options--text">Ingresar con:</div>
        <div className="login__options--options">
          <img className='method-icon' src={google} alt="" />
          <img className='method-icon' src={facebook} alt="" />
          <img className='method-icon' src={phone} alt="" />
        </div>
      </div>

      <div className="separator"></div>

      <div className="login__register">
        <div className="login__register--text">¿No estas registrado?</div>
        <Button color='main' text='Registrate'/>
      </div>


    </div>
  )
}

export default Login