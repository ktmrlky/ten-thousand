import React, { useContext, useEffect, useRef, useState } from "react";

const GoalContext = React.createContext();
const GoalUpdateContext = React.createContext();

export function useGoalComponent() {
  return useContext(GoalContext);
}

export function useGoalUpdateComponent() {
  return useContext(GoalUpdateContext);
}

export function GoalProvider(props) {
  const last = useRef(false);
  const [goal, setGoal] = useState({
    goal: "",
    submitted: last.current,
  });

  useEffect(() => {
    const input = JSON.parse(localStorage.getItem("goal"));
    if (input) {
      setGoal(input);
    }
  }, []);

  useEffect(() => {
    if (goal.submitted) {
      localStorage.setItem("goal", JSON.stringify(goal));
    }
    // eslint-disable-next-line
  }, [goal.submitted]);

  const handleGoal = (e) => {
    e.preventDefault();
    setGoal({ ...goal, goal: e.target.value });
  };

  function handleSubmit(e) {
    e.preventDefault();
    setGoal({ ...goal, submitted: true });
  }

  return (
    <GoalContext.Provider value={goal}>
      <GoalUpdateContext.Provider value={[handleGoal, handleSubmit]}>
        {props.children}
      </GoalUpdateContext.Provider>
    </GoalContext.Provider>
  );
}
