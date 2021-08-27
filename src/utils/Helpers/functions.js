
export const waMessage = (number,mensaje) =>{

  const message = `https://wa.me/57${number}?text=${encodeURIComponent(mensaje)}`

  return message
}


