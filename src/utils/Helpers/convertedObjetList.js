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


export const textToList = (queryText)=>{
  let caractersNotAllowed = `!¡?¿|"#$%&/\()='´+{}[]-_.,;:*`
  let listCaractersNotAllowed = caractersNotAllowed.split('')
  let text = queryText

  listCaractersNotAllowed.forEach(caracter=>{
    if(text.includes(caracter)){
      text = text.replace(caracter,'')
    }
  })
  return text.split(' ')
  
}




