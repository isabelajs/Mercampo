import { useState } from 'react';
import { objectToList } from '../Helpers/convertedObjetList';


export function useFormBasicProduct ({displayName, uid} ){

  const state = {
      userId : uid,
      userName: displayName,
      avaliable: 'true',
      description: '',
      name: '',
      keywords:'',
      category:'',
    }

  const [formBasic, setFormBasic] = useState(state)

  const setBasicData = (e) =>{
    setFormBasic ({
      ...formBasic,
      [e.target.name]: e.target.value,
    });
  }
  
  const setBasicDataFromData = (data)=>{
    setFormBasic(
      {...data}
    )
  }

  const resetBasicData = ()=>{
    setFormBasic(state)
  }

  return {formBasic, setBasicData, resetBasicData,setBasicDataFromData}
}

export function useFormPhotosProduct (){

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

  const addPhotosFromData = (urls)=>{
    setPhotos(urls.map(url => ({url: url, alt:'Imagen de producto'})))
  }
 
  const resetPhotos = ()=>{
    setPhotos([])
  }

  return {photos, addPhoto, resetPhotos, addPhotosFromData}
}

export function useFormPricesProduct (){
  const state = [{name:'', value:''}]

  const [prices, setPrices] = useState(state)

  //cambiar el nombre del componente UnitPrice
  const handleUnitName =(name,indexChange)=>{
    setPrices(
      prices.map((item,index) =>
        index !== indexChange ? item : {value:item.value,name}
      ),
    );
  }
  
  //modifica el nombre del componente
  const handleUnitPrice = (value,indexChange)=>{
    setPrices(
        prices.map((item,index) =>
        index !== indexChange ? item : {name: item.name, value})
    )
  }

  //agregar un componente UnitPrice
  const insertNewPrice = ()=>{
    const lastPrice = prices[prices.length-1]

    //si el ultimo elemento no esta completo no dejar agregar mas
    if(lastPrice && (!isNaN(lastPrice.name) ||  !lastPrice.value)){
      console.log('no puedes agregar')
      return
    }
  
    setPrices(
      [
        ...prices,
        {
          name: '',
          value: '',
          isNew: true,
        }
      ],
    )
  }

  //eliminar un componente UnitPrice
  const deletePrice = (index)=>{

    if(prices.length > 1 ){
      prices.splice(index,1)
      setPrices([...prices]);
    }

  }

  const resetPrices = ()=>{
    setPrices(state)
  }

  const addPricesFromData = (prices)=>{
    setPrices(objectToList(prices))
  }

  return {prices, insertNewPrice, handleUnitPrice, deletePrice, handleUnitName, resetPrices, addPricesFromData}
}

