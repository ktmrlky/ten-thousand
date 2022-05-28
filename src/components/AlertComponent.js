import React from "react";
import { Alert, Fade } from "react-bootstrap";
import {
  useAlertComponent,
  useAlertUpdateContext,
} from "../contexts/AlertContext";

const AlertComponent = () => {
  const config = useAlertComponent();
  const configChange = useAlertUpdateContext();

  if (config.show) {
    return (
      <Alert
        className="alert-generic"
        variant={config.variant}
        onClose={() =>
          configChange((prevState) => ({ ...prevState, show: false }))
        }
        dismissible
        transition={Fade}
      >
        <Alert.Heading>{config.heading}</Alert.Heading>
        <p className="mb-0">{config.content}</p>
      </Alert>
    );
  }
  return null;
};

export default AlertComponent;
