import React from 'react';
import test from '../../assets/static/img-product.png'
import '../../assets/styles/componentes/ProfileProduct.scss'
import '../../assets/styles/componentes/itemNewProduct.scss'
import { useHistory } from 'react-router-dom';
// import { Link } from 'react-router-dom'

function ProfileProduct(props) {

  return (
    <div className='profileProduct'>
      
      <img src={test} alt='img Product' className="profileProduct__img"/>

      <div className="l-profileProduct__bottom">

        <div className="l-profileProduct__info">
          <p className="profileProduct__name">Huevos</p>
          <p className="ProfileProduct__price">Und. - $ 12.000</p>
        </div>

        <div className="l-profileProduct__buttons">


        <svg className='profileProduct__date' width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15.0333 10.06L13.8556 9L8.43333 13.88L6.07778 11.76L4.9 12.82L8.43333 16L15.0333 10.06ZM17.7778 2H16.6667V0H14.4444V2H5.55556V0H3.33333V2H2.22222C0.988889 2 0.0111111 2.9 0.0111111 4L0 18C0 18.5304 0.234126 19.0391 0.650874 19.4142C1.06762 19.7893 1.63285 20 2.22222 20H17.7778C19 20 20 19.1 20 18V4C20 2.9 19 2 17.7778 2ZM17.7778 18H2.22222V7H17.7778V18Z" fill="#111111"/>
        </svg>

        <div className='profileProduct__edit'>
          <svg  width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.9691 13.4736L15.0802 12.2238C15.2538 12.0285 15.5559 12.1652 15.5559 12.4464V18.1253C15.5559 19.1603 14.8093 20 13.8892 20H1.6667C0.746544 20 0 19.1603 0 18.1253V4.37729C0 3.34228 0.746544 2.50256 1.6667 2.50256H11.1634C11.41 2.50256 11.535 2.83845 11.3614 3.03764L10.2502 4.28746C10.1981 4.34604 10.1287 4.37729 10.0523 4.37729H1.6667V18.1253H13.8892V13.6923C13.8892 13.6103 13.917 13.5322 13.9691 13.4736ZM19.4067 5.59195L10.2884 15.8483L7.14946 16.2388C6.23972 16.3521 5.4654 15.4889 5.56609 14.4578L5.91332 10.9271L15.0316 0.6708C15.8267 -0.2236 17.1115 -0.2236 17.9032 0.6708L19.4032 2.35805C20.1984 3.25245 20.1984 4.70146 19.4067 5.59195ZM15.976 6.79881L13.9586 4.52961L7.50711 11.7903L7.25363 14.3407L9.52104 14.0556L15.976 6.79881ZM18.2261 3.68598L16.7261 1.99873C16.5837 1.8386 16.351 1.8386 16.2122 1.99873L15.1392 3.20559L17.1566 5.47478L18.2296 4.26793C18.3685 4.10389 18.3685 3.84612 18.2261 3.68598Z" fill="#FBBC05"/>
          </svg>
        </div>


        <div className='profileProduct__delete'>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19.1667 3.6H17.8333C16.7288 3.6 15.8333 2.70457 15.8333 1.6C15.8333 0.7175 15.0859 0 14.1667 0H5.83333C4.91406 0 4.16667 0.7175 4.16667 1.6C4.16667 2.70457 3.27124 3.6 2.16667 3.6H0.833333C0.372396 3.6 0 3.9575 0 4.4V5.2C0 5.31 0.09375 5.4 0.208333 5.4C1.08926 5.4 1.81525 6.09115 1.85854 6.97102L2.42448 18.475C2.46615 19.3275 3.20052 20 4.08854 20H15.9115C16.8021 20 17.5339 19.33 17.5755 18.475L18.1415 6.97102C18.1847 6.09115 18.9107 5.4 19.7917 5.4C19.9062 5.4 20 5.31 20 5.2V4.4C20 3.9575 19.6276 3.6 19.1667 3.6ZM6.04167 2.7C6.04167 2.20294 6.44461 1.8 6.94167 1.8H13.0583C13.5554 1.8 13.9583 2.20294 13.9583 2.7C13.9583 3.19706 13.5554 3.6 13.0583 3.6H6.94167C6.44461 3.6 6.04167 3.19706 6.04167 2.7ZM15.8982 14.3967C15.7933 16.5268 14.0357 18.2 11.903 18.2H8.09697C5.96429 18.2 4.20668 16.5268 4.10181 14.3967L3.86548 9.59671C3.75305 7.31309 5.57426 5.4 7.86064 5.4H12.1394C14.4257 5.4 16.247 7.31308 16.1345 9.5967L15.8982 14.3967Z" fill="#EA3449"/>
          </svg>
        </div>


        </div>

      </div>
    </div>
  );
};


const ProfileButtonNewProduct = (props) => {

  const history = useHistory()

  return(
    <>
      <div className="buttonNewProduct button button--icon button--main">
        <svg className='button__icon' width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clip-path="url(#clip0)">
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
              <g clip-path="url(#clip0)">
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

export {ProfileProduct,ProfileButtonNewProduct}