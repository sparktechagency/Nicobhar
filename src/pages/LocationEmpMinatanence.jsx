"use client"

import { useState } from "react"
import { Table, Button, Select, Typography, Modal, DatePicker } from "antd"
import { CheckCircleFilled, BellFilled, LeftOutlined } from "@ant-design/icons"
import { Calendar } from "antd" // Import Calendar component
import bellicon from "../assets/Animation - 1739102667768.json"
import Lottie from "lottie-react"
const { Title } = Typography

const MaintenanceSchedule = () => {
  // State for maintenance data
  const [maintenanceData, setMaintenanceData] = useState(
    Array.from({ length: 15 }, (_, i) => ({
      key: (i + 1).toString(),
      srNo: i + 1,
      item: "Lorem ipsum dolor sit...",
      sat: false,
      sun: false,
      mon: false,
      tue: false,
      wed: false,
      thu: false,
      fri: false,
    })),
  )

  // State for modals
  const [isReminderModalOpen, setIsReminderModalOpen] = useState(false)
  const [isAssetModalOpen, setIsAssetModalOpen] = useState(false)
  const [isTechnicianModalOpen, setIsTechnicianModalOpen] = useState(false)

  // Form states
  const [assetName, setAssetName] = useState("ViewSonic")
  const [catName, setcatname] = useState("monthly")

  const [lastMaintenanceDate, setLastMaintenanceDate] = useState(null)
  const [nextScheduleDate, setNextScheduleDate] = useState(null)
  const [reminderCategory, setReminderCategory] = useState("Weekly")



  const assetOptions = [
    { value: "ViewSonic", label: "ViewSonic" },
    { value: "HP", label: "HP" },
    { value: "Dell", label: "Dell" },
    { value: "Lenovo", label: "Lenovo" },
  ]
  const catoptions = [
    { value: "Weekly", label: "Weekly" },
    { value: "monthly", label: "monthly" },
    { value: "yearly", label: "yearly" },
   
  ]
  const toggleCheck = (record, day) => {
    const newData = maintenanceData.map((item) => {
      if (item.key === record.key) {
        return { ...item, [day]: !item[day] }
      }
      return item
    })
    setMaintenanceData(newData)
  }

  const handleSetReminder = () => {
    setIsReminderModalOpen(false)
    setIsAssetModalOpen(true)
  }

  const handleConnectTechnician = () => {
    setIsAssetModalOpen(false)
    setIsTechnicianModalOpen(true)
  }

  const columns = [
    {
      title: "Sr. no.",
      dataIndex: "srNo",
      key: "srNo",
      width: 70,
    },
    {
      title: "Maintenance Check Item",
      dataIndex: "item",
      key: "item",
      width: 300,
    },
    ...[
      { title: "Sat", key: "sat" },
      { title: "Sun", key: "sun" },
      { title: "Mon", key: "mon" },
      { title: "Tue", key: "tue" },
      { title: "Wed", key: "wed" },
      { title: "Thu", key: "thu" },
      { title: "Fri", key: "fri" },
    ].map(({ title, key }) => ({
      title,
      dataIndex: key,
      key,
      width: 60,
      align: "center",
      render: (checked, record) => (
        <div
          onClick={() => toggleCheck(record, key)}
          className="cursor-pointer h-full w-full flex items-center justify-center"
        >
          {checked ? (
            <CheckCircleFilled className="text-green-500 text-lg" />
          ) : (
            <div className="w-6 h-6 rounded-full border-2 border-white hover:border-white" />
          )}
        </div>
      ),
    })),
  ]

  return (
    <div className="p-6">
      {/* Main Header */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <Title level={5} className="m-0">
            Preventive Maintenance:
          </Title>
        </div>
        <div className="flex items-center gap-4">
          <Select
            defaultValue="weekly"
            style={{ width: 120 }}
            options={[
              { value: "weekly", label: "Weekly" },
              { value: "monthly", label: "Monthly" },
              { value: "yearly", label: "Yearly" },
            ]}
          />
          <Button type="primary" danger onClick={() => setIsReminderModalOpen(true)}>
            Set A Reminder
          </Button>
        </div>
      </div>

      {/* Main Table */}
      <Table
        columns={columns}
        dataSource={maintenanceData}
        pagination={false}
        bordered
        size="middle"
        className="maintenance-table"
      />

      {/* Set Annual Reminder Modal */}
      <Modal
        centered
        
       
        open={isReminderModalOpen}
        onCancel={() => setIsReminderModalOpen(false)}
        footer={null}
        width={800}
      >
        <div className="space-y-4 ">
          <h2 className="text-2xl font-bold text-gray-800 bg-secondary p-4 text-white absolute top-0 left-0 rounded-t-lg w-full text-center">Set a annual reminder</h2>
          <div className="">
            <div className="space-y-4">

            <div className="flex items-center justify-center gap-4">

              <div className="space-y-2 w-full">
                <label className="block mb-2">Asset Name</label>
                <Select
                  value={assetName}
                  onChange={setAssetName}
                  style={{ width: "100%", height: "44px", borderRadius: "8px",backgroundColor:'#F0F0F0' }}
                  options={assetOptions}
                />
              </div>
              <div className="w-full">
                <label className="block mb-2">Last Maintenance Date</label>
                <DatePicker   style={{ width: "100%", height: "44px", borderRadius: "8px",marginTop:'8px' }} value={lastMaintenanceDate} onChange={setLastMaintenanceDate} />
              </div>
            </div>




            <div className="flex items-center justify-center gap-4 ">
              <div className="w-full">
                <label className="block mb-2 mt-[8px]">Next Schedule Date</label>
                <DatePicker  style={{ width: "100%", height: "44px", borderRadius: "8px", }} value={nextScheduleDate} onChange={setNextScheduleDate} />
              </div>
              <div className="space-y-2 w-full">
                <label className="block mb-2">Reminder category</label>
                <Select
                  value={catName}
                  onChange={setcatname}
                  style={{ width: "100%", height: "44px", borderRadius: "8px",backgroundColor:'#F0F0F0' }}
                  options={catoptions}
                />
              </div>
            </div>
         
            </div>
         
          </div>
         <div className="flex justify-center">
         <Button style={{height:'44px', width:'30%'}} type="primary" danger block onClick={handleSetReminder}>
            Set Reminder
          </Button>
         </div>
        </div>
      </Modal>

      {/* Asset Modal */}
      <Modal open={isAssetModalOpen} onCancel={() => setIsAssetModalOpen(false)} footer={null} width={600}>
        <div className="text-center">
          <Button
            type="text"
            icon={<LeftOutlined />}
            className="absolute left-4 top-4"
            onClick={() => {
              setIsAssetModalOpen(false)
              setIsReminderModalOpen(true)
            }}
          />
          <div className="">
        <div className="flex flex-col items-center">
        <Lottie animationData={bellicon} loop={true} className="w-40 h-40" />
        </div>
            <p className="text-secondary text-[20px] font-semibold " >ViewSonic</p>
            <p className="text-[#000000] text-[16px] font-semibold">HFGS647HNSJU</p>
            <p className="text-[#000000] text-[16px] font-normal pb-2">Last maintenance date: 26/12/2024</p>
          </div>
          <div className="bg-red-500 p-4 -mx-6 mb-6">
            <p className="text-white text-[16px] font-semibold ">Send The Asset For Maintenance</p>
          </div>
          <div className="flex gap-4 justify-center mt-6 mb-4">
            <Button style={{ height: "44px", width: "30%",color:'#000000',fontSize:'16px' }}>Remind Me Later</Button>
            <Button style={{ height: "44px",color:'white',fontSize:'16px' }} type="primary" danger onClick={handleConnectTechnician}>
              Connect To Technician
            </Button>
          </div>
        </div>
      </Modal>

      {/* Select Technician Modal */}
      <Modal
        title="Select technician"
        open={isTechnicianModalOpen}
        onCancel={() => setIsTechnicianModalOpen(false)}
        footer={null}
        width={400}
      >
        <div className="p-4 space-y-4">
          <Select
            placeholder="--select--"
            style={{ width: "100%" }}
            options={[
              { value: "tech1", label: "Technician 1" },
              { value: "tech2", label: "Technician 2" },
            ]}
          />
          <Button type="primary" danger block onClick={() => setIsTechnicianModalOpen(false)}>
            Ok
          </Button>
        </div>
      </Modal>

      <style jsx>{`
        .maintenance-table .ant-table-thead > tr > th {
          background-color: #f3f4f6;
          text-align: center;
        }
        .maintenance-table .ant-table-cell {
          padding: 12px 8px !important;
        }
        .maintenance-table .ant-table-row:hover > td {
          background-color: #f9fafb !important;
        }
        .maintenance-table .ant-table-cell-row-hover {
          background-color: #f9fafb !important;
        }
      `}</style>
    </div>
  )
}

export default MaintenanceSchedule

