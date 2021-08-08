import React, { useState, useCallback, useEffect } from "react";
import { connect } from 'react-redux';

//componentes react
import SystemLayout from "../componentes/system/SystemLayout";
import TableUnitPrices from "../componentes/ProfileProduct/TableUnitPrices";
import Alert from "../componentes/common/Alert";
import ProductPhoto from '../componentes/ProfileProduct/ProductPhoto';
import NewProductPhoto from "../componentes/ProfileProduct/AddProductPhoto";

//estilos
import "../assets/styles/componentes/ProfileProduct/EditProduct.scss";

//funcion  firestore
import { addProductToStore, findUserById } from '../utils/dataBase'

//hooks
import { useFormBasicProduct, useFormPricesProduct, useFormPhotosProduct } from "../utils/Hooks";
import {openAlert, closeAlert} from '../actions'

//validaciones del formulario
import {validationsInFormProducts} from "../utils/Helpers/validationsInform";

const ProfileNewProduct = (props) => { 
  const { user, openAlert, closeAlert } = props

  const links = [
    { name: "Mis productos", url: "/profile/products" },
    { name: "Nuevo producto",url: "/profile/products/new"},
  ];

  const {formBasic, setFormBasic, setBasicData, resetBasicData} = useFormBasicProduct(user)
  const {photos, addPhoto, removePhoto, resetPhotos} = useFormPhotosProduct()
  const {prices, insertNewPrice, handleUnitPrice, deletePrice, handleUnitName, resetPrices} = useFormPricesProduct()
  const [isSendingData, setIsSendingData] = useState(false)

  //validaciones que nada falta
  const validationForm = useCallback ((form)=>validationsInFormProducts(form),[])
  
  const handleSubmit = async (e) =>{
    e.preventDefault()

    const validation = validationForm({...formBasic, photos:photos, prices: prices})
    
    if(validation){

      openAlert({
        error:true,
        message: validation
      })

      return
    }

    
    try{

      closeAlert()

      setIsSendingData(true)
      
      await addProductToStore(formBasic,photos,prices)      

      setIsSendingData(false)

      resetBasicData()

      resetPhotos()

      resetPrices()

      console.log('información enviada con exito');
      
    }catch (error){
      console.log(error);
    }

  }

  useEffect(()=>{
    const findUser = async ()=>{
      try{
        let userInData = await findUserById(user.uid);
        setFormBasic({
          ...formBasic,
          department: userInData.department,
          city: userInData.city,
        })
        
      }catch(err){
        throw new Error(`NewProduct obtener un usuario ${err}`)
      }
    }
    findUser()
  },[user])



  return (
    <SystemLayout links={links} type="products" props={props}>

      <div className="l-editProduct">

        <form className="editProduct form" onSubmit={handleSubmit}>

          <div className="l-editProduct__photos">

            <div className="systemSubGroup__title">Fotos:</div>

              <div className="editProduct__photos">

                {photos.map((item,index)=> <ProductPhoto removePhoto={removePhoto} key={index} src={item.url} alt={item.alt}/> )}
                
                <NewProductPhoto addPhoto={addPhoto}/>
              
              </div>

            <div className="separation-line"></div>
          </div>

          <div className="editProduct__info">
            <div className="systemSubGroup__title">Datos iniciales:</div>

            <div className="l-systemSubGroup">
              <div className="form-group">
                <label htmlFor="">Nombre del producto</label>
                <input
                  className="form-input"
                  name="name"
                  type="text"
                  placeholder="Nombre del producto"
                  onChange={setBasicData}
                  value={formBasic.name}
                  />
              </div>

              <div className="form-group">
                <label htmlFor="">Descripcion</label>
                <textarea
                  className="form-textArea"
                  cols="10"
                  rows="10"
                  name="description"
                  type="text"
                  placeholder="Descripcion del producto"
                  onChange={setBasicData}
                  value={formBasic.description}
                  />
              </div>

              <div className="form-group">
                <label htmlFor="">Palabras Claves</label>
                <input
                  className="form-input"
                  cols="10"
                  rows="10"
                  name="keywords"
                  type="text"
                  placeholder="Palabras claves que describan tu producto Ejm: 'ganado, carne, vacas, magro' "
                  onChange={setBasicData}
                  value={formBasic.keywords}
                />
              </div>
            
              {/* //TODO: CREATE SELECT COMPONENT */}
              <div className="form-group">
                <label htmlFor="">Categoria</label>
                <select
                  className="form-listBox"
                  name="category"
                  onChange={setBasicData}
                  value= {formBasic.category}
                >
                  <option value={''}>-----</option>
                  <option value={'Animales'}>Animales</option>
                  <option value={'Granos'}>Granos</option>
                  <option value={'Verduras'}>Verduras</option>
                  <option value={'Frutas'}>Frutas</option>
                  <option value='Otros'>Otros</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="">Disponibilidad</label>
                <select
                  className="form-listBox"
                  name="avaliable"
                  onChange={setBasicData}
                  value={formBasic.avaliable}
                >
                  <option value={true}>Disponible</option>
                  <option value={false}>No disponible</option>
                </select>
              </div>
{/* //FIXME los departementos y ciudad debe ser un menu desplegable */}
              <div className="form-group">
                <label>Departamento</label>
                <input
                  className="form-input"
                  name="department"
                  type="text"
                  placeholder="Ingrese el departamento donde se encuentra el producto"
                  onChange={setBasicData}
                  value={formBasic.department}
                  autoComplete="false"
                />
              </div>
  
              <div className="form-group">
                <label>Ciudad</label>
                <input
                  className="form-input"
                  name="city"
                  type="text"
                  placeholder="Ingrese ciudad en donde se encuentra el producto"
                  value={formBasic.city}
                  onChange={setBasicData}
                />
                </div>  


              <div className="separation-line"></div>
            </div>
          </div>

          <div className="editProduct__unitPrices">
            <div className="systemSubGroup__title">Precios Unitarios</div>

            <div className="l-systemSubGroup">
              <div className="form-group newProduct__unitPrices">
                <TableUnitPrices 
                  prices={prices}
                  deletePrice={deletePrice}
                  handleUnitName={handleUnitName}
                  handleUnitPrice={handleUnitPrice}
                  insertNewPrice={insertNewPrice}/>
              </div>
            </div>
          </div>
          
          <Alert/>
          <button className="button button--second">Guardar</button>
        </form>
      </div>
    
      {isSendingData && <div>...Enviando informacion</div>}

    </SystemLayout>
  );
};

const mapStateToProps = (state)=>({ user: state.user})
const mapDispatchToProps = {
  openAlert,
  closeAlert
}


export default connect(mapStateToProps,mapDispatchToProps)(ProfileNewProduct);


