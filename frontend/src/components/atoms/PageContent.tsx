import { theme } from "antd";
import React from "react";
interface Props {
  children?: React.ReactNode;
}
export const PageContent = (props: Props) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <div
      style={{
        padding: 24,
        minHeight: "40vh",
        background: colorBgContainer,
        borderRadius: borderRadiusLG,
      }}
    >
      {props.children}
    </div>
  );
};
