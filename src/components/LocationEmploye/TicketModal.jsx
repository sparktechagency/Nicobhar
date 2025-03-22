import { Modal, Input } from "antd"
import { CopyOutlined, CloseOutlined } from "@ant-design/icons"
import { useNavigate } from "react-router-dom"


const { TextArea } = Input

const  TicketModal = ({ isOpen, onClose, ticket }) => {
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
            <Input value="Auto generated" readOnly className="gray-bg" />
            <CopyOutlined className="copy-icon" />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Asset</label>
            <div className="input-with-copy">
              <Input value="Monitor" readOnly className="gray-bg" />
              <CopyOutlined className="copy-icon" />
            </div>
          </div>
          <div className="form-group">
            <label>Serial Number</label>
            <div className="input-with-copy">
              <Input value="HFGS647HNSJU" readOnly className="gray-bg" />
              <CopyOutlined className="copy-icon" />
            </div>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Organization</label>
            <div className="input-with-copy">
              <Input value="ViewSonic" readOnly className="gray-bg" />
              <CopyOutlined className="copy-icon" />
            </div>
          </div>
          <div className="form-group">
            <label>Location</label>
            <div className="input-with-copy">
              <Input value="Rampura, Dhaka" readOnly className="gray-bg" />
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
              className="gray-bg"
            />
            <CopyOutlined className="copy-icon textarea-copy" />
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn btn-outline">Send to Third-party Providers</button>
          <button onClick={()=>navigate('/create-inspection')} className="btn btn-primary">Create Inspection Sheet</button>
        </div>
      </div>
    </Modal>
  )
}

export default TicketModal

