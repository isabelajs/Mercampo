import React from 'react';

//componentes 
import ModalMenu from './ModalMenu';
import SubMenu from './SubMenu';
import OptionCheck from './OptionCheck';

//icons

//estilos
import '../../assets/styles/componentes/ModalMenu/FilterMenu.scss'

//funciones
const MainMenu = ({filterList, setFilterList, isOpen ,toggleMenu})=>{

  const unidades = ['gramo','libra', 'kilogramo','Unidad', 'Docena', 'tonelada','Otros']
  //lista = [{name:'kilogramo', status:true},
          // {name:'libra', status:false},
          // {name:'gramo', status:true},]


  //lista.map(unit=> <Check status={unit.status}>)


  //const Check = (status) =>  <input type='checkbox' checked={stats}

  //componente checkbox -> input checked -> onClick (se agrega o se elimina a si mismo)


  const test = ({target})=>{

    console.log(target.value);
    

    if(target.checked){
      setFilterList({
        type: 'prices',
        units: [...filterList.units, target.value ]
      })
    }
    else{
      setFilterList({
        type: 'prices',
        units: filterList.units.filter(price=> price !== target.value)
      })
    }
  }


  return(
    <ModalMenu isOpen={isOpen} toggleMenu={toggleMenu}>
      <div className='filterMenu__title'>Filtrar</div>
      <div className="separation-line"></div>
      <ul>
        <SubMenu title={'Unidades'}>
          <div className='c-options__check'>
              {
                unidades.map(und=> <OptionCheck key={und} title = {und} toggleMenu= {test}></OptionCheck> )
              }
            

          </div>
          
        </SubMenu>

        <SubMenu title={'Ubicación'}>
        </SubMenu>
      </ul>

    </ModalMenu>
  )
}





export default MainMenu