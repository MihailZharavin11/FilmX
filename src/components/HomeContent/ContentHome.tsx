import React from "react";
import { motion } from "framer-motion";
import styles from "./contentHome.module.scss";
import { Button } from "antd";
import { Link } from "react-router-dom";

const ContentHome: React.FC = () => {
  const animate = {
    opacity: 1,
    left: "50%",
    top: "50%",
    transform: "translate(-50%,-50%)",
  };

  return (
    <div className={styles.home__wrapper}>
      <section className={styles.first__screen}>
        <motion.div
          initial={{ opacity: 0, position: "absolute", left: 0, top: "38%" }}
          transition={{ duration: 1.5 }}
          animate={animate}
          className={styles.contentHome}
        >
          <h1>FilmX</h1>
          <Button className={styles.button} ghost={true} size="large">
            <Link to="/films">Get started!</Link>
          </Button>
        </motion.div>
      </section>
      <section className={styles.second_screen}></section>
    </div>
  );
};

export default ContentHome;
