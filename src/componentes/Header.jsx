import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';

//imagenes
import logo from '../assets/static/logo.png'
import menuBurger from '../assets/static/menuBurguer.png'
import MenuMobile from './MenuMobile';

//styles
import '../assets/styles/componentes/Header/Header.scss'


//solucion para el modal https://codesandbox.io/s/friendly-hofstadter-qtrtn?file=/src/index.js:1011-1071

function Header (props){

  const { user, isPrivate} = props
  const [userName, setUserName] = useState('')
  const [isOpenMenuMobile, setIsOpenMenuMobile] = useState(false)
  const history = useHistory()

  const moveToHome = ()=>{
    history.push('/')
  }

  const moveToProfile = ()=>{
    history.push('/profile/settings')
  }

  const toggleMenuMobile = ()=>{
    setIsOpenMenuMobile(!isOpenMenuMobile)
  }

  useEffect(()=>{
    if(user){
      setUserName(user.displayName.split(' ').splice(0,3).join(' ')) 
    }
  },[user])


  return(

    <header className={`header ${isPrivate ? 'header--private' : ''}`}>

      <MenuMobile userImg={user ? user.photoURL : ''} userName={userName} isOpenMenuMobile={isOpenMenuMobile} toggleMenuMobile={toggleMenuMobile}/>

      <img className='header__menuBurguer icon' src={menuBurger} alt="" onClick={toggleMenuMobile}/>

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
              <Link to='/contact'>About Us</Link>
            </li>
          </ul>
        </nav>
      }

      {user && 
        <div className="header__userStatus" onClick={moveToProfile}>
          <img loading='lazy' className='userStatus__icon icon' src={user.photoURL} alt=""/>
          <p className="userStatus__userName">{userName}</p>
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