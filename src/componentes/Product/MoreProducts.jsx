import React from 'react'
import { useState, memo, useEffect } from 'react'
import { getAllProducts } from '../../utils/dataBase'
import Carousel from '../common/Carousel'


import '../../assets/styles/componentes/Product/MoreProducts.scss'

const MoreProducts = memo(() =>{

  const [data,setData] = useState([])

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
          
          <Carousel widthItems={420}>
            {
            data.map(product =>{
              return( 
                <div className='moreProducts__card' key={product.id} onClick={()=>test(product.id)}>
                  <img loading='lazy' src={product.photos[0]} alt="Imagen de producto" />
                  <p>
                    {product.name}
                  </p>
                </div>
              )
            })
            }
          </Carousel>
        }

        {
          data.length === 0 &&
          <Carousel widthItems={420}>
            {
            Array.from(Array(7).keys()).map(product =>{
              return(
                <div className='moreProducts__card' key={product} >
                  <img loading='lazy' src={''} alt="Imagen de producto" />
                  <p>
                    
                  </p>
                </div>
              )
            })
            }
          </Carousel>
        }
    </div>
  )
})

export default MoreProducts




