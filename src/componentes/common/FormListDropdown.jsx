import React, { useState } from 'react';
import '../../assets/styles/generales/FormListDropdown.scss'

//lista de ciudades
import { allCities } from '../../utils/Helpers/dataBaseCities'

const FormListDropdown = ()=>{
  const allCitiesdb = allCities()

  const [isvisibility,setIsVisibility] = useState(false)
  const [city, setCity]= useState('')
  const [cities, setCities] = useState(allCitiesdb)


  const toggleVisibility = ()=>{
    setIsVisibility(!isvisibility)
  }

  const filterCity = ({target})=>{
    setIsVisibility(true)
    setCity(target.value)
    let lista = allCities().filter( city =>  city.toLowerCase().indexOf(target.value.toLowerCase()) > -1)
    setCities(lista);
    
  }

  return(
    <form>
      <input 
        className="input-text" 
        type="text"   
        value= {city}
        placeholder="Ingresa una ciudad"
        onClick = {toggleVisibility}
        onChange = {filterCity}
      />

      <ul className= {`value-list ${isvisibility ?"show" :''}`}>
        {
          cities.map((city,index)=> <li key ={index} onClick={()=>{setCity(city)}}>{city}</li>)
        }
      </ul>

    </form>
  )
}

export default FormListDropdown