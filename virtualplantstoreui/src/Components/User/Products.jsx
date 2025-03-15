import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { baseUrl } from "../../App";
import ProductDetailsModal from "./ProductDetailsModal";
import { Link } from "react-router-dom";

const categories = ["All", "Trees", "Plants", "Seeds", "Flowers", "Gift"];

const Products = () => {
  const [productList, setProductList] = useState([]);
  const [filterProductList, setFilterProductList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [cartItems, setCartItems] = useState([]);
  const [product, setProduct] = useState({});
  const [show, setShow] = useState(false);

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const toggle = (plant) => {
    setShow(!show);
    setProduct(plant);
  };

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [selectedCategory]);

  useEffect(() => {
    if (pathname !== "/") {
      getCartByUser();
    }
  }, [pathname]);

  const loggedUser = sessionStorage.getItem("user");

  const getProducts = () => {
    axios
      .get(baseUrl + "/Products/GetProducts")
      .then(({ data }) => {
        setProductList(data);
        setFilterProductList(data);
      })
      .catch(console.error);
  };

  const getCartByUser = () => {
    axios
      .get(baseUrl + `/Cart/getCartByUser/${loggedUser}`)
      .then(({ data }) => setCartItems(data))
      .catch(console.error);
  };

  function addToCart(id) {
    if (pathname === "/shop" || pathname === "/") {
      navigate("/login");
      return;
    }
    axios
      .post(baseUrl + `/Cart/AddUpdateCart/${loggedUser}/${id}`)
      .then((res) => {
        toast.success(res.data);
        getCartByUser();
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data);
      });
  }

  const filterProducts = () => {
    setFilterProductList(
      selectedCategory === "All"
        ? productList
        : productList.filter((product) => product.category === selectedCategory)
    );
  };

  const handleChange = (e) => {
    const term = e.target.value.toLowerCase();
    const filteredList = productList.filter(
      (product) =>
        product.name.toLowerCase().includes(term) ||
        product.description.toLowerCase().includes(term)
    );
    setFilterProductList(term !== "" ? filteredList : productList);
  };

  return (
    <div>
      <div className="d-flex justify-content-center">
        <h2 className="mt-4 text-dark">Our Products</h2>
      </div>
      {pathname !== "/" && (
        <div className="d-flex justify-content-center mt-3">
          {categories.map((category) => (
            <button
              key={category}
              className={`btn btn-outline-primary mx-2 ${
                selectedCategory === category ? "active" : ""
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
          <input
            className="form-control w-25"
            placeholder="Search here"
            type="text"
            onChange={handleChange}
          />
        </div>
      )}
      <hr />
      <Container className="h=200">
        {filterProductList.length > 0 ? (
          <Row md={4}>
            {filterProductList.map((plant) => (
              <Col key={plant.id} className="my-4">
                <div className="card mb-3" style={{ height: "100%" }}>
                  <img
                    src={plant.image}
                    alt={plant.name}
                    className="card-img-top image-hover-effect"
                    style={{ height: "250px", objectFit: "cover" }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{plant.name}</h5>
                    <p className="card-text">
                      <strong>Category:</strong> {plant.category}
                    </p>
                    <p className="card-text">
                      <strong>Price:</strong> ₹ {plant.price}
                    </p>
                    <p className="card-text">
                      <strong>Availability:</strong>{" "}
                      <span
                        className={`card-text ${
                          plant.availability === "In Stock"
                            ? "text-success"
                            : "text-danger"
                        }`}
                      >
                        {plant.availability}
                      </span>
                    </p>
                    <p
                      className="card-text m-0 "
                      style={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitLineClamp: 5,
                        WebkitBoxOrient: "vertical",
                        textAlign: "justify",
                      }}
                    >
                      <strong>Description:</strong> {plant.description}
                    </p>
                    <p className="m-0">
                      <Link onClick={() => toggle(plant)}>Read more</Link>
                      <ProductDetailsModal
                        show={show}
                        toggle={toggle}
                        data={product}
                      />
                    </p>
                  </div>
                  <button
                    className="btn btn-warning"
                    onClick={() => addToCart(plant.id)}
                  >
                    Add to cart
                  </button>
                </div>
              </Col>
            ))}
          </Row>
        ) : (
          <Row>
            <h2 className="text-center text-danger pt-5">No product found</h2>
          </Row>
        )}
      </Container>
    </div>
  );
};

export default Products;
