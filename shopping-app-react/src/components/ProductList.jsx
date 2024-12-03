import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../redux/slices/cartSlice"; // Import the actions
import "../styles/ProductList.css"; // Optional, for custom styling

const ProductList = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items); // Get the items in the cart

  // Local state for managing product list
  const [products, setProducts] = useState([
    { id: 1, name: "Laptop", price: 999, image: "https://via.placeholder.com/250x150?text=Laptop" },
    { id: 2, name: "Smartphone", price: 499, image: "https://via.placeholder.com/250x150?text=Smartphone" },
    { id: 3, name: "Headphones", price: 199, image: "https://via.placeholder.com/250x150?text=Headphones" },
  ]);

  // State for the new product
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
  });

  const handleAddToCart = (product) => {
    dispatch(addToCart(product)); // Dispatch addToCart action
  };

  const handleRemoveFromCart = (product) => {
    dispatch(removeFromCart(product)); // Dispatch removeFromCart action
  };

  // Check if the product is in the cart
  const isProductInCart = (productId) => {
    return cartItems.some((item) => item.id === productId);
  };

  // Add a new product to the list
  const handleAddProduct = () => {
    if (newProduct.name && newProduct.price && newProduct.image) {
      setProducts([
        ...products,
        { id: Date.now(), ...newProduct }, // Generate a unique ID
      ]);
      setNewProduct({ name: "", price: "", image: "" }); // Reset input fields
    } else {
      alert("Please fill in all product details!");
    }
  };

  // Delete a product from the list
  const handleDeleteProduct = (productId) => {
    setProducts(products.filter((product) => product.id !== productId));
  };

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Product List</h2>

      {/* Add Product Form */}
      <div className="mb-4">
        <h4>Add New Product</h4>
        <div className="row g-3">
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="Product Name"
              value={newProduct.name}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            />
          </div>
          <div className="col-md-3">
            <input
              type="number"
              className="form-control"
              placeholder="Price"
              value={newProduct.price}
              onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })}
            />
          </div>
          <div className="col-md-3">
            <input
              type="text"
              className="form-control"
              placeholder="Image URL"
              value={newProduct.image}
              onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
            />
          </div>
          <div className="col-md-2">
            <button className="btn btn-success w-100" onClick={handleAddProduct}>
              Add Product
            </button>
          </div>
        </div>
      </div>

      {/* Product List */}
      <div className="row">
        {products.map((product) => (
          <div className="col-md-4 mb-4" key={product.id}>
            <div className="card h-100 shadow-sm">
              <img
                src={product.image}
                alt={product.name}
                className="card-img-top"
                style={{ height: "200px", objectFit: "cover" }}
              />
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">${product.price}</p>

                {/* Conditionally render the button */}
                {isProductInCart(product.id) ? (
                  <button
                    className="btn btn-danger w-100 mb-2"
                    onClick={() => handleRemoveFromCart(product)}
                  >
                    Remove from Cart
                  </button>
                ) : (
                  <button
                    className="btn btn-primary w-100 mb-2"
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to Cart
                  </button>
                )}

                <button
                  className="btn btn-outline-danger w-100"
                  onClick={() => handleDeleteProduct(product.id)}
                >
                  Delete Product
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
