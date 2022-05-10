import React, { useContext, useEffect, useState } from "react";

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

  useEffect(() => {
    const input = JSON.parse(localStorage.getItem("dailyActivities"));
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
  };

  return (
    <DailyContext.Provider value={dailyActivities}>
      <DailyUpdateContext.Provider value={[handleSelectedDate, handleActivity]}>
        {props.children}
      </DailyUpdateContext.Provider>
    </DailyContext.Provider>
  );
}
