import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import {
  ArrowLeft,
  RefreshCw,
  Settings,
  Clock,
  CheckCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useGetOverviewJobCurdSupportedAgentDashboardApiQuery } from "../../redux/features/supportedAgentDashboard/supportedAgentDashboardApi";

const COLORS = [
  "#22c55e",
  "#3b82f6",
  "#ec4899",
  "#eab308",
  "#06b6d4",
  "#f97316",
  "#8b5cf6",
]; // pie chart colors

const JobCardsOverview = () => {
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const { data, isLoading, refetch } =
    useGetOverviewJobCurdSupportedAgentDashboardApiQuery({
      start_date: startDate,
      end_date: endDate,
    });

  // Prepare bar chart data dynamically from total_job_card_per_date
  const barData = data
    ? Object.entries(data.total_job_card_per_date).map(([date, counts]) => ({
        date, // can format date if you want (e.g. MM-DD-YY)
        ...counts,
      }))
    : [];

  // Prepare pie chart data from job_status array
  const pieData = data
    ? data.job_status.map((item, index) => ({
        name: item.job_status,
        value: item.count,
        color: COLORS[index % COLORS.length],
      }))
    : [];

  // Handlers
  const handleStartDateChange = (e) => setStartDate(e.target.value);
  const handleEndDateChange = (e) => setEndDate(e.target.value);

  const handleRefresh = () => {
    setStartDate("");
    setEndDate("");
    refetch();
  };

  const MetricCard = ({ icon, title, value, bgColor }) => (
    <div className="flex items-center gap-4 rounded-lg bg-white p-4 shadow-sm h-[96px]">
      <div className={`rounded-lg p-2 ${bgColor}`}>{icon}</div>
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-2xl font-semibold">{value}</p>
      </div>
    </div>
  );

  const renderCustomLabel = ({ percent }) => `${(percent * 100).toFixed(1)}%`;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            className="rounded-full p-2 hover:bg-gray-200"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-6 w-6" />
          </button>
          <h1 className="text-xl font-semibold">Job Cards Overview</h1>
        </div>

        <div className="flex items-center gap-4">
          {/* Date Range Inputs */}
          <div className="flex items-center gap-2 rounded-lg bg-white p-2 shadow-sm">
            <input
              type="date"
              value={startDate}
              onChange={handleStartDateChange}
              className="border-none bg-transparent px-2 py-1 outline-none"
            />
            <span className="text-gray-400">→</span>
            <input
              type="date"
              value={endDate}
              onChange={handleEndDateChange}
              className="border-none bg-transparent px-2 py-1 outline-none"
            />
          </div>

          {/* Refresh Button */}
          <button
            className="rounded-lg bg-white p-2 shadow-sm hover:bg-gray-50"
            onClick={handleRefresh}
            disabled={isLoading}
          >
            <RefreshCw
              className={`h-5 w-5 ${isLoading ? "animate-spin" : ""}`}
            />
          </button>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          icon={<Settings className="h-6 w-6 text-orange-500" />}
          title={<span className="text-lg">Created Cards</span>}
          value={
            <span className="text-3xl font-bold text-gray-800">
              {data?.total_created_card ?? 0}
            </span>
          }
          bgColor="bg-orange-50"
        />
        <MetricCard
          icon={<Clock className="h-6 w-6 text-blue-500" />}
          title={<span className="text-lg">Running Cards</span>}
          value={
            <span className="text-3xl font-bold text-gray-800">
              {data?.total_running_card ?? 0}
            </span>
          }
          bgColor="bg-blue-50"
        />
        <MetricCard
          icon={<CheckCircle className="h-6 w-6 text-green-500" />}
          title={<span className="text-lg">Completed Cards</span>}
          value={
            <span className="text-3xl font-bold text-gray-800">
              {data?.total_Completed_card ?? 0}
            </span>
          }
          bgColor="bg-green-50"
        />
      </div>

      {/* Charts */}
      <div className="lg:flex md:flex gap-4">
        {/* Bar Chart */}
        <div className="rounded-lg bg-white p-6 shadow-sm w-full">
          <h2 className="mb-4 text-lg font-semibold">
            Total Job card per Date
          </h2>
          <div className="h-[500px]">
            <ResponsiveContainer width="100%" height={500}>
              <BarChart
                data={barData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                {/* Dynamically create bars for each key in counts except "date" */}
                {barData.length > 0 &&
                  Object.keys(barData[0])
                    .filter((key) => key !== "date")
                    .map((key, i) => (
                      <Bar
                        key={key}
                        dataKey={key}
                        fill={COLORS[i % COLORS.length]}
                        radius={[2, 2, 0, 0]}
                      />
                    ))}
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Donut Chart */}
        <div className="rounded-lg bg-white p-6 shadow-sm w-full max-w-xl h-[600px]">
          <h2 className="mb-4 text-lg font-semibold">Job card status</h2>
          <div className="h-[500px]">
            <ResponsiveContainer width="100%" height={500}>
              <PieChart>
                <Pie
                  label={renderCustomLabel}
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Legend
                  iconType="circle"
                  layout="vertical"
                  align="right"
                  verticalAlign="middle"
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobCardsOverview;
