
import { Button, Card, Checkbox, Form, Input, Typography } from "antd"
import { Link, useNavigate } from "react-router-dom"


const { Title, Text } = Typography

export default function CreateNewPassword() {
  const [form] = Form.useForm()
const navigate =useNavigate();
  const onFinish = (values) => {
    console.log("Success:", values)
    navigate('/')
  }
           
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-[600px] px-[70px] py-[50px] shadow-lg border-[2px] border-[#FEFEFE] ">
        <div className="text-center mb-8">
          <Title level={3} style={{ marginBottom: "16px", fontSize: "24px", fontWeight: "600", color: "#333333" }}>
          Set a new password
          </Title>
          <Text style={{ fontSize: "14px", color: '#5C5C5C', marginBottom: "8px" }} type="secondary">Create a new password. Ensure it differs from
          previous ones for security</Text>
        </div>

        <Form form={form} layout="vertical" onFinish={onFinish} requiredMark={false}>
 

          <Form.Item
            label={<p className="text-[#636363] text-[16px] font-medium">Password</p>}
            name="newpassword"
            rules={[
              { required: true, message: "Please input your password!" },
              { min: 6, message: "Password must be at least 6 characters!" },
            ]}
          >
            <Input.Password placeholder="••••••••••" size="large" />
          </Form.Item>

          <Form.Item
            label={<p className="text-[#636363] text-[16px] font-medium">Confirm Password</p>}
            name="confirmPassword"
            dependencies={["newpassword"]}
            rules={[
              { required: true, message: "Please confirm your password!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("newpassword") === value) {
                    return Promise.resolve()
                  }
                  return Promise.reject(new Error("The passwords do not match!"))
                },
              }),
            ]}
          >
            <Input.Password placeholder="••••••••••" size="large" />
          </Form.Item>

     

          <Form.Item>
            <div className="w-fit mx-auto">
              <Button style={{ backgroundColor: "#1877F2", borderColor: '#1877F2', height: '44px' }} type="primary" htmlType="submit" block size="large" className="">
              Update Password
              </Button>

            </div>
          </Form.Item>


        </Form>
      </Card>
    </div>
  )
}

