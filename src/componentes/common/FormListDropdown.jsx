import React from 'react';
import '../../assets/styles/generales/FormListDropdown.scss'

//lista de ciudades
import { allCities } from '../../utils/Helpers/dataBaseCities'

const FormListDropdown = ()=>{
  
  return(
  <form>

    <input 
      className="input-text" 
      type="text"   
      value="" 
      placeholder="Ingresa una ciudad"
    />

    <ul className="value-list open">
      {
        allCities().map((city,index)=> <li key ={index}>{city}</li>)
      }
    </ul>

  </form>
  )
}

export default FormListDropdown