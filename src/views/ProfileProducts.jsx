import React from "react";
import SystemLayout from "../componentes/system/SystemLayout";
import Button from "../componentes/common/Button";
import '../assets/styles/componentes/ProfileSettings.scss'

const ProfileSettings = () => {

  const links = [
    { name: "Mi Perfil", url: "/profile" },
    { name: "Productos", url: "/profile/products" },
  ];

  return (

    <SystemLayout links={links}>
      <div>
        Contenido de productos
      </div>
    </SystemLayout>
  );
};

export default ProfileSettings;
