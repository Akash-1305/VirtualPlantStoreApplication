import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { baseUrl } from "../../App";

export default function ManageProducts() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [availability, setAvailability] = useState("");
  const [productid, setProductId] = useState("");
  const [category, setCategory] = useState("");

  const [productList, setProductList] = useState([]);

  const categories = ["Trees", "Plants", "Seeds", "Flowers", "Gift"];

  const { pathname } = useLocation();
  console.log(pathname);

  useEffect(() => {
    getProducts();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      const dataURL = reader.result;
      setImage(dataURL);
    };
    reader.readAsDataURL(file);
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    const newPlant = {
      name: name,
      price: price,
      image: image,
      description: description,
      availability: availability,
      category: category,
    };
    axios
      .post(baseUrl + `/Products/AddProducts`, newPlant)
      .then((res) => {
        toast.success(res.data);
        getProducts();
        ClearFields();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleEditProduct = (e) => {
    e.preventDefault();
    const newPlant = {
      name: name,
      price: price,
      image: image,
      description: description,
      availability: availability,
      category: category,
    };
    axios
      .put(baseUrl + `/Products/UpdateProduct/${productid}`, newPlant)
      .then((res) => {
        toast.success(res.data);
        getProducts();
        ClearFields();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function getProducts() {
    axios
      .get(baseUrl + `/Products/GetAllProducts`)
      .then((res) => {
        setProductList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function ClearFields() {
    setName("");
    setDescription("");
    setPrice("");
    setAvailability("");
    setImage("");
    setProductId("");
    document.getElementById("image").value = null;
    setCategory("");
  }

  const AssignData = (product) => {
    setName(product.name);
    setPrice(product.price);
    setAvailability(product.availability);
    setDescription(product.description);
    setProductId(product.id);
    setCategory(product.category);
    window.scrollTo(0, 0);
  };

  return (
    <div>
      <div className="container">
        {pathname === "/AdminDashboard/manageproducts" && (
          <>
            <h2 className="text-center mt-3">Add Product to Sell</h2>
            <form onSubmit={productid ? handleEditProduct : handleAddProduct}>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="form-control text-center mb-3"
                required
              >
                <option value="" hidden>
                  ---Select category---
                </option>
                {categories.map((cat) => {
                  return <option value={cat}>{cat}</option>;
                })}
              </select>
              <label>Plant Name:</label>
              <input
                type="text"
                className="form-control mb-3"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <label>Price:</label>
              <input
                type="number"
                className="form-control mb-3"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
              <label>Image:</label>
              <input
                type="file"
                id="image"
                className="form-control mb-3"
                onChange={handleImageChange}
                required={!productid}
              />
              <label>Description:</label>
              <textarea
                className="form-control mb-3"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              ></textarea>
              {productid && (
                <div className="mb-3">
                  <label htmlFor="availability" className="form-label">
                    Availability:
                  </label>
                  <select
                    className="form-select"
                    name="availability"
                    value={availability}
                    onChange={(e) => setAvailability(e.target.value)}
                  >
                    <option value="In Stock">In Stock</option>
                    <option value="Out Of Stock">Out Of Stock</option>
                  </select>
                </div>
              )}
              <button className="btn btn-primary" type="submit">
                {productid ? "Update Product" : " Add Plant"}
              </button>
              <button className="btn btn-link" onClick={ClearFields}>
                Reset Fields
              </button>
            </form>
          </>
        )}
        <h2 className="mt-4">Added Products:</h2>
        <Row>
          {productList.map((plant, index) => (
            <Col md={4}>
              <div
                key={index}
                className="card mb-3"
                style={{ height: "600px" }}
              >
                <img
                    src={plant.image}
                    alt={plant.name}
                    style={{ maxHeight: "250px", objectFit: "cover" }}
                  />
                <div className="card-body" style={{ overflowY: "auto" }}>
                  <h3 className="card-title">{plant.name}</h3>
                  <p className="card-text">
                    <strong>Category:</strong> {plant.category}
                  </p>
                  <p className="card-text">
                    <strong>Price:</strong> &#x20b9; {plant.price}
                  </p>
                  <p className="card-text">
                    <strong>Availability:</strong>
                    <span
                      className={
                        plant.availability === "In Stock"
                          ? "text-success"
                          : "text-danger"
                      }
                    >
                      {plant.availability}
                    </span>
                  </p>
                  <p className="card-text" style={{textAlign: "justify"}}>
                    <strong>Description:</strong> {plant.description}
                  </p>
                </div>
                {pathname === "/AdminDashboard/manageproducts" && (
                  <div className="card-footer d-flex justify-content-end">
                    <button
                      className="btn btn-warning ms-3"
                      onClick={() => AssignData(plant)}
                    >
                      Edit
                    </button>
                  </div>
                )}
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}
