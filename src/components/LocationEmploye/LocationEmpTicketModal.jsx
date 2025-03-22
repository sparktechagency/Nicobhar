import { Modal, Input } from "antd"
import { CopyOutlined, CloseOutlined } from "@ant-design/icons"
import { useNavigate } from "react-router-dom"


const { TextArea } = Input

const LocationEmpTicketModal = ({ isOpen, onClose, ticket }) => {
  const navigate =useNavigate();
  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      footer={null}
      width={700}
      className="ticket-modal"
    //   closeIcon={<CloseOutlined className="close-icon" />}
      title={
        <div className="modal-header">
          <span className="status-badge">NEW</span>
          <span className="header-title">Ticket Details</span>
        </div>
      }
    >
      <div className="modal-content">
        <div className="form-group">
          <label>Ticket Number</label>
          <div className="input-with-copy">
            <Input style={{height:'44px',width:'100%'}}  value="Auto generated" readOnly className="gray-bg text-[#777777]" />
            <CopyOutlined className="copy-icon" />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Asset</label>
            <div className="input-with-copy">
              <Input style={{height:'44px',width:'100%'}} value="Monitor" readOnly className="gray-bg text-[#777777]" />
              <CopyOutlined className="copy-icon" />
            </div>
          </div>
          <div className="form-group">
            <label>Serial Number</label>
            <div className="input-with-copy">
              <Input style={{height:'44px',width:'100%'}} value="HFGS647HNSJU" readOnly className="gray-bg text-[#777777]" />
              <CopyOutlined className="copy-icon" />
            </div>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Organization</label>
            <div className="input-with-copy">
              <Input style={{height:'44px',width:'100%'}} value="ViewSonic" readOnly className="gray-bg text-[#777777]" />
              <CopyOutlined className="copy-icon" />
            </div>
          </div>
          <div className="form-group">
            <label>Location</label>
            <div className="input-with-copy">
              <Input style={{height:'44px',width:'100%'}} value="Rampura, Dhaka" readOnly className="gray-bg text-[#777777]" />
              <CopyOutlined className="copy-icon" />
            </div>
          </div>
        </div>

        <div className="form-group">
          <label>Problem</label>
          <div className="input-with-copy">
            <TextArea
              value="Lorem ipsum dolor sit amet consectetur. Leo ultrices quis et et quisque ut turpis. Pharetra massa volutpat ultrices in eros sit. Vulputate risus lobortis nunc tristique mattis imperdiet cursus. Sociis mauris varius amet bibendum."
              readOnly
              rows={4}
              className="gray-bg text-[#777777] ]"
            />
            <CopyOutlined className="copy-icon textarea-copy" />
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn bg-secondary h-[44px] text-white  font-semibold">See inspection sheet</button>
        
        </div>
      </div>
    </Modal>
  )
}

export default LocationEmpTicketModal

