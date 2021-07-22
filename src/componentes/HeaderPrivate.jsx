import React from 'react';
import { connect } from 'react-redux';
//estilos
import '../assets/styles/HeaderPrivate.scss'
//imagenes
import logo from '../assets/static/logo.png'
import userIcon from '../assets/static/Group.png'
import menuBurger from '../assets/static/menuBurguer.png'

const HeaderPrivate = (props)=>{
  let { user } = props

}

const mapStateToProps = (state)=>{
  return{
    user: state.user
  }
}

export default connect(mapStateToProps, null)(HeaderPrivate)