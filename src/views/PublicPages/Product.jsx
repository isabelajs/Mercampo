import React from 'react';
import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';

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

  console.log(status.data)


  return(
      <div className='product'>
        {
          status.isLoading ? <Loading />
          :
          <>
            <Helmet>‍
              <title>{`Mercampo | ${status.data.name}`} </title>‍
              <meta name="description" content={status.data.description} />
              {/* <meta name="twitter:card" content="summary_large_image" /> */}
              {/* <meta name="twitter:site" content="@user" /> */}
              {/* <meta name="twitter:creator" content="@user" /> */}
              {/* <meta name="twitter:title" content="Pets - Products" /> */}
              {/* <meta name="twitter:description" content="Best Products for your pet" /> */}
              {/* <meta name="twitter:image" content="url_to_image"/> */}
              <meta property="og:title" content={`Mercampo | ${status.data.name}`} />
              <meta property="og:description" content={status.data.description} />
              <meta property="og:image" content={status.data.photos[0]}/>
              <meta property="og:url" content={`www.mercampo.store/product/${props.match.params.id}`} />
              <meta property="og:site_name" content="mercampo.store" />
              <meta property="og:locale" content="es_CO" />
              <meta property="og:type" content="website" />
              {/* <meta property="fb:app_id" content="ID_APP_FACEBOOK" /> */}

            </Helmet>
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