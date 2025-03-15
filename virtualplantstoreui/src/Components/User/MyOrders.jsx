import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import {
  Container,
  Table,
  Card,
  Button,
  Row,
  Col,
  Collapse,
} from "react-bootstrap";
import { toast } from "react-toastify";
import { baseUrl, TOAST_PROP } from "../../App";
import { FaStar } from "react-icons/fa";

const MyOrders = () => {

  const [orders, setOrders] = useState([]);
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [ratings, setRatings] = useState({});

  const loggeduser = sessionStorage.getItem("user");

  useEffect(() => {
    getMyOrders();
  }, [orders]);

  function getMyOrders() {
    axios
      .get(baseUrl + `/Orders/GetAllOrdersByUser/${loggeduser}`)
      .then((res) => {
        console.log(res.data);
        setOrders(res.data);
        res.data.forEach((element) => {
          setRatings((prevRatings) => ({
            ...prevRatings,
            [element.id]: element.rating,
          }));
        });
      });
  }

  const toggleCollapse = (orderId) => {
    if (expandedOrder === orderId) {
      setExpandedOrder(null);
    } else {
      setExpandedOrder(orderId);
    }
  };

  const updateOrder = (id, status) => {
    if (status === "Placed" || status === "Delivered") {
      const data = {
        status: status === "Placed" ? "Cancelled" : "Return Requested",
      };

      toast
        .promise(
          axios.put(baseUrl + `/Orders/UpdateStatus/${id}`, data),
          {
            pending: "Status updating.....",
          },
          TOAST_PROP
        )
        .then((res) => {
          toast.success(res.data, TOAST_PROP);
          getMyOrders();
        })
        .catch((err) => {
          toast.error(
            err.response ? err.response.data : "Failed to update Order",
            TOAST_PROP
          );
        });
    } else {
      toast.info("Order already " + status);
      return;
    }
  };

  const rateOrder = (orderId, rating) => {
    setRatings((prevRatings) => ({
      ...prevRatings,
      [orderId]: rating,
    }));
        axios.put(baseUrl + `/Orders/AddRatings/${orderId}/${rating}`)
      .then((res) => {
        toast.success(res.data);
        getMyOrders();
      })
      .catch((err) => {
        toast.error(err.response.data );
      });
  };

  console.log(orders)

  return (
    <Container fluid className="p-1">
      <Card className="border-0" style={{ backgroundColor: "transparent" }}>
        <Card.Header className="bg-primary rounded">
          <h2 className="text-light text-center">My Orders</h2>
        </Card.Header>
        <Container>
          <Card.Body className="p-0">
            {orders.map((order) => (
              <Card key={order?.id} className="my-3 shadow">
                <Card.Body>
                  <Card.Title className="fw-bold">Order #{order.id}</Card.Title>
                  <div>
                    <Row className="my-2">
                      <Col md={3}>Ordered Date:</Col>
                      <Col>{order.date}</Col>
                    </Row>
                    <Collapse in={expandedOrder === order.id}>
                      <div>
                        <Row className="my-2">
                          <Col md={3}>Total Price:</Col>
                          <Col>₹{order?.totalPrice}</Col>
                        </Row>
                        <Row className="my-2">
                          <Col md={3}>Total Quantity :</Col>
                          <Col>{order.product.length} items</Col>
                        </Row>
                        <Row className="my-2">
                          <Col md={3}>Order Status:</Col>
                          <Col
                            className={
                              order.status === "Cancelled" ? "text-danger" : ""
                            }
                          >
                            {order.status}
                          </Col>
                        </Row>
                      </div>
                    </Collapse>
                  </div>
                  <Table striped bordered hover>
                    <thead>
                      <tr className="text-center text-capitalized">
                        <th>Name</th>
                        <th>Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {order.product.map((item) => (
                        <tr
                          key={item?.id}
                          className="text-center text-capitalized"
                        >
                          <td>{item.name}</td>
                          <td>₹{item.price}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                  <div className="d-flex justify-content-between">
                    <div>
                      <Button
                        variant="info"
                        size="sm"
                        onClick={() => toggleCollapse(order?.id)}
                      >
                        {expandedOrder === order.id ? "Hide" : "View"} Order
                        Details
                      </Button>{" "}
                      { !order.status === "Refunded" && <Button
                        variant="danger"
                        size="sm"
                        onClick={() => updateOrder(order?.id, order.status)}
                      >
                        {order.status === "Placed"
                          ? "Request cancellation"
                          : "Request return"}
                      </Button>}
                    </div>
                    {order.status === "Delivered" && (
                      <div className="pe-3">
                        <span>Rate Order:</span>{" "}
                        {[1, 2, 3, 4, 5].map((rating) => (
                          <FaStar
                            key={rating}
                            size={24}
                            className={
                              rating <= (ratings[order.id] || 0)
                                ? "text-warning"
                                : "text-secondary"
                            }
                            style={{ cursor: "pointer" }}
                            onClick={() => rateOrder(order.id, rating)}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </Card.Body>
              </Card>
            ))}
          </Card.Body>
        </Container>
      </Card>
    </Container>
  );
};

export default MyOrders;
