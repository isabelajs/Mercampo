import React from 'react';
// import Header from '../componentes/Header';
import {auth} from '../firebase.config'

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
        <button onClick={handleCloseSesion} className='button button--second'>Cerrar sesión</button>
        </>
    );
};