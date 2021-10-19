import React from 'react';

import '@styles/componentes/Product/UserProductsCard.scss';

const unitsTranslate = {kilogramo:'Kg', libra:'Lb', unidad:'Und'}

export default function UserProductsCard ({photo,name,prices}) {
    return (
      <div  className="userProductsCard">
        <img src={photo} alt="" />
        <div className="userProductsCard__description">

          <div className="userProductsCard__title">
            <div>{name}</div>
          </div>

          <div className="userProductsCard__prices">
            <ul>
              {
                Object.entries(prices).slice(0,2).map((price,index)=>{
                  return(
                    <li key={`price_${index}`} className='userProductsCard__price'> 
                      {unitsTranslate[price[0]]} - {`$${price[1]}`}
                    </li>
                  )
                })
              }
            </ul>
          </div>
        </div>
      </div>
);
};