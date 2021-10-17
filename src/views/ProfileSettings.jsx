import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

//componentes react
import SystemLayout from "../componentes/system/SystemLayout";
import PasswordForm from "../componentes/ProfileSettings/PasswordForm";
import DataForm from "../componentes/ProfileSettings/DataForm";

//estilos
import "@styles/componentes/ProfileSettings.scss";
import { findUserById } from "../utils/dataBase";
import Loading from "../componentes/common/Loading";


//BUG: Cuando el form no halla cambiado y se hace un guardar evitar, que envie informacion
//TODO: Cuando el nombre del usuario cambie se debe cambiar todos los productos asociados, el nombre del usuario
const ProfileSettings = (props) => {

  const links = [
    { name: "Perfil", url: "/profile/settings" },
    { name: "Settings", url: "/profile/settings" },
  ];

  const { user } = props;

  const [isLoading, setIsLoading] = useState(true);

  const [dataForm, setDataForm] = useState({
    photo: { url: '', file: null },
    city: "",
    department: "",
    email: "",
    id: "",
    name: "",
    phoneMain: "",
    phoneSecond: "",
  });

  //fetch data user
  useEffect(() => {
    const findUser = async () => {

      try {
        let userInData = await findUserById(user.uid);
        
        setDataForm({
          ...userInData,
          photo: { url: userInData.photo, file: null },
        });

        setIsLoading(false);

      } catch (err) {
        console.log("error desde profile ", err);
      }
    };

    findUser();

  },[user]);


  if(isLoading) return <Loading/>

  return (

    <SystemLayout links={links} type="settings" props={props}>
      <div className="l-profileSettings">
          <DataForm data={dataForm} setData={setDataForm} />
          <PasswordForm />
      </div>
    </SystemLayout>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};


export default connect(mapStateToProps, null )(ProfileSettings);
