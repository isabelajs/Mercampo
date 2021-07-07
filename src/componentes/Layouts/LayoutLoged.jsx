import React from 'react';
import Header from '../Header';
// import MenuMobile from '../MenuMobile';

export default function Layout ({children}) {
    return (
    <>
      <Header />
      {children}
      {/* <MenuMobile /> */}
    </>
);
};