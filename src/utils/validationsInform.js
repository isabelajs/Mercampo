export const validationsInForm = (form)=>{
    
  let message = null

  if(form.hasOwnProperty('name') && (form.name.length <= 8 || !isNaN(form.name))){
    message =  'Nombre invalido'
  }

  if(form.hasOwnProperty('password') && form.password.length < 8){
    message = 'La contraseña es demasiado corta'
  }

  if(form.hasOwnProperty('id') && form.id.length < 5){
    message = 'El número de cédula no es válido'
  }

  if(form.hasOwnProperty('department') && form.department.length < 3){
    message = 'Nombre de departamento inválido'
  }

  if(form.hasOwnProperty('city') && form.city.length < 4){
    message = 'Nombre de ciudad inválido'
  }

  if( form.hasOwnProperty('email') &&  form.email.length < 10 && !form.email.includes('@')){
    message = 'Por favor ingresa un correo válido'
  }

  if(form.hasOwnProperty('phoneMain') && form.phoneMain.length !== 10){
    message = 'Número de telefono inválido'
  }



  return message
}

export const validationsInFormProducts = (form)=>{
  let message = null
  if(form.hasOwnProperty('name') && (form.name.length < 4 || !isNaN(form.name))){
    message =  'Nombre invalido'
  }
  if(form.hasOwnProperty('description') && (form.description.length <= 8)){
    message =  'Descripción invalida'
  }
  if(form.hasOwnProperty('category') && (form.category === '')){
    message =  'Por favor ingrese una categoria'
  }
  if(form.hasOwnProperty('keywords') && (form.keywords === '')){
    message =  'Por favor ingresa palabras claves'
  }
  if(form.hasOwnProperty('photos') && (form.photos.length < 1)){
    message =  'Por favor ingresa imagenes de tu producto'
  }
  if(form.hasOwnProperty('prices')){
    //estan vacios los valores?
    let validation = form.prices.every(prices=> {
      return (prices.name !== '' && prices.value !== '')
    } )
    
    if(!validation){
      message = 'Por favor ingresa una unidad con su valor correspondiente'
    }

  }

    return message
}
