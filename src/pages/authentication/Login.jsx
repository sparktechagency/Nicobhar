
import { Button, Card, Checkbox, Form, Input, Typography } from "antd"
import { Link } from "react-router-dom"


const { Title, Text } = Typography

export default function Login() {
  const [form] = Form.useForm()

  const onFinish = (values) => {
    console.log("Success:", values)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-[600px] px-[70px] py-[50px] shadow-lg border-[2px] border-[#FEFEFE] ">
        <div className="text-center mb-8">
          <Title level={3} style={{ marginBottom: "16px", fontSize: "24px", fontWeight: "600", color: "#333333" }}>
          Log in to your account
          </Title>
          <Text style={{ fontSize: "14px", color: '#5C5C5C', marginBottom: "8px" }} type="secondary">Please enter your email and password to continue</Text>
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

          <Form.Item
            label={<p className="text-[#636363] text-[16px] font-medium">Password</p>}
            name="password"
            rules={[
              { required: true, message: "Please input your password!" },
              { min: 6, message: "Password must be at least 6 characters!" },
            ]}
          >
            <Input.Password placeholder="••••••••••" size="large" />
          </Form.Item>


          <Form.Item >
            <div className="flex items-center justify-between">

            <Checkbox style={{ color: "#636363", fontSize: '16px' }}>Remember Password</Checkbox>
            <Link to="/reset-password" className="text-[#1877F2] hover:text-[#1877F2] text-[16px] font-medium float-right">Forgot Password?</Link>
            </div>
          </Form.Item>

          <Form.Item>
            <div className="w-fit mx-auto">
              <Button style={{ backgroundColor: "#1877F2", borderColor: '#1877F2', height: '44px' }} type="primary" htmlType="submit" block size="large" className="">
                Sign up
              </Button>

            </div>
          </Form.Item>

          <div className="text-center">
            <Text style={{ fontSize: "16px", color: '#000000', fontWeight: '500' }}>
            Don’t have an account?{" "}
              <Link to="/signup" className="text-blue-500 hover:text-blue-600 ">
              Signup
              </Link>
            </Text>
          </div>
        </Form>
      </Card>
    </div>
  )
}

