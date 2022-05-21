import React, { useContext, useEffect, useState } from "react";

const GoalContext = React.createContext();
const GoalUpdateContext = React.createContext();

export function useGoalComponent() {
  return useContext(GoalContext);
}

export function useGoalUpdateComponent() {
  return useContext(GoalUpdateContext);
}

export function GoalProvider(props) {
  const [control, setControl] = useState(false);
  const [goalHelper, setGoalHelper] = useState("");
  const [goal, setGoal] = useState({
    goals: [],
  });

  useEffect(() => {
    const input = JSON.parse(localStorage.getItem("goal"));
    if (input) {
      setGoal({ goals: input.goals });
      setControl(false);
    } else {
      localStorage.setItem("goal", JSON.stringify(goal));
    }

    // eslint-disable-next-line
  }, [control]);

  const handleGoal = (e) => {
    e.preventDefault();
    setGoalHelper(e.target.value);
  };

  function handleSubmit(e) {
    e.preventDefault();
    const goals = JSON.parse(localStorage.getItem("goal"));
    if (goalHelper !== "") {
      goals.goals.push(goalHelper);
      localStorage.setItem("goal", JSON.stringify(goals));
      setGoal({ goals: goals });
      setControl(true);
    }
    setGoalHelper("");
  }

  return (
    <GoalContext.Provider value={[goal, goalHelper]}>
      <GoalUpdateContext.Provider value={[handleGoal, handleSubmit]}>
        {props.children}
      </GoalUpdateContext.Provider>
    </GoalContext.Provider>
  );
}
