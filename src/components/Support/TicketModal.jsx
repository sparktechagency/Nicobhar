import PropTypes from "prop-types";
import { Modal, Input, Button } from "antd";
import { CopyOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useGetTicketDetailsQuery } from "../../redux/features/ticket/ticketApi";

const { TextArea } = Input;

const TicketModal = ({
  isOpen = false,
  onClose = () => {},
  ticket,
  opened,
  pasted,
}) => {
  const navigate = useNavigate();
  const { data, isLoading } = useGetTicketDetailsQuery({ id: ticket?.id });
  console.log(ticket);

  const [isModalOpenB, setIsModalOpenB] = useState(false);

  const showModalB = () => {
    setIsModalOpenB(true);
  };

  const handleOkB = () => {
    setIsModalOpenB(false);
  };

  const handleCancelB = () => {
    setIsModalOpenB(false);
  };

  if (!isLoading) {
    console.log(data);
  }

  return (
    <>
      {" "}
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
              <Input
                value={ticket?.order_number}
                readOnly
                className="gray-bg"
              />
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
            <Button
              type="primary"
              className="w-full py-5 font-semibold"
              variant={opened ? "outlined" : "solid"}
              color="red"
              onClick={() => {
                // localStorage.setItem("ticket_insp_id", ticket?.id);
                // navigate(`/create-inspection/${ticket?.id}`);
                showModalB();
              }}
            >
              See Inspection Sheets
            </Button>{" "}
          </div>
        </div>
      </Modal>
      <Modal
        title={
          <div className="modal-header">
            <span className="status-badge">{ticket?.ticket_status}</span>
            <span className="header-title">Inspection sheets</span>
          </div>
        }
        className="ticket-modal"
        closable={{ "aria-label": "Custom Close Button" }}
        open={isModalOpenB}
        onOk={handleOkB}
        onCancel={handleCancelB}
        footer={null}
      >
        <div className="space-y-2 p-2">
          {isLoading
            ? "Loading.."
            : data.data.inspection_sheets.length === 0
            ? "No inspection sheet found"
            : data.data.inspection_sheets.map((x) => (
                <Button
                  key={x.id}
                  className="w-full"
                  type="dashed"
                  variant="outlined"
                  href={`/create-inspection/${x.id}`}
                >
                  View {x.inspection_order_number}
                </Button>
              ))}
        </div>
      </Modal>
    </>
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
