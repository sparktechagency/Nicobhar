import { Modal, Input, Button } from "antd";
import { CopyOutlined, CloseOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import Swal from "sweetalert2";

const JobcardModal = ({ isOpen, onClose, ticket }) => {
  if (!ticket) {
    return null;
  }

  console.log(ticket);

  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      footer={null}
      width={700}
      className="ticket-modal"
      //   closeIcon={<CloseOutlined className="close-icon" />}
      title={
        <div className="modal-header text-center w-full">
          <span className="status-badge">NEW</span>
          <span className="header-title text-white flex text-[20px] font-normal">
            Job card for {ticket?.inspection_sheet?.ticket?.asset?.product} (
            {ticket.inspection_sheet?.ticket?.asset?.serial_number})
          </span>
        </div>
      }
    >
      <div className="modal-content bg-[#F2F2F2]">
        <div className="flex justify-between gap-4">
          <div className="form-group w-full  ">
            <label className="text-[16px] text-[#000000] font-medium">
              Asset
            </label>
            <div className="input-with-copy">
              <Input
                value={ticket.inspection_sheet?.ticket?.asset?.product}
                readOnly
                className="bg-white h-[44px]"
              />
            </div>
          </div>
          <div className="form-group w-full">
            <label className="text-[16px] text-[#000000] font-medium">
              Purchase Order number
            </label>
            <div className="input-with-copy">
              <Input
                value={ticket.job_card_order_number}
                readOnly
                className="bg-white h-[44px]"
              />
            </div>
          </div>
        </div>

        <div className="form-group">
          <label className="text-[16px] text-[#000000] font-medium">
            Problem
          </label>
          <div className="input-with-copy ">
            <TextArea
              value={ticket.inspection_sheet?.ticket?.problem}
              readOnly
              rows={4}
              className="bg-white text-[#777777] text-[16px] p-4 "
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="text-[16px] text-[#000000] font-medium">
              Username
            </label>
            <div className="input-with-copy">
              <Input
                placeholder="Md. Abid"
                value={ticket?.inspection_sheet?.ticket?.user?.name}
                readOnly
                className="bg-white h-[44px]"
              />
            </div>
          </div>
          <div className="form-group">
            <label className="text-[16px] text-[#000000] font-medium">
              Number
            </label>
            <div className="input-with-copy">
              <Input
                placeholder="01712345678"
                value={
                  ticket?.inspection_sheet?.ticket?.user?.phone
                    ? ticket?.inspection_sheet?.ticket?.user?.phone
                    : "N/A"
                }
                readOnly
                className="bg-white h-[44px]"
              />
            </div>
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label className="text-[16px] text-[#000000] font-medium">
              Organization
            </label>
            <div className="input-with-copy">
              <Input
                placeholder="Organization"
                readOnly
                value={ticket?.inspection_sheet?.ticket?.asset?.brand}
                className="bg-white h-[44px]"
              />
            </div>
          </div>
          <div className="form-group">
            <label className="text-[16px] text-[#000000] font-medium">
              Location
            </label>
            <div className="input-with-copy">
              <Input
                placeholder="Banasree, Rampura, Dhaka"
                readOnly
                value={ticket?.inspection_sheet?.ticket?.user?.address}
                className="bg-white h-[44px]"
              />
            </div>
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label className="text-[16px] text-[#000000] font-medium">
              Cost
            </label>
            <div className="input-with-copy">
              <Input
                placeholder="Technician’s comment"
                readOnly
                value={
                  ticket?.inspection_sheet?.ticket.cost
                    ? ticket?.inspection_sheet?.ticket.cost
                    : "N/A"
                }
                className="bg-white h-[44px]"
              />
            </div>
          </div>
          <div className="form-group ">
            <label className="text-[16px] text-[#000000] font-medium opacity-0">
              .{" "}
            </label>
            <Button
              className="py-5 w-full mx-auto"
              type="primary"
              variant="solid"
              color="red"
              onClick={onClose}
              //   onClick={() => {
              //     Swal.fire({
              //       title: "SEND SUCCESSFULLY",
              //       icon: "success",
              //     }).then((result) => {
              //       if (result.isConfirmed) {
              //         onClose();
              //       }
              //     });
              //   }}
            >
              See Job cards
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default JobcardModal;
