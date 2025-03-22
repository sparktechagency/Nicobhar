

import React from 'react'
import {
    Button,
    Input,
    Select,
    Form,
    Typography,
    Space
} from 'antd'
import { LeftOutlined } from '@ant-design/icons'

const { Title, Text } = Typography
const { TextArea } = Input

export default function CreateInspectionPage() {
    const [form] = Form.useForm()

    const technicians = [
        { value: 'md-abid', label: 'Md. Abid' },
        { value: 'md-josef', label: 'Md. Josef' },
        { value: 'abir', label: 'Abir' },
        { value: 'midul', label: 'Midul' },
        { value: 'imran', label: 'Imran' },
    ]
    const status = [
        { value: 'NEW', label: 'NEW' },
        { value: 'OPEN', label: 'OPEN' },
        
    ]

    const onFinish = (values) => {
        console.log('Form values:', values)
    }

    return (
        <div className=" p-6">
            {/* Back Button */}
            <Button
                style={{ backgroundColor: 'transparent' }}
                icon={<svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="18" cy="18" r="18" fill="#D9D9D9" />
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M14.6668 19.3332L21.3336 26L23 24.3336L17.1664 18.5L23 12.6664L21.3336 11L14.6668 17.6668C14.4459 17.8878 14.3217 18.1875 14.3217 18.5C14.3217 18.8125 14.4459 19.1122 14.6668 19.3332Z" fill="black" />
                </svg>
                }
                type="text"
                className="mb-6 text-xl text-[500] text-[#000000]"
                onClick={() => window.history.back()}
            >
                Back To Sheets
            </Button>

            {/* Header */}
            <div className="text-center mb-8">
                <p className='text-[20px] text-primary font-semibold '>
                    Create Inspection Sheet For <span className='text-secondary font-semibold'>ViewSonic</span> (HFGS647HNSJU)
                </p>
            </div>

            {/* Form */}
            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Left Column */}
                    <Form.Item
                        label="Asset"
                        name="asset"
                        initialValue="Monitor"
                    >
                        <Input style={{ width: '100%', height: '44px' }} />
                    </Form.Item>

                    {/* Right Column */}
                    <Form.Item
                        label="Serial Number"
                        name="serialNumber"
                        initialValue="HFGS647HNSJU"
                    >
                        <Input style={{ width: '100%', height: '44px' }} />
                    </Form.Item>

                    {/* Organization */}
                    <Form.Item
                        label="Organization"
                        name="organization"
                        initialValue="ViewSonic"
                    >
                        <Input style={{ width: '100%', height: '44px' }} />
                    </Form.Item>

                    {/* Location */}
                    <Form.Item
                        label="Location"
                        name="location"
                        initialValue="Rampura, Dhaka"
                    >
                        <Input style={{ width: '100%', height: '44px' }} />
                    </Form.Item>
                </div>

                {/* Problem */}
                <Form.Item
                    label="Problem"
                    name="problem"
                    className="mb-6"
                >
                    <TextArea
                        rows={6}
                        placeholder="Describe the problem here..."
                        defaultValue="Lorem ipsum dolor sit amet consectetur. Dolor proin metus id mattis a ipsum habitasse tellus. Ultrices in donec ac nisl. Quam gravida id vitae faucibus mauris sodales tempor feugiat laoreet. Eros placerat semper eleifend praesent posuere vitae lorem malesuada nulla. Suspendisse in sagittis euismod lectus purus consectetur laoreet pharetra. Ut aliquam sapien aliquam vel tortor amet. Pellentesque arcu donec ullamcorper tortor massa lacus massa. Ultrices nisl massa in habitant dui. Laoreet ipsum dolor nulla elementum lectus."
                    />
                </Form.Item>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Assign Technician */}
                    <Form.Item
                        label="Assign Technician"
                        name="technician"
                    >
                        <Select
                            style={{ width: '100%', height: '44px' }}
                            showSearch
                            placeholder="Search technician"
                            options={technicians}
                            filterOption={(input, option) =>
                                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                            }
                        />
                    </Form.Item>

                    {/* Comment */}
                    <Form.Item
                        label="Comment"
                        name="comment"
                    >
                        <Input style={{ width: '100%', height: '44px' }} placeholder="Add your comment" />
                    </Form.Item>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Form.Item
                        label="Status"
                        name="Status"
                    >
                        <Select
                            style={{ width: '100%', height: '44px' }}
                         
                            placeholder="New"
                            options={status}
                            filterOption={(input, option) =>
                                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                            }
                        />
                    </Form.Item>

                    <Form.Item className="mt-6">
                        <Button
                            style={{ width: '100%', height: '44px', fontSize: '16px', fontWeight: '500' }}
                            type="primary"
                            danger
                            htmlType="submit"
                            block
                        >
                            Send To Technician
                        </Button>
                    </Form.Item>

                </div>
                {/* Submit Button */}
            </Form>
        </div>
    )
}
