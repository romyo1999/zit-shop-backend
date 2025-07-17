import React from 'react'
import Header2 from './userLayout/header2'
import Footer from './userLayout/footer'

const UserLayout = ({ children }) => {
  return (
    <div className=''>
      <Header2/>

                {children}



    <Footer/> 

    </div>
  )
}

export default UserLayout
