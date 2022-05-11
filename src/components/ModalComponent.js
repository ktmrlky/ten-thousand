import React, { useState } from "react";
import {
  Button,
  Col,
  ListGroup,
  ListGroupItem,
  Modal,
  Row,
} from "react-bootstrap";
import ListGroupItemComponent from "./ListGroupItemComponent";
import ModalFormComponent from "./ModalFormComponent";
import { v4 as uuidv4 } from "uuid";
import {
  useDailyComponent,
  useDailyUpdateComponent,
} from "../contexts/DailyActivityContext";

const ModalComponent = (props) => {
  const [activity, setActivity] = useState({
    id: uuidv4(),
    activity: "",
    goal: "",
    hours: 0,
  });
  const records = useDailyComponent().activities;
  const handleRecord = useDailyUpdateComponent()[1];
  const handleDelete = useDailyUpdateComponent()[2];

  const handleChange = (event) => {
    setActivity({ ...activity, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleRecord(activity);
    setActivity({ id: uuidv4(), activity: "", goal: "", hours: 0 });
  };

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
        <ModalFormComponent
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          activity={activity}
        />
        {records.length > 0 && (
          <>
            <hr className="my-4" />
            <h5>Records</h5>
            <ListGroup variant="flush">
              <ListGroupItem className="d-none d-lg-block">
                <Row>
                  <Col lg="5">
                    <p className="fw-bold">Activity</p>
                  </Col>
                  <Col lg="3" className="text-center">
                    <p className="fw-bold">Goal</p>
                  </Col>
                  <Col lg="3" className="text-center">
                    <p className="fw-bold">Study Hours</p>
                  </Col>
                </Row>
              </ListGroupItem>

              {records.map((record, index) => (
                <ListGroupItemComponent
                  key={index}
                  record={record}
                  handleDelete={handleDelete}
                  index={index}
                />
              ))}
            </ListGroup>
          </>
        )}
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
