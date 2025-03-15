import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { baseUrl } from "../../App";

export default function Registration() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [city, setCity] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const userdata = {
      name: name,
      email: email,
      mobile: mobile,
      address: address,
      password: password,
      city: city,
      status:"Active"
    };

    toast
      .promise(
        axios.post(baseUrl + `/Users/AddUser`, userdata),
        {
          pending: "Form submitting....",
          success: "Registered successfully",
        },
      )
      .then((res) => {
        console.log(res);
        ClearFields();
      })
      .catch((err) => {
        toast.error(
          err.response ? err.response.data : "Something went wrong!!",
        );
      });
  };

  function ClearFields() {
    setName("");
    setEmail("");
    setPassword("");
    setAddress("");
    setMobile("");
    setCity("");
  }


  return (
    <div className="regbg">
      <div className="container-fluid text-white">
        <div className="row">
          <div className="col-md-5 offset-md-7 pe-5">
            <h1 className="">Registration form</h1>
            <form onSubmit={handleSubmit} id="regform">
              <div className="mb-1">
                <label htmlFor="name" className="form-label">
                  Name:
                </label>
                <input
                  type="text"
                  id="name"
                  className="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  pattern="[A-Za-z\s]+"
                  title="Name should contain only alphabets"
                  required
                />
              </div>
              <div className="mb-1">
                <label htmlFor="email" className="form-label">
                  Email:
                </label>
                <input
                  type="email"
                  id="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
                  title="Invalid email format"
                  required
                />
              </div>
              <div className="mb-1">
                <label htmlFor="mobile" className="form-label">
                  Mobile:
                </label>
                <input
                  type="tel"
                  className="form-control"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  pattern="[0-9]{10}"
                  title="Mobile number should contain exactly 10 digits"
                  required
                />
              </div>
              <div className="mb-1">
                <label htmlFor="address" className="form-label">
                  City:
                </label>
                <input
                  type="text"

                  className="form-control"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                />
              </div>
              <div className="mb-1">
                <label htmlFor="address" className="form-label">
                  Address:
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </div>
              <div className="mb-1">
                <label htmlFor="password" className="form-label">
                  Password:
                </label>
                <input
                  type="password"
                  id="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  pattern="(?=.*[A-Za-z]{3})(?=.*\d{3})[\w\d]{6,}"
                  title="Password should contain at least 3 alphabets, 3 digits, and be at least 6 characters long"
                  required
                />
              </div>
              <div className="d-flex justify-content-between mt-2">
                <button type="submit" className="btn btn-primary">
                  Register
                </button>
                <p>
                  Already a member?{" "}
                  <Link to="/login" className="pe-2">
                    Login
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
