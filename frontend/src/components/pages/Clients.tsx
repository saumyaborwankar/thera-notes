import { theme, Typography } from "antd";
import { PageContent } from "../atoms/PageContent";

export const Clients = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <PageContent>
      <Typography.Title level={4}>Clients</Typography.Title>
    </PageContent>
  );
};
