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
import { useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { PageContent } from "../atoms/PageContent";
import { createSchemaFieldRule } from "antd-zod";
import { BlockButton } from "../atoms/BlockButton";
import { PRIMARY_COLOR } from "../atoms/constants";
import TextArea from "antd/es/input/TextArea";
import {
  useAddClientMutation,
  useGetClientsQuery,
} from "../../store/rtk-api/clientApi";
import { setClients } from "../../store/slice/clientSlice";
import { LoadingState } from "../atoms/LoadingState";

export const Clients = () => {
  const dispatch = useAppDispatch();
  let clients = useAppSelector((state) => state.clients);
  const [newClient, setNewClient] = useState<boolean>(false);
  const {
    data: clientData,
    isSuccess,
    isError,
    isLoading,
  } = useGetClientsQuery();

  const [
    triggerAddNewClient,
    {
      data: addedClient,
      isSuccess: addClientSuccess,
      isLoading: addClientLoading,
      isError: addClientError,
    },
  ] = useAddClientMutation();

  useEffect(() => {
    if (isSuccess && clientData) {
      dispatch(setClients(clientData));
    }
  }, [isSuccess, isError]);

  useEffect(() => {
    if (addClientSuccess && addedClient) {
      dispatch(setClients([...clients, addedClient]));
    }
  }, [addClientSuccess, addClientError]);

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
    dateAdded: string;
    // tags: string[];
  }
  // Client name, date added, Next Appointment, Appointments, Actions,
  const columns: TableProps<DataType>["columns"] = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      // render: (text) => <a >{text}</a>,
      render: (_, record) => (
        <a href={`/clients/notes/${record.key}`}>{record.name}</a>
      ),
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Date Added",
      dataIndex: "dateAdded",
      key: "dateAdded",
    },
    // {
    //   title: "Tags",
    //   key: "tags",
    //   dataIndex: "tags",
    //   render: (_, { tags }) => (
    //     <>
    //       {tags.map((tag) => {
    //         let color = tag.length > 5 ? "geekblue" : "green";
    //         if (tag === "loser") {
    //           color = "volcano";
    //         }
    //         return (
    //           <Tag color={color} key={tag}>
    //             {tag.toUpperCase()}
    //           </Tag>
    //         );
    //       })}
    //     </>
    //   ),
    // },
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
      key: c.id.toString(),
      name: c.firstName + " " + c.lastName,
      age: c.age,
      dateAdded: new Date(c.createdAt).toDateString(),
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
    email: z.string().email({ message: "Email not valid" }),
  });
  const rule = createSchemaFieldRule(NewClientValidation);
  const handleNewClient = (data: formDetail) => {
    triggerAddNewClient(data);
  };

  return (
    <>
      <Modal
        open={newClient}
        title="Add a new Client"
        onCancel={() => setNewClient(false)}
        footer={[]}
        // style={{ minWidth: "30vw" }}
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
          <div className="flex justify-between">
            {/* <div className="grow m-auto"> */}
            <Form.Item
              label="Email"
              name="email"
              rules={[rule]}
              style={{ flexGrow: 1, marginRight: "20px" }}
            >
              <Input
                id="email"
                type="text"
                placeholder="Enter your email"
              ></Input>
            </Form.Item>
            {/* </div> */}
            {/* <div className="grow-0"> */}
            <Form.Item
              label="Age"
              name="age"
              rules={[rule]}
              style={{ flexGrow: 0 }}
            >
              <InputNumber
                id="age"
                min={10}
                max={100}
                defaultValue={25}
                // style={{ flexGrow: 0 }}
              ></InputNumber>
            </Form.Item>
            {/* </div> */}
          </div>

          <Form.Item
            label="Address"
            name="address"
            style={{ marginTop: "-10px" }}
            rules={[rule]}
          >
            <TextArea
              id="address"
              rows={4}
              placeholder="Enter address"
              maxLength={250}
              allowClear
            />
          </Form.Item>
          <Form.Item style={{ textAlign: "right" }}>
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
      {isLoading ? (
        <LoadingState />
      ) : (
        <PageContent
          title="Clients"
          extra={
            <Button
              type="primary"
              style={{ color: "white" }}
              icon={<FiPlus />}
              onClick={() => setNewClient(true)}
            >
              Add Client
            </Button>
          }
        >
          <Table
            // rowSelection={{
            //   type: "checkbox",
            //   ...rowSelection,
            // }}
            columns={columns}
            dataSource={data}
            // style={{ maxHeight: "60vh", overflow: "auto" }}
            pagination={{ pageSize: 10 }}
            scroll={{ y: 500 }}
          />
        </PageContent>
      )}
    </>
  );
};
