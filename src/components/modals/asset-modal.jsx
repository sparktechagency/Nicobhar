import { Modal, Button, message } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import Lottie from "lottie-react";
import bellicon from "../../assets/Animation - 1739102667768.json";
import { useEffect, useState } from "react";
import { useSetReminderMutation } from "../../redux/features/maintainance/maintainApi";

const AssetModal = ({ isOpen, onClose, onBack, onConnectTechnician }) => {
  const [reminderData, setReminderData] = useState(null);
  const [setReminder] = useSetReminderMutation();
  useEffect(() => {
    console.log(localStorage.getItem("reminder_reminder"));

    if (localStorage.getItem("reminder_reminder")) {
      setReminderData(JSON.parse(localStorage.getItem("reminder_reminder")));
    }
  }, []);
  // useEffect(() => {

  // }, [reminderData])

  async function onBeforeConnectTechnician(type) {
    try {
      console.log(reminderData);
      if (type === "ctt") {
        const finalData = {
          ...reminderData,
          status: "ContactToTechnician",
        };
        localStorage.setItem("reminder_reminder", JSON.stringify(finalData));
        console.log(finalData);
        onConnectTechnician();
      } else if (type === "rmt") {
        const finalData = {
          ...reminderData,
          status: "RemindMeLetter",
        };
        const res = setReminder(finalData);
        if (!res?.status) {
          message.success("Reminder Set Successfully!");
          onClose();
        } else {
          message.error("Someting went wrong..");
        }
        onClose();
        return;
      }
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <Modal open={isOpen} onCancel={onClose} footer={null} width={600}>
      <div className="text-center">
        <Button
          type="text"
          icon={<LeftOutlined />}
          className="absolute left-4 top-4"
          onClick={onBack}
        />
        <div className="">
          <div className="flex flex-col items-center">
            <Lottie
              animationData={bellicon}
              loop={true}
              className="w-40 h-40"
            />
          </div>
          <p className="text-secondary text-[20px] font-semibold">ViewSonic</p>
          <p className="text-[#000000] text-[16px] font-semibold">
            HFGS647HNSJU
          </p>
          <p className="text-[#000000] text-[16px] font-normal pb-2">
            Last maintenance date: {reminderData?.last_maintainance}
          </p>
        </div>
        <div className="bg-red-500 p-4 -mx-6 mb-6">
          <p className="text-white text-[16px] font-semibold">
            Send The Asset For Maintenance
          </p>
        </div>
        <div className="flex gap-4 justify-center mt-6 mb-4">
          <Button
            style={{
              height: "44px",
              width: "30%",
              color: "#000000",
              fontSize: "16px",
            }}
            onClick={() => {
              onBeforeConnectTechnician("rmt");
            }}
          >
            Remind Me Later
          </Button>
          <Button
            style={{ height: "44px", color: "white", fontSize: "16px" }}
            type="primary"
            danger
            onClick={() => {
              onBeforeConnectTechnician("ctt");
            }}
          >
            Connect To Technician
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default AssetModal;
