import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate to redirect
import { logout } from "../redux/slices/authSlice"; // Import the logout action
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap styling
import 'font-awesome/css/font-awesome.min.css'; // Font Awesome icons

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get the number of items in the cart
  const cartItems = useSelector((state) => state.cart.items);
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Check if user is logged in by checking localStorage
  const isLoggedIn = localStorage.getItem("username");

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("username"); // Remove username from localStorage
    dispatch(logout()); // Dispatch the logout action to clear Redux state (if you're using Redux)
    navigate("/"); // Redirect to login page
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
      <div className="container">
        <a className="navbar-brand font-weight-bold" href="/">
          <span className="text-light">Shopping</span> App
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {/* Show Cart and Logout buttons only if the user is logged in */}
            {isLoggedIn && (
              <>
                {/* Cart Icon with Item Count */}
                <li className="nav-item d-flex align-items-center mx-3 position-relative">
                  <Link to="/cart" className="nav-link d-flex align-items-center">
                    <i className="fa fa-shopping-cart text-light" style={{ fontSize: '1.5em' }}></i>
                    {totalItems > 0 && (
                      <span className="badge bg-warning text-dark rounded-circle p-2 position-absolute top-0 start-100 translate-middle">
                        {totalItems}
                      </span>
                    )}
                  </Link>
                </li>

                {/* Logout Button */}
                <li className="nav-item">
                  <button className="btn btn-outline-light" onClick={handleLogout}>
                    <i className="fa fa-sign-out text-light me-2"></i>
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
