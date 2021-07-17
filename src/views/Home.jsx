import React from 'react';
// import Header from '../componentes/Header';
import {auth} from '../firebase.config'

//estilos
import '../assets/styles/componentes/Home.scss'

export default function Home (props) {

    const handleCloseSesion = async()=>{
        auth.signOut()
            .then(()=>{
                console.log('cerramos sesión');
                props.history.push('/login')
            })
            .catch((error)=>{
                console.log(error);
                
            })
        
    }


    return (
        <>
        <div className="home">
            <div className="home__tools">
                <div className="home__tools">
                    <div className="home__search search">

                    </div>
                    <div className="home__filter">

                    </div>
                </div>
                <div className="home__categories">
                    <div className="previous"></div>
                    <div className="categories__title"></div>
                    <div className="next"></div>
                </div>
            </div>
            
            <div className="home__products">

                <div className="product">

                    <div className="product__img"></div>

                    <div className="product__description">

                        <div className="product__description__title-product">Aguacates</div>

                        <div className="product__description__name-producer">Pepe Jimenez</div>

                        <div className="product__description__price">

                            <div className="description__price">
                                <div className="measured">kg</div>
                                <span>-</span>
                                <div className="price">$12000</div>
                            </div>

                            <div className="description__price">
                                <div className="measured">kg</div>
                                <span>-</span>
                                <div className="price">$12000</div>
                            </div>
                        </div>
                        
                        <div className="product__description__others">Otros...</div>
                        
                        <button className='button button--main'>INFORMACIÓN</button>

                    </div>
                
                </div>
            </div>

        </div>
        <button onClick={handleCloseSesion} className='button button--second'>Cerrar sesión</button>
        </>
    );
};