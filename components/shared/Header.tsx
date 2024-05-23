import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'
import NavItems from './NavItems'
import MobileNav from './MobileNav'

export const Header = () => {
  return (
    <header className='w-full border-b'>
        <div className='wrapper flex items-center justify-between h-auto'>
            <Link href="/" className=''>
                <Image src="/assets/images/logowithstar.svg" width={138} height={38}
                alt="EventsLink logo" />
            </Link>

              <SignedIn>
                <nav className='md:flex-between hidden w-full max-w-xs'>
                  <NavItems />
                </nav>
              </SignedIn>

            <div className='flex w-32 justify-end gap-3'>
              <SignedIn>
                <UserButton afterSignOutUrl='/'/>
                <MobileNav/>
              </SignedIn>
              <SignedOut>
                <Button asChild className='rounded-full' size="lg">
                    <Link href="/sign-in">
                        Login
                    </Link>
                </Button>
              </SignedOut>
            </div>
            
        </div>
    </header>
  )
}
