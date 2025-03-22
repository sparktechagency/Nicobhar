

import { useState } from "react"
import { Modal, Form, Input, Select, Button } from "antd"
import { TextArea } from "antd/es/input"

const { Option } = Select

export function CreateReportModal() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [form] = Form.useForm()

  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
    form.resetFields()
  }

  const onFinish = (values) => {
    console.log("Form values:", values)
    setIsModalOpen(false)
    form.resetFields()
  }

  return (
    <>
      <Button
        type="primary"
        onClick={showModal}
        style={{
          backgroundColor: "#EF4444",
          display: "flex",
          alignItems: "center",
        }}
      >
        + Create Report
      </Button>
      <Modal
        title="Report For Standards (CHSE2019/USA)"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        width={500}
        centered
      >
        <Form form={form} layout="vertical" onFinish={onFinish} className="mt-4">
          <Form.Item
            name="assetName"
            label="Asset Name"
            rules={[{ required: true, message: "Please select an asset" }]}
          >
            <Select placeholder="Select asset">
              <Option value="monitor">Monitor</Option>
              <Option value="keyboard">Keyboard</Option>
              <Option value="mouse">Mouse</Option>
              <Option value="headphone">Headphone</Option>
              <Option value="cable">Cable</Option>
            </Select>
          </Form.Item>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            <Form.Item
              name="serialNumber"
              label="Serial Number"
              rules={[{ required: true, message: "Please input serial number" }]}
            >
              <Input placeholder="4K85H85H4H" />
            </Form.Item>

            <Form.Item
              name="assetLocation"
              label="Asset Location"
              rules={[{ required: true, message: "Please input asset location" }]}
            >
              <Input placeholder="Bangalore" />
            </Form.Item>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            <Form.Item
              name="maintenanceDate"
              label="Unit Maintenance Date"
              rules={[{ required: true, message: "Please select date" }]}
            >
              <Select placeholder="Select date">
                <Option value="today">Today</Option>
                <Option value="tomorrow">Tomorrow</Option>
                <Option value="next-week">Next Week</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="reportFor"
              label="Report For"
              rules={[{ required: true, message: "Please input report for" }]}
            >
              <Input placeholder="MA Abid" />
            </Form.Item>
          </div>

          <Form.Item
            name="reportDetails"
            label="Report Details"
            rules={[{ required: true, message: "Please input report details" }]}
          >
            <TextArea placeholder="Enter report details..." style={{ minHeight: 100 }} />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{
                width: "100%",
                backgroundColor: "#EF4444",
              }}
            >
              Create Report
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

