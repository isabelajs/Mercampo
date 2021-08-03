import react, {memo} from 'react'


const ProductPhoto = memo(({src,alt,removePhoto}) => {

  const handleClick = () => removePhoto(src)
  
  return (
    <div className="editProduct__photo">
      <img src={src} alt={alt} />
      <span onClick={handleClick}>x</span>
    </div>)

})


export default ProductPhoto