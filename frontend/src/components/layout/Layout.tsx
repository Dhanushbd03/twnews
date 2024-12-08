import React from 'react'
import Header from '@/components/header/Header'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='lg:px-20 px-2'>
      <Header />
      <main>{children}</main>
    </div>
  )
}

export default Layout