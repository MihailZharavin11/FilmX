import React from "react";

type CardInnerListProps = {
  title: string;
  children: JSX.Element;
};
const CardInnerList: React.FC<CardInnerListProps> = ({ title, children }) => {
  return (
    <div className="description__nav">
      <h3>{title}</h3>
      {children}
    </div>
  );
};

export default CardInnerList;
