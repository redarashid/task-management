import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Form, Space, Table, Input, Modal, Popconfirm } from "antd";
import { useState } from "react";

const columns = (onEdit, onDelete) => [
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
      { text: "London", value: "London" },
      { text: "New York", value: "New York" },
    ],
    onFilter: (value, record) => record.address.indexOf(value) === 0,
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <a className="hover:text-yellow-800" onClick={() => onEdit(record)}>
          <EditOutlined />
        </a>
        <Popconfirm
          title="Are you sure to delete this record?"
          onConfirm={() => onDelete(record.key)}
          okText="Yes"
          cancelText="No">
          <a className="hover:text-red-500">
            <DeleteOutlined />
          </a>
        </Popconfirm>
      </Space>
    ),
  },
];

const DataTable = () => {
  const [data, setData] = useState(
    Array.from({ length: 10 }).map((_, i) => ({
      key: i,
      name: `John Brown ${i}`,
      age: Number(`${i}2`),
      address: `New York No. ${i} Lake Park`,
      description: `My name is John Brown, I am ${i}2 years old, living in New York No. ${i} Lake Park.`,
    }))
  );

  const [editingRecord, setEditingRecord] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRowKey, setSelectedRowKey] = useState(null); // تخزين الصف المحدد

  // فتح النافذة للتعديل
  const handleEdit = (record) => {
    setEditingRecord(record);
    setIsModalVisible(true);
  };

  // حذف السجل
  const handleDelete = (key) => {
    setData((prevData) => prevData.filter((item) => item.key !== key));
  };

  // حفظ التعديلات
  const handleSave = () => {
    setData((prevData) =>
      prevData.map((item) =>
        item.key === editingRecord.key ? editingRecord : item
      )
    );
    setIsModalVisible(false);
  };

  // إلغاء التعديل
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // إعداد اختيار الصفوف
  const rowSelection = {
    type: "radio",
    selectedRowKeys: selectedRowKey !== null ? [selectedRowKey] : [],
    onChange: (selectedKeys) => {
      setSelectedRowKey(selectedKeys[0]); // تحديث الصف المحدد
    },
  };

  return (
    <div className=" px-6 ">
      <div className=" border border-gray-200">
        <Table
          rowSelection={rowSelection}
          columns={columns(handleEdit, handleDelete)}
          dataSource={data}
          pagination={{ position: ["none", "bottomRight"] }}
        />
      </div>

      <Modal
        title="Edit Record"
        visible={isModalVisible}
        onOk={handleSave}
        onCancel={handleCancel}>
        <Form layout="vertical">
          <Form.Item label="Name">
            <Input
              value={editingRecord?.name}
              onChange={(e) =>
                setEditingRecord({ ...editingRecord, name: e.target.value })
              }
            />
          </Form.Item>
          <Form.Item label="Age">
            <Input
              value={editingRecord?.age}
              onChange={(e) =>
                setEditingRecord({ ...editingRecord, age: e.target.value })
              }
            />
          </Form.Item>
          <Form.Item label="Address">
            <Input
              value={editingRecord?.address}
              onChange={(e) =>
                setEditingRecord({ ...editingRecord, address: e.target.value })
              }
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default DataTable;
