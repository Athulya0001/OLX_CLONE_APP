import React from 'react'
import Profile from '../../assets/profile-logo.png'

const UserProfile = () => {
  return (
    <div>
      <div>
        <img className='h-10 w-10' src={Profile} alt="Profile Image" />
      </div>
    </div>
  )
}

export default UserProfile
