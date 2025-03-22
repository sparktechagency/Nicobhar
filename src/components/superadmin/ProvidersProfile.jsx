import { Modal, Input, Image } from "antd"
import { CopyOutlined, CloseOutlined } from "@ant-design/icons"

import bnqlogo from "../../assets/BENQ-logo.png"


const ProvidersProfile = ({ isOpen, onClose, ticket }) => {
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
        <p className="text-[16px] text-[#000000] font-medium">
          Organization:
        </p>

        <Image
          preview={false}
          src={bnqlogo}
          alt="Organization"
          className="rounded-full"
        />
        <div className="flex flex-col space-y-2">

          <div className="bg-gray-200 h-[50px]  flex justify-between p-2 rounded-lg">
            <p className="text-[16px] text-[#000000] font-medium">
              Support agents:
            </p>
            <p className="text-[16px] text-[#000000] font-medium">
              5000
            </p>



          </div>
          <div className="bg-gray-200 h-[50px]  flex justify-between p-2 rounded-lg">
            <p className="text-[16px] text-[#000000] font-medium">
              Support agents:
            </p>
            <p className="text-[16px] text-[#000000] font-medium">
              5000
            </p>



          </div>
          <div className="bg-gray-200 h-[50px]  flex justify-between p-2 rounded-lg">
            <p className="text-[16px] text-[#000000] font-medium">
              Support agents:
            </p>
            <p className="text-[16px] text-[#000000] font-medium">
              5000
            </p>



          </div>
        </div>

        <button className="bg-secondary text-white py-2 px-4 rounded-lg w-full font-semibold h-[44px] mt-4">
          CLOSE
        </button>
      </div>
    </Modal>
  )
}

export default ProvidersProfile

