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
//crea una lista a partir de un objeto
export const objectToList = (object)=>{
  let values =Object.entries(object)
  return values.map(element => ({name:element[0], value:element[1]}))
}
//reemplaza caracteres especiales y hace un split segun se necesite, returna una lista
export const textToKeywords = ({text,typeSplit = ' '})=>{

  text = replaceVowelsTick(text)

  switch (typeSplit) {
    case ',':
      text = text.replace(/([^,a-zñ\s])/gi,'')
      break;
    case ' ':
      text = text.replace(/([^a-zñ\s])/gi,'')
      break;
    default:
      throw new Error(`${typeSplit} TypeSplit not allow`)
  }

  return text.split(typeSplit)
    .map(word => word.trim())
    .filter(word => word.length > 2)
}

//reemplaza las vocales con tildes, por elementos sin ellos
export const replaceVowelsTick = (text)=>{
  text = text.toLowerCase()
  const vowelsDict = {á:'a',é:'e',í:'i',ó:'o',ú:'u'}

  'áéíóú'.split('').forEach(caracter=>{
    
    if(vowelsDict[caracter]){
      
      text = text.replace(new RegExp(caracter,'g'),vowelsDict[caracter])
      
    }
    
  })

  return text

}
//concatena un nombre con una lista
export const concatItems = (name,list)=>{
  return list.map(itemList=> `${name}__${itemList}`)
}

//concatena una frase de dos palabras en una ejm: isabela, jimenez, isabela-jimenez
export const newNameList = (name)=>{

  const listName = textToKeywords({text:name})

  if(listName.length > 1){
    listName.push(name.replace(new RegExp(/\s/,'g'),'-').toLowerCase())
  }
  return listName
}

//FIXME arreglar esta función
//construte las palabras claves
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