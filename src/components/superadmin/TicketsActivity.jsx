
import { useState } from "react"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"
import { ArrowLeft, RefreshCw } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useGetTicketActivitySupportedAgentDashboardApiQuery } from "../../redux/features/supportedAgentDashboard/supportedAgentDashboardApi"

const TicketsActivity = () => {
  const navigate = useNavigate()
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [refreshKey, setRefreshKey] = useState(0) // Add refresh key state

  const { data: activityData, isLoading, refetch } =
    useGetTicketActivitySupportedAgentDashboardApiQuery({
      start_date: startDate,
      end_date: endDate,
      _refresh: refreshKey, // Add this to force refresh
    })

    console.log(activityData)

  // Transform API data into Recharts-friendly format
  const transformData = (data) => {
    if (!data || !data.tickets) return []
    return Object.entries(data.tickets).map(([date, statusObj]) => ({
      date,
      New: statusObj?.New || 0,
      "In progress": statusObj?.["In progress"] || 0,
      Completed: statusObj?.Completed || 0,
    }))
  }

  const transformedData = transformData(activityData)

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

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="rounded-full p-2 hover:bg-gray-200"
          >
            <ArrowLeft className="h-6 w-6" />
          </button>
          <h1
            onClick={() => navigate(-1)}
            className="text-xl font-semibold"
          >
            Tickets Activity
          </h1>
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

      {/* Chart */}
      <div className="rounded-lg bg-white p-6 shadow-sm">
        <div className="h-[600px] w-full">
          {isLoading ? (
            <div className="flex items-center justify-center h-full text-gray-500">
              Loading chart...
            </div>
          ) : transformedData.length === 0 ? (
            <div className="flex items-center justify-center h-full text-gray-500 text-xl">
              {startDate || endDate 
                ? "No ticket activity found for selected range."
                : "Please select a date range to view ticket activity."}
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={transformedData}
                margin={{
                  top: 10,
                  right: 0,
                  left: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis
                  dataKey="date"
                  tick={{ fill: "#6B7280", fontSize: 12 }}
                />
                <YAxis
                  tick={{ fill: "#6B7280", fontSize: 12 }}
                  tickCount={6}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "none",
                    borderRadius: "8px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="New"
                  stroke="#EF4444"
                  fill="#EF4444"
                  fillOpacity={0.2}
                  strokeWidth={2}
                />
                <Area
                  type="monotone"
                  dataKey="In progress"
                  stroke="#F59E0B"
                  fill="#F59E0B"
                  fillOpacity={0.2}
                  strokeWidth={2}
                />
                <Area
                  type="monotone"
                  dataKey="Completed"
                  stroke="#10B981"
                  fill="#10B981"
                  fillOpacity={0.2}
                  strokeWidth={2}
                />

                <Legend
                  iconType="square"
                  layout="horizontal"
                  verticalAlign="top"
                  align="center"
                  wrapperStyle={{
                    fontSize: "16px",
                    color: "#6B7280",
                    marginBottom: "20px",
                    paddingBottom: "50px",
                    marginLeft: "50px",
                  }}
                />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  )
}

export default TicketsActivity