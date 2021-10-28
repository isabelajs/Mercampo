import React, {useRef} from 'react';

//assets
import horizontalImg from '@images/Home/AboutUsSection/horizontalImage.png'
import verticalImg from '@images/Home/AboutUsSection/verticalImage.png'
import sostenibilityImg from '@images/Home/AboutUsSection/plant.png'
import {useScrollReveal} from '@hooks'

//styles
import '@styles/componentes/Home/AboutUsSection.scss'

export default function AboutUsSection () {

    const refSection = useRef(null)

    useScrollReveal([refSection],{
        root:null,
        threshold:0.25,
        rootMargin: "350px"
    })

    return (
    <section ref={refSection} className='aboutUsSection section--gray  section--separation fade-down fade-in--right'>
        <div className='aboutUsSection__info'>
            <h2>¿Quiénes somos?</h2>
            <p>Somos una plataforma digital que permite crear una relación directa entre productores agricolas con sus clientes potenciales, evitando intermediariarios en el proceso.</p>
        </div>

        <div className="aboutUsSection__helpsContainer">
            <div className="aboutUsSection__help">
                <img src={sostenibilityImg} alt="" />
                <h4>Agronomia Sostenible</h4>
            </div>
            <div className="aboutUsSection__help">
                <img src={sostenibilityImg} alt="" />
                <h4>Apoyo a la comunidad</h4>
            </div>
            <div className="aboutUsSection__help">
                <img src={sostenibilityImg} alt="" />
                <h4>Negocios Verdes</h4>
            </div>
            <div className="aboutUsSection__help">
                <img src={sostenibilityImg} alt="" />
                <h4>Emprendimiento</h4>
            </div>
        </div>

        <div className="aboutUsSection__imgsContainer">
            <img src={horizontalImg} alt="" className="aboutUsSection__horizontalImg" />
            <img src={verticalImg} alt="" className="aboutUsSection__verticalImg" />
        </div>
    </section>
);
};