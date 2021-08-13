import { textToKeywords } from './conversionFunctions'

export const validationsInForm = (form)=>{
    
  let message = null

  if(form.hasOwnProperty('name') && !isValidInputString(form.name,[8,30])){
    message = 'Nombre invalido [a-zA-z]{8,30}'
  }

  else if( form.hasOwnProperty('email') &&  !isValidInputEmail(form.email)){
    message = 'Por favor ingresa un correo válido'
  }
  
  else if(form.hasOwnProperty('password') && !isValidInputGeneric(form.password,[8,25])){
    message = 'Contraseña invalida {8,25} digitos'
  }

  else if(form.hasOwnProperty('newPassword')){

    if( !isValidInputGeneric(form.newPassword,[8,25])){
      message = 'Nueva contraseña invalida {8,25} digitos'
    }

    else if(form.newPassword !== form.verifyNewPassword){
      message = 'Las contraseñas no coinciden'
    }
  }

  else if(form.hasOwnProperty('id') && !isValidInputNumber(form.id,[6,12],false)){
    message = 'El número de cédula no es válido'
  }

  else if(form.hasOwnProperty('department')  && form.department === ''){
    message =  'Por favor seleccione un departamento'
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

  if(form.photos.length < 2 || form.photos.length > 4){
    message =  'Por favor ingresa minimo 2 imagenes, maximo 4'
  }

  else if (!isValidInputString(form.name,[3,25])){
    message =  'Por favor ingresa un nombre válido [a-zA-Z]'
  }

  else if(!isValidInputGeneric(form.description,[15,150])){
    message =  'Descripción inválida, debe contener entre 15 y 150 caracteres'
  }

  else if(!form.keywords.includes(',') || !keywordsAreValid){
    message =  `Por favor ingresa las palabras claves separadas por comas ejemplo: 'huevos, gallinas, campo'`
  }
  
  else if(listKeywords.length < 2 || listKeywords.length > 10){
    message =  'Por favor, ingresa entre 2 y 10 palabras claves'
  }
  

  else if(form.category === ''){
    message =  'Por favor seleccione una categoria'
  }
  
  else if(form.department === ''){
    message =  'Por favor seleccione un departamento'
  }


  else if(!pricesAreValid){
    message = 'Por favor ingrese una unidad con su respectivo precio válido ejm: Unidad: Libra valor: 22000'
  }


    return message
}


export function validateOnlyLetters (texto){
  const re = new RegExp(/^[a-zA-Zñ\s]*$/);
  if (re.test(texto)) {
      return true
  } else {
      return false
  }
}


function isValidInputString(text,minMax,required = true){

  //si no es requerido y el texto es vacio devolver valido
  if (!required && text === ''){return true}

  let re = new RegExp(`^[a-zA-Zñáéíóú\\s]{${minMax[0]},${minMax[1]}}$`);

  if(re.test(text.toLowerCase())){ return true } else{ return false}

}


function isValidInputGeneric(text,minMax,required = true){

  //si no es requerido y el texto es vacio devolver valido
  if (!required && text === ''){return true}

  let re = new RegExp(`.{${minMax[0]},${minMax[1]}}`);

  if(re.test(text)){ return true } else{ return false}

}


function isValidInputNumber(text,minMax,required = true){

  if (!required && text === ''){return true}

  let re = new RegExp(`^[0-9]{${minMax[0]},${minMax[1]}}$`);

  if(re.test(text)){ return true } else{ return false}

}


function isValidInputEmail(text){

  let re = new RegExp(/^[\w-\\.]{4,}@([\w-]+\.)+[\w-]{2,4}$/);

  if(re.test(text)){ return true } else{ return false}

}
