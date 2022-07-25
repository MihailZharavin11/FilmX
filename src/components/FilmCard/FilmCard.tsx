import { Card } from "antd";
import React from "react";
import { Link } from "react-router-dom";

type FilmItemProps = {
  title: string;
  id: number;
  rating: string | number;
  posterUrlPreview: string;
};

const { Meta } = Card;

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
        style={{ width: 180, height: 360 }}
        cover={
          <Link to={`${id}`}>
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
        <Meta title={title} description={rating} />
      </Card>
    </div>
  );
};

export default FilmItem;
