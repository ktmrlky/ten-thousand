import React from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import {
  useGoalComponent,
  useGoalUpdateComponent,
} from "../contexts/GoalContext";

const FormComponent = () => {
  const aim = useGoalComponent()[1];
  const handleGoal = useGoalUpdateComponent()[0];
  const handleSubmit = useGoalUpdateComponent()[1];

  return (
    <Form onSubmit={handleSubmit}>
      <InputGroup className="mb-3">
        <Form.Control
          type="text"
          placeholder="Please write your 10.000 hours goal..."
          size="md"
          onChange={(e) => handleGoal(e)}
          value={aim}
          aria-describedby="basic-addon2"
          required
        />
        <Button variant="outline-secondary" id="button-addon2" type="submit">
          Set
        </Button>
      </InputGroup>
    </Form>
  );
};

export default FormComponent;
