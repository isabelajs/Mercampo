import React from "react";
import SystemLayout from "../componentes/system/SystemLayout";
// import '../assets/styles/componentes/ProfileSettings.scss'

const ProfileSettings = (props) => {

  const links = [
    { name: "Mis productos", url: "/profile/products" },
  ];

  return (

    <SystemLayout links={links} type='products'  props={props}>

        <form className='profileSettings__data form'>

        <div className='data__info'>

          <div className='systemSubGroup__title'>Perfil:</div>
          <p>Esta información se mostrará públicamente para la referencia de sus productos.</p>
        </div>


        </form>

    
    </SystemLayout>
  );
};

export default ProfileSettings;
