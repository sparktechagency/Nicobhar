import { Modal, Input, Image } from "antd";
import { CopyOutlined, CloseOutlined } from "@ant-design/icons";

import bnqlogo from "../../assets/BENQ-logo.png";

const ProvidersProfile = ({ isOpen, onClose, ticket }) => {
  if (!ticket) {
    return <></>;
  }
  const org = "organization";

  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      footer={null}
      width={500}
      className="ticket-modal"
      //   closeIcon={<CloseOutlined className="close-icon" />}
    >
      <div className="modal-content bg-[#F2F2F2]">
        {ticket?.role === org && (
          <p className="text-[16px] text-[#000000] font-medium">
            Organization:
          </p>
        )}

        <div className="w-full flex justify-center items-center">
          <Image
            preview={false}
            src={ticket?.image}
            alt="Organization"
            className="block"
          />
        </div>
        {ticket.role === org ? (
          <div className="flex flex-col space-y-2">
            <div className="bg-gray-200 h-[50px]  flex justify-between p-2 rounded-lg">
              <p className="text-[16px] text-[#000000] font-medium">
                Support agents:
              </p>
              <p className="text-[16px] text-[#000000] font-medium">
                {ticket?.support_agents_count}
              </p>
            </div>
            <div className="bg-gray-200 h-[50px]  flex justify-between p-2 rounded-lg">
              <p className="text-[16px] text-[#000000] font-medium">
                Location employees:
              </p>
              <p className="text-[16px] text-[#000000] font-medium">
                {ticket?.location_employees_count}
              </p>
            </div>
            <div className="bg-gray-200 h-[50px]  flex justify-between p-2 rounded-lg">
              <p className="text-[16px] text-[#000000] font-medium">
                Technicians:
              </p>
              <p className="text-[16px] text-[#000000] font-medium">
                {ticket?.technicians_count}
              </p>
            </div>
          </div>
        ) : (
          <div className="mt-6">
            <div className="h-auto flex justify-between p-2 rounded-lg">
              <p className="text-[16px] text-[#000000] font-medium">Name</p>
              <p className="text-[16px] text-[#000000] font-medium">
                {ticket?.name}
              </p>
            </div>
            <div className="h-auto flex justify-between p-2 rounded-lg">
              <p className="text-[16px] text-[#000000] font-medium">Email:</p>
              <p className="text-[16px] text-[#000000] font-medium">
                {ticket?.email}
              </p>
            </div>
            <div className="h-auto flex justify-between p-2 rounded-lg">
              <p className="text-[16px] text-[#000000] font-medium">
                Contact :
              </p>
              <p className="text-[16px] text-[#000000] font-medium">
                {ticket?.phone ? ticket?.phone : "N/A"}
              </p>
            </div>
            <div className="h-auto flex justify-between p-2 rounded-lg">
              <p className="text-[16px] text-[#000000] font-medium">User ID:</p>
              <p className="text-[16px] text-[#000000] font-medium">
                #{ticket?.id}
              </p>
            </div>
            <div className="h-auto flex justify-between p-2 rounded-lg">
              <p className="text-[16px] text-[#000000] font-medium">
                Organization:
              </p>
              <p className="text-[16px] text-[#000000] font-medium">
                {ticket?.organization?.name}
              </p>
            </div>
            <div className="h-auto flex justify-between p-2 rounded-lg">
              <p className="text-[16px] text-[#000000] font-medium">
                Location:
              </p>
              <p className="text-[16px] text-[#000000] font-medium">
                {ticket?.address}
              </p>
            </div>
          </div>
        )}

        <button
          className="bg-secondary text-white py-2 px-4 rounded-lg w-full font-semibold h-[44px] mt-4"
          onClick={onClose}
        >
          CLOSE
        </button>
      </div>
    </Modal>
  );
};

export default ProvidersProfile;
