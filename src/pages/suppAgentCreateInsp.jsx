import { Button, Input, Form, Select, message } from "antd";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useNewDetailsSupportedAgentDashboardApiQuery } from "../redux/features/supportedAgentDashboard/supportedAgentDashboardApi";
import { useGetTechnicianQuery } from "../redux/features/maintainance/maintainApi";
import { useCreateInspectionApiMutation } from "../redux/features/inspection/inspectionApi";
const { TextArea } = Input;

const SuppCreateInspectionPage = () => {
  const [formOne] = Form.useForm();
  const { id } = useParams();
  const convertId = parseInt(id);
  const navig = useNavigate();

  const { data, isLoading } =
    useNewDetailsSupportedAgentDashboardApiQuery(convertId);
  const newDetailsData = data?.data;
  const { data: techs } = useGetTechnicianQuery();
  const [createInsp] = useCreateInspectionApiMutation();
  useEffect(() => {
    if (newDetailsData) {
      formOne.setFieldsValue({
        asset: newDetailsData?.ticket?.asset?.product,
        serialNumber: newDetailsData?.ticket?.asset?.serial_number,
        organization: newDetailsData?.ticket?.asset?.organization?.name,
        location: newDetailsData?.ticket?.user?.address,
        problem: newDetailsData?.ticket?.problem,
        status: newDetailsData?.status,
      });
    }
  }, [newDetailsData, formOne]);

  if (isLoading) return <p>Loading....</p>;
  if (techs) {
    console.log(techs.data);
  }
  const onFinish = async (values) => {
    console.log("Success:", values);

    try {
      // const res = await
      const finalData = {
        ticket_id: String(convertId),
        technician_id: String(values?.technician),
        support_agent_comment: values?.comment,
      };

      const res = await createInsp(finalData);
      console.log(res);

      if (!res?.data?.status) {
        message.error("Failed to create inspection sheet");
        return;
      }
      message.success("Inspection Sheet created successfully!");
      navig("/support-agent/inspectionsheets");
    } catch (error) {
      console.error(error);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className=" p-6">
      {/* Back Button */}
      <Button
        style={{ backgroundColor: "transparent" }}
        icon={
          <svg
            width="36"
            height="36"
            viewBox="0 0 36 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="18" cy="18" r="18" fill="#D9D9D9" />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M14.6668 19.3332L21.3336 26L23 24.3336L17.1664 18.5L23 12.6664L21.3336 11L14.6668 17.6668C14.4459 17.8878 14.3217 18.1875 14.3217 18.5C14.3217 18.8125 14.4459 19.1122 14.6668 19.3332Z"
              fill="black"
            />
          </svg>
        }
        type="text"
        className="mb-6 text-xl text-[500] text-[#000000]"
        onClick={() => window.history.back()}
      >
        Back To Sheets
      </Button>
      {/* Header */}
      <div className="text-center mb-8">
        <p className="text-[20px] text-primary font-semibold ">
          Create Inspection Sheet
        </p>
      </div>
      {/* Form */}
      <Form
        form={formOne}
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column */}
          <Form.Item label="Asset" name="asset">
            <Input style={{ width: "100%", height: "44px" }} readOnly />
          </Form.Item>

          {/* Right Column */}
          <Form.Item label="Serial Number" name="serialNumber">
            <Input style={{ width: "100%", height: "44px" }} readOnly />
          </Form.Item>

          {/* Organization */}
          <Form.Item label="Organization" name="organization">
            <Input style={{ width: "100%", height: "44px" }} readOnly />
          </Form.Item>

          {/* Location */}
          <Form.Item label="Location" name="location">
            <Input style={{ width: "100%", height: "44px" }} readOnly />
          </Form.Item>
        </div>

        {/* Problem */}
        <Form.Item label="Problem" name="problem" className="mb-6">
          <TextArea rows={6} placeholder="Describe the problem here..." />
        </Form.Item>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Assign Technician */}
          <Form.Item label="Assign Technician" name="technician">
            <Select
              style={{ width: "100%", height: "44px" }}
              showSearch
              placeholder="Search technician"
              options={
                techs
                  ? techs.data.map((x) => ({ label: x?.name, value: x?.id }))
                  : []
              }
            />
          </Form.Item>

          {/* Comment */}
          <Form.Item
            label="Comment"
            name="comment"
            // initialValue={detail?.user_comment}
          >
            <Input
              style={{ width: "100%", height: "44px" }}
              placeholder="Add your comment"
            />
          </Form.Item>
        </div>
        {/* Submit Button */}
        <Button
          className="mx-auto block w-1/3"
          color="danger"
          type="primary"
          variant="solid"
          size="large"
          htmlType="submit"
        >
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default SuppCreateInspectionPage;
