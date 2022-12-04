import { Empty } from "antd";
import React from "react";

const EmptyContent = () => {
  return (
    <div className="empty__wrapper">
      <Empty
        style={{
          display: "flex",
          flexDirection: "column",
          height: "calc(100vh - 70px)",
          justifyContent: "center",
          alignItems: "center",
        }}
        imageStyle={{
          height: "200px",
          width: "200px",
        }}
      />
    </div>
  );
};

export default EmptyContent;
