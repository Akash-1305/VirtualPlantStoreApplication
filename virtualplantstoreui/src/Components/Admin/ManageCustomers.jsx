import { Button, Card, Col, Row } from "react-bootstrap";
import { useState, useEffect } from "react";
import { baseUrl } from "../../App";
import axios from "axios";
import { toast } from "react-toastify";

function ManageCustomers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  function getUsers() {
    axios
      .get(baseUrl + `/Users/GetAllUsers`)
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function UpdateUser(id, status) {
    axios
      .put(baseUrl + `/Users/UpdateStatus/${id}`, { status })
      .then((res) => {
        console.log(res);
        getUsers();
        toast.success(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="p-3">
      <h3 className="text-center text-primary">Manage Customers</h3>
      <hr />
      <Row md={3} className="m-0 w-100">
        {users.map((user, index) => (
          <Col className="my-2" key={index}>
            <Card key={index} className="shadow bg-light">
              <Card.Body className="text-capitalize">
                <Row className="my-2">
                  <Col xs={3} className="fw-semibold text-warning">
                    Name :
                  </Col>
                  <Col xs={9}>{user.name}</Col>
                </Row>
                <Row className="my-2">
                  <Col xs={3} className="fw-semibold text-warning">
                    Email :{" "}
                  </Col>
                  <Col xs={9} className="text-lowercase">
                    {user.email}
                  </Col>
                </Row>
                <Row className="my-2">
                  <Col xs={3} className="fw-semibold text-warning">
                    Phone :{" "}
                  </Col>
                  <Col xs={9}>{user.mobile}</Col>
                </Row>
                <Row className="my-2">
                  <Col xs={3} className="fw-semibold text-warning">
                    Address :{" "}
                  </Col>
                  <Col xs={9}>{user.address}</Col>
                </Row>
                <Row className="my-2">
                  <Col xs={3} className="fw-semibold text-warning">
                    City :{" "}
                  </Col>
                  <Col xs={9}>{user.city}</Col>
                </Row>
                <Row className="my-2">
                  <Col xs={3} className="fw-semibold text-warning">
                    Status :{" "}
                  </Col>
                  <Col xs={9}>{user.status}</Col>
                </Row>
              </Card.Body>
              <Card.Footer className="d-flex justify-content-end ">
                {user.status === "Blocked" && (
                  <Button
                    variant="success"
                    size="sm"
                    onClick={() => UpdateUser(user.id, "Active")}
                  >
                    Active
                  </Button>
                )}
                {user.status === "Active" && (
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => UpdateUser(user.id, "Blocked")}
                  >
                    Block
                  </Button>
                )}
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default ManageCustomers;
