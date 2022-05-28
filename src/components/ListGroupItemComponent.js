import React from "react";
import { Button, Col, ListGroup, Row } from "react-bootstrap";

const ListGroupItemComponent = ({ record, handleDelete }) => {
  return (
    <ListGroup.Item as="li">
      <Row>
        <Col lg="5" className="my-2">
          <div className="border">
            <p className="m-2">{record.activity}</p>
          </div>
        </Col>
        <Col lg="3" className="my-2 text-center">
          <div className="border">
            <p className="m-2">{record.goal}</p>
          </div>
        </Col>
        <Col lg="3" className="my-2 text-center">
          <div className="border">
            <p className="m-2">{record.hours}</p>
          </div>
        </Col>
        <Col lg="1" className="my-2 d-grid ">
          <Button
            onClick={(e) => handleDelete(record)}
            variant="outline-danger"
          >
            X
          </Button>
        </Col>
      </Row>
    </ListGroup.Item>
  );
};

export default ListGroupItemComponent;
