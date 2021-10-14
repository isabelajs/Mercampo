import React from 'react';
import horizontalImg from '../../assets/static/Home/AboutUsSection/horizontalImage.png'
import verticalImg from '../../assets/static/Home/AboutUsSection/verticalImage.png'

import '../../assets/styles/componentes/Home/AboutUsSection.scss'

export default function AboutUsSection () {
    return (
    <section className='aboutUsSection'>
        <div className='aboutUsSection__info'>
            <h2>¿Quiénes somos?</h2>
            <p>Somos una plataforma digital que permite crear una relación directa entre productores agricolas con sus clientes potenciales, evitando intermediariarios en el proceso.</p>
        </div>

        <div className="aboutUsSection__helpsContainer">
            <div className="aboutUsSection__help">
                <img src="" alt="" />
                <p>Agronomia Sostenible</p>
            </div>
            <div className="aboutUsSection__help">
                <img src="" alt="" />
                <p>Apoyo a la comunidad</p>
            </div>
            <div className="aboutUsSection__help">
                <img src="" alt="" />
                <p>Negocios Verdes</p>
            </div>
            <div className="aboutUsSection__help">
                <img src="" alt="" />
                <p>Emprendimiento</p>
            </div>
        </div>

        <div className="aboutUsSection__imgsContainer">
            <img src={horizontalImg} alt="" className="aboutUsSection__horizontalImg" />
            <img src={verticalImg} alt="" className="aboutUsSection__verticalImg" />
        </div>
    </section>
);
};