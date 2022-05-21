import React, { useContext, useEffect, useState } from "react";

const VersionContext = React.createContext();

export function useVersionComponent() {
  return useContext(VersionContext);
}

export function VersionProvider(props) {
  const [version, setVersion] = useState("0.0.1");

  useEffect(() => {
    const input = JSON.parse(localStorage.getItem("version"));
    if (input) {
      setVersion(input.version);
    } else {
      localStorage.setItem("version", JSON.stringify(version));
      localStorage.removeItem("dailyActivities");
      localStorage.removeItem("goal");
    }
  }, [version]);

  return (
    <VersionContext.Provider value={[version]}>
      {props.children}
    </VersionContext.Provider>
  );
}
