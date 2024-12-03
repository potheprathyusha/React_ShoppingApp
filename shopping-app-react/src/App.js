import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import ProtectedRoute from "./components/ProtectedRoute";
import Header from "./components/Header"; // Import the Header component

const App = () => {
  return (
    <Router>
      {/* Display Header on all routes */}
      <Header />

      <Routes>
        {/* Public Route (Login) */}
        <Route path="/" element={<Login />} />

        {/* Protected Routes (Product List and Cart) */}
        <Route
          path="/products"
          element={
            <ProtectedRoute>
              <ProductList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
