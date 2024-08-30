import {
  LogoutOutlined,
  SettingOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { Avatar, Menu, MenuProps, Popover, Space, Typography } from "antd";
import { useEffect } from "react";
import { LuSearch, LuUser } from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";
import { useAppSelector } from "../store/hooks";
import { useLogoutMutation } from "../store/rtk-api/authApi";
import useNotificationToast from "./atoms/NotificationToast";
const Head = () => {
  const loggedIn = useAppSelector((state: any) => state.user.loggedIn);
  const user = useAppSelector((state) => state.user);
  const [triggerLogout, { isSuccess, isLoading, isError }] =
    useLogoutMutation();
  const navigate = useNavigate();
  type MenuItem = Required<MenuProps>["items"][number];
  const items: MenuItem[] = [
    {
      key: "upload",
      label: "Upload content",
      icon: <UploadOutlined />,
    },
    {
      key: "settings",
      label: "Settings",
      icon: <SettingOutlined />,
    },
    {
      type: "divider",
    },
    {
      key: "signout",
      label: "Sign out",
      icon: <LogoutOutlined />,
    },
  ];
  const { notify, contextHolder } = useNotificationToast();
  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
    switch (e.key) {
      case "signout":
        triggerLogout();
        break;
    }
  };

  useEffect(() => {
    if (isSuccess || isError) {
      console.log("ppppp");
      notify({
        type: "success",
        message: "Success",
        description: "Operation was successful",
      });
    }
  }, [isSuccess, isError]);
  return (
    <div
      style={{ zIndex: "9" }}
      className="head flex justify-between items-center p-6 px-10 w-full shadow-lg"
    >
      <div className="left-part">
        <div className="flex items-center gap-7">
          <div className=" flex item-baseline ">
            <h2 className="logo text-5xl">Moovy</h2>
          </div>
          <button className="align-middle">Inspiration</button>
        </div>
      </div>

      <div className="flex items-center gap-7">
        <div className="relative search-box">
          <input
            type="text"
            placeholder="Search..."
            className="bg-gray-200 py-2 px-4 rounded-3xl outline-none text-black"
          />
          <button className="absolute right-4 top-3 text-black">
            <LuSearch />
          </button>
        </div>

        {!loggedIn ? (
          <>
            <Link to="/login">
              <button className="login btn">Login</button>
            </Link>
            <Link to="/register">
              <button className="sign-up btn bg-black text-white py-3 px-5 rounded-3xl">
                Sign up
              </button>
            </Link>
          </>
        ) : (
          <>
            <div className="flex items-center gap-3">
              {/* <button
                className="logout bg-black text-white py-3 px-3 rounded-3xl btn"
                onClick={() => {
                  navigate(`/${TAB_NAMES.profile}`);
                }}
              >
                <LuUser />
              </button> */}
              <Popover
                trigger={"click"}
                content={
                  // <List
                  //   style={{ width: "15vw" }}
                  //   // header={<div>Header</div>}
                  //   // footer={<div>Sign out</div>}
                  //   // bordered
                  //   dataSource={data}
                  //   renderItem={(item) => (
                  //     <List.Item style={{ fontSize: "18px" }}>{item}</List.Item>
                  //   )}
                  // />
                  <Space
                    direction={"vertical"}
                    style={{ alignItems: "center" }}
                  >
                    <Avatar
                      size={40}
                      style={{
                        background: "black",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        navigate(`/${user.username}`);
                      }}
                      icon={<LuUser />}
                    />
                    <Typography.Title level={4}>
                      Saumya Borwankar
                    </Typography.Title>

                    <Menu
                      onClick={onClick}
                      style={{ width: 256, border: "none" }}
                      defaultSelectedKeys={["1"]}
                      defaultOpenKeys={["sub1"]}
                      // mode="inline"
                      items={items}
                    />
                  </Space>
                }
              >
                <Avatar
                  size={40}
                  style={{
                    background: "black",
                    cursor: "pointer",
                  }}
                  icon={<LuUser />}
                />
              </Popover>

              {/* <button
                className="logout bg-black text-white py-3 px-5 rounded-3xl btn"
                onClick={() => {}}
              >
                Logout
              </button> */}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Head;
