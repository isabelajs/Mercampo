import React, { useEffect, useState } from 'react';
import Footer from '../Footer';
import Header from '../Header';

function Layout ({children,location}){

  const [isPrivate, setIsPrivate] = useState(false)

  useEffect(()=>{

    location.pathname.includes('profile') ? setIsPrivate(true) : setIsPrivate(false)

  },[location])

  return (
    <>
      <Header isPrivate={isPrivate}/>
      {children}
      <Footer />
    </>
  )
}


export default Layout