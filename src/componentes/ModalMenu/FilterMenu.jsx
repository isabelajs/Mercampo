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

  const unidades = ['Gramo','Libra', 'Kilogramo','Unidad', 'Docena', 'Tonelada','Otros']

  //agrega elementos al filtro desde componentes de naturaleza checked
  const addItemsFromFilterChecked = (type,target)=>{
    if(target.checked){
      setFilterList( [...filterList, `${type}__${target.value}`])
    }
    else{
      setFilterList(filterList.filter(item => item !== `${type}__${target.value}`))
    } 
  }

  //agrega elementos al filtro desde elementos generales
  const addItemsFromOthersFilter = (type,value)=>{

    let filterOption = `${type}__${value}`
    
    //elimina cualquier elemento dentro del filtro que coincida con el type
    if(value === ''){
      setFilterList(filterList.filter(item=> item.split('__')[0] !== type))
    }

    else if(value !== ''){
      //verifica si dentro de la lista existe valor con el mismo type
      let verifiedType = filterList.some(filter=> filter.split('__')[0] === type)

      //si la opcion a filtrar no esta en la lista y el tipo aun no se ha usado se agrega
      if(!verifiedType  && !filterList.includes(filterOption)){
        setFilterList([...filterList,filterOption])
      }
    }
    
    
  }

  //
  const filterListinData = ({target},type,value='')=>{

    if(target.type === 'checkbox'){
      addItemsFromFilterChecked(type, target)
    }
    else{
      addItemsFromOthersFilter(type,value)
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
            unidades.map(und=> <OptionCheck key={und} title={und} changeFilterList = {filterListinData}> </OptionCheck> )
          }
        </SubMenu>
        

        <SubMenu title={'Ubicación'} typeOptionsSubmenu={true} type={'ubication'}>
          <FormListDropdown changeFilterList = {filterListinData}/>
        </SubMenu>
        
      </ul>

    </ModalMenu>
  )
}







export default FilterMenu



