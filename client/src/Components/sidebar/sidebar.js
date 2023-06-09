import React, { useState } from 'react'
import './sidebar.css'
import {AiOutlineMenu, AiOutlineClose} from 'react-icons/ai'

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false)
    const navitems = [
        {
          title: 'Home',
          href: '/',
        },
        {
          title: 'Detail',
          href: '/',
        }
      ]
  const handleOpen = () => {
    setIsOpen(!isOpen)
  }
  return (
    <div className='sidebar'>
      {isOpen?
      <div>
        <button onClick={handleOpen}><AiOutlineClose/></button>
        <ul className='menuList'>
          {navitems.map((item, index)=><li key={index}>{item.title}</li>)}
        </ul>
      </div>
      :
      <button onClick={handleOpen}>
        <AiOutlineMenu/>
      </button>
      }
    </div>
  )
}

export default Sidebar