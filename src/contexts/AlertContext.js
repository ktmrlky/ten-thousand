import React, { useContext, useState } from "react";

const AlertContext = React.createContext();
const AlertUpdateContext = React.createContext();

export function useAlertComponent() {
  return useContext(AlertContext);
}

export function useAlertUpdateContext() {
  return useContext(AlertUpdateContext);
}

export function AlertProvider({ children }) {
  const [alert, setAlert] = useState({
    variant: "primary",
    heading: "Heading",
    content: "test",
    show: false,
  });
  const [alertTime, setAlertTime] = useState(4000);

  function updateAlert(object) {
    setAlert(object);
    setTimeout(function () {
      setAlert((prevState) => ({ ...prevState, show: false }));
    }, alertTime);
  }

  return (
    <AlertContext.Provider value={alert}>
      <AlertUpdateContext.Provider value={updateAlert}>
        {children}
      </AlertUpdateContext.Provider>
    </AlertContext.Provider>
  );
}
