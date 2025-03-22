
import { Button, Card, Checkbox, Form, Input, Typography } from "antd"
import { Link, useNavigate } from "react-router-dom"


const { Title, Text } = Typography

export default function ResetPassword() {
  const [form] = Form.useForm()
const navigate =useNavigate();
  const onFinish = (values) => {
    console.log("Success:", values)
    navigate('/otp-verification')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-[600px] px-[70px] py-[50px] shadow-lg border-[2px] border-[#FEFEFE] ">
        <div className="text-center mb-8">
          <Title level={3} style={{ marginBottom: "16px", fontSize: "24px", fontWeight: "600", color: "#333333" }}>
          Forgot password ?
          </Title>
         
        </div>

        <Form form={form} layout="vertical" onFinish={onFinish} requiredMark={false}>
          <Form.Item
            label={<p className="text-[#636363] text-[16px] font-medium">Email</p>}
            name="email"
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "Please enter a valid email!" },
            ]}
          >
            <Input placeholder="mehedi@gmail.com" size="large" />
          </Form.Item>

   
          <Form.Item>
            <div className="w-fit mx-auto">
              <Button style={{ backgroundColor: "#1877F2", borderColor: '#1877F2', height: '44px' }} type="primary" htmlType="submit" block size="large" className="">
              Send Code
              </Button>

            </div>
          </Form.Item>

        </Form>
      </Card>
    </div>
  )
}

