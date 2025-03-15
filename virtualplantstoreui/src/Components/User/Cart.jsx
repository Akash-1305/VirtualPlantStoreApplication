import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import OrderModal from "./OrderModal";
import ProductCard from "./ProductCard";
import axios from "axios";
import { baseUrl } from "../../App";
import { toast } from "react-toastify";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  const loggeduser = sessionStorage.getItem("user");

  useEffect(()=>{
    getCartByUser()
  })



  function getCartByUser() {   
    axios
      .get(baseUrl + `/Cart/getCartByUser/${loggeduser}`)
      .then((res) => {
        setCartItems(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function DeleteCart() {
    axios
      .delete(baseUrl + `/Cart/DeleteCart/${loggeduser}`)
      .then((res) => {
        toast.success(res.data);
        getCartByUser();
      })
      .catch((err) => {
        console.log(err);
        toast.error( err.response.data );
      });
  }


  const [show, setShow] = useState(false);

  const toggle = () => setShow(!show);

  const flexStyle = "d-flex justify-content-between align-items-center";

  const subTotals = cartItems.map((item) => {
    return item.quantity * item.product?.price;
  });

  const totalPrice = subTotals.reduce((acc, curr) => {
    return acc + curr;
  }, 0);

  const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const orderDetails = {
    totalPrice: totalPrice,
    totalQuantity: totalQuantity,
  };

  return (
    <div className="cart-bg">
      <Container className="p-3">
        {cartItems.length !== 0 ? (
          <Row>
            <div className="d-flex justify-content-between w-100">
              <h2 className="text-primary">My Cart</h2>
              <div>
                <Button
                  size="sm"
                  onClick={() => {
                    DeleteCart();
                  }}
                >
                  Clear Cart
                </Button>
              </div>
            </div>
            <Col md={7}>
              {cartItems.map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
            </Col>
            <Col md={5}>
              <Card className="my-2 shadow">
                <Card.Header className="fs-3 text-primary text-center">
                  Payment Details
                </Card.Header>
                <Card.Body>
                  <Card.Text className={flexStyle}>
                    <span className="fw-bold">Delivery Fee : </span>
                    <span>
                      Free Delivery{" "}
                      <i className="text-muted text-decoration-line-through">
                        ₹40
                      </i>
                    </span>
                  </Card.Text>
                  <Card.Text className={flexStyle}>
                    <span className="fw-bold">Total : </span>
                    <span>₹{totalPrice}</span>
                  </Card.Text>
                </Card.Body>
                <Card.Footer>
                  <Button className="w-100" onClick={toggle}>
                    Checkout
                  </Button>
                  <OrderModal
                    show={show}
                    toggle={toggle}
                    orderDetails={orderDetails}
                  />
                </Card.Footer>
              </Card>
            </Col>
          </Row>
        ) : (
          <div
            className="d-flex flex-column justify-content-center align-items-center"
            style={{ minHeight: "60vh" }}
          >
            <h2>No Items in the cart...!</h2>
            <p>
              <Link to="/userdashboard/products">Click here</Link>&nbsp; to add
              items to cart
            </p>
          </div>
        )}
      </Container>
    </div>
  );
};

export default Cart;
