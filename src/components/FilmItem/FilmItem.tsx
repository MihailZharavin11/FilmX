import { Card } from 'antd';
import React from 'react';

type FilmItemProps = {
  title: string;
  imDbRating: string;
  image: string;
};

const { Meta } = Card;

const FilmItem: React.FC<FilmItemProps> = ({ title, imDbRating, image }) => {
  return (
    <div className="film__item">
      <Card hoverable bordered style={{ width: 200 }} cover={<img alt="example" src={image} />}>
        <Meta title={title} description={imDbRating} />
      </Card>
    </div>
  );
};

export default FilmItem;
