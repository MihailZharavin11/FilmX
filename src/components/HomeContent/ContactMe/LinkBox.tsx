import React from "react";
import { Link } from "react-router-dom";
import styles from "./contactMe.module.scss";
import { RightCircleFilled } from "@ant-design/icons";
import { motion } from "framer-motion";

type LinkBoxProps = {
  linkName: string;
  src: string;
};

export const LinkBox: React.FC<LinkBoxProps> = ({ linkName, src }) => {
  return (
    <div className={styles.linkWrapper}>
      <div className="linkName">{linkName}</div>
      <motion.div
        onClick={() => window.open(src)}
        whileHover={{ scale: 1.3 }}
        className={styles.link}
      >
        <RightCircleFilled className={styles.linkIcon} />
      </motion.div>
    </div>
  );
};
