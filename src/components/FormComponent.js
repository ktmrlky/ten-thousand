import React, { useEffect, useRef, useState } from "react";
import { Form } from "react-bootstrap";

const FormComponent = () => {
  const last = useRef(false);
  const [aim, setAim] = useState({
    aim: "",
    submitted: last.current,
  });

  useEffect(() => {
    const input = JSON.parse(localStorage.getItem("aim"));
    if (input) {
      setAim(input);
    }
  }, []);

  useEffect(() => {
    if (aim.submitted) {
      localStorage.setItem("aim", JSON.stringify(aim));
    }
    // eslint-disable-next-line
  }, [aim.submitted]);

  const handleAim = (e) => {
    e.preventDefault();
    setAim({ ...aim, aim: e.target.value });
  };

  function handleSubmit(e) {
    e.preventDefault();
    setAim({ ...aim, submitted: true });
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Control
          type="text"
          placeholder="Please write your 10.000 hours goal..."
          size="md"
          onChange={(e) => handleAim(e)}
          value={aim.aim}
          disabled={aim.submitted === false ? false : true}
        />
      </Form.Group>
    </Form>
  );
};

export default FormComponent;
