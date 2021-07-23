import React, { useState } from "react";
import { connect } from 'react-redux';

//componentes react
import SystemLayout from "../componentes/system/SystemLayout";
import TableUnitPrices from "../componentes/ProfileNewProduct/TableUnitPrices";

//estilos
import "../assets/styles/componentes/ProfileNewProduct/ProfileNewProduct.scss";

//funcion  firestore
import { addProductToStore } from '../utils/dataBase'


//hooks
function useFormBasicProfileProduct ({displayName, uid} ){
  const [formBasic, setFormBasic] = useState({
    userId : displayName,
    userName: uid,
    avaliable: true,
    description: '',
    name: "",
    keywords:'',
    category:'',
  })

  const setBasicData = (e) =>{
    setFormBasic ({
      ...formBasic,
      [e.target.name]: e.target.value,
    });
  }

  const resetBasicData = ()=>{
    setFormBasic({
      userId : displayName,
      userName: uid,
      avaliable: true,
      description: '',
      name: '',
      keywords:'',
      category:'',
    })
  }
  return [formBasic, setBasicData, resetBasicData]
}

function useFormPhotosProfileProduct (){
  const [photos, setPhotos] = useState([])

  const addPhoto = (e)=>{
    const inputFile = e.target

    if(inputFile.files && inputFile.files[0]){

      const url = URL.createObjectURL(inputFile.files[0])

      setPhotos(
        [...photos,{alt:'pepe',url:url, file:inputFile.files[0]}]
      )
    }
  }

  const resetPhotos = ()=>{
    setPhotos([])
  }

  return [photos, addPhoto, resetPhotos]
}

function useFormPricesProfileProduct (){
  const [prices, setPrices] = useState(
    [
      { name: "Kilogramo", value: '5000' },
      { name: "Libra", value: '' },
      { name: "Unidad", value: '' },
    ],
  )

  //modifica el nombre del componente
  const handleUnitPrice = (e)=>{
    setPrices(
        prices.map((item) =>
        item.name !== e.target.name ? item : { ...item, value: e.target.value })      
    )
  }
   //agregar un componente UnitPrice
  const insertNewPrice = ()=>{
    const lastPrice = prices[prices.length-1]

    //si el ultimo elemento no esta completo no dejar agregar mas
    if(lastPrice.isNew && (!isNaN(lastPrice.name) ||  !lastPrice.value)){
      console.log('no puedes agregar')
      return
    }
  
    setPrices(
      [
        ...prices,
        {
          name: String(prices.length),
          value: '',
          isNew: true,
        }
      ],
    )
  }

  const deletePrice = (index)=>{
    prices.splice(index,1)
    setPrices([...prices]);
  }

  //cambiar el nombre del componente UnitPrice
  const handleUnitName =(e)=>{
    setPrices(
      prices.map((item) =>
        item.name !== e.target.name ? item : { ...item, name: e.target.value }
      ),
    );
  }


  return[prices, insertNewPrice, handleUnitPrice, deletePrice, handleUnitName]
}

const ProfileNewProduct = (props) => { 
  const { user } = props

  const links = [
    { name: "Mis productos", url: "/profile/products" },
    { name: "Nuevo producto",url: "/profile/products/new"},
  ];

  const [formBasic, setBasicData, resetBasicData] = useFormBasicProfileProduct(user)
  const [photos, addPhoto, resetPhotos] = useFormPhotosProfileProduct()
  const [prices, insertNewPrice, handleUnitPrice, deletePrice, handleUnitName] = useFormPricesProfileProduct()
  const [isSendingData, setIsSendingData] = useState(false)

  const handleSubmit = async (e) =>{
    e.preventDefault()
    setIsSendingData(true)

    try{
      await addProductToStore(formBasic,photos,prices)

      setIsSendingData(false)

      resetBasicData()
      resetPhotos()

      console.log('información enviada con exito');
      
    }catch (error){
      console.log(error);
    }

  }

  return (
    <SystemLayout links={links} type="products" props={props}>

      <div className="l-profileNewProduct">

        <form className="profileNewProduct form" onSubmit={handleSubmit}>

          <div className="l-newProduct__photos">

            <div className="systemSubGroup__title">Fotos:</div>

              <div className="newProduct__photos">

                {photos.map((item,index)=>{
                  return <img src={item.url} alt={item.alt} key={index} />
                })}
                

                {/* TODO PASAR ESTO A UN COMPONENTE APARTE */}

                <label className="newProduct__addPhoto" name='file'>
                  <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect y="20.1923" width="6.73077" height="35" rx="3.36538" transform="rotate(-90 0 20.1923)" fill="#2EC4B6"/>
                    <rect x="14.8076" width="6.73077" height="35" rx="3.36538" fill="#2EC4B6"/>
                  </svg>
                  <input type="file" accept='image/png, image/jpeg, image/jpg' name='file' onChange={addPhoto}/>
                </label>
                
              </div>

            <div className="separation-line"></div>
          </div>

          <div className="newProduct__info">
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

          <div className="newProduct__unitPrices">
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
      </div>
    
      {isSendingData && <div>...Enviando informacion</div>}

    </SystemLayout>
  );
};

const mapStateToProps = (state)=>({ user: state.user})


export default connect(mapStateToProps,null)(ProfileNewProduct);

//TODO: VALIDACIONES DEL FORMULARIO

  //DEBE EXISTIR ALMENOS 1 PRECIO UNITARIO CON PRECIO
  //LOS PRECIOS QUE NO TENGAN UN VALOR NO LOS ENVIO LA BD?
  //PUEDO GUARDAR UN PRODUCTO SIN PRECIOS PERO NO DISPONIBLE?
  //Utilizar todo esto en redux?

//TODO: ESTUDIAR COMO OPTIMIZAR LOS RENDERIZADOS CON USEMEMO Y USECALLBACK