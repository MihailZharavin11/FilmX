import React from "react";
import { Link } from "react-router-dom";
import styles from "./contactMe.module.scss";
import { RightCircleFilled } from "@ant-design/icons";

type LinkBoxProps = {
  linkName: string;
  src: string;
};

export const LinkBox: React.FC<LinkBoxProps> = ({ linkName, src }) => {
  return (
    <div className={styles.linkWrapper}>
      <div className="linkName">{linkName}</div>
      <div className={styles.link}>
        <Link to={src}>
          <RightCircleFilled />
        </Link>
      </div>
    </div>
  );
};
