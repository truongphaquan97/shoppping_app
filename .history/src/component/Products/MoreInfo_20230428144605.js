import { Col, Row } from "react-bootstrap";

const MoreInfo = () => {
  return (
    <div>
      <div>
        <Row>
          <Col className="bg">
            <h5>FREE SHIPPING</h5>
            <p>Free shipping worlwide</p>
          </Col>
          <Col className="bg">.col</Col>
          <Col className="bg">.col</Col>
        </Row>
      </div>
      <div>
        <Row>
          <Col className="bg" xs="6">
            .col-6
          </Col>
          <Col className="bg" xs="6">
            .col-6
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default MoreInfo;
