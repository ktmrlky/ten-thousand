import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { monthNames, dayNames } from "../constants/MonthNames";

const CardComponentForTen = ({ day, modalControl }) => {
  const now = new Date();
  const date = new Date(day);
  const dateRight =
    date.getDate() +
    " " +
    monthNames[date.getMonth()] +
    " " +
    date.getFullYear();
  const [controlPoint2, setControlPoint2] = useState(false);
  const input = JSON.parse(localStorage.getItem("dailyActivities"));

  const controlPoint =
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear();

  useEffect(() => {
    if (input) {
      const daily = input.find((obj) => obj.day === dateRight);
      if (daily && daily.activities.length > 0) {
        setControlPoint2(true);
      } else {
        setControlPoint2(false);
      }
    }
  }, [input, dateRight]);

  return (
    <div onClick={() => modalControl(date)} style={{ cursor: "pointer" }}>
      <Card
        bg={controlPoint2 ? "success" : controlPoint ? "secondary" : "light"}
        text={controlPoint2 ? "light" : controlPoint ? "light" : "secondary"}
      >
        <Card.Body className="m-auto">
          <Card.Title className="text-center">
            {monthNames[date.getMonth()] + " " + date.getDate()}
          </Card.Title>
          {controlPoint ? (
            <div className="video__icon">
              <div className="circle--outer"></div>
              <div className="circle--inner"></div>
            </div>
          ) : (
            ""
          )}
          <Card.Text className="text-center">
            {dayNames[date.getDay()]}
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default CardComponentForTen;
