import React from "react";
import Home from "./home/Home";
import { Navigate, Route, Routes } from "react-router-dom";
import Courses from "./courses/Courses";
import Cart from './components/Cart'
import Signup from "./components/Signup";
import { Toaster } from "react-hot-toast";
import { useCartandAuth } from "./context/AuthProvider";

function App() {
  const {authUser, setAuthUser} = useCartandAuth();
  // console.log(authUser);
  return (
    <>
      <div className="dark:bg-slate-900 dark:text-white">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/course"
            element={authUser ? <Courses /> : <Navigate to="/signup" />}
          />
          <Route path="/signup" element={<Signup />} />
          <Route path='/cart'  element={authUser ? <Cart /> : <Navigate to="/signup" />} />

        </Routes>
        <Toaster />
      </div>
    </>
  );
}

export default App;
