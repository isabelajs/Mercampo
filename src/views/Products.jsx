import React from "react";
import { useState } from "react";
import { useEffect } from "react";

//estilos
import "../assets/styles/componentes/Products.scss";
import CardProduct from "../componentes/cardProduct";
import { getAllProducts } from "../utils/dataBase";

export default function Products() {

	const [listProducts, setListProducts] = useState([])
	const [isLoading, setIsLoading] = useState(false)
	const [isError,setIsError] = useState(null)

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


  return (
    <div className=" l-products">
        {/* <div className="c-products__tools">
        <div className="products__tools">
            <div className="home__search search">

            </div>
            <div className="home__filter">

            </div>
        </div>
        <div className="products__categories">
            <div className="previous"></div>
            <div className="categories__title"></div>
            <div className="next"></div>
        </div>
    </div> */}
		{isError && <h1 style={{width:'100%', textAlign:'center'}}>{isError}</h1> }
		{isLoading &&  <h1 style={{width:'100%', textAlign:'center'}}>...Loading</h1>}

		<div className="c-products__products">

			{
				listProducts.map((product,index)=> <CardProduct key={`${product.userId}${index}`} {...product}/>)
			}

			</div>
    </div>
  );
}
