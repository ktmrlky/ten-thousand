import React, { useContext, useEffect, useState } from "react";
import { useAlertUpdateContext } from "./AlertContext";
import { DANGER_ALERT, SUCCESS_ALERT } from "../constants/AlertConstants";

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
  const [goalHelper, setGoalHelper] = useState({
    goal: "",
    goalProgress: 0,
  });
  const [goal, setGoal] = useState([]);
  const setAlert = useAlertUpdateContext();

  useEffect(() => {
    const input = JSON.parse(localStorage.getItem("goals"));
    if (input) {
      setGoal(input);
      setControl(false);
    } else {
      localStorage.setItem("goals", JSON.stringify(goal));
    }

    // eslint-disable-next-line
  }, [control]);

  const handleGoal = (e) => {
    e.preventDefault();
    setGoalHelper({ ...goalHelper, goal: e.target.value });
  };

  function handleSubmit(e) {
    e.preventDefault();
    const goals = JSON.parse(localStorage.getItem("goals"));
    if (goalHelper.goal !== "") {
      if (goals.find((obj) => obj.goal === goalHelper.goal)) {
        return setAlert(DANGER_ALERT("Failed", "Goal already exists"));
      }
      goals.push(goalHelper);
      localStorage.setItem("goals", JSON.stringify(goals));
      setGoal(goals);
      setControl(true);
      setAlert(SUCCESS_ALERT("Success", "Goal added"));
    }
    setGoalHelper({
      goal: "",
      goalProgress: 0,
    });
  }

  function handleGoalProgress(activity, type) {
    const goals = JSON.parse(localStorage.getItem("goals"));
    const goal = goals.find((obj) => obj.goal === activity.goal);
    if (goal) {
      const activityRatio = (parseFloat(activity.hours) / 10000) * 100;
      console.log(activityRatio);
      if (type === "add") {
        if (goal.goalProgress === 0) {
          goal.goalProgress = activityRatio;
        } else {
          goal.goalProgress += activityRatio;
        }
      }
      if (type === "remove") {
        goal.goalProgress -= activityRatio;
      }
      const finalGoals = goals.map((obj) =>
        goal.goal === obj.goal ? goal : obj
      );
      localStorage.setItem("goals", JSON.stringify(finalGoals));
    }
    setControl(true);
  }

  return (
    <GoalContext.Provider value={[goal, goalHelper.goal]}>
      <GoalUpdateContext.Provider
        value={[handleGoal, handleSubmit, handleGoalProgress]}
      >
        {props.children}
      </GoalUpdateContext.Provider>
    </GoalContext.Provider>
  );
}
