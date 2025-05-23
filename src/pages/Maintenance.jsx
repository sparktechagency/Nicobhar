"use client";

import { useState } from "react";
import { Table, Input, Select } from "antd";
import MaintenceModal from "../components/superadmin/MaintenceModal";
import { useGetMaintainsQuery } from "../redux/features/maintainance/maintainApi";

const { Search } = Input;

export default function Maintenance() {
  const [searchText, setSearchText] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);

  const { data, isLoading } = useGetMaintainsQuery();

  if (isLoading) {
    return <>Loading..</>;
  }
  console.log(data.data.data);

  const priorityColors = {
    Low: "bg-green-500",
    Medium: "bg-yellow-500",
    High: "bg-red-900",
  };
  // Sample data
  const datas = data.data.data.map((item, i) => ({
    key: item.id,
    srNo: i + 1,
    maintenanceItem: item.maintainance_item,
    priority: item.maintainance_type,
    lastMaintenanceDate: item.last_maintainance_date,
    technician: item.technician,
    nextSchedule: item.next_schedule,
    location: "location nai api e",
  }));

  const columns = [
    {
      title: "Sr. no.",
      dataIndex: "srNo",
      key: "srNo",
      width: 80,
    },
    {
      title: "Maintenance Item List",
      dataIndex: "maintenanceItem",
      key: "maintenanceItem",
      render: (text, render) => (
        <div className="flex items-center gap-2">
          {text}
          <div
            className={`w-2 h-2 rounded-full ${
              priorityColors[render.priority] || "bg-gray-300"
            }`}
          />
        </div>
      ),
    },
    {
      title: "Last Maintenance Date",
      dataIndex: "lastMaintenanceDate",
      key: "lastMaintenanceDate",
    },
    {
      title: "Technician",
      dataIndex: "technician",
      key: "technician",
    },
    {
      title: "Next Schedule",
      dataIndex: "nextSchedule",
      key: "nextSchedule",
    },
  ];

  const filteredData = datas.filter((item) =>
    Object.values(item).some(
      (val) =>
        typeof val === "string" &&
        val.toLowerCase().includes(searchText.toLowerCase())
    )
  );

  const handleRowClick = (record) => {
    setSelectedTicket(record);
    setIsModalOpen(true);
  };

  return (
    <div>
      <div className="mb-6 flex justify-between items-center">
        <Search
          placeholder="Search assets..."
          allowClear
          className="max-w-md"
          onChange={(e) => setSearchText(e.target.value)}
        />
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-red-500" />
              <span className="text-sm">Urgent</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-yellow-500" />
              <span className="text-sm">Medium</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span className="text-sm">Low</span>
            </div>
          </div>
          <Select
            defaultValue="date"
            style={{ width: 120 }}
            onChange={(value) => setSortBy(value)}
            options={[
              { value: "date", label: "Sort by Date" },
              { value: "priority", label: "Sort by Priority" },
              { value: "name", label: "Sort by Name" },
            ]}
          />
        </div>
      </div>

      <Table
        onRow={(record) => ({
          onClick: () => handleRowClick(record),
        })}
        columns={columns}
        dataSource={filteredData}
        pagination={{
          total: filteredData.length,
          pageSize: 10,
          showSizeChanger: false,
        }}
        className="[&_.ant-table-thead_.ant-table-cell]:bg-gray-50 [&_.ant-table-thead_.ant-table-cell]:font-medium"
      />

      {/* Modal Component */}
      {isModalOpen && (
        <MaintenceModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          ticket={selectedTicket}
        />
      )}
    </div>
  );
}
