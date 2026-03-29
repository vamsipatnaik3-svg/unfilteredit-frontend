// import React from "react";
// import ReactDOM from "react-dom/client";
// import App from "./App.jsx";
// import "./index.css";
// import "@fontsource/inter"
// import "@fontsource/space-grotesk"

// ReactDOM.createRoot(document.getElementById("root")).render(
  
//     <App />
  
// );

import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "@fontsource/inter"
import "@fontsource/space-grotesk"

import React from "react"
import { BrowserRouter } from "react-router-dom"
import { HelmetProvider } from "react-helmet-async"

ReactDOM.createRoot(document.getElementById("root")).render(
  <HelmetProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </HelmetProvider>
)