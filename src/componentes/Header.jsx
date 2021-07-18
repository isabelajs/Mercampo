import React, { useState} from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import logo from '../assets/static/logo.png'
import '../assets/styles/componentes/Header.scss';
import menuBurger from '../assets/static/menuBurguer.png'
import userIcon from '../assets/static/Group.png'

//solucion para el modal https://codesandbox.io/s/friendly-hofstadter-qtrtn?file=/src/index.js:1011-1071
//header login and not login
function Header (props){

  // const {user} = props

  const [isOpenMenuMobile, setIsOpenMenuMobile] = useState(false)

  const history = useHistory()

  const handleClick = ()=>{
    history.push('/')
  }

  const openMenuMobile = ()=>{
    setIsOpenMenuMobile(!isOpenMenuMobile)
  }

  return(
    <header className='header'>

      <img className='header__menuBurguer' src={menuBurger} alt="" onClick={openMenuMobile}/>

      <img onClick={handleClick} className='header__logo'src={logo} alt="" />

      <div className="header__userStatus">
        <img className='userStatus__icon' src={userIcon} alt=""/>
        <p className="userStatus__userName">Juanito el pillo</p>
      </div>



      <div className={`menuUser ${isOpenMenuMobile && 'menuUser--open'}`}>

        <p onClick={openMenuMobile}>X</p>

        <div className="menuUser__User">
          <img src="" alt="" />
          <p></p>
        </div>

        <ul className="menuMobile">
          <img src="" alt="" />
          <p>Perfil</p>
        </ul>

        <ul className="menuMobile">
          <img src="" alt="" />
          <p>Home</p>
        </ul>

        <ul className="menuMobile">
          <img src="" alt="" />
          <p>Productos</p>
        </ul>

        <ul className="menuMobile">
          <img src="" alt="" />
          <p>About Us</p>
        </ul>

      </div>

    </header>
  )
}


// const mapStateToProps = (state)=>{
//   return{
//     user: state.user
//   }
// }

export default connect(null,null)(Header)