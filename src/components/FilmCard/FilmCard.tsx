import { Card } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import { StarTwoTone } from "@ant-design/icons";

type FilmItemProps = {
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
      {raiting} <StarTwoTone twoToneColor="#ffd900" />
    </>
  );
};

const FilmItem: React.FC<FilmItemProps> = ({
  id,
  title,
  rating,
  posterUrlPreview,
}) => {
  return (
    <div className="film__item">
      <Card
        hoverable
        bordered
        style={{ maxWidth: "185px", height: 360, overflow: "hidden" }}
        cover={
          <Link to={`/films/${id}`}>
            <img
              style={{
                height: "270px",
              }}
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

export default FilmItem;
