import React from 'react';
import { motion } from 'framer-motion';
import styles from './contentHome.module.scss';
import { Button } from 'antd';
import { Link } from 'react-router-dom';

const ContentHome: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      transition={{ duration: 1.5 }}
      animate={{ opacity: 1 }}
      className={styles.contentHome}>
      <h1>FilmX</h1>
      <Button className={styles.button} ghost={true} size="large">
        <Link to="/films">Get started!</Link>
      </Button>
    </motion.div>
  );
};

export default ContentHome;
