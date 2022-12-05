import { Card } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import "../../../styles/raiting.scss";
import styles from "./filmCard.module.scss";
import { FilmRaiting } from "../FilmRaiting/FilmRaiting";

type FilmCardProps = {
  title: string;
  id: number;
  rating: number | string;
  posterUrlPreview: string;
};

const { Meta } = Card;

const FilmCard: React.FC<FilmCardProps> = ({
  id,
  title,
  rating,
  posterUrlPreview,
}) => {
  return (
    <div className={styles.cardWrapper}>
      <Card
        className={styles.card}
        hoverable
        bordered
        cover={
          <Link to={`/films/${id}`}>
            <img
              className={styles.cardImage}
              alt="example"
              src={posterUrlPreview}
            />
          </Link>
        }
      >
        <Meta title={title} description={<FilmRaiting raiting={rating} />} />
      </Card>
    </div>
  );
};

export default FilmCard;
