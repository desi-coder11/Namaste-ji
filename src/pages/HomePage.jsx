import React from 'react'
import SideBar from '../Components/SideBar'
import Chat from '../Components/Chat'

const HomePage = () => {
  return (
    <div className='home'>
        <div className="container">
            <SideBar/>
            <Chat/>
        </div>
    </div>
  )
}

export default HomePage