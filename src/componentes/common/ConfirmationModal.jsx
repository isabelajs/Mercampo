import React from 'react';
import Modal from './Modal';

import '@styles/generales/ConfirmationModal.scss'

export default function ConfirmationModal(props) {

  //patch closecallback for only close when inProcess is false
  const closeCallback = () => {
    if(!props.inProcess){
      props.closeCallback()
    }
  }

  return (
    <Modal {...props} closeCallback={closeCallback}>
      <div className="confirmationModal">
        {
          props.inProcess ? 
          <>
            <h3>Enviando</h3>
            <p>Por favor espere ...</p>
          </>
          :
          <>
            <h3>Confirmacion</h3>
            <p>¿Esta seguro de realizar la modificacion?</p>
          </>
        }

        <div>
          <button onClick={props.acceptCallback} className="button button--main">Confirmar</button>
          <button onClick={closeCallback} className="button button--second">Cancelar</button>
        </div>
      </div>
    </Modal>
  );
};
