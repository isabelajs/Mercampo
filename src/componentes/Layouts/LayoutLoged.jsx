import React from 'react';
import Header from '../Header';
import HeaderPrivate from '../HeaderPrivate';
// import MenuMobile from '../MenuMobile';

function PublicLayout ({children}) {
    return (
    <>
      <Header/>
      {children}
    </>
)};


function PrivateLayout ({children}){

  return (
    <>
      <HeaderPrivate/>
      {children}
    </>
  )
}


export {PublicLayout,PrivateLayout}