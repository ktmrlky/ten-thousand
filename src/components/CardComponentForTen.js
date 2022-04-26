import React from "react";
import { Card } from "react-bootstrap";
import { monthNames } from "../constants/MonthNames";

const CardComponentForTen = ({ day, modalControl }) => {
  const now = new Date();
  const date = new Date(day);

  const controlPoint =
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear();

  return (
    <div onClick={() => modalControl(date)} style={{ cursor: "pointer" }}>
      <Card
        bg={controlPoint ? "secondary" : "light"}
        text={controlPoint ? "light" : "secondary"}
      >
        <Card.Body className="m-auto">
          <Card.Title className="text-center">{date.getDate()}</Card.Title>
          {controlPoint ? (
            <div className="video__icon">
              <div className="circle--outer"></div>
              <div className="circle--inner"></div>
            </div>
          ) : (
            ""
          )}
          <Card.Text>{monthNames[date.getMonth()]}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default CardComponentForTen;
