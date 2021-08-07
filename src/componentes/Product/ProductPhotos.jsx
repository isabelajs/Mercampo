import React from 'react'
import { useRef } from 'react'
import { useState } from 'react'

import '../../assets/styles/componentes/Product/ProductPhotos.scss'

const ProductPhotos = ({imgs}) =>{

  const [firstImg, setFirstImg] = useState(imgs[0])

  const refMainImg = useRef()

  const selectImg = (e) =>{
    refMainImg.current.src = e.target.src
  }
  
  return(
    <div className='product__photos'>
      
      <img ref={refMainImg} className='photos__firstPhoto' src={firstImg} alt="" />

      <div className='photos__secondsPhotos'>

        <div onClick={selectImg} className='photos__secondPhoto'>
          <div >
            <img src={imgs[1] && imgs[1]} alt=""/>
          </div>
        </div>
        
        <div onClick={selectImg}  className='photos__secondPhoto'>
          <div >
            <img src={imgs[2] && imgs[2]} alt=""/>
          </div>
        </div>

        <div onClick={selectImg}  className='photos__secondPhoto'>
          <div>
            <img src={imgs[3] && imgs[3]} alt="" />
          </div>
        </div>

      </div>
    </div>
  )
}


export default ProductPhotos