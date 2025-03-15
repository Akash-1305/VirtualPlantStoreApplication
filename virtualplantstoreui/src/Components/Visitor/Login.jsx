import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [selectedRole, setSelectedRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const obj = { userType: selectedRole, email: email, password: password };
    axios.post(`http://localhost:8080/LoginVerify`, obj)
    .then((res) => {
      if (res.data === "admin") {
        sessionStorage.setItem("admin", email );
        navigate("/AdminDashboard");
        toast.success("Login successfully");
      } else {
        navigate("/userdashboard");
        sessionStorage.setItem("user", email);
        toast.success("Login successfully");
      }
    })
    .catch((error)=>{
      console.log(error);
      toast.error(error.response.data);
    })
  };

  return (
    <div className="loginbg">
      <div className="container">
        <div className="row pt-5">
          <div className="col-4 offset-8">
            <div className="card mt-5 shadow">
              <header className="text-center mt-2">
                <h1>Login</h1>
              </header>
              <div className="card-body">
                <section className="">
                  <div className="row">
                    <div className="">
                      <form onSubmit={handleSubmit}>
                        <div className="form-group mb-3">
                          <label >Select Role</label>
                          <select
                            className="form-select text-center"
                            value={selectedRole}
                            onChange={(e) => setSelectedRole(e.target.value)}
                            required
                          >
                            <option value="" hidden>
                              ---Select Usertype---
                            </option>
                            <option value="admin">Admin</option>
                            <option value="user">User</option>
                          </select>
                        </div>
                        <div className="form-group mb-3">
                          <label>Email</label>
                          <input
                            type="email"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                          />
                        </div>
                        <div className="form-group mb-3">
                          <label>Password</label>
                          <input
                            type="password"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                          />
                        </div>
                        <div className="d-flex justify-content-between">
                          <p>
                            Not a member? <Link to="/register">Register</Link>
                          </p>
                          <button
                            type="submit"
                            className="btn btn-primary float-end"
                          >
                            Login
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
