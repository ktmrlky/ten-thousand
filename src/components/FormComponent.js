import React from "react";
import { Form } from "react-bootstrap";

const FormComponent = () => {
  return (
    <Form>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label className="my-3">
          Please write your 10.000 Hours Aim
        </Form.Label>
        <Form.Control
          type="text"
          placeholder="Be an expert on React..."
          size="lg"
        />
      </Form.Group>
    </Form>
  );
};

export default FormComponent;
