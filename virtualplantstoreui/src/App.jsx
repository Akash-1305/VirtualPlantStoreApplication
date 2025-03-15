import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Components/Visitor/Login";
import HomeInfo from "./Components/Visitor/HomeInfo";
import HomeHeader from "./Components/Visitor/HomeHeader";
import About from "./Components/Visitor/About";
import Contact from "./Components/Visitor/Contact";
import { ToastContainer } from "react-toastify";
import AuthContext from "./Components/Context/Context";
import AdminDashboard from "./Components/Admin/AdminDashboard";
import Registration from "./Components/Visitor/Registration";
import ManageCustomers from "./Components/Admin/ManageCustomers";
import ManageProducts from "./Components/Admin/ManageProducts";
import UserDashboard from "./Components/User/UserDashboard";
import Products from "./Components/User/Products";
import Cart from "./Components/User/Cart";
import MyOrders from "./Components/User/MyOrders";
import ManageOrders from "./Components/Admin/ManageOrders";
import UpdateProfile from "./Components/User/UpdateProfile";

export const TOAST_PROP = { position: "top-center", hideProgressBar: true };
export const baseUrl = "http://localhost:8080";

function App() {
  return (
    <BrowserRouter>
      <AuthContext>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<HomeHeader />}>
            <Route path="/" element={<HomeInfo />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Registration />} />
            <Route path="shop" element={<Products />} />
            <Route path="about" element={<About />} />
            <Route path="contactus" element={<Contact />} />
          </Route>
          <Route path="AdminDashboard" element={<AdminDashboard />}>
            <Route path="" element={<ManageProducts />} />
            <Route path="allorders" element={<ManageOrders />} />
            <Route path="managecustomers" element={<ManageCustomers />} />
            <Route path="manageproducts" element={<ManageProducts />} />
          </Route>
          <Route path="userdashboard" element={<UserDashboard />}>
            <Route path="" element={<Products />} />
            <Route path="products" element={<Products />} />
            <Route path="cart" element={<Cart />} />
            <Route path="myorders" element={<MyOrders />} />
            <Route path="updateprofile" element={<UpdateProfile />} />
          </Route>
        </Routes>
      </AuthContext>
    </BrowserRouter>
  );
}

export default App;
