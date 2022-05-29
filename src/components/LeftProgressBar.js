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
    <ProgressBar
      now={now.toFixed(2)}
      label={`${now.toFixed(2)}%`}
      variant="secondary"
      animated
    />
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
        size="lg"
        variant="light"
        title="Progress"
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
          <span className="mt-1">{progressInstance}</span>
          <p>
            {activeGoal.length > 15
              ? activeGoal.slice(0, 15) + "..."
              : activeGoal}{" "}
            {now.toFixed(2)}%
          </p>
        </>
      )}
    </>
  );
};

export default LeftProgressBar;
