//creo un  objeto a partir de un array
const listToObject = (array)=>{
 let object = {}

  array.forEach(element => {
    const key = element.name 
    const value = element.value
    object[key] = value
  })
  return object
}

const objectToList = (object)=>{
  let values =Object.entries(object)
  return values.map(element => ({name:element[0], value:element[1]}))
}

export {listToObject, objectToList}

