import React from "react";
import { Button, Col, Container, ProgressBar, Row } from "react-bootstrap";
import FormComponent from "../components/FormComponent";
import DownDouble from "../assets/DownDouble";
import UpDouble from "../assets/UpDouble";
import CardComponentForTen from "../components/CardComponentForTen";

const Home = () => {
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

  return (
    <Container>
      <Row className="justify-content-md-center mt-2 mb-4">
        <Col md={2}>
          <div className="sticky-xl-top sticky-lg-top sticky-md-top sticky-sm-top mt-5 left-bar-progress">
            <h3>Progress</h3>
            <div className="mt-3">{progressInstance}</div>
          </div>
        </Col>
        <Col>
          <FormComponent />
          <Row>
            <Col>
              <Button variant="light" size="lg" className="col-12">
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
                <CardComponentForTen day={setDate(idx - 9)} />
              </Col>
            ))}
            {Array.from({ length: 9 }).map((_, idx) => (
              <Col md={3} className="my-3" key={idx}>
                <CardComponentForTen day={setDate(idx + 1)} />
              </Col>
            ))}
          </Row>
          <Row>
            <Col>
              <Button variant="light" size="lg" className="col-12">
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
