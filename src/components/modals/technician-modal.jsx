import { Modal, Select, Button, message } from "antd";
import { useEffect, useState } from "react";
import {
  useGetTechnicianQuery,
  useSetReminderMutation,
} from "../../redux/features/maintainance/maintainApi";

const TechnicianModal = ({ isOpen, onClose }) => {
  const [reminderData, setReminderData] = useState(null);

  const { data } = useGetTechnicianQuery();
  const [selectedTech, setSelectedTech] = useState(null);
  const [setReminder] = useSetReminderMutation();
  const techs = data?.data?.map((item) => ({
    value: item.id,
    label: item.name,
  }));
  useEffect(() => {
    console.log(localStorage.getItem("reminder_reminder"));
    if (localStorage.getItem("reminder_reminder")) {
      setReminderData(JSON.parse(localStorage.getItem("reminder_reminder")));
    }
  }, []);
  const handleSubmit = async () => {
    console.log("Submitted technician ID:", selectedTech);
    try {
      const finalData = {
        ...reminderData,
        technician_id: selectedTech,
      };

      const res = await setReminder(finalData);
      console.log(res);

      if (!res?.status) {
        message.success("Reminder Set Successfully!");
        onClose();
      } else {
        message.error("Someting went wrong..");
      }
    } catch (error) {
      console.error(error);
    }
    onClose();
  };

  return (
    <Modal
      title="Select technician"
      open={isOpen}
      onCancel={onClose}
      footer={null}
      width={400}
    >
      <div className="p-4 space-y-4">
        <Select
          placeholder="Select technician"
          className="!my-2"
          style={{ width: "100%" }}
          options={techs || []}
          onChange={(value) => setSelectedTech(value)}
        />
        <Button type="primary" danger block onClick={handleSubmit}>
          Ok
        </Button>
      </div>
    </Modal>
  );
};

export default TechnicianModal;
