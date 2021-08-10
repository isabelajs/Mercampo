import React from 'react'


const FormListbox = (props)=>{
  const {titleName,name,setValue,value,children} = props
  return(
    <div className="form-group">
      <label htmlFor="">{titleName}</label>
      <select
        className="form-listBox"
        name={name}
        onChange={setValue}
        value= {value}
      >

        {children}
      
      </select>
  </div>
  )
}


export default FormListbox

