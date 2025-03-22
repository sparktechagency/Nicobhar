"use client"

import { Avatar, Button, Card, Form, Input, Tabs, Typography } from "antd"
import { UserOutlined } from "@ant-design/icons"
import profileimg from '../../assets/profileimg.png'
const { Title, Text } = Typography
const { TabPane } = Tabs

export default function AdminProfile() {
  const [form] = Form.useForm()

  const onFinish = (values) => {
    console.log("Success:", values)
  }

  return (
    <div className="container mx-auto py-6 h-screen bg-gray-100">
      <Card className="max-w-2xl mx-auto bg-gray-100 ">
        <div className="text-center pb-8  bg-white rounded-lg p-4 ">
          <div className="flex flex-col items-center gap-2">
            <Avatar
              size={96}
              src={profileimg}
              icon={<UserOutlined />}
            />
            <div>
              <h3  className="text-[#000000] text-[30px] font-semibold" style={{ marginBottom: 0 }}>
                Jhon Doe
              </h3>
              <p className="text-[#B1A8A8] text-[20px]">example@gmail.com</p>
            </div>
          </div>
        </div>

        <Tabs defaultActiveKey="edit-profile" centered>
          <TabPane tab="Edit Profile" key="edit-profile">
            <Form form={form} layout="vertical" onFinish={onFinish} className="">
              <Form.Item label="Name" name="name" rules={[{ required: true, message: "Please input your name!" }]}>
                <Input style={{ width: "100%", height: "40px" }} placeholder="Jhon Doe" />
              </Form.Item>

              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: "Please input your email!" },
                  { type: "email", message: "Please enter a valid email!" },
                ]}
              >
                <Input style={{ width: "100%", height: "40px" }} placeholder="example@gmail.com" />
              </Form.Item>

              <Form.Item>
                <Button style={{ width: "100%", height: "40px",fontSize:"16px",fontWeight:"600" }} type="primary" htmlType="submit" danger block>
                  Save
                </Button>
              </Form.Item>
            </Form>
          </TabPane>

          <TabPane tab="Change Password" key="change-password">
            <Form form={form} layout="vertical" onFinish={onFinish} className="">
              <Form.Item
                label="Current Password"
                name="currentPassword"
                rules={[{ required: true, message: "Please input your current password!" }]}
              >
                <Input.Password style={{ width: "100%", height: "40px" }} placeholder="******" />
              </Form.Item>

              <Form.Item
                label="New Password"
                name="newPassword"
                rules={[{ required: true, message: "Please input your new password!" }]}
              >
                <Input.Password style={{ width: "100%", height: "40px" }} placeholder="******" />
              </Form.Item>

              <Form.Item
                label="Confirm New Password"
                name="confirmPassword"
                dependencies={["newPassword"]}
                rules={[
                  { required: true, message: "Please confirm your new password!" },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("newPassword") === value) {
                        return Promise.resolve()
                      }
                      return Promise.reject(new Error("The two passwords do not match!"))
                    },
                  }),
                ]}
              >
                <Input.Password style={{ width: "100%", height: "40px" }} placeholder="******" />
              </Form.Item>

              <Form.Item>
                <Button style={{ width: "100%", height: "40px" }} placeholder="******" type="primary" htmlType="submit" danger block>
                  Save
                </Button>
              </Form.Item>
            </Form>
          </TabPane>
        </Tabs>
      </Card>
    </div>
  )
}

