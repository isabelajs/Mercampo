let prices = [
  { name: "Kilogramo", value: '5000' },
  { name: "Libra", value: '' },
  { name: "Unidad", value: '' },
]

//creo un  objeto a partir de un array
const lista = (prices)=>{
 let pepe = {}

  prices.forEach(element => {
    const key = element.name 
    const value = element.value
    pepe[key] = value
  })
  return pepe
}


let x = lista(prices)


const objectToList = (object)=>{
  let values =Object.entries(object)
  return values.map(element => ({name:element[0], value:element[1]}))
}

console.log(objectToList(x))



//debo crear un array a partir de un objeto