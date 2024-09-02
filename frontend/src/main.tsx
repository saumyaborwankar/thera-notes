import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import { router } from "./routes/router.tsx";
import { store } from "./store/store";
import "./App.css";
import { ConfigProvider } from "antd";
import { FIRST_GRADIENT, PRIMARY_COLOR } from "./components/atoms/constants.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ConfigProvider
    theme={{
      token: {
        fontFamily: "Geist",
        motionDurationMid: "0.0s",
        motionEaseInOut: "0s",
      },
      components: {
        // Menu: {
        //   itemHoverColor: FIRST_GRADIENT,
        //   itemSelectedBg: FIRST_GRADIENT,
        //   itemSelectedColor: "white",
        //   darkItemBg: "white",
        // },
        // Layout: {
        //   siderBg: "white",
        // },

        Menu: {
          itemHoverColor: "white",
          itemColor: "white",
          itemSelectedBg: "white",
          itemSelectedColor: "black",
          iconSize: 18,
          collapsedIconSize: 18,
          fontSize: 14,
          // darkItemBg: FIRST_GRADIENT,
        },
        Layout: {
          siderBg: "white",
          triggerBg: "black",
          triggerColor: "black",
        },
      },
    }}
  >
    <Provider store={store}>
      <React.StrictMode>
        <RouterProvider
          router={router}
          fallbackElement={<div>'hello world</div>}
        />
      </React.StrictMode>
    </Provider>
  </ConfigProvider>
);
