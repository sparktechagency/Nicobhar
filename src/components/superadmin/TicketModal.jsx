import PropTypes from "prop-types";
import { Modal, Input } from "antd";
import { CopyOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { TextArea } = Input;

const TicketModal = ({ isOpen = false, onClose = () => {}, ticket }) => {
  const navigate = useNavigate();
  console.log(ticket);

  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      footer={null}
      width={700}
      className="ticket-modal"
      title={
        <div className="modal-header">
          <span className="status-badge">{ticket?.ticket_status}</span>
          <span className="header-title">Ticket Details</span>
        </div>
      }
    >
      <div className="modal-content">
        <div className="form-group">
          <label>Ticket Number</label>
          <div className="input-with-copy">
            <Input value={ticket?.order_number} readOnly className="gray-bg" />
            <CopyOutlined className="copy-icon" />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Asset</label>
            <div className="input-with-copy">
              <Input
                value={ticket?.asset?.product}
                readOnly
                className="gray-bg"
              />
              <CopyOutlined className="copy-icon" />
            </div>
          </div>
          <div className="form-group">
            <label>Serial Number</label>
            <div className="input-with-copy">
              <Input
                value={ticket?.asset?.serial_number}
                readOnly
                className="gray-bg"
              />
              <CopyOutlined className="copy-icon" />
            </div>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Organization</label>
            <div className="input-with-copy">
              <Input
                value={ticket?.asset?.product}
                readOnly
                className="gray-bg"
              />
              <CopyOutlined className="copy-icon" />
            </div>
          </div>
          <div className="form-group">
            <label>Location</label>
            <div className="input-with-copy">
              <Input
                value={ticket?.user?.address}
                readOnly
                className="gray-bg"
              />
              <CopyOutlined className="copy-icon" />
            </div>
          </div>
        </div>

        <div className="form-group">
          <label>Problem</label>
          <div className="input-with-copy">
            <TextArea
              value={ticket?.problem}
              readOnly
              rows={4}
              className="gray-bg"
            />
            <CopyOutlined className="copy-icon textarea-copy" />
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn btn-outline">
            Send to Third-party Providers
          </button>
          <button
            onClick={() => {
              localStorage.setItem("ticket_insp_id", ticket?.id);
              navigate("create-inspection");
            }}
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
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    order_number: PropTypes.string,
    ticket_status: PropTypes.string,
    problem: PropTypes.string,
    asset: PropTypes.shape({
      product: PropTypes.string,
      serial_number: PropTypes.string,
    }),
    user: PropTypes.shape({
      address: PropTypes.string,
    }),
  }),
};

export default TicketModal;
