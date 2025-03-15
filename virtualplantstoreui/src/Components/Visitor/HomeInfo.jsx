/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Card, Carousel } from "react-bootstrap";
import img from '../../Images/n1.jpg'
import img1 from '../../Images/n2.jpg'
import img2 from '../../Images/n3.jpg'
import img3 from '../../Images/b.jpg'
import Products from "../User/Products";

export default function HomeInfo() {
  return (

     <>
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={img}
            alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={img1}
            alt="Second slide"
          />

        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={img2}
            alt="Third slide"
          />
        </Carousel.Item>
      </Carousel>

      <Products/>
      <h2 className="text-center mt-4">About Us</h2>
          <div className="container my-3">
            <Card.Body>
              <Card.Title>Virtual Plant Store</Card.Title>
              <Card.Text>
                Store is an Indian online platform that sells plants, gardening supplies, and related products.
                It was founded in 2014 with the aim of making gardening accessible to everyone. Nurserylive offers a variety of plants, tools, fertilizers, and other gardening accessories.
                The platform also provides resources such as articles, videos, and a gardening community for enthusiasts to share their knowledge and experiences.
              </Card.Text>
            </Card.Body>
          </div>
 
<div className="container">
<img src={img3} alt="" width="80%" />
</div>
          <div className="container my-4">
            <Card.Body>
              <Card.Title>Plants</Card.Title>
              <Card.Text>
                Plants are important for several reasons, especially in modern times when people spend more time indoors due to work and lifestyle changes.
              </Card.Text>
              <Card.Text>
                <strong>Aesthetic appeal:</strong> Plants can add beauty and life to any space, whether it's an office, home, or outdoor garden. They come in various shapes, sizes, and colors, making them versatile and appealing.
              </Card.Text>
              <Card.Text>
                <strong>Health benefits:</strong> Plants can improve air quality by absorbing pollutants and releasing oxygen. They can also reduce stress levels, boost mood, and improve mental health.
              </Card.Text>
              <Card.Text>
                <strong>Sustainability:</strong> Keeping plants can be an eco-friendly option, as they can help reduce carbon emissions, reduce waste, and support biodiversity.
              </Card.Text>
              <Card.Text>
                <strong>Food production:</strong> Growing plants like vegetables and fruits can provide a source of fresh, healthy produce that is free from harmful pesticides and chemicals.
              </Card.Text>
              <Card.Text>
                <strong>Education:</strong> Keeping plants can provide a great opportunity for learning about biology, botany, and the natural world.
              </Card.Text>
            </Card.Body>
          </div>
          <footer className="bg-dark text-light py-4">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h5 className="text-warning">About Virtual Plant Store</h5>
            <p>
            Virtual Plant Store Store is an Indian online platform that sells plants, gardening supplies, and related products. It was founded in 2014 with the aim of making gardening accessible to everyone. Nurserylive offers a variety of plants, tools, fertilizers, and other gardening accessories.
            </p>
          </div>
          <div className="col-md-6">
            <h5 className="text-warning">Contact Us</h5>
            <p>
              <strong>Email:</strong> info@virtualplantstore.com<br />
              <strong>Phone:</strong> +1 (123) 456-7890<br />
              <strong>Address:</strong> 123 Garden Street, Green Valley
            </p>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 text-center mt-3">
            <p>&copy; {new Date().getFullYear()} Virtual Plant Store. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
     </>

  );
}
