import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, Outlet } from "react-router-dom";
import img from "../../Images/logo.png";

const HomeHeader = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light shadow">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <Link className="navbar-brand" to="/">
              <img src={img} alt="" width="300px" />
            </Link>
          </div>
          <div>
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link to="/" className="nav-link">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/shop" className="nav-link">
                  Shop
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/about" className="nav-link">
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/contactus" className="nav-link">
                  Contact
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/login" className="nav-link ">
                  Login
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="">
        <Outlet />
      </div>
    </>
  );
};

export default HomeHeader;
