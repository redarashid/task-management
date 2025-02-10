import { useState } from "react";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Form, Space, Table, Input, Modal } from "antd";

const columns = (onEdit) => [
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
    render: (_, record) => (
      <Space size="middle">
        <a
          className="hover:text-yellow-800"
          onClick={() => onEdit(record)} // استدعاء دالة التعديل
        >
          <Space>
            <EditOutlined />
          </Space>
        </a>
        <a className="hover:text-red-500">
          <DeleteOutlined />
        </a>
      </Space>
    ),
  },
];

const DataTable = () => {
  const [data, setData] = useState(
    Array.from({ length: 10 }).map((_, i) => ({
      key: i,
      name: "John Brown",
      age: Number(`${i}2`),
      address: `New York No. ${i} Lake Park`,
      description: `My name is John Brown, I am ${i}2 years old, living in New York No. ${i} Lake Park.`,
    }))
  );
  const [editingRecord, setEditingRecord] = useState(null); // السجل الحالي للتعديل
  const [isModalVisible, setIsModalVisible] = useState(false);

  // دالة فتح النموذج للتعديل
  const handleEdit = (record) => {
    setEditingRecord(record); // تحديد السجل الذي سيتم تعديله
    setIsModalVisible(true); // فتح النافذة المنبثقة
  };

  // دالة حفظ التعديلات
  const handleSave = () => {
    setData((prevData) =>
      prevData.map((item) =>
        item.key === editingRecord.key ? editingRecord : item
      )
    );
    setIsModalVisible(false); // غلق النافذة المنبثقة
  };

  // دالة إلغاء التعديل
  const handleCancel = () => {
    setIsModalVisible(false); // غلق النافذة المنبثقة
  };

  return (
    <>
      <Table
        columns={columns(handleEdit)} // تمرير دالة التعديل للعمود
        dataSource={data}
        pagination={{
          position: ["none", "bottomRight"],
        }}
      />

      <Modal
        title="Edit Record"
        visible={isModalVisible}
        onOk={handleSave} // استدعاء دالة الحفظ عند الضغط على OK
        onCancel={handleCancel} // استدعاء دالة الإلغاء عند الضغط على Cancel
      >
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
    </>
  );
};

export default DataTable;
