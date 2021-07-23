import React, { useState} from 'react';
import { connect } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';

//imagenes
import logo from '../assets/static/logo.png'
import userIcon from '../assets/static/Group.png'
import menuBurger from '../assets/static/menuBurguer.png'
import MenuMobile from './MenuMobile';

//estilos
// import styles from '../assets/styles/componentes/Header/HeaderPrivate.scss';

//solucion para el modal https://codesandbox.io/s/friendly-hofstadter-qtrtn?file=/src/index.js:1011-1071

//header login and not login
function HeaderPrivate (props){

  const { user } = props
  
  const [isOpenMenuMobile, setIsOpenMenuMobile] = useState(false)

  const history = useHistory()

  const handleClick = ()=>{
    history.push('/')
  }

  const openMenuMobile = ()=>{
    setIsOpenMenuMobile(!isOpenMenuMobile)
  }

  const truncateName = (user)=>{
    console.log(user)
    return user.displayName.split(' ').splice(0,3).join(' ')
  }


  return(

    <header className='header header--private'>

      <img className='header__menuBurguer icon' src={menuBurger} alt="" onClick={openMenuMobile}/>

      <img onClick={handleClick} className='header__logo'src={logo} alt="" />

      <div className="header__userStatus" >
        <img className='userStatus__icon icon' src={user.photoURL} alt=""/>
        <p className="userStatus__userName">{truncateName(user)}</p>
      </div>

      <MenuMobile isOpenMenuMobile={isOpenMenuMobile} openMenuMobile={openMenuMobile}/>
    
    </header>
  )
}


const mapStateToProps = (state)=>{
  return{
    user: state.user
  }
}

export default connect(mapStateToProps,null)(HeaderPrivate)