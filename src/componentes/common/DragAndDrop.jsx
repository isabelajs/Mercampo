import React, { useEffect, useState } from 'react';

import '@styles/generales/DragAndDrop.scss'

export default function DragAndDrop(props) {

  const [photos,setPhotos] = useState()

  useEffect(()=>{
    if(props.isOpen){
      document.body.style.overflow = 'hidden'
    }

    return () => document.body.style.overflow = null

  },[props.isOpen])
  

  return (
    <div className='dragAndDrop'>
      <div className='dragAndDrop__container'>
        <div>
          <input type="file" accept='image/png, image/jpeg, image/jpg' name='file' multiple onChange/>
        </div>
        <div>
          <img src="" alt="" />
        </div>
      </div>
    </div>
  );
};
