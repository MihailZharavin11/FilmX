import { Card } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import { StarTwoTone } from "@ant-design/icons";
import "../../../styles/raiting.scss";
import styles from "./filmCard.module.scss";
import { setClassForRaiting } from "../../../lib/raitingFunc";

type FilmCardProps = {
  title: string;
  id: number;
  rating: string | number;
  posterUrlPreview: string;
};

type RaitingComponentsProps = {
  raiting: string | number;
};

const { Meta } = Card;

const RaitingComponents: React.FC<RaitingComponentsProps> = ({ raiting }) => {
  return (
    <>
      <span className={setClassForRaiting(Number(raiting))}>{raiting}</span>{" "}
      <StarTwoTone twoToneColor="#ffd900" />
    </>
  );
};

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
        bodyStyle={{
          width: "100%",
        }}
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
        <Meta
          title={title}
          description={<RaitingComponents raiting={rating} />}
        />
      </Card>
    </div>
  );
};

export default FilmCard;
