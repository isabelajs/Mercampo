import React from 'react'
import { waMessage } from '@helpers/functions'

import '@styles/componentes/Product/ProductInfo.scss'

const ProductInfo = (props) =>{

  const {data, userData} = props

  console.log(userData)

  const sendWaMessage = () =>{

    const message = waMessage(userData.phoneMain,`Me encuentro interesado en tu producto ${data.name} me gustaria tener mas informacion`)

    window.open(message,'_blank').focus()
  }

  return(

    <div className='product__info'>

      <h2 className='product__name'>{data.name}</h2>

      <div className="product__infoBlock">
        <h3 className="product__infoBlockTitle">Descripción del producto</h3>
        <p>{data.description}</p>
      </div>

      <div className="product__infoBlock">
        <h3 className="product__infoBlockTitle">Información del producto</h3>
        { 
          Object.entries(data.prices).map((price,index)=> <p className='product__infoValue' key={index}>{price[0]} - {price[1]}</p>)
        }
      </div>

      <div className="product__infoBlock">
        <h3 className="product__infoBlockTitle">Información de contacto</h3>
        <p>{userData.name || 'unknown user name'}</p>
        <p>Email: {userData.email || 'unknown user email'}</p>
        <p>Celular: {userData.phoneMain || 'unknown user phone' } {userData.phoneSecond && ` - ${userData.phoneSecond}`} </p>
        <p>{userData.city || 'unknown user name'}</p>
      </div>

      <div onClick={sendWaMessage} className="button button--icon button--main">
        <svg className='button__icon' width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M19.9587 4.00809C17.8537 1.90063 15.0542 0.739517 12.0719 0.738281C5.92638 0.738281 0.92485 5.73967 0.922379 11.8868C0.921555 13.8518 1.43489 15.77 2.41061 17.4608L0.828857 23.2383L6.73936 21.6878C8.36795 22.5762 10.2014 23.0444 12.0673 23.0449H12.072C18.2168 23.0449 23.2189 18.0431 23.2212 11.8957C23.2224 8.9165 22.0638 6.1154 19.9587 4.00809ZM12.0719 21.162H12.068C10.4052 21.1613 8.77444 20.7144 7.35144 19.8703L7.0132 19.6694L3.50581 20.5895L4.44199 17.1698L4.22157 16.8192C3.29391 15.3438 2.80406 13.6384 2.80489 11.8875C2.80681 6.77815 6.96404 2.62134 12.0756 2.62134C14.5508 2.62216 16.8775 3.58731 18.6271 5.33894C20.3767 7.09057 21.3396 9.41885 21.3388 11.895C21.3366 17.0048 17.1797 21.162 12.0719 21.162ZM17.155 14.2215C16.8764 14.082 15.5067 13.4083 15.2513 13.3152C14.9961 13.2222 14.8102 13.1759 14.6247 13.4547C14.4389 13.7335 13.9051 14.3611 13.7425 14.5469C13.5799 14.7328 13.4175 14.7561 13.1389 14.6166C12.8603 14.4772 11.9627 14.1829 10.8985 13.2339C10.0704 12.4952 9.51135 11.5829 9.34875 11.3041C9.18643 11.0251 9.34738 10.8888 9.47098 10.7356C9.77255 10.3611 10.0745 9.96844 10.1674 9.78264C10.2603 9.59669 10.2138 9.43396 10.144 9.29457C10.0745 9.15518 9.5174 7.78395 9.28531 7.22598C9.05899 6.68298 8.82951 6.75632 8.6584 6.7478C8.49608 6.7397 8.31027 6.73805 8.12447 6.73805C7.9388 6.73805 7.63695 6.80768 7.38152 7.08673C7.12622 7.36564 6.40662 8.03952 6.40662 9.41075C6.40662 10.782 7.40486 12.1067 7.54411 12.2926C7.68336 12.4785 9.50861 15.2924 12.3031 16.499C12.9678 16.7863 13.4866 16.9575 13.8913 17.0859C14.5587 17.298 15.1659 17.268 15.646 17.1963C16.1813 17.1163 17.2941 16.5223 17.5264 15.8717C17.7585 15.2209 17.7585 14.6632 17.6888 14.5469C17.6193 14.4307 17.4335 14.3611 17.155 14.2215Z" fill="white"/>
        </svg>

        <p>contactalo</p>
      </div>

    </div>
  )
}

export default ProductInfo