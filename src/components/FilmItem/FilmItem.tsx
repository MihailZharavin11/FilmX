import { Card } from 'antd';
import React from 'react';

type FilmItemProps = {
  title: string;
  rating: string;
  posterUrlPreview: string;
};

const { Meta } = Card;

const FilmItem: React.FC<FilmItemProps> = ({ title, rating, posterUrlPreview }) => {
  return (
    <div className="film__item">
      <Card
        hoverable
        bordered
        style={{ width: 180 }}
        cover={<img alt="example" src={posterUrlPreview} />}>
        <Meta title={title} description={rating} />
      </Card>
    </div>
  );
};

export default FilmItem;
