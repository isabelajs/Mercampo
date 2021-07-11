import React from 'react'
import SystemLayout from "../componentes/system/SystemLayout";
import '../assets/styles/componentes/ProfileNewProduct.scss'

const ProfileNewProduct = (props)=>{
  const links = [
    { name: "Mis productos", url: "/profile/products"},{
      name: 'Nuevo producto', url: '/profile/products/new' }
  ];

  return (

    <SystemLayout links={links} type='products'  props={props}>

      <div className="l-profileNewProduct">
        <form className='profileNewProduct form'>

          <div className="newProduct__photo">
            <div className='systemSubGroup__title'>Fotos:</div>
              <img src="" alt="" />
              <img src="" alt="" />
              <div className="separation-line"></div>
          </div>

          <div className="newProduct__info">
            <div className="systemSubGroup__title">Datos iniciales:</div>
          
            <div className="l-systemSubGroup">
              <div className="form-group">
                <label htmlFor="">Nombre del producto</label>
                <input className="form-input" name='productName' type="text" placeholder="Nombre del producto" />
              </div>

              <div className="form-group">
                <label htmlFor="">Descripcion</label>
                <textarea className="form-textArea" cols="10" rows="10" name='description' type="text" placeholder="Descripcion del producto" />
              </div>

              <div className="form-group">
                <label htmlFor="">Disponibilidad</label>
                <select className='form-listBox'>
                  <option value="avaliable">Disponible</option>
                  <option value="notAvaliable">No disponible</option>
                </select>
              </div>

              <div className="separation-line"></div>

              <div className="form-group">
                <label htmlFor="">Precios Unitarios</label>
                <input className="form-input" name='disponibility' type="text" placeholder="Precios" />
              </div>
            
            </div>
          </div>


          <button className='button button--second'>Guardar</button>

        
        </form>
      </div>

    </SystemLayout>
  )
}


export default ProfileNewProduct