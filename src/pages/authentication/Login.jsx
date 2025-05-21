
import { Button, Card, Checkbox, Form, Input, Typography } from "antd"
import { Link, useNavigate } from "react-router-dom"
import { useLoginMutation } from "../../redux/features/auth/authApi"
import toast from "react-hot-toast"
import { useDispatch } from "react-redux"
import { setUser } from "../../redux/features/auth/authSlice"



const { Title, Text } = Typography

export default function Login() {
  const [form] = Form.useForm()
  const navigate = useNavigate()



  const [login] = useLoginMutation()
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    const userInfo = {
      email: values.email,
      password: values.password,
    };

    try {
      const res = await login(userInfo).unwrap();

      if (res?.access_token) {
        const { user_information, access_token } = res;

        dispatch(setUser({ user: user_information, token: access_token }));
        if (user_information.role === 'super_admin') {
          navigate('/');
        } else if (user_information.role === 'support_agent') {
          navigate('/support-agent');
        } else if (user_information.role === 'location_employee') {
          navigate('/location-employee')
        }else if (user_information.role === 'third_party') {
          navigate('/thirdparty')
        }else if (user_information.role === 'organization') {
          navigate('/organization')
        } else {
          navigate('/unauthorized')
        }
      }
    } catch (error) {
      if (error) {
        toast.error(error?.data?.message)
      }
    }
  };




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
                Sign in
              </Button>

            </div>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

