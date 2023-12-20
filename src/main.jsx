import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.scss";
import { Auth0Provider } from "@auth0/auth0-react";

// Link ----> https://redux-toolkit.js.org/tutorials/quick-start#provide-the-redux-store-to-react

import { store } from "./store/store.js";
import { Provider } from "react-redux";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Auth0Provider
    domain="dev-usl231fyx5bdqyzk.us.auth0.com"
    clientId="2N3nDTobRY7gtRHqZBXPigROQ2hOkRLL"
    authorizationParams={{
      redirect_uri: window.location.origin,
    }}
    cacheLocation="localstorage"
  >
    <Provider store={store}>
      <App />
    </Provider>
  </Auth0Provider>
);
