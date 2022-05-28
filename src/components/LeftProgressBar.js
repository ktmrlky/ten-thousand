import React, { useEffect, useState } from "react";
import { Dropdown, DropdownButton, ProgressBar } from "react-bootstrap";
import { useGoalComponent } from "../contexts/GoalContext";

const LeftProgressBar = () => {
  const goals = useGoalComponent()[0];
  const [activeGoal, setActiveGoal] = useState("Select Goal");
  const [now, setNow] = useState(0);

  useEffect(() => {
    if (goals.length > 0) {
      if (activeGoal === "Select Goal") {
        setActiveGoal(goals[0].goal);
        setNow(goals[0].goalProgress);
      } else setNow(goals.find((obj) => obj.goal === activeGoal).goalProgress);
    }
  }, [goals, activeGoal]);

  const progressInstance = (
    <ProgressBar now={now} label={`${now}%`} variant="secondary" animated />
  );

  const handleActiveGoal = (selectedGoal) => {
    const goal = goals.find((goal) => goal.goal === selectedGoal);
    setActiveGoal(goal.goal);
    setNow(goal.goalProgress);
  };

  if (goals.length === 0) {
    return;
  }

  return (
    <>
      <DropdownButton
        drop="end"
        size="sm"
        variant="light"
        title={activeGoal}
        className="mb-2"
      >
        {goals.map((goal, index) => (
          <Dropdown.Item
            eventKey={activeGoal}
            key={index}
            onClick={() => handleActiveGoal(goal.goal)}
          >
            {goal.goal}
          </Dropdown.Item>
        ))}
      </DropdownButton>
      {activeGoal !== "Select Goal" && (
        <>
          <h3>Progress ({now.toFixed(2)})</h3>
          <span className="mt-3">{progressInstance}</span>
        </>
      )}
    </>
  );
};

export default LeftProgressBar;
