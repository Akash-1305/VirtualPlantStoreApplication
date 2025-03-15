import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const About = () => {
  return (
    <div className="aboutbg">
      <div className="container text-white">
        <header className="text-center pt-5">
          <h1>About Us</h1>
        </header>

        <section className="pt-5">
          <div className="row">
            <div className="col-md-8 offset-md-2">
              <p>
                We are a virtual plant store that aims to bring the beauty of
                nature into your home. Our mission is to provide high-quality
                plants that are carefully selected to thrive in indoor
                environments. Whether you're a seasoned plant parent or just
                starting your plant journey, we have the perfect plants for you.
              </p>
              <p>
                At our store, you'll find a wide variety of plants, ranging from
                lush tropical foliage to elegant succulents. We source our
                plants from trusted growers and ensure that they are healthy and
                well-cared for. Our team of plant enthusiasts is always ready to
                provide guidance and answer any questions you may have.
              </p>
              <p>
                We believe that plants not only beautify our living spaces but
                also have numerous health benefits. They improve air quality,
                reduce stress, and create a calming and serene atmosphere. Our
                goal is to help you create a green oasis in your home, where you
                can relax and connect with nature.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
