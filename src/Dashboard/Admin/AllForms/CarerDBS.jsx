import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";

const CarerDBSRecordForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    jobRole: "",
    dob: "",
    certificateNumber: "",
    issueDate: "",
    levelCheck: "",
    barredList: "",
    result: "Clear",
    positionApplied: "Care Worker",
    storageLocation: "",
    copyStored: "",
    renewalDate: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("DBS Record Saved:", formData);
    navigate("/admin/forms");
  };

  return (
    <Container fluid className="bg-light py-3">
      <Card className="p-3 shadow-sm position-relative">

        {/* BACK BUTTON – LEFT TOP */}
        <button
          type="button"
          onClick={() => navigate("/admin/forms")}
          style={{
            position: "absolute",
            top: 12,
            left: 12,
            background: "#3A8DFF",
            color: "#fff",
            padding: "6px 14px",
            borderRadius: 4,
            border: "none",
            cursor: "pointer",
            fontSize: 14
          }}
        >
          ← Back
        </button>

        {/* HEADER */}
        <Row className="align-items-center mb-3 pt-5">
          <Col xs={8}>
            <h5 className="text-black mb-0 ">Carer DBS Record Form</h5>
            <small className="text-muted">
              Disclosure and Barring Service (DBS)
            </small>
          </Col>
          <Col xs={4} className="text-end">
            <img
              src="https://unitecare.org/content/images/logo.png"
              alt="Unite Care"
              style={{ height: 80, maxWidth: "100%" }}
            />
          </Col>
        </Row>

        <Form onSubmit={handleSubmit}>
          <Section title="Carer Details" />

          <Row className="g-2">
            <Col md={6}>
              <Form.Control
                placeholder="Full Name"
                name="fullName"
                onChange={handleChange}
                className="custom-input"
              />
            </Col>

            <Col md={6}>
              <Form.Control
                placeholder="Job Title / Role"
                name="jobRole"
                onChange={handleChange}
                className="custom-input"
              />
            </Col>

            <Col md={6}>
              <Form.Control
                type="date"
                name="dob"
                onChange={handleChange}
                className="custom-input"
              />
            </Col>
          </Row>

          <Section title="DBS Information" />

          <Row className="g-2">
            <Col md={6}>
              <Form.Control
                placeholder="DBS Certificate Number"
                name="certificateNumber"
                onChange={handleChange}
                className="custom-input"
              />
            </Col>

            <Col md={6}>
              <Form.Control
                type="date"
                name="issueDate"
                onChange={handleChange}
                className="custom-input"
              />
            </Col>

            <Col md={6}>
              <Form.Select
                name="levelCheck"
                onChange={handleChange}
                className="custom-input"
              >
                <option value="">Level of Check</option>
                <option>Enhanced</option>
                <option>Standard</option>
              </Form.Select>
            </Col>

            <Col md={6}>
              <Form.Select
                name="barredList"
                onChange={handleChange}
                className="custom-input"
              >
                <option value="">Barred List</option>
                <option>Adult</option>
                <option>Children</option>
                <option>Both</option>
                <option>Not Applicable</option>
              </Form.Select>
            </Col>

            <Col md={6}>
              <Form.Control
                value="Clear"
                disabled
                className="custom-input bg-light"
              />
            </Col>
          </Row>

          <Section title="Storage & Data Protection" />

          <Row className="g-2">
            <Col md={8}>
              <Form.Control
                placeholder="Original DBS stored location"
                name="storageLocation"
                onChange={handleChange}
                className="custom-input"
              />
            </Col>

            <Col md={4}>
              <Form.Select
                name="copyStored"
                onChange={handleChange}
                className="custom-input"
              >
                <option value="">Copy Stored?</option>
                <option>Yes</option>
                <option>No</option>
              </Form.Select>
            </Col>
          </Row>

          <Section title="Renewal & Review" />

          <Row className="g-2">
            <Col md={6}>
              <Form.Control
                type="date"
                name="renewalDate"
                onChange={handleChange}
                className="custom-input"
              />
            </Col>
          </Row>

          <Button type="submit" className="w-100 mt-3" style={{ backgroundColor: "#00264D", border: "none", textAlign: "center",  }}>
                 <span style={{margin: "0 auto"}}>Save Form</span>       </Button>
        </Form>
      </Card>

      {/* INLINE STYLE */}
      <style>{`
        .custom-input {
          border: 1px solid #ced4da;
          padding: 8px 10px;
          font-size: 14px;
          border-radius: 4px;
        }

        @media (max-width: 576px) {
          h5 {
            font-size: 16px;
          }
        }
      `}</style>
    </Container>
  );
};

const Section = ({ title }) => (
  <div className="mt-3 mb-2">
    <small className="text-secondary fw-semibold border-bottom d-block pb-1">
      {title}
    </small>
  </div>
);

export default CarerDBSRecordForm;
