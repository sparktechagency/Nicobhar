import { Typography, List, Card } from "antd";
import { CalendarOutlined, ClockCircleOutlined } from "@ant-design/icons";
import {
  useGetNotificationsQuery,
  useMarkNotificationMutation,
} from "../redux/features/notification/notificationApi";
import dayjs from "dayjs";

const { Title } = Typography;

export default function NotificationsPage() {
  const { data, isLoading, refetch } = useGetNotificationsQuery();
  const [markNotification] = useMarkNotificationMutation();

  if (isLoading) {
    return <>Loading..</>;
  }

  const notifications = data?.data || [];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <Title level={4} className="mb-6">
        Notifications
      </Title>

      <List
        dataSource={notifications}
        renderItem={(item) => {
          const isUnread = item.read_at === null;
          const info = item.data;

          return (
            <Card
              className={`mb-4 overflow-hidden ${
                isUnread ? "bg-red-500 text-white" : "bg-white"
              }`}
              bodyStyle={{ padding: "16px" }}
            >
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span
                    className={`text-red-500 ${isUnread ? "text-white" : ""}`}
                  >
                    {item.data.product}
                  </span>
                  <div className="mt-1">
                    <span className="font-medium">{info.message}</span>
                    {info.serial_number && (
                      <div
                        className={`text-sm ${
                          isUnread ? "text-white/90" : "text-black"
                        }`}
                      >
                        {info.serial_number}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-8">
                  <div
                    className={`flex flex-col items-end ${
                      isUnread ? "text-white/80" : "text-gray-500"
                    }`}
                  >
                    <div className="flex items-center gap-1">
                      <CalendarOutlined />{" "}
                      {dayjs(info.created_at).format("DD/MM/YYYY")}
                    </div>
                    <div className="flex items-center gap-1">
                      <ClockCircleOutlined />{" "}
                      {dayjs(info.created_at).format("hh:mm A")}
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    {info.cost && (
                      <span
                        className={`${
                          isUnread ? "text-white" : "text-black"
                        } font-medium`}
                      >
                        ${info.cost}
                      </span>
                    )}
                    <button
                      className="text-orange-500 hover:text-orange-600 font-medium"
                      onClick={async () => {
                        try {
                          const res = await markNotification({ id: item.id });
                          console.log(res);
                          refetch();
                        } catch (error) {
                          console.error(error);
                        }
                      }}
                    >
                      View
                    </button>
                  </div>
                </div>
              </div>
            </Card>
          );
        }}
      />
    </div>
  );
}
