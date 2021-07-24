import React, { useState, useEffect, useRef} from 'react';
import { connect } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';

//imagenes
import logo from '../assets/static/logo.png'
import menuBurger from '../assets/static/menuBurguer.png'
import MenuMobile from './MenuMobile';


//solucion para el modal https://codesandbox.io/s/friendly-hofstadter-qtrtn?file=/src/index.js:1011-1071

//header login and not login
function HeaderPrivate (props){

  const { user } = props

  const [userName, setUserName] = useState('')

  const [isOpenMenuMobile, setIsOpenMenuMobile] = useState(false)

  const history = useHistory()

  const handleClick = ()=>{
    history.push('/')
  }

  const openMenuMobile = ()=>{
    setIsOpenMenuMobile(!isOpenMenuMobile)
  }

  useEffect(()=>{
    if(user){
      setUserName(user.displayName.split(' ').splice(0,3).join(' ')) 
    }
  },[user])

  //como lo primero que carga es el layout la ruta de header privado solicitara el user 
  return(
    <>
      {user && 
        <header className='header header--private'>
          <img className='header__menuBurguer icon' src={menuBurger} alt="" onClick={openMenuMobile}/>

          <img onClick={handleClick} className='header__logo'src={logo} alt="" />

          <div className="header__userStatus" >
            <img loading='lazy' className='userStatus__icon icon' src={user.photoURL} alt=""/>
            <p className="userStatus__userName">{userName}</p>
          </div>

          <MenuMobile isOpenMenuMobile={isOpenMenuMobile} openMenuMobile={openMenuMobile}/>

        </header>
      }    
    </>
  )
}


const mapStateToProps = (state)=>{
  return{
    user: state.user
  }
}

export default connect(mapStateToProps,null)(HeaderPrivate)