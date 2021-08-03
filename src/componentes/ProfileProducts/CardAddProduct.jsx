import React from 'react';
import '../../assets/styles/componentes/ProfileProducts/itemNewProduct.scss'
import { useHistory } from 'react-router-dom';

const CardAddProduct = (props) => {

  const history = useHistory()

  return(
    <>
      <div onClick={()=>{history.push('/profile/products/new')}} className="buttonNewProduct button button--icon button--main">
        <svg className='button__icon' width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clipPath="url(#clip0)">
          <path d="M22.7263 10.1483H14.8552V2.27722C14.8552 -0.757935 10.1482 -0.757935 10.1482 2.27722V10.1483H2.27712C-0.757251 10.1483 -0.757251 14.8553 2.27712 14.8553H10.1482V22.7264C10.1482 25.7616 14.8552 25.7616 14.8552 22.7264V14.8553H22.7263C25.7611 14.8553 25.7611 10.1483 22.7263 10.1483Z" fill="white"/>
          </g>
          <defs>
          <clipPath id="clip0">
          <rect width="25" height="25" fill="white"/>
          </clipPath>
          </defs>
        </svg>

        <p>Nuevo</p>
      </div>

      <div className='itemNewProduct'>

        <div className="itemNewProduct__imgSpace"></div>
        
        <div className="buttonNewProduct button button--icon button--main" onClick={()=>{history.push('/profile/products/new')}}>
            <svg className='button__icon' width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0)">
              <path d="M22.7263 10.1483H14.8552V2.27722C14.8552 -0.757935 10.1482 -0.757935 10.1482 2.27722V10.1483H2.27712C-0.757251 10.1483 -0.757251 14.8553 2.27712 14.8553H10.1482V22.7264C10.1482 25.7616 14.8552 25.7616 14.8552 22.7264V14.8553H22.7263C25.7611 14.8553 25.7611 10.1483 22.7263 10.1483Z" fill="white"/>
              </g>
              <defs>
              <clipPath id="clip0">
              <rect width="25" height="25" fill="white"/>
              </clipPath>
              </defs>
            </svg>

            <p>Nuevo</p>
          </div>
      
      </div>
    </>

  )
}


export {CardAddProduct}