import React from 'react'
import { waMessage } from '../../utils/Helpers/functions'

import '../../assets/styles/componentes/Product/ProductInfo.scss'

const ProductInfo = (props) =>{

  const {data, userData} = props

  const sendWaMessage = () =>{

    const message = waMessage(userData.phoneMain,`Me encuentro interesado en tu producto ${data.name} me gustaria tener mas informacion`)

    window.open(message,'_blank').focus()
  }

  return(

    <div className='product__info'>

      <div>
        <h2 className='product__name'>{data.name}</h2>
        <h3>{userData.name || 'unknown user name' }</h3>
      </div>

      <p className="product__description">{data.description}</p>

      <div>
        { 
          Object.entries(data.prices).map((price,index)=> <p key={index}>{price[0]} - {price[1]}</p>)
        }
      </div>

      <div className="product__userInfo">
        <p>Email: {userData.email || 'unknown user email'}</p>
        <p>Celular: {userData.phoneMain || 'unknown user phone' } {userData.phoneSecond && ` - ${userData.phoneSecond}`} </p>
        <div className='product__userContact'>
          <span onClick={sendWaMessage}>Enviale un mensaje</span>
          <svg style={{cursor:'pointer'}} onClick={sendWaMessage} width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0)">
            <path d="M9.25072 29.9764L9.82289 30.2593C12.2073 31.6732 14.8775 32.333 17.5479 32.333C25.9404 32.333 32.807 25.546 32.807 17.2508C32.807 13.2917 31.1856 9.42683 28.3246 6.59886C25.4635 3.77089 21.6487 2.16846 17.5479 2.16846C9.15543 2.16846 2.28873 8.95548 2.38416 17.3451C2.38416 20.1729 3.24248 22.9067 4.67297 25.2632L5.05442 25.8289L3.52863 31.3905L9.25072 29.9764Z" fill="#00E676"/>
            <path d="M29.9459 5.09027C26.7034 1.79108 22.221 0 17.6433 0C7.91574 0 0.0954297 7.82392 0.190723 17.3446C0.190723 20.3611 1.04904 23.2834 2.47967 25.9227L0 34.8778L9.2508 32.5212C11.8258 33.9353 14.6867 34.5951 17.548 34.5951C27.1802 34.5951 35.0005 26.7711 35.0005 17.2505C35.0005 12.6315 33.1885 8.29527 29.9461 5.09027H29.9459ZM17.6433 31.673C15.0683 31.673 12.4934 31.0132 10.2998 29.6935L9.72768 29.4107L4.19631 30.8246L5.6268 25.4516L5.24535 24.8859C1.04904 18.1932 3.05184 9.33216 9.9184 5.18446C16.785 1.03689 25.6543 3.01649 29.8506 9.80351C34.0468 16.5905 32.044 25.3572 25.1776 29.5049C22.9839 30.9188 20.3137 31.6728 17.6433 31.6728V31.673ZM26.0358 21.2097L24.9867 20.7384C24.9867 20.7384 23.4609 20.0785 22.5072 19.6072C22.4118 19.6072 22.3165 19.5128 22.221 19.5128C21.9349 19.5128 21.7442 19.6072 21.5534 19.7015C21.5534 19.7015 21.4581 19.7957 20.1229 21.3039C20.0275 21.4924 19.8368 21.5868 19.6461 21.5868H19.5506C19.4554 21.5868 19.2646 21.4924 19.1692 21.3982L18.6923 21.2097C17.6433 20.7384 16.6897 20.1727 15.9266 19.4186C15.7359 19.2301 15.4498 19.0416 15.259 18.8531C14.5914 18.1932 13.9238 17.4391 13.4471 16.5907L13.3517 16.4022C13.2564 16.3078 13.2564 16.2136 13.161 16.0251C13.161 15.8366 13.161 15.6481 13.2564 15.5538C13.2564 15.5538 13.6378 15.0824 13.9238 14.7997C14.1147 14.6111 14.21 14.3284 14.4007 14.1399C14.5914 13.857 14.6869 13.48 14.5914 13.1972C14.4962 12.7258 13.3517 10.1807 13.0657 9.61514C12.8748 9.3323 12.6842 9.23811 12.3981 9.14378H11.349C11.1582 9.14378 10.9676 9.23811 10.7767 9.23811L10.6813 9.3323C10.4906 9.42662 10.2998 9.61514 10.1091 9.70932C9.9184 9.89797 9.82297 10.0864 9.63225 10.275C8.96465 11.1234 8.5832 12.1603 8.5832 13.1972C8.5832 13.9512 8.77393 14.7054 9.06008 15.3653L9.15551 15.6481C10.0138 17.4391 11.1582 19.0416 12.6842 20.4555L13.0657 20.8326C13.3517 21.1154 13.6378 21.3039 13.8286 21.5866C15.8313 23.2835 18.1202 24.5089 20.6951 25.1688C20.9813 25.263 21.3627 25.263 21.6489 25.3573H22.6025C23.0794 25.3573 23.6515 25.1688 24.0331 24.9803C24.3191 24.7918 24.5098 24.7918 24.7006 24.6032L24.8914 24.4146C25.0821 24.2261 25.2729 24.1319 25.4636 23.9434C25.6543 23.7549 25.845 23.5664 25.9405 23.3777C26.1312 23.0007 26.2265 22.5293 26.3219 22.0581V21.3982C26.3219 21.3982 26.2265 21.3039 26.0358 21.2097V21.2097Z" fill="white"/>
            </g>
            <defs>
            <clipPath id="clip0">
            <rect width="35" height="35" fill="white"/>
            </clipPath>
            </defs>
          </svg>
        </div>
      </div>
      

    </div>
  )
}

export default ProductInfo