import React from 'react'
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'

type Props = {}

const Body = (props: Props) => {
  return (
    <div>
        <Navbar/>
        {/*  any children routes of Body comp. will render over here in Outlet */}
        <Outlet/>
        <Footer />
    </div>
  )
}

export default Body