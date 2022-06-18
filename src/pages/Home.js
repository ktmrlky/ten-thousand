import React, { useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import FormComponent from "../components/FormComponent";
import DownDouble from "../assets/DownDouble";
import UpDouble from "../assets/UpDouble";
import CardComponentForTen from "../components/CardComponentForTen";
import ModalComponent from "../components/ModalComponent";
import { monthNames } from "../constants/MonthNames";
import { useDailyUpdateComponent } from "../contexts/DailyActivityContext";
import LeftProgressBar from "../components/LeftProgressBar";
import { useEffect } from "react";

const Home = () => {
  const [modalShow, setModalShow] = useState(false);
  const [modalDayInformation, setModalDayInformation] = useState("");
  const [screenWidth, setScreenWidth] = useState(0);

  const [tableDate, setTableDate] = useState({
    firstPart: 9,
    secondPart: 1,
  });
  const handleDate = useDailyUpdateComponent()[0];
  const [controlToday, setControlToday] = useState(0);

  useEffect(() => {
    function handleResize() {
      setScreenWidth(window.innerWidth);
      if (window.innerWidth < 768) {
        setTableDate({
          firstPart: 2,
          secondPart: 1,
        });
      } else {
        setTableDate({
          firstPart: 9,
          secondPart: 1,
        });
      }
    }

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [setScreenWidth]);

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
        screenWidth > 768 && setControlToday(controlToday + 1);
        break;
      case "downButton":
        setTableDate({
          firstPart: tableDate.firstPart - day,
          secondPart: tableDate.secondPart + day,
        });
        screenWidth > 768 && setControlToday(controlToday - 1);
        break;
      default:
        break;
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center mt-2 mb-1 app-center">
        <Col md={2} className="d-flex align-items-center">
          <div className="sticky-xl-top sticky-lg-top sticky-md-top sticky-sm-top flex-fill mt-3 mb-2">
            <LeftProgressBar />
          </div>
        </Col>
        <Col>
          <FormComponent />
          <Row>
            <Col>
              <Button
                variant="outline-secondary"
                size="md"
                className="col-12"
                onClick={() =>
                  handleTableDate(screenWidth < 769 ? 1 : 4, "upButton")
                }
              >
                <UpDouble />
              </Button>
            </Col>
          </Row>
          <Row>
            {Array.from({ length: screenWidth < 769 ? 3 : 10 }).map(
              (_, idx) => (
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
              )
            )}
            {Array.from({
              length:
                screenWidth < 769
                  ? 2
                  : controlToday > 2 || controlToday < -2
                  ? 10
                  : 9,
            }).map((_, idx) => (
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
                className="col-12 mb-3"
                onClick={() =>
                  handleTableDate(screenWidth < 769 ? 1 : 4, "downButton")
                }
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
