import { Modal, Input } from "antd"
import { CopyOutlined, CloseOutlined } from "@ant-design/icons"
import TextArea from "antd/es/input/TextArea"



const ORGMaintenceModal = ({ isOpen, onClose, ticket }) => {
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

          <span className="header-title text-[#F0F0F0] flex  text-[#F0F0F0] text-[20px] font-normal">Asset Maintenance Details</span>
        </div>
      }
    >
      <div className="modal-content bg-[#F2F2F2]">

        <div className="">
          <div className="form-group w-full  ">
            <label className="text-[16px] text-[#000000] font-medium">Asset Name</label>
            <div className="input-with-copy">
              <Input  placeholder="Asset Name" readOnly className="bg-[#F0F0F0] text-[#777777] h-[44px]" />

            </div>
          </div>
          <div className="form-group w-full">
            <label className="text-[16px] text-[#000000] font-medium">Technician Name</label>
            <div className="input-with-copy">
              <Input  placeholder="Md. Abid" readOnly className="bg-[#F0F0F0] text-[#777777] h-[44px]" />

            </div>
          </div>
          <div className="form-group w-full">
            <label className="text-[16px] text-[#000000] font-medium">Location</label>
            <div className="input-with-copy">
              <Input  placeholder="Location" readOnly className="bg-[#F0F0F0] text-[#777777] h-[44px]" />

            </div>
          </div>

        </div>

        <div className="flex  gap-4">

          <div className="form-group w-full"> 
            <label className="text-[16px] text-[#000000] font-medium">Last maintenance date</label>
            <div className="input-with-copy">
              <Input  placeholder="12/20/2023"  className="bg-[#F0F0F0] text-[#777777] h-[44px]" />

            </div>
          </div>
          <div className="form-group w-full"> 
            <label className="text-[16px] text-[#000000] font-medium">Next Schedule</label>
            <div className="input-with-copy">
              <Input   type="date" placeholder="12/20/2025"  className="bg-[#F0F0F0] text-[#777777] h-[44px]" />

            </div>
          </div>
        </div>


     


        <div className="modal-footer">

          <button className="btn btn-primary">Contact with Technician</button>
        </div>
      </div>
    </Modal>
  )
}

export default ORGMaintenceModal

