import React from "react";
import { Button, ListGroup, Modal } from "react-bootstrap";
import ListGroupItemComponent from "./ListGroupItemComponent";
import ModalFormComponent from "./ModalFormComponent";

const ModalComponent = (props) => {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      scrollable
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.day}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Daily Activities</h4>
        <p>You can add your daily activities below. </p>
        <ModalFormComponent />
        <hr className="my-4" />
        <h5>Records</h5>
        <ListGroup>
          <ListGroupItemComponent />
          <ListGroupItemComponent />
          <ListGroupItemComponent />
          <ListGroupItemComponent />
          <ListGroupItemComponent />
          <ListGroupItemComponent />
          <ListGroupItemComponent />
          <ListGroupItemComponent />
        </ListGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-secondary" onClick={props.onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalComponent;
