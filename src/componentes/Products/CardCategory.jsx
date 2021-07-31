import React from 'react'

const CardCategory = React.memo(({isSelect, handleClick, title}) => {

  return(
    <div 
      className= {`categories__title ${isSelect ? 'categories__title--selected' : ''}`} 
      onClick={()=>{handleClick(title)}}
      >{title}
  </div>
  )
})


export default CardCategory