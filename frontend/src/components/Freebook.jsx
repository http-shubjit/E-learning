import React, { useEffect, useState } from "react";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";


import Cards from "./Cards";
import { useCartandAuth } from "../context/AuthProvider";
function Freebook() {
  const {book} = useCartandAuth();
   

//  console.log(book)

  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div  className=" max-w-screen-2xl container mx-auto md:px-20 px-4">
        
      {book.length > 0 ? 
        
        <>
        <div>
          <h1 className="font-semibold text-xl pb-2">Free Offered Courses</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Accusantium veritatis alias pariatur ad dolor repudiandae eligendi
            corporis nulla non suscipit, iure neque earum?
          </p>
        </div>

        <div>
          <Slider {...settings}>
            {book.map((item) => (
              <Cards item={item} key={item._id} />
            ))}
          </Slider>
        </div>
        </>
      :
        <>
    <div className="flex w-9- flex-row gap-4">
        <div className="skeleton h-70 w-full"></div>
      <div className="skeleton h-40 w-full"></div>
  <div className="skeleton h-40 w-full"></div>


  

        </div>
      </>}
     
    </div>
  );
}
export default Freebook;
