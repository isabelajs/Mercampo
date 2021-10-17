import React from 'react';
import {Link} from 'react-router-dom'
import ProductsIcon from '@images/productsIcon.svg'
import ProfileIcon from '@images/profileIcon.svg'

const SystemLocation = ({links,type})=>{

  return (
    <div className="system__location">

    {
      type === 'settings' ?
      <Link to='/profile/settings'>
        <img src={ProfileIcon} alt="" />
      </Link>
      : 
      <Link to='/profile/products'>
        <img src={ProductsIcon} alt="" />
      </Link>
    }

    {
      links.map((item,index)=>{
      //   if(index < links.length -1 ){
      //     return <><Link to={item.url} key={index}>{item.name}</Link> <span className='separationPath'>/</span> </>
      //   }
      //   else{
      //     return <Link to={item.url} key={index+10}>{item.name}</Link>
      //   }
      // })
      return <Link to={item.url} key={index}> {item.name } </Link>
    })
  }

    </div>
  )
}

export default SystemLocation