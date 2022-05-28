import React, { useContext, useEffect, useState } from "react";
import { VERSION } from "../constants/Version";
import { useGoalUpdateComponent } from "./GoalContext";

const DailyContext = React.createContext();
const DailyUpdateContext = React.createContext();

export function useDailyComponent() {
  return useContext(DailyContext);
}

export function useDailyUpdateComponent() {
  return useContext(DailyUpdateContext);
}

export function DailyProvider(props) {
  const [selectedDate, setSelectedDate] = useState("");
  const [dailyActivities, setDailyActivities] = useState({
    day: "",
    activities: [],
  });

  const handleGoalProgress = useGoalUpdateComponent()[2];

  useEffect(() => {
    const input = JSON.parse(localStorage.getItem("dailyActivities"));
    const version = JSON.parse(localStorage.getItem("version"));
    if (!version) {
      localStorage.setItem("version", JSON.stringify(VERSION));
      localStorage.removeItem("dailyActivities");
      localStorage.removeItem("goal"); // Remove the goal from local storage using in older version
      localStorage.removeItem("goals");
    }
    if (input) {
      const activities = input.find((obj) => obj.day === selectedDate);
      if (activities) {
        setDailyActivities(activities);
      } else {
        setDailyActivities({ day: selectedDate, activities: [] });
      }
    } else {
      localStorage.setItem("dailyActivities", JSON.stringify([]));
    }
  }, [selectedDate]);

  const handleSelectedDate = (day) => {
    setSelectedDate(day);
  };

  const handleActivity = (activity) => {
    setDailyActivities({
      ...dailyActivities,
      activities: [...dailyActivities.activities, activity],
    });

    const input = JSON.parse(localStorage.getItem("dailyActivities"));
    const daily = input.find((obj) => obj.day === selectedDate);
    if (daily) {
      daily.activities.push(activity);
      const final = input.map((obj) => (daily.day === obj.day ? daily : obj));
      localStorage.setItem("dailyActivities", JSON.stringify(final));
    } else {
      const finalDailyActivities = {
        day: selectedDate,
        activities: [activity],
      };
      input.push(finalDailyActivities);
      localStorage.setItem("dailyActivities", JSON.stringify(input));
    }

    //Update goal progress
    handleGoalProgress(activity, "add");
  };

  const handleDelete = (record) => {
    const newRecords = dailyActivities.activities.filter(
      (activity) => activity.id !== record.id
    );
    setDailyActivities({ ...dailyActivities, activities: newRecords });

    const input = JSON.parse(localStorage.getItem("dailyActivities"));
    const daily = input.find((obj) => obj.day === selectedDate);
    if (daily) {
      daily.activities = newRecords;
      const final = input.map((obj) => (daily.day === obj.day ? daily : obj));
      localStorage.setItem("dailyActivities", JSON.stringify(final));
    }

    //Update goal progress
    handleGoalProgress(record, "remove");
  };

  return (
    <DailyContext.Provider value={dailyActivities}>
      <DailyUpdateContext.Provider
        value={[handleSelectedDate, handleActivity, handleDelete]}
      >
        {props.children}
      </DailyUpdateContext.Provider>
    </DailyContext.Provider>
  );
}
