//creo un  objeto a partir de un array
export const listToObject = (array)=>{
 let object = {}

  array.forEach(element => {
    const key = element.name 
    const value = element.value
    object[key] = value
  })
  return object
}

export const objectToList = (object)=>{
  let values =Object.entries(object)
  return values.map(element => ({name:element[0], value:element[1]}))
}

export const textToKeywords = ({text,typeSplit = ' '})=>{
  let caractersNotAllowed

  switch (typeSplit) {
    case ',':
      caractersNotAllowed = `!¡?¿|"#$%&/\\()='´+{}[]-_.;:*`
      break;
    case ' ':
      caractersNotAllowed = `!¡?¿|"#$%&/\\()='´+{}[]-_.,;:*`
      break;
    default:
      throw new Error(`${typeSplit} TypeSplit not allow`)
  }

  let listCaractersNotAllowed = caractersNotAllowed.split('')

  listCaractersNotAllowed.forEach(caracter=>{

    if(text.includes(caracter)){
      
      text = text.replace(new RegExp(caracter,'g'),'')
      
    }
  })


  return text.split(typeSplit)
    .map(word => word.trim().toLowerCase())
    .filter(word => word.length > 2)
}

export const concatItems = (name,list)=>{
  return list.map(itemList=> `${name}__${itemList}`)
}

export const newNameList = (name)=>{

  const listName = textToKeywords({text:name})

  if(listName.length > 1){
    listName.push(name.replace(new RegExp(/\s/,'g'),'-'))
  }
  return listName
}

//FIXME arreglar esta función
export const buildKeywords = (keywords = [] ,filtersType)=>{
  let itemsList = [].concat(keywords)
  const filters = {}
  let concatFiltersType = []

  //añade los filtros a la lista //--> all - 'type__unit'
  Object.entries(filtersType).forEach(filter=> {
    filters[filter[0]] = concatItems(filter[0],filter[1])
    itemsList.push(...filters[filter[0]])
  })   
  
  if(filters.prices && filters.ubication){
    filters.prices.forEach(filter => concatFiltersType.push(...concatItems(filter,filters.ubication)))
    itemsList.push(...concatFiltersType)
    
  }
  // // word__type__unit -> all 1 lvl
  if(keywords){
    for (const propety in filters){
      keywords.forEach(word=>itemsList.push(...concatItems(word,(filters[propety]))))
    }
    keywords.forEach( word => itemsList.push(...concatItems(word,concatFiltersType)))
  }
  

  
  return itemsList

}



// const concatItems = (name,list)=>{
//   return list.map(itemList=> `${name}__${itemList}`)
// }

// const test = (lista) =>{

//   const words = []

//   for(let i=0; i<lista.length; i++){

//     const buffer = [...lista]

//     buffer.splice(i,1)

//     words.push(buffer)
//   }
//   console.log(words)
//   return combinarElementos(words)
// }
  
// const combinarElementos = (lista) => {
  
//   let result = []
  
//   for(let i=0; i < lista.length; i++){
//     lista[i].forEach(list => (list.forEach(item=>concatItems(item,)))))
    
//   }
  
//   return result
// }

// console.log(test([[ 'villavo' ],[ 'pepe', 'peperoni' ],[ 1, 2, 3 ]]))



//  Entyr -> [keywords] , { price:['kilogramo'] , other:['xxxxx'] }

  // [...keywords, filter[Object.keys()[0]].map(elemento => Objetc.keys()[0]__elemento)    ]


  // para cada elemento de la lista de filtros -> concatenar cada palabra clave
  
  // x__y

  // x__z

  // x__w


  // para cada elemento de la lista de filtros -> concatenarlos juntos -> 

  // x__y__z__w

  // x__z__w
  
  // x__y__w
  
  // x__y__z


  //para cada elemento de la filtros se concatenan entre ellos

   // y__z__w 

   // z__w

   // y__w

   // y__z