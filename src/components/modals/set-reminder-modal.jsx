import { useState, useEffect } from "react";
import { Modal, Select, DatePicker, Button, Form } from "antd";
import { useGetAssetsQuery } from "../../redux/features/maintainance/maintainApi";
import dayjs from "dayjs"; // Import dayjs for date handling

const SetReminderModal = ({ isOpen, onClose, onSetReminder }) => {
  const [form] = Form.useForm();
  const { data, isLoading } = useGetAssetsQuery();

  // Set initial values for the form when the modal opens or data changes
  //   useEffect(() => {
  //     if (isOpen) {
  //       form.setFieldsValue({
  //         assetName: "ViewSonic", // Initial value for assetName
  //         catName: "Monthly", // Initial value for catName
  //         lastMaintenanceDate: null,
  //         nextScheduleDate: null,
  //       });
  //     }
  //   }, [isOpen, form]);

  if (isLoading) {
    return <>Loading..</>;
  }

  const assetOptions = data?.data?.map((item) => ({
    value: item.id,
    label: item.product,
  }));

  const catOptions = [
    { value: "Weekly", label: "Weekly" },
    { value: "Monthly", label: "Monthly" },
    { value: "Yearly", label: "Yearly" },
  ];

  const handleFinish = (values) => {
    // Format dates to a consistent string format before sending
    const formattedValues = {
      ...values,
      lastMaintenanceDate: values.lastMaintenanceDate
        ? values.lastMaintenanceDate.format("YYYY-MM-DD")
        : null,
      nextScheduleDate: values.nextScheduleDate
        ? values.nextScheduleDate.format("YYYY-MM-DD")
        : null,
    };
    localStorage.setItem(
      "reminder_reminder",
      JSON.stringify({
        asset_id: formattedValues?.assetName,
        last_maintainance: formattedValues.lastMaintenanceDate,
        next_schedule: formattedValues?.nextScheduleDate,
        reminder_category: formattedValues?.catName,
      })
    );
    onSetReminder();
    form.resetFields(); // Reset form fields after successful submission
  };

  const handleCancel = () => {
    form.resetFields(); // Reset form fields on cancel
    onClose();
  };

  return (
    <Modal
      centered
      open={isOpen}
      onCancel={handleCancel}
      footer={null}
      width={800}
    >
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-white bg-secondary p-4 absolute top-0 left-0 rounded-t-lg w-full text-center">
          Set a Annual Reminder
        </h2>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleFinish}
          requiredMark={false}
          className=""
        >
          <div className="flex items-center justify-center gap-4 mt-16">
            <Form.Item
              label="Asset Name"
              name="assetName"
              rules={[{ required: true, message: "Please select an asset!" }]}
              className="w-full"
            >
              <Select
                placeholder="Select an Asset"
                style={{
                  width: "100%",
                  height: "44px",
                  borderRadius: "8px",
                  backgroundColor: "#F0F0F0",
                }}
                options={assetOptions}
              />
            </Form.Item>
            <Form.Item
              label="Last Maintenance Date"
              name="lastMaintenanceDate"
              rules={[{ required: true, message: "Please select a date!" }]}
              className="w-full"
            >
              <DatePicker
                style={{
                  width: "100%",
                  height: "44px",
                  borderRadius: "8px",
                  marginTop: "8px",
                }}
              />
            </Form.Item>
          </div>

          <div className="flex items-center justify-center gap-4">
            <Form.Item
              label="Next Schedule Date"
              name="nextScheduleDate"
              rules={[{ required: true, message: "Please select a date!" }]}
              className="w-full"
            >
              <DatePicker
                style={{
                  width: "100%",
                  height: "44px",
                  borderRadius: "8px",
                }}
              />
            </Form.Item>
            <Form.Item
              label="Reminder category"
              name="catName"
              rules={[{ required: true, message: "Please select a category!" }]}
              className="w-full"
            >
              <Select
                style={{
                  width: "100%",
                  height: "44px",
                  borderRadius: "8px",
                  backgroundColor: "#F0F0F0",
                }}
                placeholder="Select a category"
                options={catOptions}
              />
            </Form.Item>
          </div>

          <div className="flex justify-center">
            <Button
              style={{ height: "44px", width: "30%" }}
              type="primary"
              danger
              block
              htmlType="submit"
            >
              Set Reminder
            </Button>
          </div>
        </Form>
      </div>
    </Modal>
  );
};

export default SetReminderModal;
