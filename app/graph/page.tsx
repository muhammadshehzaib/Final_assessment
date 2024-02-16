import SalesChart2 from "@/components/SalesChart2";
import React from "react";
import { Col, Row } from "reactstrap";

const page = () => {
  return (
    <Row className="flex justify-center mt-28">
      <Col sm="12" lg="6" xl="7" xxl="8">
        <SalesChart2 />
      </Col>
    </Row>
  );
};

export default page;
