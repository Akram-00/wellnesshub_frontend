import React from 'react'
import './Navbar.css'
import Logo from '@/assets/logo.png'
import { IoIosBody } from 'react-icons/io'
import Image from 'next/image'
import Link from 'next/link'

const Navbar = () => {
  return (
    <nav>
      <Image src={Logo} alt="logo"/>
      <Link href = '/'>Home</Link>
      <Link href = '/about'>About</Link>
      <Link href = '/profile'><IoIosBody/></Link>
      <button>Sign Out</button>
    </nav>
  )
}

export default Navbar