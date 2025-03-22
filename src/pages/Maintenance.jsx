"use client";

import { useState } from "react";
import { Table, Input, Select } from "antd";
import MaintenceModal from "../components/superadmin/MaintenceModal";

const { Search } = Input;

export default function Maintenance() {
  const [searchText, setSearchText] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);

  // Sample data
  const data = Array.from({ length: 15 }, (_, i) => ({
    key: (i + 1).toString(),
    srNo: i + 1,
    maintenanceItem: "Lorem ipsum dolor sit...",
    priority: "Urgent",
    lastMaintenanceDate: "12/20/2023",
    technician: "Md. Abid",
    nextSchedule: "12/20/2025",
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
      render: (text) => (
        <div className="flex items-center gap-2">
          {text}
          <div className="w-2 h-2 rounded-full bg-red-500" />
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

  const filteredData = data.filter((item) =>
    Object.values(item).some(
      (val) => typeof val === "string" && val.toLowerCase().includes(searchText.toLowerCase())
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
