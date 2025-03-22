
import { Typography, List, Card } from "antd"
import { CalendarOutlined, ClockCircleOutlined } from "@ant-design/icons"

const { Title } = Typography



export default function NotificationsPage() {
  const notifications = [
    {
      type: "New User Registered",
      title: "9+ New User Registered",
      date: "25/12/2024",
      time: "10:20 am",
    },
    {
      type: "New Ticket",
      title: "Dell monitor",
      subtitle: "HDSJKF743396",
      date: "25/12/2024",
      time: "10:20 am",
    },
    {
      type: "New Inspection",
      title: "Dell monitor",
      subtitle: "HDSJKF743396",
      date: "25/12/2024",
      time: "10:20 am",
      amount: "$250",
      isInspection: true,
    },
    {
      type: "New Message",
      title: "Support agent",
      subtitle: "Md. Abid",
      date: "25/12/2024",
      time: "10:20 am",
    },
    {
      type: "New Inspection",
      title: "Dell monitor",
      subtitle: "HDSJKF743396",
      date: "25/12/2024",
      time: "10:20 am",
      amount: "$250",
      isInspection: true,
    },
    {
      type: "New Message",
      title: "Support agent",
      subtitle: "Md. Abid",
      date: "25/12/2024",
      time: "10:20 am",
    },
  ]

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <Title level={4} className="mb-6">
        Notifications
      </Title>

      <List
        dataSource={notifications}
        renderItem={(item) => (
          <Card
            className={`mb-4 overflow-hidden ${item.isInspection ? "bg-red-500 text-white" : "bg-white"}`}
            bodyStyle={{ padding: "16px" }}
          >
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className={`text-red-500 ${item.isInspection ? "text-white" : ""}`}>{item.type}</span>
                <div className="mt-1">
                  <span className="font-medium">{item.title}</span>
                  {item.subtitle && (
                    <div className={`text-sm ${item.isInspection ? "text-white/80" : "text-gray-500"}`}>
                      {item.subtitle}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-8">
                <div className={`flex flex-col items-end ${item.isInspection ? "text-white/80" : "text-gray-500"}`}>
                  <div className="flex items-center gap-1">
                    <CalendarOutlined /> {item.date}
                  </div>
                  <div className="flex items-center gap-1">
                    <ClockCircleOutlined /> {item.time}
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  {item.amount && <span className="text-white font-medium">{item.amount}</span>}
                  <button
                    className="text-orange-500 hover:text-orange-600 font-medium"
                    onClick={() => console.log("View clicked:", item)}
                  >
                    View
                  </button>
                </div>
              </div>
            </div>
          </Card>
        )}
      />
    </div>
  )
}

