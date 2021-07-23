import { useState } from 'react';


function useFormBasicProduct ({displayName, uid} ){

  const initialState = {
      userId : uid,
      userName: displayName,
      avaliable: true,
      description: '',
      name: '',
      keywords:'',
      category:'',
    }


  const [formBasic, setFormBasic] = useState(initialState)

  const handleChange = (e) =>{
    setFormBasic ({
      ...formBasic,
      [e.target.name]: e.target.value,
    });
  }

  const resetBasicData = ()=>{
    setFormBasic(initialState)
  }

  return [formBasic, handleChange, resetBasicData]
}

function useFormPhotosProduct (){
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

function useFormPricesProduct (){
  const [prices, setPrices] = useState(
    [
      {name: "kilogramo", value: 5000 },
      {name: "libra", value: '' },
    ],
  )

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
    if(!isNaN(lastPrice.name) ||  !lastPrice.value){
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


  return[prices, insertNewPrice, handleUnitPrice, deletePrice, handleUnitName]
}


export { useFormBasicProduct, useFormPhotosProduct, useFormPricesProduct }