import React from 'react'
import { useState } from 'react'

import '@styles/componentes/Product/ProductPhotos.scss'
import Carousel from '../common/Carousel'

const ProductPhotos = ({imgs}) =>{

  const [firstImg, setFirstImg] = useState(imgs[0])

  const selectImg = (e) =>{
    setFirstImg(e.target.src)
  }
  
  return(
    <div className='product__photos'>

      <img  className='photos__firstPhoto' src={firstImg} alt="" />

      <Carousel>

        {
          imgs.map((img,index) => {
            return(
              <div key={index} onClick={selectImg} className={ img === firstImg ? 'photos__secondPhoto select' : 'photos__secondPhoto' }>
                <div >
                  <img src={img} alt='imagen del producto'/>
                </div>
              </div>
            )
          })
        }

      </Carousel>

    </div>
  )
}


export default ProductPhotos