import React from "react";
import { Button, Form, FormControl, InputGroup } from "react-bootstrap";

const ModalFormComponent = () => {
  return (
    <Form>
      <InputGroup className="mb-3">
        <FormControl
          className="mx-1"
          placeholder="Activity..."
          aria-label="Activity"
          aria-describedby="basic-addon2"
          required
          type="text"
          size="lg"
        />
        <FormControl
          type="time"
          aria-label="Hours"
          aria-describedby="basic-addon2"
          size="lg"
          required
        />
        <Button
          type="submit"
          className="mx-1"
          variant="outline-success"
          id="button-addon2"
          size="lg"
        >
          Add
        </Button>
      </InputGroup>
    </Form>
  );
};

export default ModalFormComponent;
