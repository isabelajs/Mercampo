import { useState, useRef, useEffect, useCallback } from 'react';
import { objectToList } from '../Helpers/conversionFunctions';

import { cities } from '../Helpers/dataBaseCities';


export function useFilterProducts (initialCategory){

	const [querySearch, setQuerySearch] = useState('')

	const [filterList, setFilterList, filterListRef] = useStateRef([])

	const [selectedCategory, setSelectedCategory, selectedCategoryRef] = useStateRef(initialCategory)

	return {
		selectedCategory,
		setSelectedCategory,
		selectedCategoryRef,
		setQuerySearch,
		filterList,
		setFilterList,
		filterListRef,
		querySearch,
	}
}


export function useFormBasicProduct ({displayName, uid} ){

  const state = {
      userId : uid,
      userName: displayName,
      avaliable: 'true',
      description: '',
      name: '',
      keywords:'',
      category:'',
      department: '',
      city: '',
    }

  const [formBasic, setFormBasic] = useState(state)

  const setBasicData = ({target}) =>{
    if(target.name === 'department'){
      setFormBasic({
        ...formBasic,
        [target.name]: target.value,
        'city': cities(target.value)[0],
      })
    }
    else{
      setFormBasic ({
        ...formBasic,
        [target.name]: target.value,
      });
    }

  }
  
  const setBasicDataFromData = (data)=>{
    setFormBasic(
      {...data}
    )
  }

  const resetBasicData = ()=>{
    setFormBasic(state)
  }

  return {formBasic, setFormBasic,setBasicData, resetBasicData,setBasicDataFromData}
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

  const removePhoto = (url) =>{
    setPhotos(photos.filter((photo)=> photo.url !== url))
  }
 
  const resetPhotos = ()=>{
    setPhotos([])
  }

  return {photos, addPhoto, removePhoto, resetPhotos, addPhotosFromData}
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

export const useCounter = () =>{

  const refCounter = useRef(1)

  useEffect(()=>{
    refCounter.current +=1
  })

  return refCounter.current
}

export const useStateRef = (initialState) =>{

	const [state,setState] = useState(initialState)
	const stateRef = useRef(initialState)

	const setStateRef = useCallback((newState) =>{
		stateRef.current = newState
		setState(newState)
	},[])

	return [state,setStateRef,stateRef]
}

export const useAlert = () =>{

  const [alertStatus, setStateAlert] = useState({
    isOpen:false,
    error: null,
    message: ''
  })


  const openAlert = (newState)=> {
    setStateAlert({
      isOpen:true,
      ...newState,
    })
  }

  const closeAlert = ()=>{
    setStateAlert({
      isOpen:false,
      error: null,
      message: ''
    })
  }


  return {alertStatus,openAlert,closeAlert}
}



//Hook para los modales, puede recibir data, cuando son abiertos
//esto debe recibir una promesa y cuando la promesa se cumpla se debe cerrar?
export const useModal = () =>{

  const [modalStatus,setModalStatus] = useState()

  const modalData = useRef(null)

  const closeModal = useCallback(() =>{
      setModalStatus(false)
      modalData.current = null
  },[])

  const openModal = useCallback((data) =>{
    setModalStatus(true)
    modalData.current = data
  },[])


  const useDragAndDrop = () =>{
    const [status,setModalStatus] = useState()

    // const 
  }


  return {modalStatus,closeModal,openModal,modalData}
}