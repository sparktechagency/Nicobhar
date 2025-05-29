import { Modal, Input, Upload, Button, Form, message, Select } from "antd";
import { CloseOutlined, PlusOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react"; // Import useEffect
import {
  useAddUserMutation,
  useGetOrganizationQuery,
  useUpdateUserMutation,
} from "../../redux/features/providers/providersApi";

const UserModal = ({ isOpen, onClose, type, org, role }) => {
  const [form] = Form.useForm();
  const [documentFileList, setDocumentFileList] = useState([]);
  const [logoFile, setLogoFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);
  const [addUser] = useAddUserMutation();
  const [updateUser] = useUpdateUserMutation();
  const { data, isLoading } = useGetOrganizationQuery();

  // useEffect to update form fields when 'org' prop changes or modal opens
  useEffect(() => {
    if (isOpen && type === "edit" && org) {
      form.setFieldsValue({
        organizationId: org?.organization_id,
        name: org?.name,
        location: org.address,
        email: org.email,
      });

      if (org.logoUrl) {
        setLogoPreview(org.image);
      } else {
        setLogoPreview(null);
      }
      setLogoFile(null); // Ensure no old file object is retained from previous edits

      // Handle documents for edit mode if 'org' has document URLs/info
      if (org.documents && Array.isArray(org.documents)) {
        // Map existing documents to Ant Design's fileList format
        const existingDocs = org.documents.map((doc, index) => ({
          uid: doc.id || `existing-doc-${index}-${Math.random()}`, // Unique ID for Ant Design
          name: doc.fileName || `document-${index}`, // File name
          status: "done", // Status can be 'done', 'uploading', 'error'
          url: doc.url, // The URL to the existing document
          originFileObj: null, // No original file object for existing files
        }));
        setDocumentFileList(existingDocs);
      } else {
        setDocumentFileList([]);
      }
    } else if (isOpen && type === "add") {
      // Clear fields when in "add" mode or when opening for add
      form.resetFields();
      setLogoFile(null);
      setLogoPreview(null);
      setDocumentFileList([]);
    }
    // Dependency array: re-run this effect when isOpen, type, or org changes
    // It's crucial to include `form` in the dependency array for `form.setFieldsValue`
  }, [isOpen, type, org, form]);

  // The `if (type != "edit" && !org) { onClose; }` line is syntactically incorrect.
  // `onClose` needs to be called as `onClose()`.
  // A better place for this logic is usually in the parent component that manages
  // the `isOpen` state of the modal, or within the `useEffect` above if it truly
  // means to close the modal under specific conditions when `org` is not provided for edit.
  // For now, I'll remove it as it was a syntax error and not directly related to the form update problem.

  // Function to get base64 preview of an image file
  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  // Handles changes for the general documents upload
  const handleDocumentUploadChange = ({ fileList: newFileList }) => {
    setDocumentFileList(newFileList);
  };

  // Handles changes for the single logo upload
  const handleLogoUploadChange = async ({ file, fileList: newFileList }) => {
    const latestFile = newFileList[newFileList.length - 1];

    if (latestFile && latestFile.originFileObj) {
      setLogoFile(latestFile.originFileObj); // Store the actual file object
      const preview = await getBase64(latestFile.originFileObj);
      setLogoPreview(preview); // Store the base64 preview
    } else {
      setLogoFile(null);
      setLogoPreview(null);
    }
  };

  const handleRemoveLogo = () => {
    setLogoFile(null);
    setLogoPreview(null);
  };

  const onFinish = async (values) => {
    try {
      const formData = new FormData();

      // Common fields
      formData.append("name", values.name);
      formData.append("address", values.location);
      formData.append("email", values.email);
      formData.append("role", role);

      if (values.password) {
        formData.append("password", values.password);
      }
      // Handle Logo upload
      if (logoFile) {
        formData.append("image", logoFile);
      } else if (org?.logoUrl && !logoPreview) {
        formData.append("logoAction", "remove");
      }
      const newDocumentsToUpload = documentFileList.filter(
        (file) => file.originFileObj
      );
      newDocumentsToUpload.forEach((file) => {
        formData.append("documents", file.originFileObj);
      });

      let res;
      if (type === "add") {
        res = await addUser(formData);
        console.log(res);
        if (!res.data.status) {
          message.error("Sorry, Something went wrong!");
          return;
        } else {
          message.success(res.data.message);
          onClose();
          return;
        }
      } else if (type === "edit") {
        formData.append("_method", "PUT");
        res = await updateUser({ id: org?.id, data: formData });
        for (let pair of formData.entries()) {
          console.log(pair[0], pair[1]);
        }
        console.log(res);

        if (!res.data.status) {
          message.error("Sorry, Something went wrong!");
          return;
        } else {
          message.success(res.data.message);
          onClose();
          return;
        }
      }
      console.log("--- FormData Contents ---");
      for (let pair of formData.entries()) {
        console.log(pair[0], pair[1]);
      }
      console.log("--- End FormData Contents ---");
    } catch (error) {
      console.error("Submission failed:", error);
      message.error("Failed to submit organization data. Please try again.");
    }
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
        <h2 className="text-lg font-semibold text-center">
          {type === "add" ? "Add" : "Edit"} {String(role).toLocaleUpperCase()}
        </h2>

        <Form form={form} layout="vertical" onFinish={onFinish}>
          {/* Logo Upload */}
          <div className="flex flex-col items-center my-4">
            <Upload
              name="logo"
              showUploadList={false}
              beforeUpload={() => false}
              onChange={handleLogoUploadChange}
              accept="image/*"
            >
              {logoPreview ? (
                <div className="relative w-16 h-16 rounded-full cursor-pointer group">
                  <img
                    src={logoPreview}
                    alt="logo"
                    className="w-full h-full rounded-full object-cover"
                  />
                  <div
                    className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveLogo();
                    }}
                  >
                    <CloseOutlined className="text-white text-lg" />
                  </div>
                </div>
              ) : (
                <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer">
                  <PlusOutlined className="text-xl text-gray-500" />
                </div>
              )}
            </Upload>
            <p className="text-sm text-gray-500 mt-1">Logo</p>
          </div>

          {/* Form Fields */}
          <div className="space-y-4">
            <Form.Item
              label="Name:"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Please input the name!",
                },
              ]}
            >
              <Input placeholder="Name" className="h-10" />
            </Form.Item>
            {!isLoading && (
              <Form.Item
                label="Organization"
                name="organizationID" // This name holds the ID when selected
                rules={[
                  {
                    required: true,
                    message: "Please select an organization!",
                  },
                ]}
              >
                <Select
                  options={data?.data?.map((x) => ({
                    value: x?.id,
                    label: x?.name,
                  }))}
                />
              </Form.Item>
            )}
            <Form.Item
              label="Location:"
              name="location"
              rules={[
                { required: true, message: "Please input the location!" },
              ]}
            >
              <Input placeholder="Location" className="h-10" />
            </Form.Item>
            <Form.Item
              label="Email:"
              name="email"
              rules={[
                { required: true, message: "Please input your email!" },
                { type: "email", message: "Please enter a valid email!" },
              ]}
            >
              <Input placeholder="example@gmail.com" className="h-10" />
            </Form.Item>
            <Form.Item
              label="Password:"
              name="password"
              // Password field is usually not pre-filled in edit.
              // Make it optional for edit mode.
              rules={[
                {
                  required: type === "add",
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password placeholder="******" className="h-10" />
            </Form.Item>

            {/* Documents Upload */}
            <Form.Item label="Documents:" name="documents" className="w-full">
              <Upload
                fileList={documentFileList}
                onChange={handleDocumentUploadChange}
                multiple
                className="w-full"
                beforeUpload={() => false} // Prevent automatic upload
              >
                <div className="border-dashed border-2 border-gray-300 rounded-md p-2 text-center text-gray-500 cursor-pointer !w-full">
                  <PlusOutlined /> Upload Documents
                </div>
              </Upload>
            </Form.Item>
          </div>

          {/* Submit Button */}
          <Button
            type="primary"
            htmlType="submit"
            block
            className="mt-6 bg-red-500 h-10 text-white"
          >
            {type === "add" ? "ADD" : "UPDATE"}
          </Button>
        </Form>
      </div>
    </Modal>
  );
};

export default UserModal;
