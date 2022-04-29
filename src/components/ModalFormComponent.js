import React from "react";
import { Button, Form, FormControl, InputGroup } from "react-bootstrap";

const ModalFormComponent = ({ handleChange, handleSubmit, activity }) => {
  return (
    <Form onSubmit={handleSubmit}>
      <InputGroup className="mb-3">
        <FormControl
          className="mx-1"
          placeholder="Activity..."
          aria-label="Activity"
          required
          type="text"
          size="lg"
          name="activity"
          value={activity.activity}
          onChange={handleChange}
        />
        <FormControl
          type="number"
          min={0.1}
          step="any"
          max={24} //TODO Here we should make sure that the user can only enter a number between 0 and 24
          aria-label="Hours"
          placeholder="Hours"
          size="lg"
          required
          name="hours"
          value={activity.hours}
          onChange={handleChange}
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
