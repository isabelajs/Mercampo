import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import ProductInfo from '../componentes/Product/ProductInfo';
import ProductPhotos from '../componentes/Product/ProductPhotos';
import { findUserById, getProductById } from '../utils/dataBase';

import '../assets/styles/componentes/Product/Product.scss'
import MoreProducts from '../componentes/Product/MoreProducts';
import { Link } from 'react-router-dom';

//TODO: sistema de denormalization of product
const Product = (props) => {

  const [status,setStatus] = useState({
    data:null,
    userData:null,
    isLoading: true,
    error: null,
  })

  useEffect(()=>{
    const fetchData = async() =>{

      try{
        const data = await getProductById(props.match.params.id)
        const userData = await findUserById(data.userId)

        if(!data){
          setStatus({
            isLoading:false,
            error: '404 Product Not Found'
          })
          return
        }

        setStatus({
          data,
          userData,
          isLoading:false,
          error:null,
        })

      }catch(err){
        setStatus({
          isLoading: false,
          error: err
        })
      }
    }

    fetchData()
  },[props.match.params.id])

  
  return(
      <div className='product'>
        {
          status.isLoading ? <h2>... Loading</h2>
          :
          <>
            <div className='l-product__top'>
              <ProductPhotos imgs={status.data.photos}/>
              <ProductInfo data={status.data} userData={status.userData}/>
            </div>
            <MoreProducts />
          </>
        }

      </div>
  )
}


export default Product