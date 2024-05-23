import Image from 'next/image'
import Link from 'next/link'
import React from 'react'


const getYear = () => {
  let date = new Date();
  return date.getFullYear();
}

const Footer = () => {
  return (
    <footer className='border-t'>
      <div className='flex-center wrapper flex-between flex flex-col gap-4 text-center sm:flex-row'>
        <Link href="/">
          <Image 
          src="/assets/images/logowithstar.svg"
          alt='logo'
          width={90}
          height={38}
          />
        </Link>
        <p className='font-thin text-sm'>{getYear()} EventsLink. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer