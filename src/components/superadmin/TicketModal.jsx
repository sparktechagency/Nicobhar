import PropTypes from "prop-types";
import { Modal, Input } from "antd";
import { CopyOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { TextArea } = Input;

const TicketModal = ({ isOpen = false, onClose = () => {}, ticket = {} }) => {
  const navigate = useNavigate();
  const {
    ticket_status = "Unknown",
    ticket_number = "N/A",
    asset = "N/A",
    serial_number = "N/A",
    organization = "N/A",
    location = "N/A",
    problem = "No description available.",
  } = ticket;

  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      footer={null}
      width={700}
      className="ticket-modal"
      title={
        <div className="modal-header">
          <span className="status-badge">{ticket_status}</span>
          <span className="header-title">Ticket Details</span>
        </div>
      }
    >
      <div className="modal-content">
        <div className="form-group">
          <label>Ticket Number</label>
          <div className="input-with-copy">
            <Input value={ticket_number} readOnly className="gray-bg" />
            <CopyOutlined className="copy-icon" />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Asset</label>
            <div className="input-with-copy">
              <Input value={asset.product} readOnly className="gray-bg" />
              <CopyOutlined className="copy-icon" />
            </div>
          </div>
          <div className="form-group">
            <label>Serial Number</label>
            <div className="input-with-copy">
              <Input value={serial_number} readOnly className="gray-bg" />
              <CopyOutlined className="copy-icon" />
            </div>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Organization</label>
            <div className="input-with-copy">
              <Input value={organization} readOnly className="gray-bg" />
              <CopyOutlined className="copy-icon" />
            </div>
          </div>
          <div className="form-group">
            <label>Location</label>
            <div className="input-with-copy">
              <Input value={location} readOnly className="gray-bg" />
              <CopyOutlined className="copy-icon" />
            </div>
          </div>
        </div>

        <div className="form-group">
          <label>Problem</label>
          <div className="input-with-copy">
            <TextArea value={problem} readOnly rows={4} className="gray-bg" />
            <CopyOutlined className="copy-icon textarea-copy" />
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn btn-outline">
            Send to Third-party Providers
          </button>
          <button
            onClick={() => navigate("create-inspection")}
            className="btn btn-primary"
          >
            Create Inspection Sheet
          </button>
        </div>
      </div>
    </Modal>
  );
};

TicketModal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  ticket: PropTypes.shape({
    ticket_status: PropTypes.string,
    ticket_number: PropTypes.string,
    asset: PropTypes.string,
    serial_number: PropTypes.string,
    organization: PropTypes.string,
    location: PropTypes.string,
    problem: PropTypes.string,
  }),
};

export default TicketModal;
