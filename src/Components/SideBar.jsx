import React from 'react'
import NavBar from '../Components/NavBar'
import Search from '../Components/Search'
import Chats from '../Components/Chats'

const SideBar = () => {
  return (
    <div className='sidebar'>
        <NavBar/>
        <Search/>
        <Chats/>
    </div>
  )
}

export default SideBar