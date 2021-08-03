import { textToKeywords } from './conversionFunctions'

export const validationsInForm = (form)=>{
    
  let message = null

  if(form.hasOwnProperty('name') && !isValidInputString(form.name,[8,20])){
    message = 'Nombre invalido [a-zA-z]{8,20}'
  }

  else if( form.hasOwnProperty('email') &&  !isValidInputEmail(form.email)){
    message = 'Por favor ingresa un correo válido'
  }
  
  else if(form.hasOwnProperty('password') && !isValidInputGeneric(form.password,[8,20])){
    message = 'Contraseña invalida {8,20} digitos'
  }

  else if(form.hasOwnProperty('id') && !isValidInputNumber(form.id,[6,12],false)){
    message = 'El número de cédula no es válido'
  }

  else if(form.hasOwnProperty('department') && !isValidInputString(form.department,[4,15])){
    message = 'Nombre de departamento inválido'
  }

  else if(form.hasOwnProperty('city') && !isValidInputString(form.city,[4,15])){
    message = 'Nombre de ciudad inválido'
  }

  else if(form.hasOwnProperty('phoneMain') && !isValidInputNumber(form.id,[10,10],false)){
    message = 'Número de telefono inválido'
  }

  return message
}



export const validationsInFormProducts = (form)=>{

  let message = null

  let listKeywords = textToKeywords({text:form.keywords,typeSplit:','})
  let pricesAreValid = form.prices.every(price=>  price.name !== '' && isValidInputNumber(price.value,[3,10]))
  let keywordsAreValid = listKeywords.every(keyword=> keyword.includes(' ') === false)

  if(form.photos.length < 1){
    message =  'Por favor ingresa imagenes de tu producto'
  }
  else if (!isValidInputString(form.name,[3,15])){
    message =  'Por favor ingresa un nombre válido [a-zA-Z]'
  }

  else if(!isValidInputGeneric(form.description,[15,150])){
    message =  'Descripción inválida, debe contener entre 15 y 150 caracteres'
  }

  //TODO validaciones mejor por palabras

  else if(form.category === ''){
    message =  'Por favor ingrese una categoria'
  }

  else if(!form.keywords.includes(',') || !keywordsAreValid){
    message =  `Por favor ingresa las palabras claves sin espacios y separadas por comas ejemplo: 'huevos, gallinas, campo'`
  }

  else if(listKeywords.length < 2 || listKeywords.length > 10){
    message =  'Por favor, ingresa entre 2 y 10 palabras claves'
  }

  else if(!pricesAreValid){
    message = 'Por favor ingrese una unidad con su respectivo precio válido ejm: Unidad: Libra valor: 22000'
  }


    return message
}


export function validateOnlyLetters (texto){
  const re = new RegExp(/^[a-zA-Z\s]*$/);
  if (re.test(texto)) {
      return true
  } else {
      return false
  }
}


function isValidInputString(text,minMax,required = true){

  //si no es requerido y el texto es vacio devolver valido
  if (!required && text === ''){return true}

  let re = new RegExp(`^[a-zA-Z\\s]{${minMax[0]},${minMax[1]}}$`);

  if(re.test(text)){ return true } else{ return false}

}


function isValidInputGeneric(text,minMax,required = true){

  //si no es requerido y el texto es vacio devolver valido
  if (!required && text === ''){return true}

  let re = new RegExp(`.{${minMax[0]},${minMax[1]}}`);

  if(re.test(text)){ return true } else{ return false}

}


function isValidInputNumber(text,minMax,required = true){

  //si no es requerido y el texto es vacio devolver valido
  if (!required && text === ''){return true}

  let re = new RegExp(`^[0-9]{${minMax[0]},${minMax[1]}}$`);

  if(re.test(text)){ return true } else{ return false}

}


function isValidInputEmail(text){

  let re = new RegExp(/^[\w-\\.]{4,}@([\w-]+\.)+[\w-]{2,4}$/);

  if(re.test(text)){ return true } else{ return false}

}