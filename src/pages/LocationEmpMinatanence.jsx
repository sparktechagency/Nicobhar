import { useEffect, useState } from "react";
import { Table, Button, Select, Typography } from "antd";
import { CheckCircleFilled } from "@ant-design/icons";
import {
  useGetMainDaysQuery,
  useUpdateDayMutation,
  // useUpdateMaintainsMutation, // This was imported but not used, so keeping it commented or removing if not needed
} from "../redux/features/maintainance/maintainApi";
import SetReminderModal from "../components/modals/set-reminder-modal";
import AssetModal from "../components/modals/asset-modal";
import TechnicianModal from "../components/modals/technician-modal";
import { Loader2Icon } from "lucide-react";
import { createRoot } from "react-dom/client";
const { Title } = Typography;

const MaintenanceSchedule = () => {
  const [reminderData, setReminder] = useState({
    asset_id: null,
    technician_id: null,
    last_maintainance: null,
    reminder_category: null,
    status: null,
    next_schedule: null,
  });

  // State for modals
  const [isReminderModalOpen, setIsReminderModalOpen] = useState(false);
  const [isAssetModalOpen, setIsAssetModalOpen] = useState(false);
  const [isTechnicianModalOpen, setIsTechnicianModalOpen] = useState(false);
  const [filter, setFilter] = useState("weekly"); // Default to weekly
  const [updateDay] = useUpdateDayMutation();
  const { data, isLoading, refetch } = useGetMainDaysQuery({
    // Added refetch for when filter changes
    type: filter,
  });
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        loading..
      </div>
    ); // Added some basic styling for loader
  }

  // console.log(data?.data?.data); // Keep this for debugging if needed

  const toggleCheck = async (record, dayOrPeriod) => {
    console.log("Record id:", record.id);
    console.log("Tapped day/period key:", dayOrPeriod);

    try {
      console.log("filter:", filter);
      console.log("payload:", {
        maintainance_id: record.id,
        [filter]: dayOrPeriod,
        maintainance_type: filter,
      });

      const res = await updateDay({
        maintainance_id: record.id,
        [filter === "weekly"
          ? "day"
          : filter === "monthly"
          ? "month"
          : filter === "yearly"
          ? "year"
          : "day"]: dayOrPeriod,
        maintainance_type: filter,
      });

      console.log(res);
      if (res.data?.status === "success") {
        // Assuming your API returns a status
        // Potentially refetch data or update local state
        refetch(); // Refetch data to update the UI with the new status
      } else {
        // Handle API error message if needed
        console.error("Failed to update day:", res.error || res.data?.message);
      }
    } catch (error) {
      console.error("Error updating day:", error);
    }
  };

  const handleSetReminder = () => {
    setIsReminderModalOpen(false);
    setIsAssetModalOpen(true);
  };

  const handleConnectTechnician = () => {
    setIsAssetModalOpen(false);
    setIsTechnicianModalOpen(true);
  };

  const handleAssetModalBack = () => {
    setIsAssetModalOpen(false);
    setIsReminderModalOpen(true);
  };

  // Define dynamic columns based on the filter
  const getDynamicColumns = (currentFilter) => {
    const baseColumns = [
      {
        title: "Sr. no.",
        dataIndex: "id",
        key: "id",
        width: 70,
        align: "center",
      },
      {
        title: "Maintenance Check Item",
        dataIndex: "maintainance_item",
        key: "maintainance_item",
        width: 300,
      },
    ];

    if (currentFilter === "weekly") {
      const daysOfWeek = ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];
      return [
        ...baseColumns,
        ...daysOfWeek.map((day) => ({
          title: day,
          key: day,
          width: 60,
          align: "center",
          render: (_, record) => {
            // Access the nested days object correctly
            const isChecked = record.checked_maintainance?.days?.[day] || false;

            return (
              <div
                onClick={() => toggleCheck(record, day)}
                className="cursor-pointer h-full w-full flex items-center justify-center"
              >
                {isChecked ? (
                  <CheckCircleFilled className="text-green-500 text-lg" />
                ) : (
                  <button
                    className="w-5 h-5 rounded-full border-2 border-gray-300 hover:border-gray-500 transition-all duration-200 flex justify-center items-center"
                    onClick={(e) => {
                      const root = createRoot(e.currentTarget); // Mount React inside button
                      root.render(
                        <Loader2Icon className="animate-spin size-3" />
                      );
                    }}
                  />
                )}
              </div>
            );
          },
        })),
      ];
    } else if (currentFilter === "monthly") {
      const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      return [
        ...baseColumns,
        ...months.map((month) => ({
          title: month,
          key: month,
          width: 60,
          align: "center",
          render: (_, record) => {
            // Assuming backend stores monthly checks like:
            // record.checked_maintainance?.months?.Jan: true/false
            const isChecked =
              record.checked_maintainance?.months?.[month] || false;

            return (
              <div
                onClick={() => toggleCheck(record, month)}
                className="cursor-pointer h-full w-full flex items-center justify-center"
              >
                {isChecked ? (
                  <CheckCircleFilled className="text-green-500 text-lg" />
                ) : (
                  <button
                    className="w-5 h-5 rounded-full border-2 border-gray-300 hover:border-gray-500 transition-all duration-200 flex justify-center items-center"
                    onClick={(e) => {
                      const root = createRoot(e.currentTarget); // Mount React inside button
                      root.render(
                        <Loader2Icon className="animate-spin size-3" />
                      );
                    }}
                  />
                )}
              </div>
            );
          },
        })),
      ];
    } else if (
      currentFilter === "yearly" &&
      data?.data?.data[0]?.checked_maintainance?.dynamic_year
    ) {
      const years = data?.data?.data[0]?.checked_maintainance?.dynamic_year;
      console.log(data?.data?.data[0]?.checked_maintainance?.dynamic_year);

      return [
        ...baseColumns,
        ...years.map((year) => ({
          title: year.toString(),
          key: year.toString(),
          width: 60,
          align: "center",
          render: (_, record) => {
            // Assuming backend stores yearly checks like:
            // record.checked_maintainance?.years?.['2012']: true/false
            const isChecked =
              record.checked_maintainance?.years?.[year.toString()] || false;

            return (
              <div
                onClick={() => toggleCheck(record, year.toString())}
                className="cursor-pointer h-full w-full flex items-center justify-center"
              >
                {isChecked ? (
                  <CheckCircleFilled className="text-green-500 text-lg" />
                ) : (
                  <button
                    className="w-5 h-5 rounded-full border-2 border-gray-300 hover:border-gray-500 transition-all duration-200 flex justify-center items-center"
                    onClick={(e) => {
                      const root = createRoot(e.currentTarget); // Mount React inside button
                      root.render(
                        <Loader2Icon className="animate-spin size-3" />
                      );
                    }}
                  />
                )}
              </div>
            );
          },
        })),
      ];
    }
  };

  const columns = getDynamicColumns(filter); // Generate columns based on current filter

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
            defaultValue="weekly" // Use value, not defaultValue, to match state
            value={filter} // Bind value to state
            style={{ width: 120 }}
            onChange={(value) => {
              // Ant Design Select onChange gives value directly, not event
              setFilter(value);
              // refetch is called by useGetMainDaysQuery due to filter state change
            }}
            options={[
              { value: "weekly", label: "Weekly" },
              { value: "monthly", label: "Monthly" },
              { value: "yearly", label: "Yearly" },
            ]}
          />
          <Button
            type="primary"
            danger
            onClick={() => setIsReminderModalOpen(true)}
          >
            Set A Reminder
          </Button>
        </div>
      </div>

      {/* Main Table */}
      <Table
        columns={columns}
        dataSource={data?.data?.data}
        pagination={false}
        bordered
        size="middle"
        className="maintenance-table"
        rowKey="id" // Always good practice to provide a unique rowKey
      />

      {/* Modals */}
      <SetReminderModal
        isOpen={isReminderModalOpen}
        onClose={() => setIsReminderModalOpen(false)}
        onSetReminder={handleSetReminder}
        setReminderData={setReminder} // Pass state setter if modal needs to update it
      />

      <AssetModal
        isOpen={isAssetModalOpen}
        onClose={() => setIsAssetModalOpen(false)}
        onBack={handleAssetModalBack}
        onConnectTechnician={handleConnectTechnician}
        setReminderData={setReminder} // Pass state setter if modal needs to update it
      />

      <TechnicianModal
        isOpen={isTechnicianModalOpen}
        onClose={() => setIsTechnicianModalOpen(false)}
        reminderData={reminderData} // Pass the collected reminder data
      />

      <style jsx>{`
        .maintenance-table .ant-table-thead > tr > th {
          background-color: #f3f4f6;
          text-align: center;
          white-space: nowrap; /* Prevent title wrapping */
        }
        .maintenance-table .ant-table-cell {
          padding: 12px 8px !important;
          vertical-align: middle; /* Center content vertically */
        }
        .maintenance-table .ant-table-row:hover > td {
          background-color: #f9fafb !important;
        }
        .maintenance-table .ant-table-cell-row-hover {
          background-color: #f9fafb !important;
        }
      `}</style>
    </div>
  );
};

export default MaintenanceSchedule;
