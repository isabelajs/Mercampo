import React from "react";
import ConfigurationProfile from "../componentes/Profile/ConfigurationProfile";
import ProfileContainer from "../componentes/Profile/ProfileContainer";


const Profile = () => {

  const links = [
    { name: "Mi Perfil", url: "/profile" },
    { name: "Productos", url: "/profile/products" },
    { name: "Nuevo producto", url: "/profile/products/newproduct" }];

  return (
    <ProfileContainer links={links}>
      <ConfigurationProfile />
    </ProfileContainer>
  );
};

export default Profile;
