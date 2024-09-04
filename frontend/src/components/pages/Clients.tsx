import {
  Button,
  Popconfirm,
  Space,
  Table,
  TableProps,
  Tag,
  theme,
  Tooltip,
  Typography,
} from "antd";
import { PageContent } from "../atoms/PageContent";
import { useAppSelector } from "../../store/hooks";
import { FiPlus, FiPlusSquare } from "react-icons/fi";
import { FIRST_GRADIENT } from "../atoms/constants";
import { MdDelete, MdOutlineDelete } from "react-icons/md";
import { DeleteOutlined, FileTextOutlined } from "@ant-design/icons";
export const Clients = () => {
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
      age: 25,
      address: c.userId,
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
  return (
    <PageContent>
      <div className="flex justify-between mb-5">
        <Typography.Title level={4}>Clients</Typography.Title>
        <Button type="primary" style={{ color: "white" }} icon={<FiPlus />}>
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
  );
};
