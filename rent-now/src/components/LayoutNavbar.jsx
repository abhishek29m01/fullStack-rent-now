import React from 'react'
import Navbar from './Navbar'
import Menubar from './Menubar'

const LayoutNavbar = ({Children}) => {
  return (
    <>
    <Navbar/>
    <Menubar/>
    <main>{Children}</main>
    </>
  )
}

export default LayoutNavbar
