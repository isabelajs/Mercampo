import React, { useRef } from 'react'
import { memo } from 'react'
import { Link } from 'react-router-dom'
import '../../assets/styles/componentes/CardProduct.scss'

const DescriptionPrice = ({name,value})=>{
  
  return(
  <div className="description__price">
    <div className="measured">{name}</div>
    <span>-</span>
    <div className="price">{`$${value}`}</div>
  </div>
  )
}

const CardProduct = memo(({id,name,userName,prices,photos})=>{

  const refUserName = useRef(userName.split(' ').splice(0,3).join(' '))
  const refPrices = useRef(Object.entries(prices))
  const refUnitsTranslate = useRef({kilogramo:'Kg', libra:'Lb', unidad:'Und'})

  return(
    <div className="cardProduct">
      <img className="cardProduct__img" src={photos[0]} alt='img product'></img>

      <div className="cardProduct__description">

        <svg className='cardProduct__svgBottom' width="140" height="75" viewBox="0 0 140 75" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M104 67.9998C212.5 82.4998 40 75.4999 40 75.4999C23.5366 75.0227 11.3568 76.928 5 74.5C1.93238 73.3283 -0.162742 69.1157 1.05798e-05 67C0 64 -2.70307e-05 70.1931 -2.70307e-05 60.5C-2.70307e-05 37.4923 2.98023e-08 43 2.98023e-08 31C2.98023e-08 25.5 -7.86483e-05 21.5 -2.66731e-05 15.5C-9.0301e-06 7.5 -3.08454e-05 9.5 2.14875e-05 4.99991C2.56598e-05 -0.500178 -0.165204 1.1382 -2.70307e-05 1.12368C30.0117 -1.5152 11.5308 85.2245 104 67.9998Z" fill="#CBF3F0"/>
        </svg>

        <svg className='cardProduct__svgTop' width="55" height="50" viewBox="0 0 55 50" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M55 0H0C44.4041 11.8411 27.6445 25.8283 55 49.8273V0Z" fill="#CBF3F0"/>
        </svg>
        
        <div className="cardProduct__description__title-product">{name}</div>

        <div className="cardProduct__description__name-producer">{refUserName.current}</div>

        <div className="cardProduct__description__prices">

          {
            refPrices.current.slice(0,2).map((price)=>{
              const key = Math.random()*100
                return(
                  < DescriptionPrice 
                    key={key} 
                    name={refUnitsTranslate.current[price[0]]} 
                    value={price[1]}/>
                )
            })
          }
          
          {
            refPrices.current.length > 2 &&
            <div>...Otros</div>
          }

        </div>

        <Link to={`/product/${id}`} className="button button--main">Información</Link>
        
        
      </div>

    </div>
  )
})


export default CardProduct

