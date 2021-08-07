import React from 'react';

import '../../assets/styles/componentes/ModalMenu/OptionCheck.scss'

const OptionCheck = ({title,changeFilterList})=>{
  return(
    <label className= 'option__check'>
      <input 
        type="checkbox" 
        name={title.toLowerCase()}
        value={title.toLowerCase()}
        onClick={changeFilterList}
      />
      {title}
    </label>
  )
}

export default OptionCheck