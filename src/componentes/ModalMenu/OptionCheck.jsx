import React from 'react';

import '@styles/componentes/ModalMenu/OptionCheck.scss'

const OptionCheck = ({title,changeFilterList,type})=>{
  
  return(
    <label className= 'option__check'>
      <input 
        type="checkbox" 
        name={title.toLowerCase()}
        value={title.toLowerCase()}
        onClick={(e)=>changeFilterList(e,type)}
      />
      {title}
    </label>
  )
}

export default OptionCheck