import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { baseUrl } from "../../App";

export default function UpdateProfile() {

  const loggeduser = sessionStorage.getItem("user");

  useEffect(() => {
    getUser();
  }, []);

  function getUser() {
    axios
      .get(baseUrl + `/Users/GetUser/${loggeduser}`)
      .then((res) => {
        setId(res.data.id);
        setName(res.data.name);
        setEmail(res.data.email);
        setMobile(res.data.mobile);
        setAddress(res.data.address);
        setCity(res.data.city);
        setPassword(res.data.password);
      })
      .catch((error)=>{
        console.log(error);
      })
  }


  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [city, setCity] = useState("");


  function handleSubmit(e) {
    e.preventDefault();
    const userdata = { name, email, mobile, address, password,city  };
    axios.put(baseUrl + `/Users/UpdateProfile/${id}`, userdata)
      .then((res) => {
        toast.success("Profile Updated Successfully");
        getUser();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="container-fluid text-white">
      <div className="row">
        <div className="col-md-4 offset-md-4">
          <h1 className="text-dark text-center">User Profile</h1>
          <form onSubmit={handleSubmit} id="regform">
            <div className="mb-1">
              <label htmlFor="name" className="form-label text-dark">
                Name:
              </label>
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
                pattern="[A-Za-z\s]+"
                title="Name should contain only alphabets"
                required
              />
            </div>
            <div className="mb-1">
              <label htmlFor="email" className="form-label text-dark">
                Email:
              </label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
                title="Invalid email format"
                required
              />
            </div>
            <div className="mb-1">
              <label htmlFor="mobile" className="form-label text-dark">
                Mobile:
              </label>
              <input
                type="number"
                className="form-control"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                pattern="[0-9]{10}"
                title="Mobile number should contain exactly 10 digits"
                required
              />
            </div>
            <div className="mb-1">
              <label htmlFor="address" className="form-label text-dark">
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
              <label htmlFor="address" className="form-label text-dark">
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
              <label htmlFor="password" className="form-label text-dark">
                Password:
              </label>
              <input
                type="text"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                pattern="(?=.*[A-Za-z]{3})(?=.*\d{3})[\w\d]{6,}"
                title="Password should contain at least 3 alphabets, 3 digits, and be at least 6 characters long"
                required
              />
            </div>
            <div className="d-flex justify-content-end mt-2">
              <button type="submit" className="btn btn-primary">
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
