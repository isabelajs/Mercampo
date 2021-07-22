import React, { useState} from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

//imagenes
import logo from '../assets/static/logo.png'
import userIcon from '../assets/static/Group.png'
import menuBurger from '../assets/static/menuBurguer.png'

//estilos
import '../assets/styles/componentes/Header.scss';


//solucion para el modal https://codesandbox.io/s/friendly-hofstadter-qtrtn?file=/src/index.js:1011-1071

//header login and not login
function Header (props){

  const { user } = props
  
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

      <img className='header__menuBurguer icon' src={menuBurger} alt="" onClick={openMenuMobile}/>

      <img onClick={handleClick} className='header__logo'src={logo} alt="" />

      <div className="header__userStatus">
        {
          user 
          ? <>
              <img className='userStatus__icon icon' src={userIcon} alt=""/>
              <p className="userStatus__userName">{user.displayName}</p>
            </>
          : <div className = "userStatus__signUp">Sign up</div>
        }
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


const mapStateToProps = (state)=>{
  return{
    user: state.user
  }
}

export default connect(mapStateToProps,null)(Header)