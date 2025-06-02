
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
} from "recharts";
import {
  useGetChartSupportedAgentDashboardApiQuery,
} from "../redux/features/supportedAgentDashboard/supportedAgentDashboardApi";
import { Link } from "react-router-dom";
import { useState } from "react";

// Define reusable colors
const CHART_COLORS = ["#EF4444", "#F59E0B", "#10B981"];

const SupportAgentDashboard = () => {
  const [filterType, setFilterType] = useState("weekly");

  const { data, isLoading } = useGetChartSupportedAgentDashboardApiQuery(filterType);




  const formatChartData = (rawData) => {
    if (!rawData) return [];

    const statuses = ["New", "In-Progress", "Completed"];
    return statuses.map((status, index) => ({
      name: status.replace("-", " "), // Replace with space for label
      value: rawData[status]?.count || 0,
      color: CHART_COLORS[index],
    }));
  };

  const inspectionsData = formatChartData(data?.inspections);
  const jobCardProgressData = formatChartData(data?.job_card_progress);
  const ticketStatusData = formatChartData(data?.ticket_status);

  return (
    <div className="p-6 space-y-6 bg-gray-100">
      <Statistics
        inspectionsData={inspectionsData}
        jobCardProgressData={jobCardProgressData}
        ticketStatusData={ticketStatusData}
        filterType={filterType}
        setFilterType={setFilterType}
      />
    </div>
  );
};

const Statistics = ({
  inspectionsData,
  jobCardProgressData,
  ticketStatusData,
  filterType,
  setFilterType,
}) => (
  <div className="space-y-4">
    <div className="flex justify-between items-center">
      <h2 className="text-2xl font-bold text-gray-800">Statistics</h2>
      <select
        className="bg-white border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={filterType}
        onChange={(e) => setFilterType(e.target.value)}
      >
        {["weekly", "monthly", "yearly"].map((option) => (
          <option key={option} value={option} 
          >
            {option.charAt(0).toUpperCase() + option.slice(1)}
          </option>
        ))}
      </select>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <DonutChart
        title="Ticket Status"
        staticsLink="tickets-activity"
        data={ticketStatusData}
      />
      <DonutChart
        title="Inspections"
        staticsLink="inspections-activity"
        data={inspectionsData}
      />
      <DonutChart
        title="Job Card Progress"
        staticsLink="jobcards-overview"
        data={jobCardProgressData}
      />
{/* <DonutChart title="Asset Status" staticsLink="#" data={assetStatusData} /> */}
    </div>
  </div>
);

const renderCustomLabel = ({ percent }) => `${(percent * 100).toFixed(1)}%`;

const DonutChart = ({ title, data, staticsLink }) => (
  <div className="bg-white rounded-lg shadow p-6">
    <div className="flex justify-between items-center mb-4">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">{title}</h3>
      <Link to={staticsLink} className="text-blue-500 hover:underline">
        <button className="bg-gray-200 rounded-full px-2 py-2">
          {/* SVG icon */}
          <svg
            width="36"
            height="36"
            viewBox="0 0 36 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.16117 26.5165C4.27381 21.6291 4.27381 13.7262 9.16117 8.83883C14.0485 3.95148 21.9515 3.95148 26.8388 8.83883C31.7262 13.7262 31.7262 21.6291 26.8388 26.5165C21.9515 31.4039 14.0485 31.4039 9.16117 26.5165ZM25.799 9.8787C21.4835 5.56327 14.5165 5.56327 10.201 9.8787C5.8856 14.1941 5.8856 21.1612 10.201 25.4766C14.5165 29.7921 21.4835 29.7921 25.799 25.4766C30.1144 21.1612 30.1144 14.1941 25.799 9.8787Z"
              fill="black"
            />
            <path
              d="M21.4316 22.8774L21.4316 14.2466L12.8008 14.2466L12.8008 12.7908L22.8875 12.7908V22.8774H21.4316Z"
              fill="black"
            />
            <path
              d="M21.6394 12.998L22.6793 14.0379L13.8405 22.8767L12.8006 21.8369L21.6394 12.998Z"
              fill="black"
            />
          </svg>
        </button>
      </Link>
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
        <Legend
          iconType="circle"
          layout="vertical"
          verticalAlign="bottom"
          align="right"
        />
      </PieChart>
    </ResponsiveContainer>
  </div>
);

export default SupportAgentDashboard;
