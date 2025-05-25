import { Button, Input, Form } from "antd";
import { useGetTicketDetailsQuery } from "../redux/features/ticket/ticketApi";
const { TextArea } = Input;

export default function CreateInspectionPage() {
  const [form] = Form.useForm();

  const id = localStorage.getItem("ticket_insp_id");

  const { data, isLoading } = useGetTicketDetailsQuery({ id });

  console.log(data);
  if (isLoading) {
    return <>Loading...</>;
  }

  const detail = data?.data;

  const onFinish = (values) => {
    console.log("Form values:", values);
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
          Create inspection sheet for
          <span className="text-secondary font-semibold">
            {/* {detail.asset.product} */}

            ViewSonic
          </span>{" "}
          {/* ({detail.asset.serial_number}) */}
          (HFGS647HNSJU)
        </p>
      </div>

      {/* Form */}
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column */}
          <Form.Item
            label="Asset"
            name="asset"
          // initialValue={detail.asset.product}
          >
            <Input style={{ width: "100%", height: "44px" }} readOnly />
          </Form.Item>

          {/* Right Column */}
          <Form.Item
            label="Serial Number"
            name="serialNumber"
          // initialValue={detail.asset.serial_number}
          >
            <Input style={{ width: "100%", height: "44px" }} readOnly />
          </Form.Item>

          {/* Organization */}
          <Form.Item
            label="Organization"
            name="organization"
          // initialValue={detail.asset.brand}
          >
            <Input style={{ width: "100%", height: "44px" }} readOnly />
          </Form.Item>

          {/* Location */}
          <Form.Item
            label="Location"
            name="location"
          // initialValue="Rampura, Dhaka"
          >
            <Input style={{ width: "100%", height: "44px" }} />
          </Form.Item>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Problem */}
          <Form.Item label="Problem" name="problem" className="mb-6">
            <TextArea
              rows={6}
              placeholder="Describe the problem here..."
            // defaultValue={detail.problem}
            />
          </Form.Item>
          {/* Comment */}
          <Form.Item
            label="Comment"
            name="comment"
          >
            <TextArea
              rows={6}
              placeholder="Add your comment"
            />
          </Form.Item>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Form.Item
            label="Status"
            name="Status"
          // initialValue={detail?.ticket_status}
          >
            <Input
              style={{ width: "100%", height: "44px" }}
              placeholder="New"
            />
          </Form.Item>
          {/* Assign Technician */}
          <Form.Item
            label="Assign Technician"
            name="technician"
          // initialValue={detail?.assigned_user.name}
          >
            <Input
              style={{ width: "100%", height: "44px" }}
              showSearch
              placeholder="Search technician"
              readOnly
            />
          </Form.Item>
        </div>

        {/* Submit Button */}
        <Form.Item className="mt-6">
          <Button
            style={{
              width: "100%",
              height: "44px",
              fontSize: "16px",
              fontWeight: "500",
            }}
            type="primary"
            danger
            htmlType="submit"
            block
          >
            Send To Technician
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
