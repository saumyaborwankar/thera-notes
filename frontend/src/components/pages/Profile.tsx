import { useParams } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";
import { Avatar, Space, Typography } from "antd";
import { WhiteButton } from "../atoms/WhiteButton";

export const Profile = () => {
  const { username } = useParams();
  const user = useAppSelector((state) => state.user);
  console.log(user);
  return (
    <div style={{ marginTop: "2em" }}>
      <Space>
        <Avatar size={100} />
        <div>
          <Typography.Title level={3}>
            {user.firstName + " " + user.lastName}
          </Typography.Title>
          <WhiteButton />
        </div>
      </Space>
    </div>
  );
};
