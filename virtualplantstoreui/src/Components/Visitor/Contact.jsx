import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Contact = () => {
  return (
    <div className="contactbg">
      <div className="container text-white">
        <header className="text-center pt-5">
          <h1>Contact Us</h1>
        </header>

        <section className="mt-5 text-center">
          <div className="row">
            <div className="col-md-6 offset-md-3">
              <h5>Address:</h5>
              <p>123 Main Street, City, Country</p>
              <h5>Email:</h5>
              <p>contact@example.com</p>
              <h5>Phone:</h5>
              <p>1234567890</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Contact;
