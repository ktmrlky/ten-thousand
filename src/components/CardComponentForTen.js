import React from "react";
import { Card } from "react-bootstrap";

const CardComponentForTen = ({ day, modalControl }) => {
  const now = new Date();
  const date = new Date(day);

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <div onClick={modalControl} style={{ cursor: "pointer" }}>
      <Card
        bg={
          now.getDate() === date.getDate() &&
          now.getMonth() === date.getMonth() &&
          now.getFullYear() === date.getFullYear()
            ? "secondary"
            : "light"
        }
        text={
          now.getDate() === date.getDate() &&
          now.getMonth() === date.getMonth() &&
          now.getFullYear() === date.getFullYear()
            ? "light"
            : "secondary"
        }
      >
        <Card.Body className="m-auto">
          <Card.Title className="text-center">{date.getDate()}</Card.Title>
          <Card.Text>{monthNames[date.getMonth()]}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default CardComponentForTen;
