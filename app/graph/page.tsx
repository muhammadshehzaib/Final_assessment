import SalesChart2 from "@/components/SalesChart2";
import React from "react";
import { Col, Row } from "reactstrap";

const page = () => {
  return (
    <Row className="flex justify-center mt-28 ml-6">
      <Col sm="12" lg="12" xl="12" xxl="12">
        <SalesChart2 />
      </Col>
    </Row>
  );
};

export default page;
