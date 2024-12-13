import React, { ReactComponentElement, useEffect, useState } from 'react'
import Header from '@/components/header/Header'
import Sidebar from '@/components/header/Sidebar'
type Props = {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="lg:px-20 px-2">
      <Header setIsOpen={setIsOpen} />
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      <main>{children}</main>
    </div>
  )
}

export default Layout