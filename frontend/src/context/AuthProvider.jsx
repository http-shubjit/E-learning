import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const initialAuthUser = localStorage.getItem("Users");
  const [authUser, setAuthUser] = useState(
    initialAuthUser ? JSON.parse(initialAuthUser) : undefined
  );

  // Cart state

   const [book, setBook] = useState([]);

   const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    setCart((prev) => [...prev, item]);
  };

 
  useEffect(() => {
    const getBook = async () => {
      try {
        const res = await axios.get("http://localhost:4001/book");

        const data = res.data.filter((book) => book.category.length > 1);;
        // console.log(data);
        setBook(data);
      } catch (error) {
        console.log(error);
      }
    };
    getBook();
  }, []);

  return (
    <AuthContext.Provider value={{authUser, setAuthUser,book,addToCart,cart}}>
        {children}
    </AuthContext.Provider>
  );
}

// Custom hooks for using Auth and Buy contexts
export const useCartandAuth = () => useContext(AuthContext);
