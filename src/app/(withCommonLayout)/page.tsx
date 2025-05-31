import Footer from '@/components/shared/Footer'
import Navbar from '@/components/shared/Navbar'
import React from 'react'

const page = () => {
  return (
    <>
      <Navbar/>
      <main className='min-h-screen text-center'>
        this is main page
      </main>
      <Footer/>
    </>
  )
}

export default page