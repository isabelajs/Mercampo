import React from 'react';
import Modal from './Modal';

import '../../assets/styles/generales/ConfirmationModal.scss'

export default function ConfirmationModal({closeCallback,acceptCallback, isOpen}) {

  return (
    <Modal closeCallback={closeCallback} acceptCallback={acceptCallback} isOpen={isOpen}>
      <div className="confirmationModal">
        <h1>Verification</h1>
        <p>¿Esta seguro de realizar la modifacion?</p>

        <div>
          <button onClick={acceptCallback} className="button button--second">Confirmar</button>
          <button onClick={closeCallback} className="button button--second">Cancelar</button>
        </div>
      </div>
    </Modal>
  );
};
