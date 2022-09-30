import React, { useState, useRef, useEffect } from "react";
import styles from "./cardInnerScreens.module.scss";
import { useAppSelector } from "../../../redux/store";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { motion } from "framer-motion";

const CardInnerScreens = () => {
  const { moviePictures } = useAppSelector((state) => state.filmItem);
  const [width, setWidth] = useState(0);
  const carousel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (carousel.current) {
      setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
    }
  }, [carousel.current?.scrollWidth]);
  return (
    <motion.div
      ref={carousel}
      className={styles.carousel}
      whileTap={{ cursor: "grabbing" }}
    >
      <motion.div
        drag="x"
        dragConstraints={{ right: 0, left: -width }}
        className={styles.inner__carousel}
      >
        {moviePictures?.map((element) => {
          return (
            <motion.div key={element.imageUrl} className={styles.item}>
              <img src={element.imageUrl} alt={"MoviePhoto"} />
            </motion.div>
          );
        })}
      </motion.div>
    </motion.div>
  );
};

export default CardInnerScreens;
