import React, { useState } from "react";
import { Button, Col, Container, ProgressBar, Row } from "react-bootstrap";
import FormComponent from "../components/FormComponent";
import DownDouble from "../assets/DownDouble";
import UpDouble from "../assets/UpDouble";
import CardComponentForTen from "../components/CardComponentForTen";
import ModalComponent from "../components/ModalComponent";
import { monthNames } from "../constants/MonthNames";

const Home = () => {
  const [modalShow, setModalShow] = useState(false);
  const [modalDayInformation, setModalDayInformation] = useState("");

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

    setModalDayInformation(formattedDay);

    setModalShow((modalShow) => !modalShow);
  };

  return (
    <Container>
      <Row className="justify-content-md-center mt-2 mb-1">
        <Col md={2} className="d-flex align-items-center">
          <div className="sticky-xl-top sticky-lg-top sticky-md-top sticky-sm-top flex-fill my-4">
            <h3>Progress</h3>
            <span className="mt-3">{progressInstance}</span>
          </div>
        </Col>
        <Col>
          <FormComponent />
          <Row>
            <Col>
              <Button variant="outline-secondary" size="md" className="col-12">
                <UpDouble />
              </Button>
            </Col>
          </Row>
          <Row>
            {Array.from({ length: 10 }).map((_, idx) => (
              <Col
                md={
                  nowDate.getDate() === setDate(idx - 9).getDate() &&
                  nowDate.getMonth() === setDate(idx - 9).getMonth() &&
                  nowDate.getFullYear() === setDate(idx - 9).getFullYear()
                    ? 6
                    : 3
                }
                className="my-3"
                key={idx}
              >
                <CardComponentForTen
                  day={setDate(idx - 9)}
                  modalControl={handleModalClick}
                />
              </Col>
            ))}
            {Array.from({ length: 9 }).map((_, idx) => (
              <Col md={3} className="my-3" key={idx}>
                <CardComponentForTen
                  day={setDate(idx + 1)}
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
              <Button variant="outline-secondary" size="md" className="col-12">
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
