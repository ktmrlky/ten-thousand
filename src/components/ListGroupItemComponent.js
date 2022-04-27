import React from "react";
import { Button, ListGroup } from "react-bootstrap";

const ListGroupItemComponent = () => {
  return (
    <ListGroup.Item
      as="li"
      className="d-flex justify-content-between align-items-start"
    >
      <div className="ms-2 me-auto">
        <div className="fw-bold">Test</div>
        Cras justo odio
      </div>
      <Button variant="outline-danger">X</Button>
    </ListGroup.Item>
  );
};

export default ListGroupItemComponent;
