import React, { useState, useRef, useEffect } from "react";
import styles from "./cardInnerScreens.module.scss";
import { useAppSelector } from "../../../redux/store";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { motion } from "framer-motion";
import { Carousel } from "antd";
import Slider from "react-slick";

const CardInnerScreens = () => {
  const moviePictures = useAppSelector((state) => state.filmItem.moviePictures);

  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
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
    <div className={styles.wrapper}>
      <Slider {...settings}>
        {moviePictures.map((screenShot, index) => (
          <div key={index} className={styles.card}>
            <img
              className={styles.screenShot}
              src={screenShot.imageUrl}
              alt="ScreenShot"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CardInnerScreens;
