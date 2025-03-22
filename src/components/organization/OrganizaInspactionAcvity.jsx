import { useState } from "react"
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
} from "recharts"
import { ArrowLeft, Filter, RefreshCw, Settings, Clock, XCircle, CheckCircle } from "lucide-react"
import { useNavigate } from "react-router-dom"

const OrganizaInspactionAcvity = () => {
  const navigate = useNavigate()
  const [dateRange, setDateRange] = useState({
    start: "",
    end: "",
  })

  // Sample data for the bar chart
  const barData = [
    { date: "01-02-24", completed: 20, created: 17 },
    { date: "02-02-24", completed: 12, created: 10 },
    { date: "03-02-24", completed: 16, created: 13 },
    { date: "04-02-24", completed: 20, created: 15 },
    { date: "05-02-24", completed: 12, created: 8 },
    { date: "06-02-24", completed: 6, created: 5 },
    { date: "07-02-24", completed: 10, created: 8 },
    { date: "08-02-24", completed: 26, created: 20 },
    { date: "09-02-24", completed: 16, created: 13 },
    { date: "10-02-24", completed: 21, created: 17 },
    { date: "11-02-24", completed: 23, created: 19 },
    { date: "12-02-24", completed: 19, created: 18 },
    { date: "13-02-24", completed: 12, created: 10 },
    { date: "14-02-24", completed: 16, created: 13 },
    { date: "15-02-24", completed: 26, created: 15 },
  ]

  // Data for the donut chart
  const pieData = [
    { name: "Arrived in location", value: 35, color: "#22c55e" },
    { name: "Contact with user", value: 15, color: "#3b82f6" },
    { name: "Viewed the problem", value: 20, color: "#ec4899" },
    { name: "Solved the problem", value: 10, color: "#eab308" },
    { name: "Completed", value: 20, color: "#06b6d4" },
  ]

  const MetricCard = ({ icon, title, value, bgColor }) => (
    <div className="flex items-center gap-4 rounded-lg bg-white p-4 shadow-sm h-[96px]">
      <div className={`rounded-lg p-2 ${bgColor}`}>{icon}</div>
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-2xl font-semibold">{value}</p>
      </div>
    </div>
  )
  const renderCustomLabel = ({ percent }) => `${(percent * 100).toFixed(1)}%`;
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button className="rounded-full p-2 hover:bg-gray-200">
            <ArrowLeft  onClick={() => navigate(-1)} className="h-6 w-6" />
          </button>
          <h1 className="text-xl font-semibold">Inspection Sheets Overview</h1>
        </div>

        <div className="flex items-center gap-4">
          {/* Date Range Inputs */}
          <div className="flex items-center gap-2 rounded-lg bg-white p-2 shadow-sm">
            <input
              type="date"
              value={dateRange.start}
              onChange={(e) => setDateRange((prev) => ({ ...prev, start: e.target.value }))}
              className="border-none bg-transparent px-2 py-1 outline-none"
              placeholder="Start date"
            />
            <span className="text-gray-400">→</span>
            <input
              type="date"
              value={dateRange.end}
              onChange={(e) => setDateRange((prev) => ({ ...prev, end: e.target.value }))}
              className="border-none bg-transparent px-2 py-1 outline-none"
              placeholder="End date"
            />
          </div>

          {/* Action Buttons */}
          <button className="rounded-lg bg-white p-2 shadow-sm hover:bg-gray-50">
            <Filter className="h-5 w-5" />
          </button>
          <button className="rounded-lg bg-white p-2 shadow-sm hover:bg-gray-50">
            <RefreshCw className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard
        style={{width: "100%"}}
          icon={<Settings className="h-6 w-6 text-orange-500" />}
          title="Created Sheets"
          value="550"
          bgColor="bg-orange-50"
        />
        <MetricCard
          icon={<Clock className="h-6 w-6 text-blue-500" />}
          title="Running Sheets"
          value="550"
          bgColor="bg-blue-50"
        />
        <MetricCard
          icon={<XCircle className="h-6 w-6 text-red-500" />}
          title="Cancelled sheets"
          value="550"
          bgColor="bg-red-50"
        />
        <MetricCard
          icon={<CheckCircle className="h-6 w-6 text-green-500" />}
          title="Completed Sheets"
          value="550"
          bgColor="bg-green-50"
        />
      </div>

      {/* Charts */}
      <div className="lg:flex md:flex gap-4">
        {/* Bar Chart */}
        <div className="rounded-lg bg-white p-6 shadow-sm w-full">
          <h2 className="mb-4 text-lg font-semibold">Total Inspection Per Date</h2>
          <div className="h-[500px]">
            <ResponsiveContainer     width="100%" height={500}>
              <BarChart data={barData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="completed" fill="#fbbf24" radius={[2, 2, 0, 0]} />
                <Bar dataKey="created" fill="#3b82f6" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Donut Chart */}
        <div className="rounded-lg bg-white p-6 shadow-sm w-full max-w-xl h-[600px]">
          <h2 className="mb-4 text-lg font-semibold">Inspection Status</h2>
          <div className="h-[500px]">
            <ResponsiveContainer  width="100%" height={500}>
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
                <Legend iconType="circle" layout="vertical" align="right" verticalAlign="middle" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrganizaInspactionAcvity

