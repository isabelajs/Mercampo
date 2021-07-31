import React, { useState, useEffect, useCallback } from "react";

//estilos
import "../assets/styles/componentes/Products.scss";

//componentes
import CardProduct from "../componentes/Products/CardProduct";
import { getAllProducts, getProductsBySearch } from "../utils/dataBase";
import CarrouselCategories from '../componentes/Products/CarrouselCategories'
import  CardCategory  from '../componentes/Products/CardCategory'
import { useMemo } from "react";


//Todos siempre se aplican


// const filtros = {categorias:'', units:['kg','lb'], ubication:''}


// dataRef = db.colelction('products')

// if categories !== 'All'
	// dataRef = dataRef.where('category' == 'All')

// if units.length > 0 then
	// dataRef = dataRef.where('category' == 'All')



// data = dataref.get()





//filtros js  / firestore
	// categories -> // deme todas las categories
	// price			-> // where price['libra'] > 0'
									 // where ListPrices contains 'libra'
	// ubicacion 	-> // where ubication == 'ubication'


//-> todos? -> filter by search... 
		// nombre 		-> //  userName
		// pepe -> (name.contains('pepe' || description.contains('pepe') keywords.contains('pepe')))
	
//hooks son re ejecutados siempre tambien..
function useFilterProducts (initialCategory, initialProducts){
	//toda la data

	//value input search
	const [querySearch, setQuerySearch] = useState('')

	// const [filteredProducts,setFilteredProducts] = useState(initialProducts)

	const filteredProducts = useMemo(()=>{
		return initialProducts.filter((item)=>item.name.toLowerCase().includes(querySearch.toLocaleLowerCase()))

	},[initialProducts,querySearch])

	//value category selected
	const [selectedCategory, setSelectedCategory] = useState(initialCategory)

	return {
		selectedCategory,
		setSelectedCategory,
		setQuerySearch,
		querySearch,
		filteredProducts,
	}
}



