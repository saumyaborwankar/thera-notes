import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import { router } from "./routes/router.tsx";
import { store } from "./store/store.ts";
import "./App.css";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider
        router={router}
        fallbackElement={<div>'hello world</div>}
      />
    </React.StrictMode>
  </Provider>
);
