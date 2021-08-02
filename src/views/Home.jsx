import React from "react";
import { signOut } from "../utils/auth";
import homeImg from '../assets/static/hero-1.jpg'
import '../assets/styles/Home.scss'

export default function Home(props) {
  const handleCloseSesion = async () => {
    signOut()
      .then(() => {
        // props.history.push("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // {/* <button onClick={handleCloseSesion} className="button button--second">Cerrar sesión</button> */}

  return (
    <div className='home-container'>
      <div className='home__info'>
        <h2 className='home__infoTitle'>Productos Campesinos <span> Frescos & asequibles </span></h2>
        <p className='home__infoText'>Apoya tu economía local descubriendo cientos de productos</p>
        <button className='button button--main'>Productos del campo</button>
      </div>
      <img loading='lazy' src={homeImg} alt="" />
    </div>
  );
}
