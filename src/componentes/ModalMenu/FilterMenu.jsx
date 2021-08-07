import React from 'react';

//componentes 
import ModalMenu from './ModalMenu';
import SubMenu from './SubMenu';
import OptionCheck from './OptionCheck';

//icons

//estilos
import '../../assets/styles/componentes/ModalMenu/FilterMenu.scss'

//funciones
const MainMenu = ({callback,filterList, setFilterList, isOpen ,toggleMenu})=>{

  const unidades = ['Gramo','Libra', 'Kilogramo','Unidad', 'Docena', 'Tonelada','Otros']

  //TODO deberia memorizar esta funcion o un callback
  const addItemsFilterList = ({target})=>{
    let type = target.parentElement.parentElement.parentElement.previousSibling.children[0].textContent
    
    let filterType = type === 'Unidades' ?'prices' : type
    
    
    
    if(target.checked){
      setFilterList({
        type: filterType,
        units: [...filterList.units,target.value ]
      })
    }
    else{
      setFilterList({
        type: filterType,
        units: filterList.units.filter(price=> price !== target.value)
      })
    }

    callback()
  }


  return(
    <ModalMenu isOpen={isOpen} toggleMenu={toggleMenu}>
      <div className='filterMenu__title'>Filtrar</div>
      <div className="separation-line"></div>
      <ul>
        <SubMenu title={'Unidades'} typeSubmenu={'options'}>
          <div className='c-options__check'>
              {
                unidades.map(und=> <OptionCheck key={und} title = {und} changeFilterList = {addItemsFilterList}></OptionCheck> )
              }
            
          </div>
              <div>button</div>
          
        </SubMenu>

        <SubMenu title={'Ubicación'}>
        </SubMenu>
      </ul>

    </ModalMenu>
  )
}





export default MainMenu