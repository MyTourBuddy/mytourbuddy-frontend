import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <nav className='h-16 md:h-20'>
      <Link href="/">MyTourBuddy</Link>
    </nav>
  )
}

export default Navbar