import { DeleteOutlined, FileTextOutlined } from "@ant-design/icons";
import {
  Button,
  Form,
  Input,
  InputNumber,
  Modal,
  Popconfirm,
  Space,
  Table,
  TableProps,
  Tag,
  theme,
  Tooltip,
  Typography,
} from "antd";
import z from "zod";
import { useState } from "react";
import { FiPlus } from "react-icons/fi";
import { useAppSelector } from "../../store/hooks";
import { PageContent } from "../atoms/PageContent";
import { createSchemaFieldRule } from "antd-zod";
import { BlockButton } from "../atoms/BlockButton";
import { PRIMARY_COLOR } from "../atoms/constants";
export const Clients = () => {
  const [newClient, setNewClient] = useState<boolean>(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  let clients = useAppSelector((state) => state.clients);
  if (clients.length == 0) {
    clients = [
      {
        id: "1",
        userId: "1",
        firstName: "Saumya",
        lastName: "Borwankar",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        email: "thesaumyaborwankar@gmail.com",
        phoneNumber: "+91 8488897431",
      },
    ];
  }
  interface formDetail {
    firstName: string;
    lastName: string;
    userId: string;
    age: number;
    address: string;
    email: string;
  }
  interface DataType {
    key: string;
    name: string;
    age: number;
    address: string;
    tags: string[];
  }
  // Client name, date added, Next Appointment, Appointments, Actions,
  const columns: TableProps<DataType>["columns"] = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Tags",
      key: "tags",
      dataIndex: "tags",
      render: (_, { tags }) => (
        <>
          {tags.map((tag) => {
            let color = tag.length > 5 ? "geekblue" : "green";
            if (tag === "loser") {
              color = "volcano";
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Tooltip title={"Notes"}>
            <Button icon={<FileTextOutlined />} />
          </Tooltip>
          <Popconfirm title="Are you sure you want to delete this client?">
            <Button danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const data: DataType[] = clients.map((c, id) => {
    return {
      key: id.toString(),
      name: c.firstName + " " + c.lastName,
      age: c.age,
      address: c.address,
      tags: ["nice"],
    };
  });

  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
    getCheckboxProps: (record: DataType) => ({
      disabled: record.name === "Disabled User", // Column configuration not to be checked
      name: record.name,
    }),
  };
  const NewClientValidation = z.object({
    firstName: z.string(),
    LastName: z.string(),
    age: z.number(),
    address: z.string(),
    email: z.string().email({ message: "Email not valid" }),
  });
  const rule = createSchemaFieldRule(NewClientValidation);
  const handleNewClient = (data: formDetail) => {
    console.log(data);
  };
  return (
    <>
      <Modal
        open={newClient}
        title="Add a new Client"
        onCancel={() => setNewClient(false)}
      >
        <Form
          layout="vertical"
          onFinish={handleNewClient}
          style={{ width: "100%" }}
        >
          <div className="flex justify-between">
            <Form.Item label="First Name" name="firstName" rules={[rule]}>
              <Input
                id="firstName"
                type="text"
                placeholder="Enter first name"
              ></Input>
            </Form.Item>
            <Form.Item label="Last Name" name="lastName" rules={[rule]}>
              <Input
                id="lastName"
                type="text"
                placeholder="Enter last name"
              ></Input>
            </Form.Item>
          </div>
          <div className="flex ">
            <div className="grow m-auto">
              <Form.Item label="Email" name="email" rules={[rule]}>
                <Input
                  id="email"
                  type="text"
                  placeholder="Enter your email"
                ></Input>
              </Form.Item>
            </div>
            <div className="grow-0">
              <Form.Item label="Age" name="age" rules={[rule]}>
                <InputNumber
                  id="age"
                  min={10}
                  max={100}
                  defaultValue={25}
                ></InputNumber>
              </Form.Item>
            </div>
          </div>

          <Form.Item
            label="Password"
            name="password"
            style={{ marginTop: "-10px" }}
            rules={[rule]}
          >
            <Input
              id="password"
              type="password"
              placeholder="Enter the password"
              autoComplete="current-password"
            ></Input>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Add Client
            </Button>
          </Form.Item>
          {/* <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <a>Forgot password?</a>
            <Form.Item style={{ width: "40%" }}>
              <BlockButton
                block
                type="primary"
                htmlType="submit"
                style={{
                  fontSize: "1rem",
                  fontWeight: "500",
                  backgroundColor: PRIMARY_COLOR,
                  height: "36px",
                }}
              >
                Sign In
              </BlockButton>
            </Form.Item>
          </div> */}
        </Form>
      </Modal>
      <PageContent>
        <div className="flex justify-between mb-5">
          <Typography.Title level={4}>Clients</Typography.Title>
          <Button
            type="primary"
            style={{ color: "white" }}
            icon={<FiPlus />}
            onClick={() => setNewClient(true)}
          >
            Add Client
          </Button>
        </div>

        <Table
          rowSelection={{
            type: "checkbox",
            ...rowSelection,
          }}
          columns={columns}
          dataSource={data}
        />
      </PageContent>
    </>
  );
};
