import React, { useEffect, useState } from "react";
import { Badge, Container, Nav, Navbar } from "react-bootstrap";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { IoCartSharp } from "react-icons/io5";
import Error from "../Error Page/Error";
import axios from "axios";
import { baseUrl } from "../../App";

export default function UserDashboard() {
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

  const navigate = useNavigate()
  function  handleLogout(e) {
    e.preventDefault();
    sessionStorage.clear();
    navigate("/")
  }

  if (!loggeduser) {
    return <Error />;
  }

  const totalQuantity = cartItems.reduce((quantity, item) => {
    return item.quantity + quantity;
  }, 0);


  return (
    <div>
      <Navbar bg="dark" data-bs-theme="dark" className="shadow">
        <Container fluid>
          <Navbar.Brand as={Link} to={"/userdashboard/products"}>
          Online Nursery Store
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to={"/userdashboard/products"}>
              Products
            </Nav.Link>
            <Nav.Link as={Link} to={"/userdashboard/myorders"}>
              My Order
            </Nav.Link>
            <Nav.Link as={Link} to={"/userdashboard/updateprofile"}>
              Profile
            </Nav.Link>
          </Nav>
          <Nav.Link as={Link} to="/userdashboard/cart" className="me-2">
            <IoCartSharp
              role="button"
              size={"1.8rem"}
              className="text-danger"
            />
            <Badge pill bg="danger" size="sm">
              {totalQuantity}
            </Badge>
          </Nav.Link>
          <Nav>
          <Nav.Link as={Link} to={"/"} onClick={handleLogout}>
              Logout
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <div>
        <Outlet />
      </div>
    </div>
  );
}
