import React, { useRef } from 'react'
import { useCallback } from 'react'
import '../assets/styles/componentes/CardProduct.scss'

const CardProduct = (props)=>{

  const {name} = props

  //nombre truncado
  const userName = useRef(props.userName.split(' ').splice(0,3).join(' '))
  
  const pricesToList = useCallback(()=>Object.entries(props.prices),[props])

  const prices = useRef(pricesToList())

  console.log(prices)

  return(
    <div className="product">
      <img className="product__img" src={props.photos[0]} alt='img product'></img>

      <div className="product__description">

        <div className="product__description__title-product">{name}</div>

        <div className="product__description__name-producer">{userName.current}</div>

        <div className="product__description__price">


          {
            prices.current.map((price,index)=>{
                return(
                  <>
                  {
                    index <= 1 &&
                    <div key={`price_${index}`} className="description__price">
                      <div className="measured">{price[0]}</div>
                      <span>-</span>
                      <div className="price">{`$${price[1]}`}</div>
                    </div>
                  }
                  </>
                )
            })
          }

          {/* <div className="description__price">
            <div className="measured">{prices.current[0][0]}</div>
            <span>-</span>
            <div className="price">{`$${prices.current[0][1]}`}</div>
          </div>

          <div className="description__price">
            <div className="measured">{prices.current[1][0]}</div>
            <span>-</span>
            <div className="price">{`$${prices.current[1][1]}`}</div>
          </div> */}
        </div>

        {/* <div className="product__description__others">Otros...</div> */}

        <button className="button button--main">INFORMACIÓN</button>
      </div>
    </div>
  )
}

export default CardProduct