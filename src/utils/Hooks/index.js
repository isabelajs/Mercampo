import  {useState}from 'react';


function useFormBasicProduct ({displayName, uid} ){

  const initialState = {
      userId : displayName,
      userName: uid,
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
      { name: "Kilogramo", value: '5000' },
      { name: "Libra", value: '' },
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

    setPrices([
        prices
      ]
    );
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


export { useFormBasicProduct, useFormPhotosProduct, useFormPricesProduct }