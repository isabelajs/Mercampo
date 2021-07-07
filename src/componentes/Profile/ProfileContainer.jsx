import React from 'react';
import Location from './Location'
import '../../assets/styles/componentes/Profile/ProfileContainer.scss'

const Profile = ({children,links})=>{

  return (
    <div className='c-profile-views'>
      <div className="profile">
        <Location links={links}/>
        {children}
      </div>
    </div>
  )
}

export default Profile