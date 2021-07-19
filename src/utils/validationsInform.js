const validationsInForm = (form)=>{
    
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


export default validationsInForm