import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/styles.scss";
import App from "./App";

import { Provider } from "react-redux";
import { persistor, store } from "./redux/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { PersistGate } from "redux-persist/integration/react";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

const root = ReactDOM.createRoot(document.getElementById("root"));
const queryClient = new QueryClient();
root.render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <PayPalScriptProvider>
          <App />
        </PayPalScriptProvider>
      </PersistGate>
    </Provider>
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
);
