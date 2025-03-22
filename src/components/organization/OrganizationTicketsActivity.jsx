import { useState } from "react"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"
import { ArrowLeft, Filter, RefreshCw } from "lucide-react"
import { useNavigate } from "react-router-dom"

const OrganizationTicketsActivity = () => {
    const navigate = useNavigate()
  const [dateRange, setDateRange] = useState({
    start: "",
    end: "",
  })

  // Sample data
  const data = [
    { date: "12-01-2024", created: 50, inProgress: 65, cancelled: 45 },
    { date: "12-03-2024", created: 30, inProgress: 25, cancelled: 40 },
    { date: "12-06-2024", created: 45, inProgress: 70, cancelled: 85 },
    { date: "12-09-2024", created: 30, inProgress: 30, cancelled: 45 },
    { date: "12-12-2024", created: 15, inProgress: 55, cancelled: 25 },
    { date: "12-16-2024", created: 85, inProgress: 40, cancelled: 40 },
    { date: "12-19-2024", created: 40, inProgress: 50, cancelled: 85 },
    { date: "12-21-2024", created: 60, inProgress: 30, cancelled: 45 },
    { date: "12-24-2024", created: 40, inProgress: 90, cancelled: 40 },
    { date: "12-27-2024", created: 35, inProgress: 80, cancelled: 55 },
    { date: "12-30-2024", created: 30, inProgress: 45, cancelled: 35 },
    { date: "12-31-2024", created: 75, inProgress: 80, cancelled: 15 },
  ]

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button  onClick={() => navigate(-1)} className="rounded-full p-2 hover:bg-gray-200">
            <ArrowLeft className="h-6 w-6" />
          </button>
          <h1  onClick={() => navigate(-1)} className="text-xl font-semibold">Tickets Activity</h1>
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

      {/* Chart */}
      <div className="rounded-lg bg-white p-6 shadow-sm">
        {/* Legend */}
        {/* <div className="mb-4 flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-purple-400" />
            <span className="text-sm text-gray-600">Created</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-blue-400" />
            <span className="text-sm text-gray-600">In progress</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-red-400" />
            <span className="text-sm text-gray-600">Cancelled</span>
          </div>
        </div> */}

        {/* Chart Container */}
        <div className="h-[600px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{
                top: 10,
                right: 0,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="date" tickFormatter={(value) => value} tick={{ fill: "#6B7280", fontSize: 12 }} />
              <YAxis tick={{ fill: "#6B7280", fontSize: 12 }} tickCount={6} domain={[0, 100]} />
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
                dataKey="created"
                stroke="#A78BFA"
                fill="#A78BFA"
                fillOpacity={0.2}
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="inProgress"
                stroke="#60A5FA"
                fill="#60A5FA"
                fillOpacity={0.2}
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="cancelled"
                stroke="#F87171"
                fill="#F87171"
                fillOpacity={0.2}
                strokeWidth={2}
              />

              <Legend
                iconType="square"
                layout="horizontal"
                verticalAlign="top"
                align="center"
                wrapperStyle={{ fontSize: "16px", color: "#6B7280", marginBottom: "20px",paddingBottom:"50px",marginLeft:"50px" }}
            />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

export default OrganizationTicketsActivity

