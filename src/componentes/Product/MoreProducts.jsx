import React from 'react'
import { useState, memo, useEffect } from 'react'
import { getAllProducts } from '../../utils/dataBase'
import CarouselCategories from '../Products/CarrouselCategories'


import '../../assets/styles/componentes/Product/MoreProducts.scss'
import { Link, useHistory } from 'react-router-dom'

const MoreProducts = memo(() =>{

  const [data,setData] = useState([])

  const history = useHistory()

  useEffect(()=>{
    
    const fetch = async () =>{
      const data = await getAllProducts(7)

      setData(data)
    }

    fetch()

  },[])


  const test = (id) => {
    window.open(`/product/${id}`,'_blank').focus()
  }

  return(
    <div className='moreProducts'>

      <h3 >Mas Productos </h3>

        {
          data.length > 0 &&
          
          <CarouselCategories widthItems={420}>
            {
            data.map(product=>{
              return( 
                <div className='moreProducts__card' key={product.id} onClick={()=>test(product.id)}>
                  <img loading='lazy' src={product.photos[0]} alt="" />
                  <p>
                    {product.name}
                  </p>
                </div>
              )
            })
            }
          </CarouselCategories>
        }
    </div>
  )
})

export default MoreProducts