import React from 'react'
import SystemLayout from "../componentes/system/SystemLayout";


const ProfileNewProduct = (props)=>{
  const links = [
    { name: "Mis productos", url: "/profile/products"},{
      name: 'Nuevo producto', url: '/profile/products/new' }
  ];

  return (

    <SystemLayout links={links} type='products'  props={props}>


    </SystemLayout>
  )
}


export default ProfileNewProduct