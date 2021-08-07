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
    
    if(target.checked){
      setFilterList( [...filterList, target.value])

    }
    else{
      setFilterList(filterList.filter(item => item !== target.value))
    }

    callback()
  }


  return(
    <ModalMenu isOpen={isOpen} toggleMenu={toggleMenu}>
      <div className='filterMenu__title'>Filtrar</div>
      <div className="separation-line"></div>
      <ul>
        <SubMenu title={'Unidades'} typeOptionsSubmenu={true} type={'price'}>
          {
            unidades.map(und=> <OptionCheck key={und} title={und} changeFilterList = {addItemsFilterList}> </OptionCheck> )
          }
        </SubMenu>

        <SubMenu title={'Ubicación'}>
        </SubMenu>
      </ul>

    </ModalMenu>
  )
}


<ul>
  <div>
    <a href=""></a>
  </div>
</ul>





export default MainMenu



