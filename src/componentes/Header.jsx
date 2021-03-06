import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';

//imagenes
import logo from '@images/logo.png'
import menuBurger from '@images/menuBurguer.png'

//components
import MainMenu from './ModalMenu/MainMenu';
import DesktopMenu from './ModalMenu/DesktopMenu';

//styles
import '@styles/componentes/Header/Header.scss'


//solucion para el modal https://codesandbox.io/s/friendly-hofstadter-qtrtn?file=/src/index.js:1011-1071

function Header (props){

  const { user, isPrivate} = props
  const [userName, setUserName] = useState('')
  const [isOpenMenu, setIsOpenMenu] = useState(false)
  const history = useHistory()

  const moveToHome = ()=>{
    history.push('/products')
  }

  // const moveToProfile = ()=>{
  //   history.push('/profile/settings')
  // }

  const toggleMenu = ()=>{
    setIsOpenMenu(!isOpenMenu)
  }

  useEffect(()=>{
    if(user){
      setUserName(user.displayName.split(' ').splice(0,3).join(' ')) 
    }else{
      setUserName('')
    }
  },[user])


  return(

    <header className={`header ${isPrivate ? 'header--private' : ''}`}>
      
      <MainMenu userImg={user ? user.photoURL : ''} userName={userName} isOpenMenu={isOpenMenu} toggleMenu={toggleMenu}/>

      <img className='header__menuBurguer icon' src={menuBurger} alt="" onClick={toggleMenu}/>

      <img onClick={moveToHome} className='header__logo'src={logo} alt="" />

      {
        !isPrivate &&
        <nav>
          <ul>
            <li>
              <Link to='/'>Home</Link>
            </li>
            <li>
              <Link to='/products'>Products</Link>
            </li>
            <li>
              <Link to='/team'>About Us</Link>
            </li>
          </ul>
        </nav>
      }

      {user && 
        <div className="header__userStatus">
          <img loading='lazy' className='userStatus__icon icon' src={user.photoURL} alt=""/>
          <p className="userStatus__userName">{userName}</p>
          <DesktopMenu/>
        </div>
      }  

      {!user &&
        <div className="header__buttons">
          <Link className= "signUp" to='/login'>Log In</Link>
          <Link className= "button button--main header__logIn" to='/login'>Log In</Link>
          <Link className= "button button--second header__signUp" to='/register'>Sign Up</Link>
        </div>
      }

    </header>
  )
}

const mapStateToProps = (state)=>{
  return{
    user: state.user
  }
}

export default connect(mapStateToProps,null)(Header)