import React from "react";
import { Form } from "react-bootstrap";

const FormComponent = () => {
  return (
    <Form>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Control
          type="text"
          placeholder="Please write your 10.000 hours goal..."
          size="md"
        />
      </Form.Group>
    </Form>
  );
};

export default FormComponent;
