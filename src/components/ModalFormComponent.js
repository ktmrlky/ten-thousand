import React from "react";
import {
  Alert,
  Button,
  Col,
  FloatingLabel,
  Form,
  FormControl,
  InputGroup,
  Row,
} from "react-bootstrap";
import { useGoalComponent } from "../contexts/GoalContext";

const ModalFormComponent = ({ handleChange, handleSubmit, activity }) => {
  const goal = useGoalComponent()[0];

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <InputGroup className="mb-3">
          <Row>
            <Col lg={5} className="my-2">
              <FloatingLabel controlId="floatingTextarea" label="Activity">
                <FormControl
                  placeholder="Please write your activity..."
                  required
                  as="textarea"
                  name="activity"
                  value={activity.activity}
                  onChange={handleChange}
                  maxLength="50"
                />
              </FloatingLabel>
            </Col>
            <Col lg={3} className="my-2">
              <FloatingLabel controlId="floatingSelect" label="Goal">
                <Form.Select
                  value={activity.goal}
                  onChange={handleChange}
                  name="goal"
                  required
                >
                  <option disabled defaultValue="" value="">
                    Select Goal
                  </option>
                  {goal.goals.map((goal, index) => (
                    <option key={index} value={goal}>
                      {goal}
                    </option>
                  ))}
                </Form.Select>
              </FloatingLabel>
            </Col>
            <Col lg={3} className="my-2">
              <FloatingLabel controlId="floatingSelect" label="Study Hours">
                <FormControl
                  type="number"
                  min={0.1}
                  step="any"
                  max={24} //TODO Here we should make sure that the user can only enter a number between 0 and 24
                  aria-label="Hours"
                  placeholder="Hours"
                  required
                  name="hours"
                  value={activity.hours}
                  onChange={handleChange}
                />
              </FloatingLabel>
            </Col>
            <Col lg={1} className="my-2 d-grid">
              <Button
                type="submit"
                variant="outline-success"
                id="button-addon2"
                size="lg"
              >
                Add
              </Button>
            </Col>
          </Row>
        </InputGroup>
      </Form>
      {goal.goals.length === 0 && (
        <Alert variant="danger">
          Please, set a target in <strong>main page</strong> to add activities.
        </Alert>
      )}
    </>
  );
};

export default ModalFormComponent;