export default function Products() {
	const [listProducts, setListProducts] = useState([])
	const [isLoading, setIsLoading] = useState(true)
	const [isError,setIsError] = useState(null)

  const categoriesList =['All','Huevos','Frutas','Vegetales','Granos','Animales','Carne','Pescado','Artesanias']

	const {selectedCategory, setSelectedCategory, querySearch, setQuerySearch, filteredProducts} = useFilterProducts('All', listProducts)
	
	//Fetch-Data
	useEffect(()=>{

		const fetchData = async ()=>{

			setIsLoading(true)
			setIsError(null)

			try{
				const data = await getAllProducts()
				setListProducts(data)
				setIsLoading(false)

			}catch(err){
				// console.log(err)
				setIsError(err)
			}
		}

		fetchData()
		

	},[])

	const fetchDataFilter = useCallback(async () => {
		setIsLoading(true)
		setIsError(null)

		try{
			const data = await getProductsBySearch(querySearch)
			console.log(data);
			setListProducts(data)
			setIsLoading(false)

		}catch(err){
			setIsError(err)
		}
	},[])


  return (
    <div className=" l-products">
      <div className="c-products__tools">
        <div className="products__tools">

            <div className="search">		
							<svg style={{cursor:'pointer'}} onClick={fetchDataFilter} className='search__icon' width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M14.9549 13.9218L10.0856 9.05246C10.8412 8.07559 11.25 6.88122 11.25 5.62498C11.25 4.12123 10.6631 2.71124 9.60183 1.64812C8.54059 0.584997 7.12684 0 5.62498 0C4.12311 0 2.70936 0.586872 1.64812 1.64812C0.584997 2.70936 0 4.12123 0 5.62498C0 7.12684 0.586872 8.54059 1.64812 9.60183C2.70936 10.665 4.12123 11.25 5.62498 11.25C6.88122 11.25 8.07372 10.8412 9.05059 10.0875L13.9199 14.9549C13.9342 14.9692 13.9512 14.9806 13.9698 14.9883C13.9885 14.996 14.0085 15 14.0287 15C14.0489 15 14.0689 14.996 14.0875 14.9883C14.1062 14.9806 14.1232 14.9692 14.1374 14.9549L14.9549 14.1393C14.9692 14.125 14.9806 14.1081 14.9883 14.0894C14.996 14.0708 15 14.0508 15 14.0306C15 14.0104 14.996 13.9904 14.9883 13.9717C14.9806 13.953 14.9692 13.9361 14.9549 13.9218V13.9218ZM8.59496 8.59496C7.79997 9.38808 6.74622 9.82496 5.62498 9.82496C4.50373 9.82496 3.44999 9.38808 2.65499 8.59496C1.86187 7.79997 1.42499 6.74622 1.42499 5.62498C1.42499 4.50373 1.86187 3.44811 2.65499 2.65499C3.44999 1.86187 4.50373 1.42499 5.62498 1.42499C6.74622 1.42499 7.80184 1.85999 8.59496 2.65499C9.38808 3.44999 9.82496 4.50373 9.82496 5.62498C9.82496 6.74622 9.38808 7.80184 8.59496 8.59496Z" fill="#B8B5B5"/>
							</svg>
							<input 
								className='search__input' 
								type="text" 
								placeholder='Buscar...' 
								onChange={(e)=>{
									setQuerySearch(e.target.value)
									console.log('seteando el input');
									
								}}
								value={querySearch}
								/>
            </div>

            <div className="button button--icon">
								<svg className='button__icon' width="15" height="10" viewBox="0 0 15 10" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path d="M5 9.28571C5 9.09627 5.06585 8.91459 5.18306 8.78064C5.30027 8.64668 5.45924 8.57143 5.625 8.57143H9.375C9.54076 8.57143 9.69973 8.64668 9.81694 8.78064C9.93415 8.91459 10 9.09627 10 9.28571C10 9.47515 9.93415 9.65684 9.81694 9.79079C9.69973 9.92475 9.54076 10 9.375 10H5.625C5.45924 10 5.30027 9.92475 5.18306 9.79079C5.06585 9.65684 5 9.47515 5 9.28571ZM2.5 5C2.5 4.81056 2.56585 4.62888 2.68306 4.49492C2.80027 4.36097 2.95924 4.28571 3.125 4.28571H11.875C12.0408 4.28571 12.1997 4.36097 12.3169 4.49492C12.4342 4.62888 12.5 4.81056 12.5 5C12.5 5.18944 12.4342 5.37112 12.3169 5.50508C12.1997 5.63903 12.0408 5.71429 11.875 5.71429H3.125C2.95924 5.71429 2.80027 5.63903 2.68306 5.50508C2.56585 5.37112 2.5 5.18944 2.5 5ZM0 0.714286C0 0.524845 0.0658481 0.343164 0.183058 0.20921C0.300269 0.075255 0.45924 0 0.625 0H14.375C14.5408 0 14.6997 0.075255 14.8169 0.20921C14.9342 0.343164 15 0.524845 15 0.714286C15 0.903726 14.9342 1.08541 14.8169 1.21936C14.6997 1.35332 14.5408 1.42857 14.375 1.42857H0.625C0.45924 1.42857 0.300269 1.35332 0.183058 1.21936C0.0658481 1.08541 0 0.903726 0 0.714286Z" fill="black"/>
								</svg>
          			<p>Filter</p>
            </div>

        </div>

				<CarrouselCategories>
					{
						categoriesList.map( (category) => {
							if(selectedCategory === category){
								return (
									<CardCategory
										key={category}
										handleClick = {setSelectedCategory}
										title={category}
										isSelect = {true}
									>

									</CardCategory>
								)
							}

							return(
								<CardCategory
										key={category}
										handleClick = {setSelectedCategory}
										title={category}
										isSelect = {false}
									>
								</CardCategory>
							)

						})
					}				
				</CarrouselCategories> 

    	</div>

			<div className="c-products__products">
				{
					listProducts.map((product,index)=> {
						return(
							<CardProduct key={index} {...product}/>
						)
					})
				}
			</div>

			{isError && <h1 style={{width:'100%', textAlign:'center'}}>{isError}</h1> }
			{isLoading &&  <h1 style={{width:'100%', textAlign:'center'}}>... Loading</h1>}

    </div>
  );
}
