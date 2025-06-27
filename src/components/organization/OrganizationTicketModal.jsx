import { useState } from "react";
import { Modal, Input, Select, Button } from "antd";
import { CopyOutlined } from "@ant-design/icons";

const { TextArea } = Input;
const { Option } = Select;

const OrganizationTicketModal = ({ isOpen, onClose, ticket }) => {
  const [assignModalOpen, setAssignModalOpen] = useState(false);
  const [selectedTechnician, setSelectedTechnician] = useState(null);

  // Sample technician data - in a real application, this would come from an API
  const technicians = [
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Smith" },
    { id: 3, name: "Michael Johnson" },
    { id: 4, name: "Emily Davis" },
  ];

  const handleAssignTechnician = () => {
    setAssignModalOpen(true); // Open the dropdown modal
  };

  const handleTechnicianSelect = (value) => {
    setSelectedTechnician(value);
  };

  const handleConfirmAssignment = () => {
    if (selectedTechnician) {
      alert(`Technician ${selectedTechnician} assigned successfully!`);
      setAssignModalOpen(false); // Close the dropdown modal
    } else {
      alert("Please select a technician!");
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    // You could add a small visual feedback here, e.g., a toast notification
    console.log(`Copied: ${text}`);
  };

  return (
    <>
      {/* Main Ticket Details Modal */}
      <Modal
        open={isOpen}
        onCancel={onClose}
        footer={null}
        width={700}
        className="ticket-modal"
        title={
          <div className="modal-header">
            {/* Display ticket status dynamically */}
            <span className="status-badge">
              {ticket?.ticket_status?.toUpperCase() || "N/A"}
            </span>
            <span className="header-title">Ticket Details</span>
          </div>
        }
      >
        <div className="modal-content">
          {/* Asset and Serial Number Fields */}
          <div className="form-row">
            <div className="form-group">
              <label>Asset</label>
              <div className="input-with-copy">
                <Input
                  style={{ height: "44px", width: "100%" }}
                  value={ticket?.asset?.product || ""}
                  className="gray-bg text-[#777777]"
                  readOnly
                />
                <CopyOutlined
                  className="copy-icon"
                  onClick={() => copyToClipboard(ticket?.asset?.product || "")}
                />
              </div>
            </div>
            <div className="form-group">
              <label>Serial Number</label>
              <div className="input-with-copy">
                <Input
                  style={{ height: "44px", width: "100%" }}
                  value={ticket?.asset?.serial_number || ""}
                  className="gray-bg text-[#777777]"
                  readOnly
                />
                <CopyOutlined
                  className="copy-icon"
                  onClick={() =>
                    copyToClipboard(ticket?.asset?.serial_number || "")
                  }
                />
              </div>
            </div>
          </div>

          {/* Problem Field */}
          <div className="form-group">
            <label>Problem</label>
            <div className="input-with-copy">
              <TextArea
                value={ticket?.problem || ""}
                rows={4}
                className="gray-bg text-[#777777]"
                readOnly
              />
              <CopyOutlined
                className="copy-icon textarea-copy"
                onClick={() => copyToClipboard(ticket?.problem || "")}
              />
            </div>
          </div>

          {/* Location and Ticket Number Fields */}
          <div className="form-row">
            <div className="form-group">
              <label>Location</label>
              <div className="input-with-copy">
                <Input
                  style={{ height: "44px", width: "100%" }}
                  value={ticket?.user?.address || ""}
                  className="gray-bg text-[#777777]"
                  readOnly
                />
                <CopyOutlined
                  className="copy-icon"
                  onClick={() => copyToClipboard(ticket?.user?.address || "")}
                />
              </div>
            </div>
            <div className="form-group">
              <label>Order Number</label>
              <div className="input-with-copy">
                <Input
                  style={{ height: "44px", width: "100%" }}
                  value={ticket?.order_number || ""}
                  className="gray-bg text-[#777777]"
                  readOnly
                />
                <CopyOutlined
                  className="copy-icon"
                  onClick={() => copyToClipboard(ticket?.order_number || "")}
                />
              </div>
            </div>
          </div>

          {/* Comment and Button */}
          <div className="form-row flex items-center gap-4 justify-between">
            <div className="form-group">
              <label>User Comment</label>
              <div className="input-with-copy">
                <Input
                  style={{ height: "44px", width: "100%" }}
                  value={ticket?.user_comment || "No comment provided"}
                  className="gray-bg text-[#777777]"
                  readOnly
                />
                <CopyOutlined
                  className="copy-icon"
                  onClick={() =>
                    copyToClipboard(
                      ticket?.user_comment || "No comment provided"
                    )
                  }
                />
              </div>
            </div>
            <div className="form-group mt-6">
              <button
                className={`btn h-[44px] w-full text-white font-semibold bg-secondary`}
                // onClick={handleAssignTechnician}
              >
                Send to Support agent
              </button>
            </div>
          </div>
        </div>
      </Modal>

      {/* Technician Selection Modal */}
      <Modal
        open={assignModalOpen}
        onCancel={() => setAssignModalOpen(false)}
        footer={null}
        title="Select Technician"
      >
        <p className="pb-2">Choose a technician to assign:</p>
        <Select
          showSearch
          style={{ width: "100%", height: "44px" }}
          placeholder="Search technician"
          onChange={handleTechnicianSelect}
          optionFilterProp="children"
          filterOption={(input, option) =>
            option.children.toLowerCase().includes(input.toLowerCase())
          }
        >
          {technicians.map((tech) => (
            <Option key={tech.id} value={tech.name}>
              {tech.name}
            </Option>
          ))}
        </Select>
        <div className="text-center mt-4">
          <Button
            style={{
              backgroundColor: "#ED1C24",
              height: "44px",
              width: "40%",
              fontSize: "16px",
            }}
            type="primary"
            onClick={handleConfirmAssignment}
          >
            Confirm Assignment
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default OrganizationTicketModal;
