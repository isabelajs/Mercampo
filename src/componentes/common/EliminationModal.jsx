import React from 'react';
import Modal from './Modal';

import '../../assets/styles/generales/ConfirmationModal.scss'
import { useRef } from 'react';
import { useEffect } from 'react';

export default function EliminationModal({closeCallback,acceptCallback, isOpen}) {

  return (
    <Modal closeCallback={closeCallback} acceptCallback={acceptCallback} isOpen={isOpen}>
      <div className="confirmationModal">
        <h1>Productos</h1>
        <p>¿Esta seguro de Eliminar el producto?</p>

        <div>
          <button onClick={acceptCallback} className="button button--danger">Eliminar</button>
          <button onClick={closeCallback} className="button button--main">Cancelar</button>
        </div>
      </div>
    </Modal>
  );
};
