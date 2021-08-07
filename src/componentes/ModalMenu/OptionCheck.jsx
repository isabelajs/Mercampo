import React from 'react';

import '../../assets/styles/componentes/ModalMenu/OptionCheck.scss'

const OptionCheck = ({title,changeFilterList,type})=>{

  const test = (e) => {
    console.log(type)
    changeFilterList(e)
  };
  
  return(
    <label className= 'option__check'>
      <input 
        type="checkbox" 
        name={title.toLowerCase()}
        value={title.toLowerCase()}
        onClick={test}
      />
      {title}
    </label>
  )
}

export default OptionCheck