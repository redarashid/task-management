import { useState } from "react";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Form, Space, Table } from "antd";
const columns = [
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Age",
    dataIndex: "age",
    sorter: (a, b) => a.age - b.age,
  },
  {
    title: "Address",
    dataIndex: "address",
    filters: [
      {
        text: "London",
        value: "London",
      },
      {
        text: "New York",
        value: "New York",
      },
    ],
    onFilter: (value, record) => record.address.indexOf(value) === 0,
  },
  {
    title: "Action",
    key: "action",
    sorter: true,
    render: () => (
      <Space size="middle">
        <a className=" hover:text-red-500">
          <DeleteOutlined />
        </a>
        <a className=" hover:text-yellow-800">
          <Space>
            <EditOutlined />
          </Space>
        </a>
      </Space>
    ),
  },
];
const data = Array.from({
  length: 10,
}).map((_, i) => ({
  key: i,
  name: "John Brown",
  age: Number(`${i}2`),
  address: `New York No. ${i} Lake Park`,
  description: `My name is John Brown, I am ${i}2 years old, living in New York No. ${i} Lake Park.`,
}));
const defaultExpandable = {
  expandedRowRender: (record) => <p>{record.description}</p>,
};
const defaultTitle = () => "Here is title";

const DataTable = () => {
  const [bordered] = useState(false);
  const [loading] = useState(false);
  const [size] = useState("large");
  const [expandable] = useState(defaultExpandable);
  const [showTitle] = useState(false);
  const [showHeader] = useState(true);
  const [rowSelection] = useState({});
  const [hasData] = useState(true);
  const [tableLayout] = useState("unset");
  const [top] = useState("none");
  const [bottom] = useState("bottomRight");
  const [ellipsis] = useState(false);
  const [yScroll] = useState(false);
  const [xScroll] = useState("unset");

  const scroll = {};
  if (yScroll) {
    scroll.y = 240;
  }
  if (xScroll !== "unset") {
    scroll.x = "100vw";
  }
  const tableColumns = columns.map((item) => ({
    ...item,
    ellipsis,
  }));
  if (xScroll === "fixed") {
    tableColumns[0].fixed = true;
    tableColumns[tableColumns.length - 1].fixed = "right";
  }
  const tableProps = {
    bordered,
    loading,
    size,
    expandable,
    title: showTitle ? defaultTitle : undefined,
    showHeader,
    rowSelection,
    scroll,
    tableLayout: tableLayout === "unset" ? undefined : tableLayout,
  };
  return (
    <>
      <Form
        layout="inline"
        className="table-demo-control-bar"
        style={{
          marginBottom: 16,
        }}></Form>
      <Table
        {...tableProps}
        pagination={{
          position: [top, bottom],
        }}
        columns={tableColumns}
        dataSource={hasData ? data : []}
        scroll={scroll}
      />
    </>
  );
};

export default DataTable;
