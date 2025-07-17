import React, { createContext,useContext, useState,useEffect } from 'react';
import { axiosClient2 } from '../api/axios2';

const CartContext  = createContext(null);

const CartProvider = ({ children }) => {
    const [Data ,setData]=useState(0)
    const [count ,setCount]=useState(0)
    const [refresh ,setrefresh]=useState()
    const [checkout,setCheckout]=useState([])
    const [buy,setBuy]=useState([])
    

    useEffect(()=>{
        fetchProducts()
      },[count,refresh])
    
    
    const fetchProducts=async()=>{
      try {
        const response = await axiosClient2.get("/api/cart/count");
        setData(response.data.count)
      } catch (error) {
        if (error.response) {
          console.error('Response Error:', error.response.data);
          setData(0)
          console.error('Status Code:', error.response.status);
          console.error('Headers:', error.response.headers);
      } else if (error.request) {

          console.error('Request Error:', error.request);
      } else {

          console.error('General Error:', error.message);
      }
      }
    }
    

  const contextValues ={
    Data,
    count,
    setCount,
    checkout,
    setCheckout,
    refresh,
    setrefresh,
    buy,
    setBuy

  }
  return (
    <CartContext.Provider value={contextValues}     >
      {children}
    </CartContext.Provider>
  );


};

const useCartContext = () => {
    return useContext(CartContext);
};

export { CartProvider ,useCartContext };
