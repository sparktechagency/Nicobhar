import { Modal, Input } from "antd"
import { CopyOutlined, CloseOutlined } from "@ant-design/icons"
import TextArea from "antd/es/input/TextArea"



const OrganizThirdPartyModal = ({ isOpen, onClose, ticket }) => {
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
          <span className="header-title text-white flex  text-white text-[20px] font-normal">Inspection sheet of ViewSonic (HFGS647HNSJU)</span>
        </div>
      }
    >
      <div className="modal-content bg-[#F2F2F2]">

        <div className="flex justify-between gap-4">
          <div className="form-group w-full  ">
            <label className="text-[16px] text-[#000000] font-medium">Asset</label>
            <div className="input-with-copy">
              <Input placeholder="ViewSonic"  className="bg-white h-[44px]" />

            </div>
          </div>
          <div className="form-group w-full">
            <label className="text-[16px] text-[#000000] font-medium">Serial number</label>
            <div className="input-with-copy">
              <Input placeholder="HFGS647HNSJU"  className="bg-white h-[44px]" />

            </div>
          </div>

        </div>

        <div className="form-group">
          <label className="text-[16px] text-[#000000] font-medium">Problem</label>
          <div className="input-with-copy ">
            <TextArea

              placeholder="Lorem ipsum dolor sit amet consectetur. Leo ultrices quis et et quisque ut turpis. Pharetra massa volutpat ultrices in eros sit. Vulputate risus lobortis nunc tristique mattis imperdiet cursus. Sociis mauris varius amet bibendum."
              
              rows={4}
              className="bg-white text-[#777777] text-[16px] p-4 "
            />

          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="text-[16px] text-[#000000] font-medium">Assigned by</label>
            <div className="input-with-copy">
              <Input placeholder="Support agent name here"  className="bg-white h-[44px]" />

            </div>
          </div>
          <div className="form-group">
            <label className="text-[16px] text-[#000000] font-medium">Technician</label>
            <div className="input-with-copy">
              <Input placeholder="Md. Abid"  className="bg-white h-[44px]" />

            </div>
          </div>
        </div>

        <div className="form-group flex gap-4 ">
          <div className="form-group w-full">
            <label className="text-[16px] text-[#000000] font-medium">Comment</label>
            <div className="input-with-copy ">
              <TextArea

                placeholder="Technician’s comment"
                
                rows={4}
                className="bg-white text-[#777777] text-[16px] p-4 "
              />

            </div>
          </div>



          <div className="w-full">

            <div className="form-group ">
              <label className="text-[16px] text-[#000000] font-medium">location</label>
              <div className="input-with-copy">
                <Input placeholder="Dhaka"  className="bg-white h-[44px]" />

              </div>
            </div>
            <div className="form-group ">
              <label className="text-[16px] text-[#000000] font-medium">Signature</label>
              <div className="input-with-copy">
                <Input placeholder="Location employee name"  className="bg-white h-[44px]" />

              </div> 
            </div>

          </div>
        </div>

        <div className="modal-footer">

          <button className="btn btn-primary">Send</button>
        </div>
      </div>
    </Modal>
  )
}

export default OrganizThirdPartyModal

