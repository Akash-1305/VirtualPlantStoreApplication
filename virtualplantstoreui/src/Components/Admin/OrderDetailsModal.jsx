import React from "react";
import { Button, Col, Container, Modal, Row } from "react-bootstrap";

export default function OrderDetailsModal({ show, toggle, data }) {
  return (
    <div>
      <Modal show={show} onHide={toggle}>
        <Modal.Header closeButton>
          <Modal.Title>Customer Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              <Col>
                <strong>Customer Name :</strong>
              </Col>
              <Col>{data?.users?.name}</Col>
            </Row>
            <Row>
              <Col>
                <strong>Address :</strong>
              </Col>
              <Col>
                {data?.address} , {data?.city}
              </Col>
            </Row>
            <Row>
              <Col>
                <strong>Mobile No. :</strong>
              </Col>
              <Col>{data?.mobile}</Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={toggle}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
