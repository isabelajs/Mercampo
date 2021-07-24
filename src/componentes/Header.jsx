import React, { useRef, useState} from 'react';
import { connect } from 'react-redux';
import { Link , useHistory} from 'react-router-dom';

//imagenes
import logo from '../assets/static/logo.png'
import userIcon from '../assets/static/Group.png'
import menuBurger from '../assets/static/menuBurguer.png'

//estilos
import '../assets/styles/componentes/Header/Header.scss';
import MenuMobile from './MenuMobile';


//solucion para el modal https://codesandbox.io/s/friendly-hofstadter-qtrtn?file=/src/index.js:1011-1071

//header login and not login
function Header (props){

  const { user } = props
  
  const [isOpenMenuMobile, setIsOpenMenuMobile] = useState(false)

  const history = useHistory()
  const nameTruncate = useRef(user.displayName.split(' ').splice(0,3).join(' '))


  const handleClick = ()=>{
    history.push('/')
  }

  const openMenuMobile = ()=>{
    setIsOpenMenuMobile(!isOpenMenuMobile)
  }

  const moveToProfile = ()=>{
    history.push('/profile/settings')
  }

  return(
    
    <header className='header'>

      <img className='header__menuBurguer icon' src={menuBurger} alt="" onClick={openMenuMobile}/>
  
      <img onClick={handleClick} className='header__logo'src={logo} alt="" />

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

      {user && 
        <div className="header__userStatus" onClick={moveToProfile}>
          <img className='userStatus__icon icon' src={user.photoURL} alt=""/>
          <p className="userStatus__userName">{nameTruncate.current}</p>
        </div>
      }


      {!user &&
        <div className="header__buttons">
          <Link className= "signUp" to='/login'>Log In</Link>
          <Link className= "button button--main header__logIn" to='/login'>Log In</Link>
          <Link className= "button button--second header__signUp" to='/register'>Sign Up</Link>
        </div>
      }
    
      <MenuMobile isOpenMenuMobile={isOpenMenuMobile} openMenuMobile={openMenuMobile}/>
    
    </header>
  )
}


const mapStateToProps = (state)=>{
  return{
    user: state.user
  }
}

export default connect(mapStateToProps,null)(Header)






