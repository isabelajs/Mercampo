import React, { useState,useRef } from 'react';
import '../../assets/styles/generales/FormListDropdown.scss'

//lista de ciudades
import { allCities } from '../../utils/Helpers/dataBaseCities'

const FormListDropdown = ({changeFilterList,type})=>{
  const ref = useRef()
  const allCitiesdb = allCities()
  const [isvisibility,setIsVisibility] = useState(false)
  const [city, setCity]= useState('')
  const [cities, setCities] = useState(allCitiesdb)


  const toggleVisibility = ()=>{
    setIsVisibility(!isvisibility)
  }

  const changeStylesInput = ()=>{
    toggleVisibility()
    if(isvisibility){
      ref.current.style.borderRadius = '4px'
    }else{
      ref.current.style.borderRadius = '4px 4px 0 0'
    }
  }
  
  const filterCity = ({target})=>{
    setIsVisibility(true)
    setCity(target.value)
    let lista = allCities().filter( city =>  city.toLowerCase().indexOf(target.value.toLowerCase()) > -1)
    setCities(lista);
    
  }

  return(
    <div>
      <div className="c-input-text"  ref={ref}>
        <input 
          className="input-text" 
          type="text"   
          value= {city}
          placeholder="Ingresa una ciudad"
          onChange = {filterCity}
          onClick = {changeStylesInput}
        />

        <svg
          className="search__icon"
          onClick = {(e)=>{changeFilterList(e,type,city.toLowerCase())}}
          width="15"
          height="15"
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14.9549 13.9218L10.0856 9.05246C10.8412 8.07559 11.25 6.88122 11.25 5.62498C11.25 4.12123 10.6631 2.71124 9.60183 1.64812C8.54059 0.584997 7.12684 0 5.62498 0C4.12311 0 2.70936 0.586872 1.64812 1.64812C0.584997 2.70936 0 4.12123 0 5.62498C0 7.12684 0.586872 8.54059 1.64812 9.60183C2.70936 10.665 4.12123 11.25 5.62498 11.25C6.88122 11.25 8.07372 10.8412 9.05059 10.0875L13.9199 14.9549C13.9342 14.9692 13.9512 14.9806 13.9698 14.9883C13.9885 14.996 14.0085 15 14.0287 15C14.0489 15 14.0689 14.996 14.0875 14.9883C14.1062 14.9806 14.1232 14.9692 14.1374 14.9549L14.9549 14.1393C14.9692 14.125 14.9806 14.1081 14.9883 14.0894C14.996 14.0708 15 14.0508 15 14.0306C15 14.0104 14.996 13.9904 14.9883 13.9717C14.9806 13.953 14.9692 13.9361 14.9549 13.9218V13.9218ZM8.59496 8.59496C7.79997 9.38808 6.74622 9.82496 5.62498 9.82496C4.50373 9.82496 3.44999 9.38808 2.65499 8.59496C1.86187 7.79997 1.42499 6.74622 1.42499 5.62498C1.42499 4.50373 1.86187 3.44811 2.65499 2.65499C3.44999 1.86187 4.50373 1.42499 5.62498 1.42499C6.74622 1.42499 7.80184 1.85999 8.59496 2.65499C9.38808 3.44999 9.82496 4.50373 9.82496 5.62498C9.82496 6.74622 9.38808 7.80184 8.59496 8.59496Z"
            fill="#B8B5B5"
          />
        </svg>
        
      </div>


      <ul className= {`value-list ${isvisibility ?"show" :''}`}>
        {
          cities.map((city,index)=> <li key ={index} onClick={()=>{setCity(city)}}>{city}</li>)
        }
      </ul>

      </div> 
  )
}

export default FormListDropdown


