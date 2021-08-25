import React from 'react';
import ReactDOM from 'react-dom'
//styles
import '../../assets/styles/componentes/ModalMenu/ModalMenu.scss'
import '../../assets/styles/componentes/ModalMenu/MenuOption.scss'
import closeIcon from '../../assets/static/closeIcon.svg'


function ModalMenu(props){

  const {isOpen,toggleMenu} = props

  return(
    <>
      {
        ReactDOM.createPortal(

            <div className={`menuModal ${isOpen && 'menuModal--open'}`}>
              
              <img className='menuModal__closeIcon' onClick={toggleMenu}  src={closeIcon} alt="" />

              {props.children}

              <span onClick={toggleMenu}></span>

            </div>
            
          ,document.querySelector('#root'))
      }
    </>
  )}

export default ModalMenu

