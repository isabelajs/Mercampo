import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';

import { findUserById, getProductById, getProductsByUser } from '@utils/dataBase';

import ProductInfo from '@components/Product/ProductInfo';
import ProductPhotos from '@components/Product/ProductPhotos';
import MoreProducts from '@components/Product/MoreProducts';
import UserProducts from '@components/Product/UserProducts';
import Loading from '@components/common/Loading';

import '@styles/componentes/Product/Product.scss'

const Product = (props) => {

  const [status,setStatus] = useState({
    data:null,
    userData:null,
    isLoading: true,
    productsData:null,
    error: null,
  })

  useEffect(()=>{
    const fetchData = async() =>{

      try{
        const data = await getProductById(props.match.params.id) 
        const userData = {key:data.userId ,...await findUserById(data.userId) || {} }
        
        const productsData = await getProductsByUser(data.userId) || {products:[],productsAvaliables:0, productsNotAvaliables:0}
        productsData.products = productsData.products.filter(product => product.id !== props.match.params.id)

        // console.log(productsData)

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
          productsData,
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
          status.isLoading ? <Loading />
          :
          <>
            <div className='l-product__top'>
              <ProductPhotos imgs={status.data.photos}/>
              <ProductInfo data={status.data} userData={status.userData}/>
              <UserProducts products={status.productsData.products} />
            </div>
            <MoreProducts />
          </>
        }

      </div>
  )
}


export default Product