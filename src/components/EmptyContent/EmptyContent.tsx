import { Button, Empty } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

type EmptyContentProps = {
  description: string;
  buttonTitle: string;
  buttonUrl?: string;
};

const EmptyContent: React.FC<EmptyContentProps> = ({
  description,
  buttonTitle,
  buttonUrl,
}) => {
  const navigate = useNavigate();
  return (
    <div className="empty__wrapper">
      <Empty
        style={{
          display: "flex",
          flexDirection: "column",
          height: "calc(100vh - 100px)",
          justifyContent: "center",
          alignItems: "center",
        }}
        imageStyle={{
          height: "200px",
          width: "200px",
        }}
        description={<div>{description}</div>}
      >
        <Button
          onClick={() => {
            buttonUrl ? navigate(buttonUrl) : navigate(-1);
          }}
        >
          {buttonTitle}
        </Button>
      </Empty>
    </div>
  );
};

export default EmptyContent;
