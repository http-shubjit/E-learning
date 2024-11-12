import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  // Authentication state
  const initialAuthUser = localStorage.getItem("Users");
  const [authUser, setAuthUser] = useState(
    initialAuthUser ? JSON.parse(initialAuthUser) : undefined
  );

  // Cart state

   const [book, setBook] = useState([]);
  // const [loadingBooks, setLoadingBooks] = useState(true); // Loading state for books

   const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    setCart((prev) => [...prev, item]);
  };

  // // Function to remove items from the cart
  // const removeFromCart = () => {
  //   setCartItem((prevCount) => (prevCount > 0 ? prevCount - 1 : 0));
  // };

  // // Function to calculate total cart amount
  // const getTotalCartAmount = () => {
  //   const itemPrice = 10; // Assuming each item costs $10
  //   return cartitem * itemPrice;
  // };

  // Fetch book data from the API
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
