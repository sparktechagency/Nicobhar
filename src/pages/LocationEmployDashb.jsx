
import { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Link } from "react-router-dom";
import { useGetLocationDashboardApiQuery } from "../redux/features/locationDashboard/locationDashboardApi";

const FILTER_OPTIONS = ["Weekly", "Monthly", "Yearly"];
const COLORS = {
  New: "#EF4444",
  "In-Progress": "#F59E0B",
  Completed: "#10B981",
};

const LocationEmployDashb = () => {
  const [filter, setFilter] = useState("weekly");
  const { data, isLoading } = useGetLocationDashboardApiQuery(filter);

  if (isLoading) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 space-y-6 bg-gray-100">
      <Statistics
        data={data}
        filter={filter}
        onFilterChange={setFilter}
      />
    </div>
  );
};

const Statistics = ({ data, filter, onFilterChange }) => {
  const ticketStatusData = transformChartData(data?.ticket_status);
  const inspectionsData = transformChartData(data?.inspections);
  const jobCardProgressData = transformChartData(data?.job_card_progress);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Statistics</h2>
        <Select
          options={FILTER_OPTIONS}
          value={filter}
          onChange={(e) => onFilterChange(e.target.value.toLowerCase())}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <DonutChart
          title="Ticket Status"
          staticsLink="/location-employee/tickets-activity"
          data={ticketStatusData}
        />
        <DonutChart
          title="Inspections"
          staticsLink="/location-employee/inspections-activity"
          data={inspectionsData}
        />
        <DonutChart
          title="Job Card Progress"
          staticsLink="/location-employee/jobcards-overview"
          data={jobCardProgressData}
        />
      </div>
    </div>
  );
};

const Select = ({ options, value, onChange }) => (
  <select
    className="bg-white border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
    value={value}
    onChange={onChange}
  >
    {options.map((option) => (
      <option key={option} value={option.toLowerCase()}>
        {option}
      </option>
    ))}
  </select>
);

const renderCustomLabel = ({ percent }) => `${(percent * 100).toFixed(1)}%`;

const DonutChart = ({ title, data, staticsLink }) => (
  <div className="bg-white rounded-lg shadow p-6">
    <div className="flex justify-between items-center mb-4">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">{title}</h3>
    </div>
    <ResponsiveContainer width="100%" height={240}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          label={renderCustomLabel}
          paddingAngle={5}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Legend iconType="circle" layout="vertical" verticalAlign="bottom" align="right" />
      </PieChart>
    </ResponsiveContainer>
  </div>
);

const transformChartData = (rawData = {}) =>
  Object.entries(rawData).map(([key, item]) => ({
    name: key,
    value: item.count,
    color: COLORS[key] || "#999",
  }));

export default LocationEmployDashb;
