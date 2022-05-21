import React, { useState } from "react";
import {
  Button,
  Col,
  Container,
  Dropdown,
  DropdownButton,
  ProgressBar,
  Row,
} from "react-bootstrap";
import FormComponent from "../components/FormComponent";
import DownDouble from "../assets/DownDouble";
import UpDouble from "../assets/UpDouble";
import CardComponentForTen from "../components/CardComponentForTen";
import ModalComponent from "../components/ModalComponent";
import { monthNames } from "../constants/MonthNames";
import { useDailyUpdateComponent } from "../contexts/DailyActivityContext";
import { useGoalComponent } from "../contexts/GoalContext";

const Home = () => {
  const [modalShow, setModalShow] = useState(false);
  const [modalDayInformation, setModalDayInformation] = useState("");
  const [tableDate, setTableDate] = useState({ firstPart: 9, secondPart: 1 });
  const handleDate = useDailyUpdateComponent()[0];
  const goals = useGoalComponent()[0].goals;
  const [activeGoal, setActiveGoal] = useState("Select Goal");

  const now = 60;
  const progressInstance = (
    <ProgressBar now={now} label={`${now}%`} variant="secondary" animated />
  );

  const nowDate = new Date();
  const setDate = (day) => {
    var current = new Date();
    current.setDate(current.getDate() + day);
    return current;
  };

  const handleModalClick = (day) => {
    const formattedDay =
      day.getDate() +
      " " +
      monthNames[day.getMonth()] +
      " " +
      day.getFullYear();
    handleDate(formattedDay);
    setModalDayInformation(formattedDay);

    setModalShow((modalShow) => !modalShow);
  };

  const handleTableDate = (day, part) => {
    switch (part) {
      case "upButton":
        setTableDate({
          firstPart: tableDate.firstPart + day,
          secondPart: tableDate.secondPart - day,
        });
        break;
      case "downButton":
        setTableDate({
          firstPart: tableDate.firstPart - day,
          secondPart: tableDate.secondPart + day,
        });
        break;
      default:
        break;
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center mt-2 mb-1">
        <Col md={2} className="d-flex align-items-center">
          {goals.length > 0 && (
            <div className="sticky-xl-top sticky-lg-top sticky-md-top sticky-sm-top flex-fill my-4">
              <h3>Progress</h3>
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
                    onClick={() => setActiveGoal(goal)}
                  >
                    {goal}
                  </Dropdown.Item>
                ))}
              </DropdownButton>
              {activeGoal !== "Select Goal" && (
                <span className="mt-3">{progressInstance}</span>
              )}
            </div>
          )}
        </Col>
        <Col>
          <FormComponent />
          <Row>
            <Col>
              <Button
                variant="outline-secondary"
                size="md"
                className="col-12"
                onClick={() => handleTableDate(4, "upButton")}
              >
                <UpDouble />
              </Button>
            </Col>
          </Row>
          <Row>
            {Array.from({ length: 10 }).map((_, idx) => (
              <Col
                md={
                  nowDate.getDate() ===
                    setDate(idx - tableDate.firstPart).getDate() &&
                  nowDate.getMonth() ===
                    setDate(idx - tableDate.firstPart).getMonth() &&
                  nowDate.getFullYear() ===
                    setDate(idx - tableDate.firstPart).getFullYear()
                    ? 6
                    : 3
                }
                className="my-3"
                key={idx}
              >
                <CardComponentForTen
                  day={setDate(idx - tableDate.firstPart)}
                  modalControl={handleModalClick}
                />
              </Col>
            ))}
            {Array.from({ length: 9 }).map((_, idx) => (
              <Col
                md={
                  nowDate.getDate() ===
                    setDate(idx + tableDate.secondPart).getDate() &&
                  nowDate.getMonth() ===
                    setDate(idx + tableDate.secondPart).getMonth() &&
                  nowDate.getFullYear() ===
                    setDate(idx + tableDate.secondPart).getFullYear()
                    ? 6
                    : 3
                }
                className="my-3"
                key={idx}
              >
                <CardComponentForTen
                  day={setDate(idx + tableDate.secondPart)}
                  modalControl={handleModalClick}
                />
              </Col>
            ))}
            <ModalComponent
              show={modalShow}
              onHide={() => setModalShow(false)}
              day={modalDayInformation}
            />
          </Row>
          <Row>
            <Col>
              <Button
                variant="outline-secondary"
                size="md"
                className="col-12"
                onClick={() => handleTableDate(4, "downButton")}
              >
                <DownDouble />
              </Button>
            </Col>
          </Row>
        </Col>
        <Col md={2}></Col>
      </Row>
    </Container>
  );
};

export default Home;