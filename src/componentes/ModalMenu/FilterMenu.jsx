import React from 'react';

//componentes
import ModalMenu from './ModalMenu';
import SubMenu from './SubMenu';
import OptionCheck from './OptionCheck';
import FormListDropdown from '../common/FormListDropdown';


//estilos
import '../../assets/styles/componentes/ModalMenu/FilterMenu.scss'

//funciones
const FilterMenu = ({callback,filterList, setFilterList, isOpen ,toggleMenu, handleKeyUp})=>{

  // const [queryCity,setQueryCity]= useState('')

  //TODO la lista deberia poder clasificarse 
  const unidades = ['Gramo','Libra', 'Kilogramo','Unidad', 'Docena', 'Tonelada','Otros']

  //TODO deberia memorizar esta funcion o un callback??
  const addItemsFilterList = ({target},type)=>{
 

    if(target.checked){
      setFilterList( [...filterList, `${type}__${target.value}`])
    }
    else{
      setFilterList(filterList.filter(item => item !== `${type}__${target.value}`))
    }

    callback()
  }

  return(
    <ModalMenu isOpen={isOpen} toggleMenu={toggleMenu}>
      <div className='filterMenu__title'>Filtrar</div>
      <div className="separation-line"></div>
      <ul>
        <SubMenu title={'Unidades'} typeOptionsSubmenu={true} type={'prices'}>
          {
            unidades.map(und=> <OptionCheck key={und} title={und} changeFilterList = {addItemsFilterList}> </OptionCheck> )
          }
        </SubMenu>
        

        <SubMenu title={'Ubicación'} typeOptionsSubmenu={true} type={'ubication'}>
          <FormListDropdown/>
        </SubMenu>
        
      </ul>

    </ModalMenu>
  )
}







export default FilterMenu



