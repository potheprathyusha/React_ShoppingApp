import React from "react";
import { useSelector, useDispatch } from "react-redux"; // Import useDispatch to dispatch actions
import { removeFromCart } from "../redux/slices/cartSlice"; // Import the removeFromCart action
import { useNavigate } from "react-router-dom"; // Import the useNavigate hook from react-router-dom
import "../styles/Cart.css"; // Cart page styling

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items); // Get cart items from Redux
  const dispatch = useDispatch(); // Initialize the dispatch function
  const navigate = useNavigate(); // Initialize the navigate function

  // Function to handle navigation back to the products list page
  const handleBackToShopping = () => {
    navigate("/products"); // Navigate to the products list page
  };

  // Function to handle removing an item from the cart
  const handleRemoveFromCart = (itemId) => {
    dispatch(removeFromCart({ id: itemId })); // Dispatch the removeFromCart action
  };

  return (
    <div className="cart-container container my-5">
      <h2 className="text-center mb-4">Your Cart</h2>

      {cartItems.length === 0 ? (
        <div className="alert alert-info text-center">Your cart is empty.</div>
      ) : (
        <div className="row">
          {cartItems.map((item) => (
            <div key={item.id} className="col-12 col-md-6 col-lg-4 mb-4">
              <div className="card shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{item.name}</h5>
                  <p className="card-text">Price: ${item.price}</p>
                  <p className="card-text">Quantity: {item.quantity}</p>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleRemoveFromCart(item.id)} // Call the remove function with item ID
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Back to Shopping Button */}
      <div className="text-center mt-4">
        <button className="btn btn-primary" onClick={handleBackToShopping}>
          Back to Shopping
        </button>
      </div>
    </div>
  );
};

export default Cart;
