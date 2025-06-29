import { Modal, Input, Image } from "antd";
import { CopyOutlined, CloseOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";

import imageone from "../../assets/laptop.png";

const OrganizationJobcard = ({ isOpen, onClose, ticket }) => {
  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      footer={null}
      width={900}
      className="ticket-modal"
      //   closeIcon={<CloseOutlined className="close-icon" />}
      title={
        <div className="modal-header text-center w-full text-center">
          <span className="status-badge">NEW</span>
          <span className="header-title text-white flex  text-white text-[20px] font-normal text-center ">
            Card details
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
              <Input value="ViewSonic" readOnly className="bg-white h-[44px]" />
            </div>
          </div>
          <div className="form-group w-full">
            <label className="text-[16px] text-[#000000] font-medium">
              Serial number
            </label>
            <div className="input-with-copy">
              <Input
                value="HFGS647HNSJU"
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
              value="Lorem ipsum dolor sit amet consectetur. Leo ultrices quis et et quisque ut turpis. Pharetra massa volutpat ultrices in eros sit. Vulputate risus lobortis nunc tristique mattis imperdiet cursus. Sociis mauris varius amet bibendum."
              readOnly
              rows={4}
              className="bg-white text-[#777777] text-[16px] p-4 "
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="text-[16px] text-[#000000] font-medium">
              Customer name
            </label>
            <div className="input-with-copy">
              <Input
                placeholder="Md. Abid"
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
                className="bg-white h-[44px]"
              />
            </div>
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label className="text-[16px] text-[#000000] font-medium">
              Assigned by
            </label>
            <div className="input-with-copy">
              <Input
                placeholder="Support agent name"
                readOnly
                className="bg-white h-[44px]"
              />
            </div>
          </div>
          <div className="form-group">
            <label className="text-[16px] text-[#000000] font-medium">
              Technician name
            </label>
            <div className="input-with-copy">
              <Input
                placeholder="Md. Abid"
                readOnly
                className="bg-white h-[44px]"
              />
            </div>
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label className="text-[16px] text-[#000000] font-medium">
              Comment
            </label>
            <div className="input-with-copy">
              <Input
                placeholder="Technician’s comment"
                readOnly
                className="bg-white h-[44px]"
              />
            </div>
          </div>
          <div className="form-group">
            <label className="text-[16px] text-[#000000] font-medium">
              Signature
            </label>
            <div className="input-with-copy">
              <Input
                placeholder="Location employee signature"
                readOnly
                className="bg-white h-[44px]"
              />
            </div>
          </div>
        </div>

        {/* <div className="form-group flex gap-4 ">
  <div className="form-group w-full">
    <label className="text-[16px] text-[#000000] font-medium">Comment</label>
    <div className="input-with-copy ">
      <TextArea

        placeholder="Technician’s comment"
        readOnly
        rows={4}
        className="bg-white text-[#777777] text-[16px] p-4 "
      />

    </div>
  </div>



  <div className="w-full">

    <div className="form-group ">
      <label className="text-[16px] text-[#000000] font-medium">location</label>
      <div className="input-with-copy">
        <Input value="Dhaka" readOnly className="bg-white h-[44px]" />

      </div>
    </div>
    <div className="form-group ">
      <label className="text-[16px] text-[#000000] font-medium">Signature</label>
      <div className="input-with-copy">
        <Input value="Location employee name" readOnly className="bg-white h-[44px]" />

      </div>
    </div>

  </div>
</div> */}

        <div className="modal-footer">
          <button className="btn btn-primary">Send</button>
        </div>
      </div>
    </Modal>
  );
};

export default OrganizationJobcard;
