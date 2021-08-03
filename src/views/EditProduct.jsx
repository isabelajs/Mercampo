import React, { useState, useEffect, useCallback} from "react";
import { connect } from 'react-redux';

//componentes
import SystemLayout from "../componentes/system/SystemLayout";
import TableUnitPrices from "../componentes/ProfileProduct/TableUnitPrices";
import Alert from "../componentes/common/Alert";
import ProductPhoto from '../componentes/ProfileProduct/ProductPhoto';
import NewProductPhoto from "../componentes/ProfileProduct/AddProductPhoto";


//estilos
import "../assets/styles/componentes/ProfileProduct/EditProduct.scss";

//funcion  firestore
import {getProductById, updateProduct} from '../utils/dataBase'

//hooks
import { useFormBasicProduct, useFormPricesProduct, useFormPhotosProduct } from "../utils/Hooks";
import {openAlert, closeAlert} from '../actions'

//validaciones
import {validationsInFormProducts} from "../utils/Helpers/validationsInform";



const EditProduct = (props) => { 
  const { user, openAlert, closeAlert } = props

  const productId = props.match.params.idProduct

  const links = [
    { name: "Mis productos", url: "/profile/products" },
    { name: "Editar producto",url: `/profile/products/${productId}/edit`},
  ];

  const {formBasic, setBasicData, setBasicDataFromData} = useFormBasicProduct(user)
  const {photos, addPhoto, removePhoto,  addPhotosFromData} = useFormPhotosProduct()
  const {prices, insertNewPrice, handleUnitPrice, deletePrice, handleUnitName, addPricesFromData } = useFormPricesProduct()
  const [isLoading, setIsLoading] = useState(true)
  const [isSendingData, setIsSendingData]= useState(false)

  const validationForm = useCallback((form)=>validationsInFormProducts(form),[])

  useEffect(()=>{

    const getProduct = async ()=>{
      try{
        const data = await getProductById(productId)
        
        setBasicDataFromData(data)        
        addPhotosFromData(data.photos)
        addPricesFromData(data.prices)
        setIsLoading(false)
        
      }catch(err){
        console.log(err);
      }
    }

    getProduct()
    closeAlert()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])


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

      await updateProduct(productId,formBasic,photos,prices)
      setIsSendingData(false)

    }catch (error){
      console.log(error);
    }

  }

  return (
    <SystemLayout links={links} type="products" props={props}>

      <div className="l-editProduct">

        {
          isLoading ? <h1 style={{textAlign:'center'}}>... Loading</h1>
          :
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
          
          <button className="button button--second">Guardar</button>
        </form>
        }
      </div>
    
      <Alert/>

      {isSendingData && <div>...Enviando informacion</div>}

    </SystemLayout>
  );
};

const mapStateToProps = (state)=>({ user: state.user})

const mapDispatchToProps = {
  openAlert,
  closeAlert
}


export default connect(mapStateToProps,mapDispatchToProps)(EditProduct);

//TODO: VALIDACIONES DEL FORMULARIO

  //DEBE EXISTIR ALMENOS 1 PRECIO UNITARIO CON PRECIO
  //LOS PRECIOS QUE NO TENGAN UN VALOR NO LOS ENVIO LA BD?
  //PUEDO GUARDAR UN PRODUCTO SIN PRECIOS PERO NO DISPONIBLE?
  //Utilizar todo esto en redux?

//TODO: ESTUDIAR COMO OPTIMIZAR LOS RENDERIZADOS CON USEMEMO Y USECALLBACK