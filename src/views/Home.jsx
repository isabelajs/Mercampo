import React from "react";
import { signOut } from "../utils/auth";

export default function Home(props) {
  const handleCloseSesion = async () => {
    signOut()
      .then(() => {
        console.log("close session");
        // props.history.push("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <button onClick={handleCloseSesion} className="button button--second">
        Cerrar sesión
      </button>
    </>
  );
}
