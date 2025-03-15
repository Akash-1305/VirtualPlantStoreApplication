import React from "react";
import { Button, Col, Container, Modal, Row } from "react-bootstrap";

export default function ProductDetailsModal({ show, toggle, data }) {
  return (
    <div>
      <Modal show={show} onHide={toggle}>
        <Modal.Header closeButton>
          <Modal.Title>Product Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            <strong>Plant Name :</strong>
            {data?.name}
          </p>
          <p>
            <strong>Plant Category :</strong>
            {data?.category}
          </p>
          <p>
            <strong>Plant Price :</strong>
            {data?.price}
          </p>
          <p>
            <strong>Plant Availability :</strong>
            {data?.availability}
          </p>
          <p style={{ textAlign: "justify" }}>
            <strong>Plant Description :</strong>
            {data?.description}
          </p>
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
