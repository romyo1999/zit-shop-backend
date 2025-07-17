import React, { createContext,useContext, useState,useEffect } from 'react';
import { axiosClient2 } from '../api/axios2';

const FavoritContext  = createContext(null);

const FavoritProvider = ({ children }) => {
    const [Data ,setData]=useState([])
    const [count ,setCount]=useState(0)
    

    useEffect(()=>{
        fetchProducts()
      },[count])
    
    
    const fetchProducts=async()=>{
      const response = await axiosClient2.get("api/favorites");
      setData(response.data.favorites)
    }
    

  const contextValues ={
    Data,
    count,
    setCount
  }
  return (
    <FavoritContext.Provider value={contextValues}     >
      {children}
    </FavoritContext.Provider>
  );


};

const useFavoritContext = () => {
    return useContext(FavoritContext);
};

export { FavoritProvider ,useFavoritContext };
