import React from 'react';

const OptionCheck = ({title,toggleChecked})=>{
  return(
    <label className= 'option__check'>
      <input 
        type="checkbox" 
        name={title.toLowerCase()}
        value={title.toLowerCase()}
        onClick={toggleChecked}
      />
      {title}
    </label>
  )
}

export default OptionCheck