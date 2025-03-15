import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import "./CategoryCarousel.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchedQuery } from "../redux/jobSlice";

const categories = [
  "Frontend Developer",
  "Backend Developer",
  "Data Science",
  "Graphic Developer",
  "Fullstack Developer",
];

const CategoryCarousel = () => {
  const dispatch=useDispatch()
  const navigate=useNavigate()
    const searchJobHandler=(query)=>{
      dispatch(setSearchedQuery(query))
      navigate("/browse")
    }
  return (
    <div className="carousel-container">
      <h2 className="carousel-title">Explore Categories</h2>
      <Swiper
        spaceBetween={20}
        slidesPerView={3}
        centeredSlides={true}
        autoplay={{ delay: 2000, disableOnInteraction: false }}
        loop={true}
        modules={[Autoplay]}
        className="carousel"
      >
        {categories.map((category, i) => (
          <SwiperSlide key={i} className="carousel-item" onClick={()=>searchJobHandler(category)}>
            {category}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CategoryCarousel;