import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Unauthorized = (props) => {
  return (
    <Container fluid>
      <Row className="d-flex w-100">
        <Col className="align-self-center">
          You must login to access this resource
        </Col>
      </Row>
    </Container>
  );
};

export default Unauthorized;
