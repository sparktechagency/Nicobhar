import { Modal, Input, Image } from "antd"
import { CopyOutlined, CloseOutlined } from "@ant-design/icons"

import bnqlogo from "../../assets/BENQ-logo.png"


const ThirdpartyProfile = ({ isOpen, onClose, ticket }) => {
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
     



        <div className="max-w-[250px] mx-auto my-4 w-full">

        <Image
          preview={false}
          src='https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg'
          alt="Organization"
          className="rounded-md "
        />
        </div>
        <div className="flex flex-col ">

          <div className="  flex justify-between  rounded-lg">
            <p className="text-[16px] text-gray-600 font-medium">
              Name:
            </p>
            <p className="text-[16px] text-gray-500 font-medium">
              Mehedi Hasan
            </p>



          </div>
          <div className="  flex justify-between  rounded-lg">
            <p className="text-[16px] text-gray-600 font-medium">
              Email:
            </p>
            <p className="text-[16px] text-gray-500 font-medium">
              example@gmail.com
            </p>



          </div>
          <div className="  flex justify-between  rounded-lg">
            <p className="text-[16px] text-gray-600 font-medium">
              contact:
            </p>
            <p className="text-[16px] text-gray-500 font-medium">
              +5123456789
            </p>

          </div>
          <div className="  flex justify-between  rounded-lg">
            <p className="text-[16px] text-gray-600 font-medium">
              User ID:
            </p>
            <p className="text-[16px] text-gray-500 font-medium">
                #123456789
            </p>

          </div>
          <div className="  flex justify-between  rounded-lg">
            <p className="text-[16px] text-gray-600 font-medium">
              Organization:
            </p>
            <p className="text-[16px] text-gray-500 font-medium">
              banQ
            </p>

          </div>
          <div className="  flex justify-between  rounded-lg">
            <p className="text-[16px] text-gray-600 font-medium">
              Location:
            </p>
            <p className="text-[16px] text-gray-500 font-medium">
              mymensingh,bangladesh
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

export default ThirdpartyProfile

