import { Modal, Input, Upload, Button } from "antd";
import { CloseOutlined, PlusOutlined } from "@ant-design/icons";
import { useState } from "react";

const EditThirdPartyProfile = ({ isOpen, onClose }) => {
  const [fileList, setFileList] = useState([]);

  const handleUpload = ({ fileList }) => {
    setFileList(fileList);
  };

  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      footer={null}
      width={500}
      className="organization-modal"
      closeIcon={<CloseOutlined />}
    >
      <div className="p-6 bg-white rounded-lg">
        {/* Header */}
        <h2 className="text-lg font-semibold text-center">Edit ThirdParty</h2>

        {/* Logo Upload */}
        <div className="flex flex-col items-center my-4">
          <Upload showUploadList={false}>
            <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
              <PlusOutlined className="text-xl text-gray-500" />
            </div>
          </Upload>
          <p className="text-sm text-gray-500 mt-1">Logo</p>
        </div>

        {/* Form Fields */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Organization name:</label>
            <Input placeholder="Organization name" className="h-10" />
          </div>
          <div>
            <label className="block text-sm font-medium">Organization owner:</label>
            <Input placeholder="Owner name" className="h-10" />
          </div>
          <div>
            <label className="block text-sm font-medium">Location:</label>
            <Input placeholder="Location" className="h-10" />
          </div>
          <div>
            <label className="block text-sm font-medium">Email:</label>
            <Input placeholder="example@gmail.com" className="h-10" />
          </div>
          <div>
            <label className="block text-sm font-medium">Password:</label>
            <Input.Password placeholder="******" className="h-10" />
          </div>

          {/* File Upload */}
          <div className="w-full">
            <label className="block text-sm font-medium">Documents:</label>
            <Upload style={{ width: "100%" }} fileList={fileList} onChange={handleUpload} multiple>
              <div className="border-dashed border-2 border-gray-300 rounded-md p-4 text-center text-gray-500 cursor-pointer w-full">
                + Upload
              </div>
            </Upload>
          </div>
        </div>

        {/* Submit Button */}
        <Button type="primary" block className="mt-6 bg-red-500 h-10 text-white">
          ADD
        </Button>
      </div>
    </Modal>
  );
};

export default EditThirdPartyProfile;
