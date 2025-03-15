import React, { useEffect } from "react";
import { useState } from "react";
import { Accordion, Collapse, Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FiEdit } from "react-icons/fi";
import { toast } from "react-toastify";
import { baseUrl, TOAST_PROP } from "../../App";
import { useNavigate } from "react-router-dom";
import qrcode from '../../Images/barcode10.png'
import axios from "axios";


const OrderModal = ({ show, toggle, orderDetails }) => {


  const [selectedPaymentOption, setSelectedPaymentOption] = useState("cash");
  const [showQRCode, setShowQRCode] = useState(false);

  const loggeduser = sessionStorage.getItem("user");

  const [user, setUser] = useState({})
  const [cartItems, setCartItems] = useState([]);

  const getCartByUser = () => {
    axios
      .get(baseUrl + `/Cart/getCartByUser/${loggeduser}`)
      .then(({ data }) => setCartItems(data))
      .catch(console.error);
  };

  useEffect(()=>{
    getUser()
    getCartByUser()
  },[])

  function getUser() {   
    axios
      .get(baseUrl + `/Users/GetUser/${loggeduser}`)
      .then((res) => {
        setUser(res.data);
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
        toast.error( err.response.data);
      });
  }


  const navigate = useNavigate();

  const [input, setInput] = useState({
    address: "",
    city: "",
    mobile: "",
  });

  const [edit, setEdit] = useState(false);

  useEffect(() => {
    setInput({ ...user });
  }, [user]);

  const handleChange = (e) => {
    setInput((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handlePlaceOrder = () => {
    const orderData = {
      totalPrice: orderDetails.totalPrice,
      quantity: orderDetails.totalQuantity,
      mobile: input.mobile,
      address: input.address,
      city: input.city,
      cart: cartItems,
    };
        axios.post(baseUrl + `/Orders/CreateOrder/${loggeduser}`, orderData)
      .then((res) => {
        toggle();
        DeleteCart();
        navigate("/userdashboard/myorders");
        toast.success("Order placed successfully!!")
      })
      .catch((err) => {
        console.log(err);
        toast.error("Failed to place your order!!Try agian later", TOAST_PROP);
      });
  };

  return (
    <Modal show={show} onHide={toggle}>
      <Modal.Header closeButton>
        <Modal.Title className="text-primary">Place Order</Modal.Title>
      </Modal.Header>
      <Modal.Body className="py-0">
        <Accordion defaultActiveKey="0">

          <Accordion.Item eventKey="0" className="my-3">
            <Accordion.Header>
              <span className="text-warning fs-5">Delivery Details</span>
            </Accordion.Header>
            <Accordion.Body className="text-capitalize">
              <div className="d-flex w-100 justify-content-between gap-2 align-items-center mb-3">
                <span>Name : {user.name}</span>
                <FiEdit
                  role="button"
                  size={"1.2rem"}
                  className="text-success"
                  onClick={() => setEdit(true)}
                />
              </div>
              {!edit && (
                <div>
                  <p>Mobile : {user.mobile}</p>
                  <p>Address : {user.address}</p>
                  <p>City : {user.city}</p>
                </div>
              )}
              <Collapse in={edit}>
                <div>
                  <Form>
                    <Form.Group className="my-2">
                      <Form.Label>Mobile</Form.Label>
                      <Form.Control
                        name="mobile"
                        value={input.mobile}
                        onChange={handleChange}
                      />
                    </Form.Group>
                    <Form.Group className="my-2">
                      <Form.Label>Address</Form.Label>
                      <Form.Control
                        name="address"
                        value={input.address}
                        onChange={handleChange}
                      />
                    </Form.Group>
                    <Form.Group className="my-2">
                      <Form.Label>City</Form.Label>
                      <Form.Control
                        name="city"
                        value={input.city}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Form>
                </div>
              </Collapse>
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="1" className="my-3">
            <Accordion.Header>
              <span className="text-warning fs-5">Payment Mode</span>
            </Accordion.Header>
            <Accordion.Body>
            <Form.Check
                type="radio"
                label="Cash on delivery"
                checked={selectedPaymentOption === "cash"}
                onChange={() => {
                  setSelectedPaymentOption("cash");
                  setShowQRCode(false);
                }}
              />
              <Form.Check
                type="radio"
                label="UPI"
                checked={selectedPaymentOption === "upi"}
                onChange={() => {
                  setSelectedPaymentOption("upi");
                  setShowQRCode(true);
                }}
              />
            </Accordion.Body>
          </Accordion.Item>

          {selectedPaymentOption === "upi" && (
            <Accordion.Item eventKey="3" className="my-3">
              <Accordion.Header>
                <span className="text-warning fs-5">UPI Payment</span>
              </Accordion.Header>
              <Accordion.Body>
                <p>Scan the following QR code to make a UPI payment:</p>
                {showQRCode && (
                  <img
                    src={qrcode}
                    alt="UPI QR Code"
                    className="img-fluid"
                  />
                )}
              </Accordion.Body>
            </Accordion.Item>
          )}

          <Accordion.Item eventKey="2" className="my-3">
            <Accordion.Header>
              <span className="text-warning fs-5">Order Details</span>
            </Accordion.Header>
            <Accordion.Body>
              <p>Total Quantity : {orderDetails.totalQuantity} items</p>
              <p>Total Price : ₹{orderDetails.totalPrice}</p>
              <p>
                Delivery Charge : Free Delivery{" "}
                <i className="text-muted text-decoration-line-through">₹40</i>
              </p>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={toggle}>
          Close
        </Button>
        <Button variant="primary" onClick={handlePlaceOrder}>
          Confirm Order
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default OrderModal;
