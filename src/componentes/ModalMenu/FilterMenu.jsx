import React from 'react';

//componentes 
import ModalMenu from './ModalMenu';
import SubMenu from './SubMenu'

//icons

//estilos
import '../../assets/styles/componentes/ModalMenu/FilterMenu.scss'
import { useState } from 'react';

const MainMenu = ({isOpen ,toggleMenu})=>{
  const [checked, setChecked]=useState(false)

  const selectedOptionChecked = (e)=>{
    
    if(!checked){
      console.log( e.target.value)

    }
    setChecked(!checked)
  } 

  return(
    <ModalMenu isOpen={isOpen} toggleMenu={toggleMenu}>
      <div className='filterMenu__title'>Filtrar</div>
      <div className="separation-line"></div>
      <ul>
        <SubMenu title={'Unidades'}>
          <div className='c-options__check'>

            <label className= 'option__check'>
                <input 
                  type="checkbox" 
                  name="libra" 
                  value='libra'
                  defaultChecked ={checked}
                  onClick ={selectedOptionChecked}
                />
                Libra
            </label>

            <label className= 'option__check'>
              <input 
                type="checkbox" 
                name="kilogramo" 
                value='kilogramo'
                defaultChecked ={checked}
                onClick ={selectedOptionChecked}
              />
              Kilogramo
            </label>

            <label className= 'option__check'>
              <input 
                type="checkbox" 
                name="tonelada" 
                value='tonelada'
                defaultChecked ={checked}
                onClick ={selectedOptionChecked}
              />
              Tonelada
            </label>

            <label className= 'option__check'>
              <input 
                type="checkbox" 
                name="Otros" 
                value='otros'
                defaultChecked ={checked}
                onClick ={selectedOptionChecked}
              />
              Otros
            </label>

          </div>
          
        </SubMenu>

        <SubMenu title={'Ubicación'}>
        </SubMenu>
      </ul>

    </ModalMenu>
  )
}

{/* <input type="checkbox" defaultChecked={this.state.chkbox} onChange={this.handleChangeChk} /> */}




export default MainMenu