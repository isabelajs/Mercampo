import React from 'react';

import UserProductsCard from './UserProductsCard';

import '@styles/componentes/Product/UserProducts.scss';

import Carousel from '@components/common/Carousel';

export default function UserProducts ({products}) {

  console.log(products)

    return (
    <div className='userProducts'>
      <h3>Mas publicaciones del vendedor</h3>
    
      <Carousel>       
        {
          products && products.slice(0,4).map(product => {
            return(

              <a key={`cardUserProduct_${product.id}`} href={`http://localhost:3000/product/"${product.id}`} target='_blank' rel="noreferrer">
                <UserProductsCard   name={product.name} photo={product.photos[0]} prices={product.prices}/>
              </a>
              )
            })
          }
      </Carousel>
    </div>
)};