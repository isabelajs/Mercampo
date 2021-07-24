import React, { useRef } from 'react'
import { useCallback } from 'react'
import '../assets/styles/componentes/CardProduct.scss'

const DescriptionPrice = ({name,value})=>{

  return(
  <div className="description__price">
    <div className="measured">{name}</div>
    <span>-</span>
    <div className="price">{`$${value}`}</div>
  </div>
  )
}

const CardProduct = (props)=>{

  const {name} = props

  //nombre truncado
  const userName = useRef(props.userName.split(' ').splice(0,3).join(' '))
  
  const pricesToList = useCallback(()=>Object.entries(props.prices),[props])

  const prices = useRef(pricesToList())

  const nombres = {kilogramo:'Kg', libra:'Lb', unidad:'Und'}

  return(
    <div className="product">
      <img className="product__img" src={props.photos[0]} alt='img product'></img>

      <div className="product__description">

        <div className="product__description__title-product">{name}</div>

        <div className="product__description__name-producer">{userName.current}</div>

        <div className="product__description__prices">

          {
            prices.current.slice(0,2).map((price,index)=>{

              const key = Math.random()*100

                return(

                  < DescriptionPrice 
                    key={key} 
                    name={nombres[price[0]]} 
                    value={price[1]}/>
                )
            })
          }
          
          {
            prices.current.length > 2 &&
            <div>...Otros</div>
          }

        </div>


        {/* <div className="product__description__others">{props.description}</div> */}

        <button className="button button--main">Información</button>
      </div>
    </div>
  )
}



export default CardProduct

