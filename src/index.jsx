import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import WeatherDataContextProvider from "./store/weatherData-context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <WeatherDataContextProvider>
      <App />
    </WeatherDataContextProvider>
  </React.StrictMode>
);
