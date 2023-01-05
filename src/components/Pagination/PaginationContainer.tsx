import { Col, Pagination, PaginationProps, Row } from "antd";
import React, { useState } from "react";
import styles from "./pagination.module.scss";

type PaginationContainerProps = {
  defaultPageSize: number;
  total: number;
  currentPage: number;
  onChangePage: (pageNumber: number, pageSize: number) => void;
};

export const PaginationContainer: React.FC<PaginationContainerProps> = ({
  defaultPageSize,
  total,
  currentPage,
  onChangePage,
}) => {
  return (
    <Row className={styles.pagination_row}>
      <Col>
        <Pagination
          simple
          defaultPageSize={defaultPageSize}
          current={currentPage}
          onChange={onChangePage}
          total={total}
        />
      </Col>
    </Row>
  );
};
