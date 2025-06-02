
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
import { ArrowLeft, RefreshCw, Settings, Clock, CheckCircle } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useGetInspectionSheetStaticSupportedAgentDashboardApiQuery } from "../../redux/features/supportedAgentDashboard/supportedAgentDashboardApi"



const OrganizaInspactionAcvity = () => {
  const navigate = useNavigate()
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  // const { data, isLoading } = useGetInspectionSheetStaticSupportedAgentDashboardApiQuery()
  const { data, isLoading } = useGetInspectionSheetStaticSupportedAgentDashboardApiQuery({
    start_date: startDate, // change this to your actual range
    end_date: endDate
  });


  const handleStartDateChange = (e) => {
    const date = e.target.value
    setStartDate(date)
  }

  const handleEndDateChange = (e) => {
    const date = e.target.value
    setEndDate(date)
  }

  const handleRefresh = () => {
    // Reset date filters
    setStartDate('')
    setEndDate('')
    // Force complete refresh by changing the key
    setRefreshKey(prev => prev + 1)
    // Also call refetch for immediate action
    refetch()
  }



  // Bar Chart Data
  const barData = data?.total_inspection_per_date
    ? Object.entries(data.total_inspection_per_date).map(([date, value]) => ({
      date,
      created: value["New Sheets"] || 0,
      completed: value["Past Sheets"] || 0,
    }))
    : []

  // Pie Chart Data
  const pieData = data?.inspections_status
    ? data.inspections_status.map((status, idx) => ({
      name: status.status,
      value: status.count,
      color: [
        "#22c55e",
        "#3b82f6",
        "#ec4899",
        "#eab308",
        "#06b6d4",
        "#f97316",
        "#8b5cf6",
      ][idx % 7],
    }))
    : []

  // MetricCard component
  const MetricCard = ({ icon, title, value, bgColor }) => (
    <div className="flex items-center gap-4 rounded-lg bg-white p-4 shadow-sm h-[96px]">
      <div className={`rounded-lg p-2 ${bgColor}`}>{icon}</div>
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-2xl font-semibold">{value}</p>
      </div>
    </div>
  )

  const renderCustomLabel = ({ percent }) => `${(percent * 100).toFixed(1)}%`

  if (isLoading) return <p className="p-6">Loading...</p>

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button className="rounded-full p-2 hover:bg-gray-200">
            <ArrowLeft onClick={() => navigate(-1)} className="h-6 w-6" />
          </button>
          <h1 className="text-xl font-semibold">Inspection Sheets Overview</h1>
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

          {/* Action Buttons */}
          <button
            className="rounded-lg bg-white p-2 shadow-sm hover:bg-gray-50"
            onClick={handleRefresh}
            disabled={isLoading}
          >
            <RefreshCw className={`h-5 w-5 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          icon={<Settings className="h-6 w-6  text-orange-500" />}
          title={
            <span className="text-lg">Created Sheets</span>
          }
          value={
            <span className="text-3xl font-bold text-gray-800">
              {data?.total_created_sheet || 0}
            </span>
          }
          bgColor="bg-orange-50"

        />
        <MetricCard
          icon={<Clock className="h-6 w-6 text-blue-500" />}
          title={
            <span className="text-lg">Running Sheets</span>
          }
          value={
            <span className="text-3xl font-bold text-gray-800">
              {data?.total_running_sheet || 0}
            </span>
          }
          bgColor="bg-blue-50"
        />
        <MetricCard
          icon={<CheckCircle className="h-6 w-6 text-green-500" />}
          title={
            <span className="text-lg">Completed Sheets</span>
          }
          value={
            <span className="text-3xl font-bold text-gray-800">
              {data?.total_Completed_sheet || 0}
            </span>
          }
          bgColor="bg-green-50"
        />
      </div>

      {/* Charts Section */}
      <div className="lg:flex md:flex gap-4">
        {/* Bar Chart */}
        <div className="rounded-lg bg-white p-6 shadow-sm w-full">
          <h2 className="mb-4 text-lg font-semibold">Total Inspection Per Date</h2>
          <div className="h-[500px]">
            <ResponsiveContainer width="100%" height={500}>
              <BarChart data={barData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="completed" fill="#EF4444" radius={[2, 2, 0, 0]} />
                <Bar dataKey="created" fill="#F59E0B" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart */}
        <div className="rounded-lg bg-white p-6 shadow-sm w-full max-w-xl h-[600px]">
          <h2 className="mb-4 text-lg font-semibold">Inspection Status</h2>
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


