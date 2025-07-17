import React, { useContext } from 'react';
import { useUserContext } from '../providers/UserProvider';
import { useCartContext } from '../providers/CartProvider';
const Test = () => {

const {user}=useUserContext()

console.log(user.length,"ddd")
  return (
    <div>
      {
        user.length>0?(
          <div>you are loged in baby</div>
        ):(
          <div>please Loagin</div>
        )
      }
    </div>
  )
}

export default Test
