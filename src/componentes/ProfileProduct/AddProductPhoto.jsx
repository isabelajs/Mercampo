import React,{memo} from 'react'

const AddProductPhoto = memo(({addPhoto}) =>{

  return(
    <label className="editProduct__addPhoto" name='file'>
      <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect y="20.1923" width="6.73077" height="35" rx="3.36538" transform="rotate(-90 0 20.1923)" fill="#2EC4B6"/>
        <rect x="14.8076" width="6.73077" height="35" rx="3.36538" fill="#2EC4B6"/>
      </svg>
      <input type="file" accept='image/png, image/jpeg, image/jpg' name='file' onChange={addPhoto}/>
    </label>
  
  )
})

export default AddProductPhoto