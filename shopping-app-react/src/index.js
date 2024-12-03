import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import App from "./App";

// Import Bootstrap and Font Awesome globally
import 'bootstrap/dist/css/bootstrap.min.css';  // Import Bootstrap CSS
import 'font-awesome/css/font-awesome.min.css'; // Import Font Awesome icons

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
