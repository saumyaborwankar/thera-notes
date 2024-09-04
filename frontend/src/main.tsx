import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import { router } from "./routes/router.tsx";
import { store } from "./store/store";
import "./App.css";
import { ConfigProvider } from "antd";
import {
  FIRST_GRADIENT,
  PRIMARY_COLOR,
  SECOND_GRADIENT,
} from "./components/atoms/constants.ts";
import { purple, lime } from "@ant-design/colors";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <ConfigProvider
    theme={{
      token: {
        fontFamily: "Geist",
        motionDurationMid: "0.0s",
        motionEaseInOut: "0s",
        colorPrimary: "#9e3164",
      },
      components: {
        Table: {
          // rowSelectedBg: FIRST_GRADIENT,
          // rowSelectedHoverBg: SECOND_GRADIENT,
        },
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
        },
        Layout: {
          siderBg: "white",
          triggerBg: "black",
          triggerColor: "black",
        },
      },
    }}

    // theme={{ token: { colorPrimary: "#9e3164" } }}
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
