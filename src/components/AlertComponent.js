import React from "react";
import { Toast, ToastContainer } from "react-bootstrap";
import {
  useAlertComponent,
  useAlertUpdateContext,
} from "../contexts/AlertContext";

const AlertComponent = () => {
  const config = useAlertComponent();
  const configChange = useAlertUpdateContext();

  if (config.show) {
    return (
      <ToastContainer position="top-end" className="p-3">
        <Toast
          onClose={() =>
            configChange((prevState) => ({ ...prevState, show: false }))
          }
        >
          <Toast.Header>
            <strong className="me-auto">{config.heading}</strong>
          </Toast.Header>
          <Toast.Body>{config.content}</Toast.Body>
        </Toast>
      </ToastContainer>
    );
  }
  return null;
};

export default AlertComponent;
