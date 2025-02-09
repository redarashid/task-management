import { CalendarOutlined, CheckCircleOutlined } from "@ant-design/icons";
import { useState } from "react";
import { Form, Input } from "antd";
import { Button, ConfigProvider, Flex } from 'antd';
import { useResponsive } from 'antd-style';

const Header = () => {
  const [componentSize, setComponentSize] = useState("default");
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  const { xxl } = useResponsive();


  return (
    <section className=" ">
      <div className=" bg-gray-900 sm:px-8 py-5 border border-gray-700 mb-8 ">
        <div className="flex justify-between flex-col sm:flex-row items-center gap-4">
          <h1 className="  font-bold text-2xl text-white">
            Task Management Dashboard
          </h1>
          <div>
            <div className=" flex flex-col sm:flex-row gap-4 sm:gap-6 sm:items-center items-center sm:justify-end w-full sm:w-auto">
              <div className=" flex items-center gap-2 text-white">
                <CalendarOutlined size={20} />
                <p className=" text-white">Total:</p>
              </div>
              <div className=" flex items-center gap-2 text-white">
                <CheckCircleOutlined size={20} />
                <p className=" text-white">Completed:</p>
              </div>
              <div className=" flex items-center gap-2 text-white">
                <CalendarOutlined size={20} />
                <p className=" text-white">Pending:</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className=" flex justify-between">
        <Form
        className=" min-w-[30%]"
          labelCol={{
            span: 4,
          }}
          wrapperCol={{
            span: 14,
          }}
          layout="horizontal"
          initialValues={{
            size: componentSize,
          }}
          onValuesChange={onFormLayoutChange}
          size={componentSize}
          style={{
            maxWidth: 600,
          }}>
          <Form.Item className="px-8 min-w-100">
            <Input placeholder=" Filter tasks..." />
          </Form.Item>
        </Form>

        <div>
          <ConfigProvider componentSize={xxl ? "middle" : "small"}>
            <Flex vertical gap="small">
              <Flex gap="small" wrap>
                <Button className=" font-bold px-8 py-4 mr-5" color="default" variant="solid">
                  Add Task
                </Button>
              </Flex>
            </Flex>
          </ConfigProvider>
        </div>
      </div>
    </section>
  );
};

export default Header;
