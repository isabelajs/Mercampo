import React from 'react';
import Modal from './Modal';

import '@styles/generales/ConfirmationModal.scss'

export default function EliminationModal(props) {

  //patch closecallback for only close when inProcess is false
  const closeCallback = () => {
    if(!props.inProcess){
      props.closeCallback()
    }
  }

  return (
    <Modal closeCallback={closeCallback} acceptCallback={props.acceptCallback} isOpen={props.isOpen}>
      <div className="confirmationModal">
        <h1>Eliminacion</h1>
        <p>La informacion del producto no podra ser recuperada <br/> <br/> ¿Esta seguro de Eliminar el producto?</p>
        <div>
          <button onClick={props.acceptCallback} className="button button--danger">Eliminar</button>
          <button onClick={closeCallback} className="button button--main">Cancelar</button>
        </div>
      </div>
    </Modal>
  );
};
