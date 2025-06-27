import { useEffect, useState } from "react";
import { Input, Dropdown, Button, Modal, Form, message } from "antd";
import { SearchOutlined, DownOutlined } from "@ant-design/icons";
import Title from "antd/es/typography/Title";
import { useGetReportQuery } from "../redux/features/reports/reportsApi";
import { DownloadIcon } from "lucide-react";

const sortOptions = [
  { key: "1", label: "Newest" },
  { key: "2", label: "Oldest" },
];

const typeKeyMap = {
  asset: "asset_id",
  ticket: "ticket_id",
  inspection: "inspection_sheet_id",
  job: "job_card_id",
};

export const Reports = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalBOpen, setIsModalBOpen] = useState(false);
  const [currentType, setCurrentType] = useState("");
  const [queryParams, setQueryParams] = useState(null);

  const [form] = Form.useForm(); // Initialize form instance

  const { data, isLoading, isError, error } = useGetReportQuery(queryParams, {
    skip: !queryParams, // <- only run when queryParams is set
  });

  useEffect(() => {
    if (data) {
      console.log("Received report data:", data);
      showBModal();
    }
  }, [data]);

  console.log("response--------", data);

  if (isLoading) {
    return <>Loading..</>;
  }
  if (isError) {
    message.error(error?.data?.message || "something went wrong try again ..");
  }
  const onFinish = (values) => {
    try {
      const key = typeKeyMap[currentType];
      if (!key) throw new Error("Unknown type: " + currentType);

      const queryObj = { [key]: values.id };
      console.log("query-----------", queryObj);
      setQueryParams(queryObj);

      console.log("Query Params:", queryObj);
      // 🚫 Don't try to use `data` here
    } catch (error) {
      console.error("Failed to prepare query:", error);
    }

    handleOk();
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const showModal = (type) => {
    setCurrentType(type);
    setIsModalOpen(true);
    form.resetFields();
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const showBModal = () => {
    setIsModalBOpen(true);
  };

  const handleBOk = () => {
    setIsModalBOpen(false);
  };

  const handleBCancel = () => {
    setIsModalBOpen(false);
  };

  // Function to get the display title for the modal
  const getModalTitle = (type) => {
    switch (type) {
      case "asset":
        return "Assets";
      case "ticket":
        return "Tickets";
      case "inspection":
        return "Inspection Sheets";
      case "job":
        return "Job Cards";
      default:
        return "...";
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-semibold">Make Reports</h1>

        {/* Search & Sort */}
        <div className="flex gap-4">
          <Input
            placeholder="Search reports..."
            prefix={<SearchOutlined />}
            className="w-80 h-10 border-blue-500"
          />
          <Dropdown menu={{ items: sortOptions }}>
            <Button className="border border-gray-300 flex items-center">
              Sort by <DownOutlined className="ml-2" />
            </Button>
          </Dropdown>
        </div>
      </div>

      {/* Report Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reports.map((report, index) => (
          <div
            key={index}
            className="bg-white shadow-md p-6 rounded-lg flex flex-col items-center text-center relative"
          >
            {/* Icon */}
            <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center text-3xl">
              {report.icon}
            </div>

            {/* Title & Description */}
            <h2 className="mt-4 font-semibold text-lg">{report.title}</h2>
            <p className="text-gray-500 text-sm mt-2">
              Lorem ipsum dolor sit amet consectetur. Arcu a in commodo
              vestibulum cras neque morbi in nibh.
            </p>

            {/* Info Icon */}
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-black"
              onClick={() => {
                showModal(report.type); // Pass the type directly to showModal
              }}
            >
              <svg
                width="30"
                height="30"
                viewBox="0 0 30 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.64365 21.9135C3.62515 17.8951 3.62515 11.3971 7.64365 7.37857C11.6621 3.36008 18.1601 3.36008 22.1786 7.37857C26.1971 11.3971 26.1971 17.8951 22.1786 21.9135C18.1601 25.932 11.6621 25.932 7.64365 21.9135ZM21.3236 8.23357C17.7754 4.68533 12.0469 4.68533 8.49865 8.23357C4.9504 11.7818 4.9504 17.5103 8.49865 21.0585C12.0469 24.6068 17.7754 24.6068 21.3236 21.0585C24.8719 17.5103 24.8719 11.7818 21.3236 8.23357Z"
                  fill="black"
                />
                <path
                  d="M17.7329 18.9213L17.7329 11.8248L10.6365 11.8248L10.6365 10.6278L18.9299 10.6278L18.9299 18.9213L17.7329 18.9213Z"
                  fill="black"
                />
                <path
                  d="M17.9033 10.7985L18.7583 11.6535L11.4908 18.9209L10.6358 18.0659L17.9033 10.7985Z"
                  fill="black"
                />
              </svg>
            </button>
            <Modal
              key={currentType} // Add key prop here
              title={
                <div className="w-full border-b">
                  <Title level={4} className="text-center !font-bold">
                    Make Report for {getModalTitle(currentType)}
                  </Title>
                </div>
              }
              closable={{ "aria-label": "Custom Close Button" }}
              open={isModalOpen}
              onOk={handleOk}
              onCancel={handleCancel}
              footer={null}
            >
              <Form
                form={form} // Pass the form instance
                name="reportForm"
                onFinish={onFinish}
                layout="vertical"
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                requiredMark={false}
              >
                <Form.Item
                  label={`${getModalTitle(currentType)} ID:`} // Dynamic label
                  name="id"
                  rules={[{ required: true, message: "Please input the ID!" }]}
                >
                  <Input placeholder="Type here" />
                </Form.Item>
                <Button
                  className="!px-12 block !mx-auto"
                  color="red"
                  variant="solid"
                  type="primary"
                  htmlType="submit"
                >
                  Create Report
                </Button>
              </Form>
            </Modal>

            <Modal
              key={currentType} // Add key prop here
              title={
                <div className="w-full border-b flex flex-row justify-between items-center pb-4">
                  <div>
                    <p>Report ID: #{data?.data?.report_id}</p>
                  </div>
                  <div className="text-xs">
                    <p>Organization: {data?.data?.organization}</p>
                    <p>Date Created: {data?.data?.date_created}</p>
                  </div>
                </div>
              }
              closable={{ "aria-label": "Custom Close ButtonB" }}
              open={isModalBOpen}
              onOk={handleBOk}
              onCancel={handleBCancel}
              footer={null}
            >
              <Title level={4}>Job details:</Title>
              <p className="text-zinc-400">Please assess the following :</p>
              <div className="text-base">
                <p>
                  <b>Make and Model:</b>{" "}
                  {data?.data?.ticket_details?.make_and_model}
                </p>
                <p>
                  <b>Serial Number:</b>{" "}
                  {data?.data?.ticket_details?.serial_number}
                </p>
                <p>
                  <b>Fault Description:</b>{" "}
                  {data?.data?.ticket_details?.fault_description}
                </p>
                <p>
                  <b>Ticket:</b> {data?.data?.ticket_details?.make_and_model}
                </p>
              </div>
              <div className="mt-4"></div>
              <div className="mb-2">
                <Title level={5}>Contact:</Title>
                <p>{data?.data?.contact}</p>
              </div>
              <div className="mb-2">
                <Title level={5}>Status::</Title>
                <p>{data?.data?.status}</p>
              </div>
              <div className="mb-2">
                <Title level={5}>Technician:</Title>
                <p>{data?.data?.technician}</p>
              </div>
              <div className="mb-2">
                <Title level={5}>Started:</Title>
                <p>{data?.data?.started}</p>
              </div>
              <div className="mb-2">
                <Title level={5}>Date Started:</Title>
                <p>{data?.data?.date_started}</p>
              </div>
              <div className="mb-2">
                <Title level={5}>Date Completed:</Title>
                <p>
                  {data?.data?.date_completed
                    ? data?.data?.date_completed
                    : "N/A"}
                </p>
              </div>
              <div className="mb-2">
                <Title level={5}>Completed: </Title>
                <p>{data?.data?.completed}</p>
              </div>
              <div className="mb-2">
                <Title level={5}>Comments:</Title>
                <p>
                  Support Agent:{" "}
                  {data?.data?.support_agent_comment
                    ? data?.data?.support_agent_comment
                    : "N/A"}
                </p>
                <p>
                  Technician Comment:{" "}
                  {data?.data?.technician_comment
                    ? data?.data?.technician_comment
                    : "N/A"}
                </p>
                <a href="https://example.com/file.pdf" download>
                  <Button className="w-full mt-6">
                    <DownloadIcon className="size-4 mr-2" />
                    Download
                  </Button>
                </a>
              </div>
            </Modal>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reports;

const reports = [
  // {
  //   title: "Make Report For Assets",
  //   type: "asset",
  //   icon: (
  //     <svg
  //       width="41"
  //       height="41"
  //       viewBox="0 0 41 41"
  //       fill="none"
  //       xmlns="http://www.w3.org/2000/svg"
  //     >
  //       <path
  //         d="M36.3639 14.8304H27.297C26.6958 14.8304 26.1193 15.0693 25.6942 15.4944C25.2691 15.9194 25.0303 16.496 25.0303 17.0972V34.0976C25.0303 34.6988 25.2691 35.2754 25.6942 35.7005C26.1193 36.1256 26.6958 36.3644 27.297 36.3644H36.3639C36.9651 36.3644 37.5417 36.1256 37.9667 35.7005C38.3918 35.2754 38.6307 34.6988 38.6307 34.0976V17.0972C38.6307 16.496 38.3918 15.9194 37.9667 15.4944C37.5417 15.0693 36.9651 14.8304 36.3639 14.8304ZM36.3639 17.0972V31.8309H27.297V17.0972H36.3639Z"
  //         fill="#ED1C24"
  //       />
  //       <path
  //         d="M31.8317 4.63013H4.63099C4.02981 4.63013 3.45326 4.86894 3.02817 5.29404C2.60307 5.71913 2.36426 6.29568 2.36426 6.89686V25.0307C2.36426 25.6319 2.60307 26.2084 3.02817 26.6335C3.45326 27.0586 4.02981 27.2974 4.63099 27.2974H13.6979V29.5642H10.6605C10.3133 29.5247 9.96418 29.6204 9.68564 29.8314C9.40709 30.0424 9.22045 30.3526 9.16445 30.6975C9.22045 31.0425 9.40709 31.3526 9.68564 31.5636C9.96418 31.7746 10.3133 31.8703 10.6605 31.8309H22.6742V31.4115H22.7648V25.0307H4.63099V6.89686H31.8317V12.5637H34.0985V6.89686C34.0985 6.29568 33.8597 5.71913 33.4346 5.29404C33.0095 4.86894 32.4329 4.63013 31.8317 4.63013Z"
  //         fill="#ED1C24"
  //       />
  //     </svg>
  //   ),
  // },
  {
    title: "Make Report For Tickets",
    type: "ticket",
    icon: (
      <svg
        width="41"
        height="38"
        viewBox="0 0 41 38"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M35.9348 6.39631L36.7895 9.77914C36.9033 10.2306 36.8965 10.7067 36.7698 11.1543C36.6431 11.6019 36.4015 12.0033 36.072 12.3135L35.957 12.4158C35.3907 12.8844 34.9648 13.5174 34.7309 14.2377C34.4971 14.9581 34.4653 15.735 34.6396 16.4742C34.8138 17.2134 35.1865 17.883 35.7125 18.4018C36.2385 18.9207 36.8951 19.2664 37.6027 19.3971L37.763 19.4231C38.2112 19.4853 38.632 19.6871 38.972 20.0031C39.3121 20.319 39.5562 20.7348 39.6735 21.1979L40.5438 24.6421C40.6448 25.0415 40.6706 25.4581 40.6199 25.8681C40.5691 26.2781 40.4426 26.6734 40.2478 27.0315C40.0529 27.3897 39.7935 27.7036 39.4843 27.9553C39.175 28.2071 38.8221 28.3917 38.4456 28.4988L8.34423 37.0542C7.58397 37.2701 6.77402 37.1568 6.09251 36.7392C5.411 36.3217 4.91375 35.634 4.71011 34.8276L3.89173 31.5872C3.77019 31.105 3.77483 30.5967 3.90517 30.117C4.0355 29.6374 4.28659 29.2044 4.63146 28.8648L4.7524 28.7546C5.30689 28.2747 5.71874 27.635 5.93832 26.9125C6.15791 26.19 6.17587 25.4156 5.99003 24.6825C5.80419 23.9494 5.42248 23.289 4.8909 22.7808C4.35932 22.2726 3.70055 21.9383 2.99396 21.8181C2.50526 21.7345 2.04979 21.5028 1.68238 21.1509C1.31497 20.799 1.05131 20.3419 0.923145 19.8347L0.101053 16.5818C0.000197826 16.1823 -0.0254903 15.7657 0.0254555 15.3558C0.0764012 14.9458 0.202983 14.5505 0.39797 14.1924C0.592957 13.8344 0.852531 13.5206 1.16186 13.2689C1.4712 13.0173 1.82423 12.8328 2.2008 12.7259L32.2999 4.17048C32.6764 4.06335 33.0691 4.03595 33.4556 4.08983C33.842 4.14371 34.2147 4.27783 34.5523 4.48453C34.8899 4.69122 35.1859 4.96644 35.4232 5.29447C35.6605 5.6225 35.8346 5.99691 35.9355 6.39631M32.8452 6.87406L3.00286 15.3563C2.59107 15.4736 2.34622 15.923 2.45678 16.3598L3.04367 18.684C4.31281 18.9553 5.48534 19.5971 6.42918 20.5371C7.37302 21.4771 8.05066 22.6781 8.38578 24.0046C8.72095 25.3312 8.70024 26.7308 8.32598 28.0456C7.95172 29.3604 7.23878 30.5382 6.26748 31.4464L6.85438 33.7706C6.96567 34.2074 7.38859 34.4671 7.80037 34.3499L37.642 25.8676C38.0538 25.7503 38.2987 25.3009 38.1881 24.8641L37.602 22.5407C36.3327 22.2694 35.1601 21.6275 34.2163 20.6873C33.2724 19.7471 32.5948 18.546 32.2598 17.2193C31.9246 15.8928 31.9452 14.4932 32.3193 13.1784C32.6934 11.8636 33.4062 10.6858 34.3774 9.77756L33.7905 7.45335C33.7643 7.34937 33.7191 7.25188 33.6574 7.16647C33.5956 7.08106 33.5186 7.0094 33.4308 6.95559C33.3429 6.90179 33.2459 6.86689 33.1453 6.8529C33.0447 6.83891 32.9432 6.8461 32.8452 6.87406ZM31.8926 23.8425C31.9682 24.142 31.9874 24.4544 31.9492 24.7619C31.911 25.0693 31.8161 25.3657 31.6699 25.6342C31.5237 25.9028 31.3291 26.1381 31.0971 26.3268C30.8652 26.5156 30.6005 26.654 30.3181 26.7342C30.0358 26.8144 29.7413 26.8348 29.4515 26.7943C29.1616 26.7538 28.8822 26.6531 28.6291 26.498C28.3759 26.3429 28.1541 26.1364 27.9762 25.8904C27.7983 25.6444 27.6678 25.3636 27.5922 25.064C27.4395 24.4591 27.5196 23.8146 27.8148 23.2723C28.1101 22.73 28.5963 22.3343 29.1666 22.1723C29.7369 22.0103 30.3444 22.0953 30.8557 22.4085C31.3669 22.7217 31.7399 23.2375 31.8926 23.8425ZM30.3567 17.76C30.5095 18.365 30.4295 19.0095 30.1343 19.5519C29.8391 20.0943 29.3529 20.49 28.7826 20.6521C28.2124 20.8142 27.6048 20.7293 27.0935 20.4162C26.5822 20.103 26.2091 19.5873 26.0563 18.9823C25.9122 18.3806 25.9973 17.7428 26.2933 17.2071C26.5892 16.6715 27.0721 16.281 27.6375 16.1203C28.2028 15.9596 28.8051 16.0415 29.3139 16.3484C29.8227 16.6553 30.1978 17.1625 30.3567 17.76ZM28.8194 11.6783C28.895 11.9779 28.9143 12.2903 28.8762 12.5977C28.838 12.9052 28.7431 13.2016 28.597 13.4702C28.4508 13.7388 28.2562 13.9741 28.0243 14.1629C27.7924 14.3517 27.5277 14.4902 27.2453 14.5704C26.9629 14.6507 26.6684 14.6712 26.3786 14.6307C26.0888 14.5902 25.8093 14.4896 25.5561 14.3345C25.303 14.1795 25.0811 13.973 24.9031 13.727C24.7252 13.481 24.5946 13.2002 24.519 12.9007C24.3662 12.2957 24.4462 11.6512 24.7414 11.1088C25.0366 10.5664 25.5228 10.1707 26.093 10.0086C26.6633 9.84648 27.2709 9.93134 27.7822 10.2445C28.2935 10.5576 28.6666 11.0734 28.8194 11.6783ZM21.1304 1.34254L23.0239 4.21062C23.0516 4.25312 23.0781 4.29615 23.1033 4.3397L4.98834 9.48871L16.997 0.568854C17.6418 0.0902147 18.4394 -0.0971642 19.2144 0.0479245C19.9894 0.193013 20.679 0.658689 21.1304 1.34254Z"
          fill="#ED1C24"
        />
      </svg>
    ),
  },
  {
    title: "Make Report For Inspection Sheets",
    type: "inspection",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0.482422 0.484009H4.22062V4.22594H0.482422V0.484009ZM7.96629 0.484009H19.1921V4.22594H7.96629V0.484009ZM0.482422 7.96788H4.22062V11.7098H0.482422V7.96788ZM7.96629 7.96788H19.1921V11.7098H7.96629V7.96788ZM0.482422 15.4518H4.22062V19.1937H0.482422V15.4518ZM7.96629 15.4518H19.1921V19.1937H7.96629V15.4518Z"
          fill="#ED1C24"
        />
      </svg>
    ),
  },
  {
    title: "Make Report For Job Cards",
    type: "job",
    icon: (
      <svg
        width="40"
        height="36"
        viewBox="0 0 40 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M17.7087 0C17.2173 0 16.7258 0.113684 16.2532 0.284211L2.34082 6.06316C1.41603 6.44276 0.679481 7.17494 0.293111 8.09874C-0.0932584 9.02253 -0.0978224 10.0623 0.280423 10.9895L9.65618 33.6316C9.93312 34.3183 10.4048 34.9087 11.0129 35.3296C11.6209 35.7505 12.3388 35.9836 13.0776 36C13.569 36 14.0794 35.9432 14.5709 35.7158L28.5022 29.9368C29.1746 29.6508 29.751 29.1775 30.1631 28.573C30.5752 27.9685 30.8057 27.2582 30.8272 26.5263C30.8461 26.0526 30.7516 25.5032 30.5815 25.0105L21.1301 2.36842C20.8638 1.67439 20.3948 1.07704 19.7844 0.654487C19.174 0.231931 18.4506 0.00382755 17.7087 0ZM24.2869 0L30.8083 15.8211V3.78947C30.8083 2.78444 30.41 1.82058 29.701 1.10991C28.992 0.399247 28.0304 0 27.0278 0M34.6078 2.91789V20.0274L39.2011 8.92421C39.3895 8.46524 39.4855 7.97352 39.4839 7.47726C39.4822 6.98099 39.3828 6.48993 39.1913 6.03226C38.9999 5.57458 38.7203 5.15928 38.3684 4.81018C38.0165 4.46108 37.5993 4.18504 37.1407 3.9979M17.7087 3.73263L27.1223 26.5074L13.1532 32.3053L3.73962 9.54947"
          fill="#ED1C24"
        />
      </svg>
    ),
  },
];
