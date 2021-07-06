import React from 'react';
import { useHistory } from 'react-router-dom';

const Profile = ({children})=>{

  return (
    <div className='c-profile-views'>
      <div className="profile">
        <div className="profile__location">
          {children}
        </div>
      </div>
    </div>
  )
}

export default Profile