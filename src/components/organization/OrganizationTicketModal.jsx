import { useState } from "react";
import { Modal, Input, Select, Button } from "antd";
import { CopyOutlined } from "@ant-design/icons";

const { TextArea } = Input;
const { Option } = Select;

const OrganizationTicketModal = ({ isOpen, onClose, ticket }) => {
  const [assignModalOpen, setAssignModalOpen] = useState(false); // State for second modal
  const [selectedTechnician, setSelectedTechnician] = useState(null);

  // Sample technician data
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

  return (
    <>
      {/* Main Ticket Details Modal */}
      <Modal open={isOpen} onCancel={onClose} footer={null} width={700} className="ticket-modal"
        title={<div className="modal-header"><span className="status-badge">NEW</span><span className="header-title">Ticket Details</span></div>}
      >
        <div className="modal-content">
        <h1 className="text-[20px] text-[#000000] font-semibold text-center pb-8">
          (Assigned by ViewSonic)
        </h1>

        {/* Asset and Serial Number Fields */}
        <div className="form-row">
          <div className="form-group">
            <label>Asset</label>
            <div className="input-with-copy">
              <Input style={{ height: "44px", width: "100%" }} value="Monitor" className="gray-bg text-[#777777]" />
              <CopyOutlined className="copy-icon" />
            </div>
          </div>
          <div className="form-group">
            <label>Serial Number</label>
            <div className="input-with-copy">
              <Input style={{ height: "44px", width: "100%" }} value="HFGS647HNSJU" className="gray-bg text-[#777777]" />
              <CopyOutlined className="copy-icon" />
            </div>
          </div>
        </div>

        {/* Problem Field */}
        <div className="form-group">
          <label>Problem</label>
          <div className="input-with-copy">
            <TextArea
              value="Lorem ipsum dolor sit amet consectetur. Leo ultrices quis et et quisque ut turpis."
              rows={4}
              className="gray-bg text-[#777777]"
            />
            <CopyOutlined className="copy-icon textarea-copy" />
          </div>
        </div>

        {/* Location and Ticket Number Fields */}
        <div className="form-row">
          <div className="form-group">
            <label>Location</label>
            <div className="input-with-copy">
              <Input style={{ height: "44px", width: "100%" }} value="Rampura, Dhaka" className="gray-bg text-[#777777]" />
              <CopyOutlined className="copy-icon" />
            </div>
          </div>
          <div className="form-group">
            <label>Add Ticket Number</label>
            <div className="input-with-copy">
              <Input style={{ height: "44px", width: "100%" }} value="#5489754" className="gray-bg text-[#777777]" />
              <CopyOutlined className="copy-icon" />
            </div>
          </div>
        </div>

        {/* Comment and Button */}
        <div className="form-row flex items-center gap-4 justify-between">
          <div className="form-group">
            <label>Your comment</label>
            <div className="input-with-copy">
              <Input style={{ height: "44px", width: "100%" }} value="type here..." className="gray-bg text-[#777777]" />
              <CopyOutlined className="copy-icon" />
            </div>
          </div>
          <div className="form-group mt-6">
            <button
              className={`btn h-[44px] w-full text-white font-semibold bg-secondary`}
              onClick={handleAssignTechnician}
             
            >
              Assign Technician
            </button>
          </div>
        </div>
      </div>
      </Modal>

      {/* Technician Selection Modal */}
      <Modal open={assignModalOpen} onCancel={() => setAssignModalOpen(false)} footer={null} title="Select Technician">
        <p className="pb-2">Choose a technician to assign:</p>
        <Select

          showSearch
          style={{ width: "100%",height:'44px' }}
          placeholder="Search technician"
          onChange={handleTechnicianSelect}
          optionFilterProp="children"
          filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
        >
          {technicians.map((tech) => (
            <Option  key={tech.id} value={tech.name}>
              {tech.name}
            </Option>
          ))}
        </Select>
        <div className="text-center mt-4">
          <Button style={{backgroundColor: "#ED1C24",height:'44px',width:'40%',fontSize:'16px'}} type="primary" onClick={handleConfirmAssignment}>
            Confirm Assignment
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default OrganizationTicketModal;
