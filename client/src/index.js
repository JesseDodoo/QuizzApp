import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import App from "./App";
import { SocketProvider } from "./contexts/SocketProvider";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
        <SocketProvider>
          <App />
        </SocketProvider>
      </Provider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
